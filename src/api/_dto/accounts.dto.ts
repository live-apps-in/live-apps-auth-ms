import Joi from 'joi';
import { ValidationException } from '../../core/exception';
import { PLATFORM } from '../enum/platform';


export interface Apps{
    ping: {
        userId: string
    },
    discord: {
        userId: string
    },

}

///Signup Payload
export class SignUpDto{
	constructor(
        public id: string,
        public name: string,
        public email: string,
        public platform: string,
        public apps: Apps
	) { }
    
	public static async validate(dto: SignUpDto) {
		const schema =  Joi.object({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			platform: Joi.string().valid(
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

///Sign in Payload
export class SignInDto{
    constructor(
        public email: string,
        public platform: string
    ) { }
    
    async validate(dto: SignInDto) {
        const schema = Joi.object({
            email: Joi.string().required(),
            platform: Joi.string().valid(
                PLATFORM.ping,
                PLATFORM.discord,
            ).required()
        })

        const validate = schema.validateAsync(dto).catch(err => {
            throw new ValidationException('Validation Exception', err)
        })
    }
}