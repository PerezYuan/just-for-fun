var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/company/get', async function(req, res, next) {
  const rows = await query(`SELECT * FROM company_info where id=1`)
  res.json({
    code: 200,
    data: rows[0]
  })
});

module.exports = router;
