var express = require('express');
var connection = require('../mysql');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// router.options('/api/upload', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
// });

router.post('/api/upload', multipartMiddleware, function(req, res, next) {
  // 引入模块
  var COS = require('cos-nodejs-sdk-v5');
  // 创建实例
  var cos = new COS({
    AppId: '1256534403',
    SecretId: '',
    SecretKey: '',
  });
  // 分片上传
  cos.sliceUploadFile({
    Bucket: 'weijian-bucket-1256534403',
    Region: 'ap-chengdu',
    Key: req.files.file.name + Date.parse(new Date()),
    FilePath: req.files.file.path
  }, function (err, data) {
    if (err) {
      console.log(err)
      res.json({
        code: err.error.Code,
        msg: err.error.Message,
      })
    } else {
      console.log(err, data);
      res.json({
        code: 200,
        url: `https://${data.Location}`
      })
    }
  });
});

module.exports = router;
