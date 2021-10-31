const express = require("express");
const tripRouter = express.Router();
const email_service = require("../services/email-service");

tripRouter.get("/ticket/price/:distance", async (req, res) => {
  res.send("Return ticket price");
});

tripRouter.post("/ticket/buy", async (req, res) => {
  const { name, surname, email, phoneNumber } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: `Ticket Information`,
    text: `Dear ${name} ${surname}, We write to inform you that your ticket has been succesfully bought via Trip Planner`,
  };
  try {
    email_service.sendMail(mailOptions);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
  res.send("Email has been sent");
});

tripRouter.get("/trip/find-route", async (req, res) => {
  //   Request do google
  res.send("Find route");
});

module.exports = tripRouter;
