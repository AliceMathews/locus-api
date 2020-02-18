/*
 * All routes for Users are defined here
 */

const express = require("express");
const router = express.Router();
const databaseFn = require("../databaseHelpers/usersFn");

module.exports = db => {
  router.get("/:id", async (req, res) => {
    try {
      const userInfo = await databaseFn.getUserWithID(db, req.params.id);
      res.json(userInfo);
    } catch (err) {
      console.log(err);
    }
  });

  router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
      const sessionInfo = await databaseFn.login(db, req.body);
      res.json(sessionInfo);
    } catch (err) {
      console.log("it gets thrown", err);
      res.status(404).json({ error: err.message });
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const newUser = await databaseFn.addUser(db, req.body);
      res.json(newUser);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: err.message });
    }
  });

  return router;
};
