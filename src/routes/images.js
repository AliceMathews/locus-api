/*
 * All routes for images are defined here
 */

const express = require("express");
const router = express.Router();

const imagesFn = require('../databaseHelpers/imagesFn');
const clarifaiHelper = require('../services/clarifaiHelper');

module.exports = db => {

  router.get("/tags", (req, res) => {
    const url = req.param("url");
    clarifaiHelper.getImageTags(url)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    imagesFn.getImageWithId(id)
      .then(result => {
        res.json(result);
        const a = 1;
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/upload", (req, res) => {
    //upload image to firebase
  })

  router.post("/", (req, res) => {
    const { owner_id, longitude, latitude, description, url, views } = req.body;
    const newImage = {
      owner_id,
      longitude,
      latitude,
      description,
      url,
      views
    };
    imagesFn.addImage(newImage)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
  });

  return router;
};
