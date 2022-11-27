import { inject, injectable } from 'inversify';
import { DI_TYPES } from '../../core/inversify/types.di';
import { UserRepository } from '../repository/users.repository';
import { v4 } from 'uuid';
import { SignUpDto } from '../_dto/accounts.dto';
import { HttpException } from '../../core/exception';
@injectable()
export class AccountService{
	constructor(
        @inject(DI_TYPES.UserRepository) private readonly userRepo: UserRepository
	) { }
    
	///Create User
	async signup(payload: SignUpDto) {
		const userExists = await this.userRepo.findByEmail(payload.email);
		if (userExists.length !== 0) throw new HttpException('User Already Exists', 409);
        
		payload = {
			id: v4(),
			apps: {},
			...payload,
		};
		return this.userRepo.create(payload);
	}

	///User Profile
	async profile() {
		const res = await this.userRepo.findById('abc123');
		return res;
	}
}