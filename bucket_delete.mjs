import AWS from 'aws-sdk';
import 'dotenv/config';
import { exec } from './common.mjs';

exec(async ({ getRequiredEnv }) => {
  const bucket = getRequiredEnv("AWS_S3_BUCKET");
  console.log(`S3 Bucket: ${bucket}`);

  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: getRequiredEnv("AWS_ACCESS_KEY_ID"),
      secretAccessKey: getRequiredEnv("AWS_SECRET_ACCESS_KEY"),
      getRequiredEnv: process.env["AWS_SESSION_TOKEN"] ?? undefined,
    },
  });

  const objects = await s3.listObjectsV2({ Bucket: bucket, MaxKeys: 1000 }).promise();
  await Promise.all(objects.Contents.map(async ({ Key }) => {
    await s3.deleteObject({ Bucket: bucket, Key }).promise();
  }));

  const response = await s3.deleteBucket({ Bucket: bucket }).promise();
  if (response.ok) {
    console.log("Created bucket: ", response);
  } else {
    console.error("Failed to create bucket: ", response);
  }
});
