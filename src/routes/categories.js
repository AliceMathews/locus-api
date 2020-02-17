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

  //just to test the adding category function...we dont need this endpoint??
  // router.get("/new", (req, res) => {
  //   const category = {};
  //   category.name = "bridge";
  //   category.cover_photo_url =
  //     "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

  //   databaseFn
  //     .addCategory(db, category)
  //     .then(data => res.json({ data }))
  //     .catch(e => res.status(500).json({ error: e.message }));
  // });
  return router;
};
