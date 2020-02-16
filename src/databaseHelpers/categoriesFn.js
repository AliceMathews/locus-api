//get all categories
const getAllCategories = db => {
  let query = `SELECT * FROM categories`;

  return db.query(query).then(data => data.rows);
};
exports.getAllCategories = getAllCategories;

//get all images for given category
const getImagesForCategory = db => {};
exports.getImagesForCategory = getImagesForCategory;

//check if category exists
const checkForCategory = db => {};
exports.checkForCategory = checkForCategory;

//add category
const addCategory = db => {};
exports.addCategory = addCategory;
