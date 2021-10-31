const express = require("express");
const tripRouter = express.Router();
const email_service = require("../services/email-service");

tripRouter.get("/ticket/price/:distance", async (req, res) => {
  res.send("Return ticket price");
});

tripRouter.get("/ticket/buy", async (req, res) => {
  res.send("Buy ticket");
  const mailOptions = {
    from: process.env.MAIL,
    to: "kacper12445@o2.pl",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };
  console.log(req.body);
  try {
    email_service.sendMail(mailOptions);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

tripRouter.get("/trip/find-route", async (req, res) => {
  //   Request do google
  res.send("Find route");
});

module.exports = tripRouter;
