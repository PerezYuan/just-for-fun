var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/title/list', async function(req, res, next) {
  const rows = await query(`SELECT id, name FROM work_type`)
  res.json({
    code: 200,
    list: rows
  })
});

module.exports = router;
