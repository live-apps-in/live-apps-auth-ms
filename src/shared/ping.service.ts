import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { HttpException } from '../core/exception';
import { DI_TYPES } from '../core/inversify/types.di';
import { RestService } from './rest.service';

export enum PING_MS_ACTIONS {
    createUser = 'createUser'
}

const PING_API = 'https://api.ping.jagalive.in';
// const PING_API = 'http://127.0.0.1:5001';

@injectable()
export class PingService{
	constructor(
		@inject(DI_TYPES.RestService) private readonly restService: RestService
	){}
	async call(type: string, payload: any) {
		const buildConfig = await new PingMicroServiceFactory().getResponseConfig(type);
		const getResponse = await this.restService.axiosInstance({
			url: buildConfig.url + buildConfig.route,
			method: buildConfig.method,
			route: buildConfig.route,
			headers: buildConfig.headers,
			body: {...payload}
		});

		if (getResponse) return getResponse;
		throw new HttpException('Ping Service Unavailable', 500);
	}
	
}

class PingMicroServiceFactory{
	async getResponseConfig(type: string) {
		const config: any = {};

		switch (type) {
		case PING_MS_ACTIONS.createUser:
			config.url = PING_API;
			config.route = '/user/signup';
			config.method = 'post';
			config.headers = {
				'x-internal-token': await this.createAccessToken()
			};
			break;
		default:
			throw new Error('Invalid Ping Microservice Type');
		}
		return config;
	}
	///Temp access Token for Internal API call
	private createAccessToken() {
		return new Promise((res, rej) => {
			const accessToken = jwt.sign({ scope: 'ping' }, process.env.INTERNAL_MS_SECRET);
					
			res(accessToken);
		});
			
	}
}