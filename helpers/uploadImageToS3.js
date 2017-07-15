var AWS = require('aws-sdk'),
    fs = require('fs');
require('dotenv').config()

let methods = {}

// Note: upload image
methods.uploadImage = (result) => {
  console.log('RESULT di HELPER!!: ', result)

  fs.readFile(result.url, function (err, data) {
      if (err) { throw err; }
      var base64data = new Buffer(data, 'binary');
      var s3 = new AWS.S3();
      s3.upload({
          Bucket: 'elasticbeanstalk-us-west-2-183031211456',
          Key: 'image1.jpg',
          Body: base64data,
          ACL: 'public-read'
      },function (err, resp) {
          if (err) {
              console.log(err);
          } else {
              console.log(resp);
          }
      });
  });
}

module.exports = methods