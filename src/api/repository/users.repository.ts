import { injectable } from 'inversify';
import AWS from 'aws-sdk';
import { PutItemInput, GetItemInput, AttributeValue, AttributeMap, ScanInput } from 'aws-sdk/clients/dynamodb';
import { SignUpDto } from '../_dto/accounts.dto';

const awsConfig = {
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
}
AWS.config.update(awsConfig);
const dynamoClient = new AWS.DynamoDB.DocumentClient();

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
}