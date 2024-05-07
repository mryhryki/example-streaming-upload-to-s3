import "dotenv/config";
import { exec } from "./common.mjs";
import http from "http"

const Port = 50000

exec(async ({ bucket, s3 }) => {
  const server = http.createServer();

  // https://nodejs.org/docs/latest/api/http.html#httpcreateserveroptions-requestlistener
  server.on('request', (req, res) => {
    console.log(`${req.method} ${req.url}`)
    if (req.url === "/") {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        data: 'Hello World!',
      }));
    }
    // TODO: Other routes handings

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("<h1>404 Not Found</h1>");
  });

  console.log(`HTTP server is running at http://localhost:${Port}/`)
  server.listen(Port)
});
