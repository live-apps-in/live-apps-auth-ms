import Joi from 'joi'
import { ValidationException } from '../../core/exception'


export class SignUpDto{
    constructor(
        public name: string,
        public email: string,
        public platform: string
    ) { }
    
    public static async validate(dto: SignUpDto) {
        const schema =  Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            platform: Joi.string().required()
        })

        const validate = await schema.validateAsync(dto).catch(err => {
            throw new ValidationException('Validation Exception', err)
        })

        return validate
    }
}