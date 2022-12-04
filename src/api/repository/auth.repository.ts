import AWS from 'aws-sdk';
import { GetItemInput, PutItemInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import { injectable } from 'inversify';

AWS.config.loadFromPath('../../../config/credentials.json');
const dynamoClient = new AWS.DynamoDB.DocumentClient();
@injectable()
export class AuthRepository{
	private AUTH_TABLE = 'live-apps-auth';
	constructor() { }
    
	async create(payload: any) {
		const params: PutItemInput= {
			TableName: this.AUTH_TABLE,
			Item: {
				...payload
			}
		};
		await dynamoClient.put(params).promise();
	}

	async findByUserId<T>(userId: T) {
		const params = {
			ExpressionAttributeValues: {
    			':u': userId
			},
			FilterExpression: 'userId = :u',
  			TableName: this.AUTH_TABLE
		};

		const res = await dynamoClient.scan(params).promise();
		return res.Items[0];
	}
	
	async update(payload: any) {

		const params: PutItemInput= {
			TableName: this.AUTH_TABLE,
			Item: {
				...payload
			}
			
		};
		await dynamoClient.put(params).promise();
	}

}