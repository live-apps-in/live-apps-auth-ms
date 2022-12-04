import { inject, injectable } from 'inversify';
import { DI_TYPES } from '../../core/inversify/types.di';
import { UserRepository } from '../repository/users.repository';
import { v4 } from 'uuid';
import { SignUpDto } from '../_dto/accounts.dto';
import { HttpException } from '../../core/exception';
import { CreateAuthDto } from '../_dto/auth.dto';
import { AuthRepository } from '../repository/auth.repository';
@injectable()
export class AccountService{
	constructor(
		@inject(DI_TYPES.UserRepository) private readonly userRepo: UserRepository,
		@inject(DI_TYPES.AuthRepository) private readonly authRepo: AuthRepository
	) { }
    
	///Create User
	async signup(payload: SignUpDto) {
		const checkUser = await this.userRepo.findByEmail(payload.email);
		if (checkUser) throw new HttpException('User Already Exists', 409);
        
		///User Data
		const userId = v4();
		payload = {
			id: userId,
			apps: {},
			...payload,
		};

		///Persist User data
		await this.userRepo.create(payload);

		///Create Auth for User
		const authData: CreateAuthDto= {
			id: v4(),
			userId
		};
		
		await this.authRepo.create(authData);
		return payload;
		
	}

	///Register new Apps to Live Accounts
	async registerApp(appName: string, userId: string) {
		const user = await this.userRepo.findById(userId);
		if (!user) throw new HttpException('User not found', 400);
		
		let apps = user?.apps || {};
		apps = {
			...user,
			[appName]: {
				isActive: true
			}
		};

		await this.userRepo;
	}

	///User Profile
	async profile(userId: string) {
		const res = await this.userRepo.findById(userId);
		return res;
	}
}