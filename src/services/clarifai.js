const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

module.exports = clarifai;
