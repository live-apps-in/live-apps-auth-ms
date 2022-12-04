import AWS from 'aws-sdk';
import { GetItemInput, PutItemInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';
import { injectable } from 'inversify';
const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
}
AWS.config.update(awsConfig);
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