import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import { Req } from '../../core/custom_types/custom.types';
import { HttpException } from '../../core/exception';
import { DI_TYPES } from '../../core/inversify/types.di';
import { AuthGuard } from '../../guards/auth.guard';
import { APPS } from '../enum/platform';
import { AccountService } from '../service/account.service';
import { SignUpDto } from '../_dto/accounts.dto';


@controller('/accounts')
export class AccountController{
	constructor(
        @inject(DI_TYPES.AccountService) private readonly accountService: AccountService
	) { }
    
    ///Create Live Apps Account
    @httpPost('/signup')
	async signup(
        @requestBody() req: SignUpDto
	) {
		const validatePayload = await SignUpDto.validate(req);
		return this.accountService.signup(validatePayload);
		
	}

	///Register App with Live Accounts
	@httpPost('/apps/register/:appName', AuthGuard)
    async registerApp(
		@requestParam('appName') appName: string,
			req: Req
    ) {
    	const {userId} = req.userData;
    	///Validate App
    	if (!APPS.includes(appName)) throw new HttpException('Invalid App', 400);
		
    	const pingUserData = await this.accountService.registerApp(appName, userId, req.body);
    	return pingUserData;
    }

    ///User Profile
    @httpGet('/profile', AuthGuard)
	async profile(req: Req) {
		const {userId} = req.userData;
    	const res = await this.accountService.profile(userId);
    	return res;
	}
}