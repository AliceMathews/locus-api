/*
 * All routes for images are defined here
 */

const express = require("express");
const router = express.Router();

const imagesFn = require("../databaseHelpers/imagesFn");
const categoriesFn = require("../databaseHelpers/categoriesFn");
const tagsFn = require('../databaseHelpers/tagsFn');

const clarifaiHelper = require("../services/clarifaiHelper");

module.exports = db => {
  router.get("/tags", (req, res) => {
    const url = req.query.url;
    console.log(url);
    clarifaiHelper
      .getImageTags(url)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    imagesFn
      .getImageWithId(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/upload", (req, res) => {
    //upload image to firebase
  });

  router.post("/", async (req, res) => {
    const { owner_id, longitude, latitude, description, url, views, tags } = req.body;

    const newImage = {
      owner_id,
      longitude,
      latitude,
      description,
      url,
      views
    };

    try {
      const image = await imagesFn.addImage(newImage);

      for (let i = 0; i < tags.length; i++) {
        const category = await categoriesFn.checkForCategory(db, tags[i].name);
        let category_id;
        if (category) {
          category_id = category.id;
        } else {
          const newCategory = await categoriesFn.addCategory(db, {name: tags[i].name, cover_photo_url: image.url});
          category_id = newCategory.id;
        }
        const tag = {image_id: image.id, category_id, confidence: tags[i].value};
        await tagsFn.addTag(db, tag);
      }
      res.json(image);
    } catch(err) {
      console.log(err);
    }
  });

  return router;
};
