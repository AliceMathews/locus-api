/*
 * All routes for categories are defined here
 */

const express = require("express");
const router = express.Router();
const databaseFn = require("../databaseHelpers/categoriesFn");

module.exports = db => {
  //GET ALL IMAGES FOR GIVEN CATEGORY
  router.get("/:id/images", (req, res) => {
    const category_id = req.params.id;

    databaseFn
      .getImagesForCategory(db, category_id)
      .then(images => {
        res.json({ images });
      })
      .catch(e => res.status(500).json({ error: e.message }));
  });

  //GET ALL CATEGORIES
  router.get("/", (req, res) => {
    databaseFn
      .getAllCategories(db)
      .then(categories => {
        res.json({ categories });
      })
      .catch(e => res.status(500).json({ error: e.message }));
  });

  return router;
};
