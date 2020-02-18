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

const getTagsWithImageId = (db, id) => {
  return db.query(`
    SELECT categories.name
    FROM categories
    JOIN tags on categories.id = tags.category_id
    JOIN images on tags.image_id = images.id
    where images.id = $1;
  `, [id])
  .then(res => {
    return res.rows;
  });
};

exports.getTagsWithImageId = getTagsWithImageId;
