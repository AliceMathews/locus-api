/*
 * All routes for Users are defined here
 */

const express = require("express");
const router = express.Router();
const databaseFn = require("../databaseHelpers/usersFn");
const imagesFn = require("../databaseHelpers/imagesFn");

module.exports = db => {
  router.get("/myInfo", async (req, res) => {
    const result = await databaseFn.returnSessionUser(
      db,
      req.headers.authorization
    );
    res.json(result);
  });

  router.get("/:id", async (req, res) => {
    try {
      const userInfo = await databaseFn.getUserWithID(db, req.params.id);
      res.json(userInfo);
    } catch (err) {
      console.log(err);
    }
  });

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
      res.status(403).json({ error: err.message });
    }
  });

  router.get("/:id/images", async (req, res) => {
    const userId = req.params.id;
    try {
      const images = await imagesFn.getAllImagesForUser(userId);
      // console.log("images: ");
      // console.log(images);
      res.json(images);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

  return router;
};
