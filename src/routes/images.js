/*
 * All routes for images are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/images/:id", (req, res) => {});
  router.post("/", (req, res) => {});

  return router;
};
