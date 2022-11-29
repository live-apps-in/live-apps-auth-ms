import { injectable } from "inversify";
import { CreateAuthDto } from "../_dto/auth.dto";

@injectable()
export class AuthRepository{
    constructor() { }
    
    async create(payload: CreateAuthDto) {
        payload = {
            ...payload,
            _2fa: {
                otp: '',
                expiry: ''
            }
        }
    }

}