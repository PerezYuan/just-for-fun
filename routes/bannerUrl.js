var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/banner/list', async function(req, res, next) {
  try {
    const rows = await query(`SELECT * FROM banner_img`)
    res.json({
      code: 200,
      list: rows
    });
  }  catch (e) {
    res.json({
      code: e.code,
      msg: e.sqlMessage
    })
  }
  
});

module.exports = router;
