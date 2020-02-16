const getAllCategories = db => {
  let query = `SELECT * FROM categories`;

  return db
    .query(query)
    .then(data => {
      const categories = data.rows;
      res.json({ categories });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.getAllCategories = getAllCategories;
