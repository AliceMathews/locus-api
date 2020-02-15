/*
 * All routes for Users are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", (req, res) => {});
  router.post("/login", (req, res) => {});
  router.post("/register", (req, res) => {});

  return router;
};
