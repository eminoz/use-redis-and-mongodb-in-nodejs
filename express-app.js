const express = require("express");
const cors = require("cors");
const api = require("./controller/api");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));

  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  app.use(cors());

  api(app)
};
