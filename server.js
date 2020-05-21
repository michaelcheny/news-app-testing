require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// const
app.listen(port, () => console.log("Server Started on port " + port));
