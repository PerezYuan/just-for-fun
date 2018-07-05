var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/banner/get', async function(req, res, next) {
  const rows = await query(`SELECT * FROM banner_img`)
  rows.forEach(element => {
    delete element.id
  });
  res.json({
    code: 200,
    data: rows
  });
});

module.exports = router;
