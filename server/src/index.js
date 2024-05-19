const express = require("express");
const Route = require("./routes/routes");
require("./DB/connection");
let cors = require("cors");
let path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/api/v1", Route);

app.get("/", (req, res) => {
  res.send("h1");
  res.end();
});
app.listen(port, () => {
  console.log(port);
});
