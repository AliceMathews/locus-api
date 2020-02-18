const addTag = (db, tag) => {
  return db.query(`
    INSERT INTO tags (image_id, category_id, confidence)
    VALUES($1, $2, $3)
    RETURNING *;
  `, [tag.image_id, tag.category_id, tag.confidence])
  .then(res => {
    return res.rows[0];
  });
};

exports.addTag = addTag;
