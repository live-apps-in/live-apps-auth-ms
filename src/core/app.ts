import 'reflect-metadata';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './inversify/inversify';
import { HttpException, ValidationException } from './exception';

export class App{
	private APP_PORT = process.env.PORT;
	bootstrap() {
		const server = new InversifyExpressServer(container);
		///App config
		server.setConfig(app => {
			app.use(express.json());
			app.use(cors());
		});

		///Error Config
		server.setErrorConfig(app => {
			app.use(<T>(err: T, req: Request, res: Response, next: NextFunction) => {
				///HTTP Exception
				if (err instanceof HttpException) {
					return res.status(err.statusCode).json({ error: err.message, errorInfo: err.error });
				}
                
				///Validation Exception
				if (err instanceof ValidationException) {
					return res.status(400).json({ error: 'Validation Exception', errorInfo: err.error});
				}
				else {
					console.log(err);
					return res.status(500).json({ error: 'Internal Server Exception' });
				}

			});
		});

		const app = server.build();
		app.listen(this.APP_PORT || 5000, () => {
			console.log('Auth Microservice started');
		});
	}
}