const tripRouter = require("./api/trip");
const http = require("http");
const express = require("express");
require("dotenv").config();
let colors = require("colors");
const { route } = require("./api/trip");

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "brightGreen",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red",
});

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(tripRouter);
const server = http.createServer(app);

let port = process.env.PORT;
let host = process.env.HOST;

tripRouter.stack.forEach((api) => {
  if (api.route && api.route.path) {
    console.log(`${host}:${port}${api.route.path}`.info);
  }
});
server.listen(port, () =>
  console.log(`Server listening at port ${host}:${port}`.brightYellow)
);
