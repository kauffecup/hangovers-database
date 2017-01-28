let cloudantConfig;

if (process.env.CLOUDANT_USERNAME && process.env.CLOUDANT_PASSWORD) {
  cloudantConfig = {
    username: process.env.CLOUDANT_USERNAME,
    password: process.env.CLOUDANT_PASSWORD,
  };
} else {
  cloudantConfig = require('./cloudant.json');
}

module.exports = cloudantConfig;
