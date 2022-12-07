import { injectable } from 'inversify';
import {dynamoClient} from '../../config/aws';
import { PutItemInput, GetItemInput, AttributeMap } from 'aws-sdk/clients/dynamodb';
import path from 'path';


@injectable()
export class UserRepository{
	private USERS_TABLE = 'live-apps-users';
	async create(payload: any) {
        
		const params: PutItemInput= {
			TableName: this.USERS_TABLE,
			Item: {
				...payload
			}
		};
		await dynamoClient.put(params).promise();
		return payload;
	}

	async findById<T>(id: T): Promise<AttributeMap> {
		const params: GetItemInput = {
			TableName: this.USERS_TABLE,
			Key: {
				id
			}
		};

		const res = await dynamoClient.get(params).promise();
		return res.Item;
	}

	async findByEmail<T>(email: T): Promise<any> {
		const params = {
			ExpressionAttributeValues: {
    			':e': email
			},
			FilterExpression: 'email = :e',
  			ProjectionExpression: 'id, email',
  			TableName: this.USERS_TABLE
		};

		const res = await dynamoClient.scan(params).promise();
		return res.Items[0];
	}

	async update(payload: any) {

		const params: PutItemInput= {
			TableName: this.USERS_TABLE,
			Item: {
				...payload
			}
			
		};
		await dynamoClient.put(params).promise();
	}
}