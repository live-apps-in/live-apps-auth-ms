import AWS from 'aws-sdk';
import 'dotenv/config';

///TODO - Remove as it has no effect
const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
}
AWS.config.update(awsConfig);
