var express = require('express');
var connection = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/getShop/:id', function(req, res, next) {
  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  connection.query(`SELECT * FROM shop_list where id=${req.params.id}`, function (error, results) {
    if (error) {
      res.end({
        code: 500,
        msg: "系统错误"
      });
    };
    let serviceArr = results[0].service.split(',').map(item => `id=${item}`);
    // 获取service列表
    connection.query(`SELECT * FROM service_type where ${serviceArr.join(' OR ')}`, function (err, serviceResult) {
      if (err) {
        res.end({
          code: 500,
          msg: "系统错误"
        });
      };
      results[0].service = serviceResult
      res.end(JSON.stringify({
        code: 200,
        data: results[0]
      }));
    })
  });
});

module.exports = router;
