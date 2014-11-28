// NEED TO FIGURE OUT HOW TO CALL JSA_USER ENVIRONMENT VARIABLE HERE.

mongodbValue = 'mongodb://' + process.env.JSA_USER + ":" + process.env.JSA_PWD + "@ds053390.mongolab.com:53390/jsa_db";
module.exports = {
  'url': mongodbValue
};
