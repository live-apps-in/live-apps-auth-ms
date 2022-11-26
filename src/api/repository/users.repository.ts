import { injectable } from "inversify";
import AWS from 'aws-sdk'
import { PutItemInput, GetItemInput, AttributeValue, AttributeMap } from "aws-sdk/clients/dynamodb";

const dynamoClient = new AWS.DynamoDB.DocumentClient()

@injectable()
export class UserRepository{
    private USERS_TABLE = 'live-apps-users'
    async create(payload: any) {
        
        const params: PutItemInput= {
            TableName: this.USERS_TABLE,
            Item: {
                ...payload
            }
        }

        const res = await dynamoClient.put(params).promise();
        console.log(res)

        return 'hola'
    }

    async findById<T>(id: T): Promise<AttributeMap> {
        const params: GetItemInput = {
            TableName: this.USERS_TABLE,
            Key: {
                id
            }
        }

        const res = await dynamoClient.get(params).promise();
        return res.Item
    }
}