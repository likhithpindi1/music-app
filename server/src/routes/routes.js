const express = require("express");
const { music, play } = require("../controllers/controlMusic");

const Route = express.Router();
Route.use(express.json());

Route.get("/music", music);
Route.post("/play", play);

module.exports = Route;
