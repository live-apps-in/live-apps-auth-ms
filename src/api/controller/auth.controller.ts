import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { Req } from '../../core/custom_types/custom.types';
import { DI_TYPES } from '../../core/inversify/types.di';
import { RefreshToken } from '../../guards/auth_refresh.guard';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../_dto/auth.dto';


@controller('/auth')
export class AuthController{
	constructor(
        @inject(DI_TYPES.AuthService) private readonly authService: AuthService
	) { }
    
    ///Sign in to Live Accounts
    @httpPost('/accounts')
	async signIn(@requestBody() req: SignInDto) {
		const validatePayload = await SignInDto.validate(req);
		return  this.authService.sign_in(validatePayload);
	}

    ///Validate OTP
    @httpPost('/accounts/2fa/otp/validate')
    async validateOtp(@requestBody() req: any) {
    	const { email, otp } = req;
    	return this.authService.validateOtp(email, otp);
    }
	
	    ///get Access Token from Refresh Token
    @httpGet('/token/refresh', RefreshToken)
    async refreshAccessToken(req: Req) {
    	console.log(req.accessToken);
    	return {accessToken: req.accessToken};
        
    }
}