import Joi from 'joi';
import { ValidationException } from '../../core/exception';
import { PLATFORM } from '../enum/platform';


export class AuthDto{
	constructor(
        public id: string,
        public userId: string,
        public _2fa?: any
	){}
}
export class CreateAuthDto{
	constructor(
        public id: string,
        public userId: string,
        public _2fa?: any
	){}
}

export class SignInDto{
	constructor(
        public email: string,
        public password: string,
        public platform: string,
	) { }
    
	public static async validate(dto: SignInDto) {
		const schema =  Joi.object({
			email: Joi.string().email().required(),
			platform: Joi.string().valid(
				PLATFORM.accounts,
				PLATFORM.ping,
				PLATFORM.discord
			).required()
		});

		const validate = await schema.validateAsync(dto).catch(err => {
			throw new ValidationException('Validation Exception', err);
		});

		return validate;
	}
}