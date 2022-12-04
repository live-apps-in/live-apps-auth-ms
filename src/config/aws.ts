import AWS from 'aws-sdk';
import 'dotenv/config';
import path from 'path';


AWS.config.loadFromPath(path.join(__dirname, '../../keys/credentials.json'));

export const dynamoClient = new AWS.DynamoDB.DocumentClient();
