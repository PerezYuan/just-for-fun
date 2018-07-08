var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/shop/get/:id', async function(req, res, next) {
  const rows = await query(`SELECT * FROM shop_list where id=${req.params.id}`)
  if (rows.length === 0) {
    res.json({
      code: 200,
      data: {}
    })
    return
  }
  let serviceArr = rows[0].service.split(',').map(item => `id=${item}`);
  const serviceRows = await query(`SELECT * FROM service_type where ${serviceArr.join(' OR ')}`)
  rows[0].service = serviceRows
  res.json({
    code: 200,
    data: rows[0]
  })
});

router.get('/api/shop/list', async function(req, res, next) {
  console.log(1)
  const rows = await query(`SELECT id, name FROM shop_list`)
  res.json({
    code: 200,
    data: rows
  })
});

router.get('/api/shop/delete', async function(req, res, next) {
  console.log(req.params)
  // const rows = await query(`SELECT id, name FROM shop_list`)
  res.json({
    code: 200,
    data: []
  })
});

module.exports = router;
