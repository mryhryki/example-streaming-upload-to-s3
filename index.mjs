import AWS from 'aws-sdk';
import 'dotenv/config';

const getRequiredEnv = (key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable ${key}`);
  }
  return process.env[key];
};

(async () => {
  const bucket = getRequiredEnv("AWS_S3_BUCKET");
  console.log(`S3 Bucket: ${bucket}`);

  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: getRequiredEnv('AWS_ACCESS_KEY_ID'),
      secretAccessKey: getRequiredEnv('AWS_SECRET_ACCESS_KEY'),
      getRequiredEnv: process.env['AWS_SESSION_TOKEN'] ?? undefined,
    },
  });

  // TODO
  // const response = await s3.putObject({ bucket }).promise()
})();