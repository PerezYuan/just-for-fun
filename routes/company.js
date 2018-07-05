var express = require('express');
var connection = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/company/get', function(req, res, next) {
  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  connection.query(`SELECT * FROM company_info where id=1`, function (error, results) {
    if (error) {
      res.end(JSON.stringify({
        code: 500,
        msg: "系统错误"
      }));
    } else {
      res.end(JSON.stringify({
        code: 200,
        data: results[0]
      }));
    }
  });
});

module.exports = router;
