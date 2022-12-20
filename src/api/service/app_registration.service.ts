import { inject, injectable } from 'inversify';
import { HttpException } from '../../core/exception';
import { DI_TYPES } from '../../core/inversify/types.di';
import { PingService, PING_MS_ACTIONS } from '../../shared/ping.service';
import { IUser } from '../model/user.model';
import { UserRepository } from '../repository/users.repository';


@injectable()
export class AppRegistrationService{
	constructor(
        @inject(DI_TYPES.PingService) private readonly pingService: PingService,
        @inject(DI_TYPES.UserRepository) private readonly userRepo: UserRepository,
	) { }
    
	async factory(appName: string, user: any, payload: any) {
        
		switch (appName) {
		case 'ping':
			return await this.ping(payload, user);
		default:
			throw new HttpException('Invalid App name', 400);
		}
	}

	private async ping(payload: any, user: any) {
		let apps = user?.apps || {};
        
		const pingUser = await this.pingService.call(PING_MS_ACTIONS.createUser, payload);
		if (!pingUser) throw new Error('Unable to fetch created User from Ping Service');
		
		apps = {
			...apps,
			'ping': {
				isActive: true,
				userId: pingUser._id
			}
		};

		const updatePayload = { ...user };
		updatePayload.apps = apps;

		await this.userRepo.update(updatePayload);
        
		return pingUser;
	}
}