import { CreateBucketCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';
import { exec } from './common.mjs';

exec(async ({ bucket, s3 }) => {
  const response = await s3.send(new CreateBucketCommand({ Bucket: bucket }));
  console.log("Created bucket: ", response);
});
