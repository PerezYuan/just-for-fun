var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/currentUser', function(req, res, next) {
  var data = {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    name : "Serati Ma",
    notifyCount: 12,
    userid: "00000001",
  };
  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  res.end(JSON.stringify(data));
});

module.exports = router;
