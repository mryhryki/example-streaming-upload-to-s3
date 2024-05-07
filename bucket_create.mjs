import AWS from "aws-sdk";
import "dotenv/config";
import { exec } from "./common.mjs";

exec(async ({ bucket, s3 }) => {

  const response = await s3.createBucket({ Bucket: bucket }).promise();
  if (response.ok) {
    console.log("Created bucket: ", response);
  } else {
    console.error("Failed to create bucket: ", response);
  }
});
