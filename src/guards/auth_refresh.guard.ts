import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { v4 } from 'uuid';
import { Req } from '../core/custom_types/custom.types';
import { HttpException } from '../core/exception';
import container from '../core/inversify/inversify';
import { DI_TYPES } from '../core/inversify/types.di';
import { AuthRepository } from '../api/repository/auth.repository';


export const RefreshToken = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const refreshToken: any = (req.headers['x-refresh-token']);
		if (!refreshToken) throw new HttpException('Refresh Token Missing in request headers', 401);
		///Validate JWt
		const { userId }: any = jwt.verify(refreshToken, process.env.JWT_SECRET);
	   
	   ////Create Access Token
	   const AuthRepo = await container.get<AuthRepository>(DI_TYPES.AuthRepository);
	   const user = await AuthRepo.findByUserId(userId);
		console.log(user, 'user');
		const sessionId = v4();

		const jwtToken = jwt.sign({
			userId,
			email: user.email,
			sessionId
		}, process.env.JWT_SECRET, { expiresIn: '12000s' });

		req.accessToken = jwtToken;
		next();
		
	} catch (error) {
		return res.status(401).send({error: 'Not Authorized'});
	}


};
