//get all categories
const getAllCategories = db => {
  let queryString = `SELECT * FROM categories`;

  return db.query(queryString).then(data => data.rows);
};
exports.getAllCategories = getAllCategories;

//get all images for given category
const getImagesForCategory = (db, category_id) => {
  let queryParams = [category_id];
  let queryString = `
    SELECT images.*, tags.category_id, users.username
    FROM images
    JOIN users on images.owner_id = users.id
    LEFT OUTER JOIN tags on images.id = tags.image_id
    WHERE tags.category_id = $1
    AND is_active = true`;

  return db.query(queryString, queryParams).then(data => data.rows);
};
exports.getImagesForCategory = getImagesForCategory;

//check if category exists
const checkForCategory = (db, category_name) => {
  let queryParams = [category_name];
  let queryString = `
    SELECT *
    FROM categories
    WHERE name = $1`;

  return db.query(queryString, queryParams).then(data => {
    return data.rows[0] || false;
  }); ///RETURNS A PROMISE CONTAINING THE CATEGORY OR FALSE IF NOT FOUND
};
exports.checkForCategory = checkForCategory;

//add category
const addCategory = (db, category) => {
  let queryParams = [category.name, category.cover_photo_url];
  let queryString = `
    INSERT INTO categories
    (name, cover_photo_url)
    VALUES ($1, $2)
    RETURNING *`;

  return db.query(queryString, queryParams).then(data => {
    return data.rows[0];
  });
};
exports.addCategory = addCategory;
