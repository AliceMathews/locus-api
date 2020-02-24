const db = require("../db/index");

const getImageWithId = id => {
  return db
    .query(
      `
    SELECT images.*, users.username
    FROM images
    JOIN users ON images.owner_id = users.id
    WHERE images.id = $1;
  `,
      [id]
    )
    .then(res => {
      return res.rows;
    });
};

exports.getImageWithId = getImageWithId;

const addImage = image => {
  const {
    owner_id,
    longitude,
    latitude,
    description,
    url,
    views,
    aperture,
    shutter_speed,
    iso,
    exposure,
    focul_length,
    camera_make
  } = image;

  let queryString = `
    INSERT INTO images (owner_id, longitude, latitude, aperture, shutter_speed, iso, exposure, focul_length, camera_make, description, url, views)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
    `;

  let queryParams = [
    owner_id,
    longitude,
    latitude,
    aperture,
    shutter_speed,
    iso,
    exposure,
    focul_length,
    camera_make,
    description,
    url,
    views
  ];

  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};
exports.addImage = addImage;

const deleteImage = id => {
  let queryString = `
    UPDATE images
    SET is_active = false
    WHERE images.id = $1
    RETURNING * ;`;
  let queryParams = [id];

  return db.query(queryString, queryParams).then(res => {
    return res.rows[0];
  });
};
exports.deleteImage = deleteImage;

const formatGPSCoords = exif => {
  let { GPSLongitude, GPSLongitudeRef, GPSLatitude, GPSLatitudeRef } = exif;

  if (GPSLongitudeRef === "W" && GPSLongitude > 0) {
    GPSLongitude = GPSLongitude * -1;
  }

  if (GPSLatitudeRef === "S" && GPSLatitude > 0) {
    GPSLatitude = GPSLatitude * -1;
  }

  return { latitude: GPSLatitude, longitude: GPSLongitude };
};
exports.formatGPSCoords = formatGPSCoords;

const getAllImagesForUser = userId => {
  let queryParams = [userId];
  let queryString = `
    SELECT *
    FROM images
    WHERE owner_id = $1
    AND is_active = true;
  `;

  return db.query(queryString, queryParams).then(res => {
    return res.rows;
  });
};

exports.getAllImagesForUser = getAllImagesForUser;
