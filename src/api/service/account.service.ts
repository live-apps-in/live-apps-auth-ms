import { inject, injectable } from "inversify";
import { DI_TYPES } from "../../core/inversify/types.di";
import { UserRepository } from "../repository/users.repository";

@injectable()
export class AccountService{
    constructor(
        @inject(DI_TYPES.UserRepository) private readonly userRepo: UserRepository
    ) { }
    
    ///Create User
    async signup(payload: any) {
        return this.userRepo.create(payload)
    }

    ///User Profile
    async profile() {
        const res = await this.userRepo.findById('abc123')
        return res
    }
}