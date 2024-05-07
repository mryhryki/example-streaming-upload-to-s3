import "dotenv/config";
import { exec } from "./common.mjs";
import http from "http"

exec(async ({ bucket, s3 }) => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });
});
