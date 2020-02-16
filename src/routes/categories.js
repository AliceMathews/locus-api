/*
 * All routes for categories are defined here
 */

const express = require("express");
const router = express.Router();
const databaseFn = require("../databaseHelpers/categoriesFn");

module.exports = db => {
  router.get("/:id/images", (req, res) => {
    let query = `SELECT * FROM images`; //QUERY PLACEHOLDER - need to define

    db.query(query)
      .then(data => {
        const images = data.rows;
        res.json({ images });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {});
  return router;
};
