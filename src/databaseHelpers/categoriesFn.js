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
    SELECT * FROM images`;

  return db.query(queryString).then(data => data.rows);
};
exports.getImagesForCategory = getImagesForCategory;

//check if category exists
const checkForCategory = db => {};
exports.checkForCategory = checkForCategory;

//add category
const addCategory = db => {};
exports.addCategory = addCategory;
