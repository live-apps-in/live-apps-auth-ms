import AWS from 'aws-sdk';
import 'dotenv/config';

const awsConfig = {
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
}
AWS.config.update(awsConfig);
