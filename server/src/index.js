const tripRouter = require("./api/trip");
const http = require("http");
const express = require("express");
const routers = tripRouter;
require("dotenv").config();
const Colors = require("./style/colors");
const port = process.env.PORT;
const host = process.env.HOST;

const app = express();
const server = http.createServer(app);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.get("/", (req, res) => {
  res.send("Trip Planner API");
});

app.use(function (req, res, next) {
  console.log(`Request: ${req.method.brightGreen} ${req.url.cyan}`);
  next();
});

app.use(tripRouter);

server.listen(port, () => {
  console.log(`Server listening at port ${host}:${port}`.brightYellow);
  routers.stack.forEach((api) => {
    if (api.route && api.route.path) {
      console.log(
        `======= ${Object.getOwnPropertyNames(api.route.methods)
          .toLocaleString()
          .toUpperCase()} ${host}:${port}${api.route.path}`.brightGreen
      );
    }
  });
});
