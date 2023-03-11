import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { HttpException } from '../core/exception';
import { DI_TYPES } from '../core/inversify/types.di';
import { RestService } from './rest.service';

export enum LiveCord_MS_ACTIONS {
    createUser = 'createUser'
}

const LIVECORD_API = 'https://api.livecord.jaga.live';
// const LIVECORD_API = 'http://127.0.0.1:5002';

@injectable()
export class LiveCordService{
	constructor(
		@inject(DI_TYPES.RestService) private readonly restService: RestService
	){}
	async call(type: string, payload: any) {
		const buildConfig = await new LiveCordMicroServiceFactory().getResponseConfig(type);
		const getResponse = await this.restService.axiosInstance({
			url: buildConfig.url + buildConfig.route,
			method: buildConfig.method,
			route: buildConfig.route,
			headers: buildConfig.headers,
			body: {...payload}
		});

		if (getResponse) return getResponse;
		throw new HttpException('LiveCord Service Unavailable', 500);
	}
	
}

class LiveCordMicroServiceFactory{
	async getResponseConfig(type: string) {
		const config: any = {};

		switch (type) {
		case LiveCord_MS_ACTIONS.createUser:
			config.url = LIVECORD_API;
			config.route = '/user/signup';
			config.method = 'post';
			config.headers = {
				'x-internal-token': await this.createAccessToken()
			};
			break;
		default:
			throw new Error('Invalid LiveCord Microservice Type');
		}
		return config;
	}
	///Temp access Token for Internal API call
	private createAccessToken() {
		return new Promise((res, rej) => {
			const accessToken = jwt.sign({ scope: 'live_cord' }, process.env.INTERNAL_MS_SECRET);		
			res(accessToken);
		});
			
	}
}