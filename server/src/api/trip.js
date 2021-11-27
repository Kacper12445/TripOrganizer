const express = require("express");
const tripRouter = express.Router();
const axios = require("axios").default;
const email_service = require("../services/email-service");

tripRouter.post("/ticket/price/", async (req, res) => {
  const { distance } = req.body;
  const ticketPrice = (distance / 9).toFixed(2);
  res.send({ ticketPrice });
});

tripRouter.post("/ticket/buy", async (req, res) => {
  const { name, surname, email, phoneNumber } = req.body;
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: `Ticket Information`,
    text: `Dear ${name} ${surname}, We write to inform you that your ticket has been succesfully bought via Trip Planner`,
  };
  try {
    email_service.sendMail(mailOptions);
    res.status(200).send({ message: "Email has been sent" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).send({ error: "error" });
  }
});

tripRouter.post("/trip/find-route", async (req, res) => {
  const { origin, destination } = req.body;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=transit&language=en&key=${process.env.GOOGLE_API_KEY}`
    );
    res.status(200).send({ data: response.data.routes[0].legs[0] });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

module.exports = tripRouter;
