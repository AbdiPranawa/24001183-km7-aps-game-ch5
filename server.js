require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.get("/api/v1/health-check", systemController.healtcheck);
app.use(systemController.onLost);

module.exports = app;
