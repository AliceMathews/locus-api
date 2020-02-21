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

  //'/user/me' uses the session auth to get user info

  router.post("/login", async (req, res) => {
    try {
      const sessionInfo = await databaseFn.login(db, req.body);
      res.json(sessionInfo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  });

  router.post("/logout", async (req, res) => {
    await databaseFn.deleteSession(db, req.body);
    res.status(200);
  });

  router.post("/register", async (req, res) => {
    try {
      const newUser = await databaseFn.addUser(db, req.body);
      const sessionInfo = await databaseFn.login(db, req.body);
      console.log(sessionInfo);
      res.json(sessionInfo);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

  return router;
};
