const db = require('../db/index');

const getImageWithId = (id) => {
  return db.query(`
    SELECT *
    FROM images
    WHERE id = $1;
  `, [id])
  .then(res => {
    return res.rows;
  });
};

exports.getImageWithId = getImageWithId;

const addImage = (image) => {
  const { owner_id, longitude, latitude, description, url, views } = image;
  return db.query(`
    INSERT INTO images (owner_id, longitude, latitude, description, url, views)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `, [owner_id, longitude, latitude, description, url, views])
  .then(res => {
    return res.rows[0];
  });
};

exports.addImage = addImage;
