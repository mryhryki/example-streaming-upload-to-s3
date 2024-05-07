import {
  DeleteBucketCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import 'dotenv/config';
import { exec } from './common.mjs';

exec(async ({ bucket, s3 }) => {
  const objects = await s3.send(new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 1000 }));
  await Promise.all((objects.Contents ?? []).map(async ({ Key }) => {
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key }));
  }));

  const response = await s3.send(new DeleteBucketCommand({ Bucket: bucket }));
  console.log("Deleted bucket: ", response)
});
