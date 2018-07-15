var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */

router.get('/api/employee/list', async function(req, res, next) {
  const countRow = await query(`SELECT count(1) AS count FROM employee_list`)
  const { count } = countRow[0]
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const offset = (page - 1) * limit
  const rows = await query(`SELECT * FROM employee_list ORDER BY id LIMIT ${limit} OFFSET ${offset}`)
  const shopRows = await query(`SELECT id, name FROM shop_list`)
  const titleRows = await query(`SELECT id, name FROM work_type`)
  rows.map(item => {
    item.create_time = `${item.create_time.getFullYear()}-${item.create_time.getMonth() + 1}-${item.create_time.getDate()}`
    item.shop = shopRows.filter(shop => shop.id === item.shop)[0].name
    item.title = titleRows.filter(title => title.id === item.title)[0].name
    return item
  })
  res.json({    
    code: 200,
    total: count,
    list: rows
  })
});

module.exports = router;
