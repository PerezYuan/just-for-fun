var express = require('express');
var connection = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/banner/get', function(req, res, next) {
  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  connection.query(`SELECT * FROM banner_img`, function (error, results) {
    if (error) {
      res.end(JSON.stringify({
        code: 500,
        msg: "系统错误"
      }));
    } else {
      results.forEach(element => {
        delete element.id
      });
      res.end(JSON.stringify({
        code: 200,
        data: results
      }));
    }
  });
});

module.exports = router;
