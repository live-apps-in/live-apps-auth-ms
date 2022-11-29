import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { DI_TYPES } from '../../core/inversify/types.di';
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

    ///User Profile
    @httpGet('/profile')
    async profile() {
    	const res = await this.accountService.profile();
    	return res;
    }
}