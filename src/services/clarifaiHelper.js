const clarifai = require("./clarifai");

const getImageTags = url => {
  return clarifai.models
    .initModel({
      id: Clarifai.GENERAL_MODEL,
      version: "aa7f35c01e0642fda5cf400f543e7c40"
    })
    .then(generalModel => {
      return generalModel.predict(url);
    })
    .then(response => {
      var concepts = response["outputs"][0]["data"]["concepts"];
      return Promise.resolve(concepts);
    });
};

exports.getImageTags = getImageTags;

const filterImageTags = tags => {
  return tags.filter(tag => tag.name !== "no person").slice(0, 12);
};
exports.filterImageTags = filterImageTags;
