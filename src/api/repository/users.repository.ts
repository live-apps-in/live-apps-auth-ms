import { injectable } from 'inversify';
import AWS from 'aws-sdk';
import { PutItemInput, GetItemInput, AttributeValue, AttributeMap, ScanInput } from 'aws-sdk/clients/dynamodb';
import { SignUpDto } from '../_dto/accounts.dto';

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
		const params: GetItemInput = {
			TableName: this.USERS_TABLE,
			Key: {
				email
			}
		};

		const res = await dynamoClient.scan(params).promise();
		return res.Items;
	}
}