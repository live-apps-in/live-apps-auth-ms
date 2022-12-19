import axios, { AxiosError, AxiosPromise } from 'axios';
import { injectable } from 'inversify';
import { HttpException } from '../core/exception';


interface axiosConfig{
	url: string,
    method: string,
	route: string,
	headers?: any,
    body?: any
}

@injectable()
export class RestService{
    
	async axiosInstance(payload: axiosConfig): Promise<any> {
		const { url, method, headers } = payload;
		const data = {
			...payload.body    
		};

		const axiosConfig = {
			method,
			url,
			data,
			headers
		};
		
		let resData: any;
		const res = await axios(axiosConfig)
			.then(res => {
				resData = res.data;
			})
			.catch((err: AxiosError) => {
				throw new HttpException('Bad Request', 400, err.response.data);
			});
		
		return resData;
	}
    
}