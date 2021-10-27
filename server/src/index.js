const http = require("http");
const express = require("express");
require("dotenv").config();

const app = express();

const server = http.createServer(app);

let port = process.env.PORT;
let host = process.env.HOST;

server.listen(port, () =>
  console.log(`Server listening at port ${host}:${port}`)
);
