import { inject, injectable } from 'inversify';
import { HttpException } from '../../core/exception';
import jwt from 'jsonwebtoken';
import {compareSync, hashSync} from 'bcrypt';
import 'dotenv/config';
import { DI_TYPES } from '../../core/inversify/types.di';
import { randomSixDigitOtp } from '../../utils/calc';
import { AuthRepository } from '../repository/auth.repository';
import { UserRepository } from '../repository/users.repository';
import { AuthDto } from '../_dto/auth.dto';
import { v4 } from 'uuid';


@injectable()
export class AuthService{
	private JWT_SECRET = process.env.JWT_SECRET;
	constructor(
        @inject(DI_TYPES.AuthRepository) private readonly authRepo: AuthRepository,
        @inject(DI_TYPES.UserRepository) private readonly userRepo: UserRepository,
	) { }
    
	async sign_in(payload: any) {
		const {email} = payload;
		/////Validate User
		const isUserValid = await this.userRepo.findByEmail(email);
		if (!isUserValid) throw new HttpException('Invalid Email or Password', 400);
        
		///Send OTP via Email
		const getOtp = await this.sendOtp(email);
		return {
			message: 'OTP sent',
			dev_otp: getOtp.dev_otp
		};
	}

	///////Two Factor Auth - 2FA
	////Send OTP
	async sendOtp(email: string) {
     
		////Get User Info
		const user = await this.userRepo.findByEmail(email);
		if (!user) throw new HttpException('Email not found', 400);

        
		const otp = randomSixDigitOtp().toString();
		const otpHash = hashSync(otp, 12);
		const signature = jwt.sign({}, this.JWT_SECRET, { expiresIn: '300s' });

		///Get Auth
		const getAuth = await this.authRepo.findByUserId(user.id);
		if (!getAuth) throw new Error('Cannot find auth for existing user');
        
		/////Update OTP for the user        
		await this.authRepo.update({
			...getAuth,
            	_2fa: {
				otp: otpHash,
				signature
			}
		});

		////TODO - Mail OTP
		// this.mailService.sendMail({
		// 	type: 'send_otp',
		// 	to: email,
		// 	context: {
		// 		otp
		// 	}
		// });

		return {
			message: 'OTP sent',
			dev_otp: otp
		};
	}


	////Validate OTP
	async validateOtp(email: string, otp: number) {
        
		////Get User Info
		const user = await this.userRepo.findByEmail(email);
		if (!user) throw new HttpException('Email not found', 400);

		///Get Ref
		const getAuth: any = await this.authRepo.findByUserId(user.id);
        
		/////Validate OTP
		const { _2fa } = getAuth;
		if (!_2fa) throw new HttpException('OTP Expired', 400);

		try {
			jwt.verify(_2fa.signature, this.JWT_SECRET);
		} catch (e) { throw new HttpException('OTP Expired', 400); }

		if (!compareSync(otp.toString(), _2fa.otp)) throw new HttpException('Invalid OTP', 400);
        
		////Create Session
		const sessionId = v4();
		////Access Token
		const jwtToken = jwt.sign({
			userId: user.id,
			email,
			role: user.role,
			sessionId
		}, this.JWT_SECRET, { expiresIn: '12000s' });

		////Refresh Token
		const refreshToken = jwt.sign({
			userId: user._id,
			sessionId
		}, this.JWT_SECRET, {expiresIn: '12000s'});

		///Update Session
		await this.authRepo.update({
			...getAuth,
            	_2fa: {
				otp: null,
				signature: null
			}
		});

		return {
			status: 'ok',
			token: jwtToken,
			refreshToken
		};
	}
}

