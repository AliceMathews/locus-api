const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
