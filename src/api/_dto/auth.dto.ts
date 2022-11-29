import Joi from "joi";
import { ValidationException } from "../../core/exception";
import { PLATFORM } from "../enum/platform";


export class CreateAuthDto{
    constructor(
        public id: string,
        public userId: string,
        public _2fa?: any
    ){}
}
