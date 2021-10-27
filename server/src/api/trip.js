const express = require("express");
// const request = require("request");
const https = require("https");
const tripRouter = express.Router();

tripRouter.get("/ticket/price/:distance", async (req, res) => {
  res.send("Return ticket price");
});

tripRouter.post("/ticket/buy", async (req, res) => {
  res.send("Buy ticket");
});

tripRouter.get("/trip/find-route", async (req, res) => {
  //   Request do google
  res.send("Find route");
});

module.exports = tripRouter;
