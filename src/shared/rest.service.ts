import axios from 'axios';
import { injectable } from 'inversify';


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
		
		const res = await axios(axiosConfig).catch(err => {
			console.log(err.message);
		});
		return res;
	}
    
}