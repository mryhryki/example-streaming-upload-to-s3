import AWS from 'aws-sdk';
import 'dotenv/config';
import { exec } from './common.mjs';

exec(async ({ bucket, s3 }) => {
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
