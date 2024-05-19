const express = require("express");
const { music, play } = require("../controllers/controlMusic");
let path = require("path");
let x = path.join(__dirname, "../utilities/Albums");
console.log(x);
// let { Album, song } = play();
const Route = express.Router();
Route.use(express.json());

Route.get("/music", music);
Route.use("/songs", express.static(x));
Route.post("/play", play);

module.exports = Route;
