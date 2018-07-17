var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */
router.get('/api/shop/get/:id', async function(req, res, next) {
  try {
    const rows = await query(`SELECT * FROM shop_list where id=${req.params.id}`)
    if (rows.length === 0) {
      res.json({
        code: 200,
        data: {}
      })
      return
    }
    res.json({
      code: 200,
      data: rows[0]
    })
  } catch (e) {
    res.json({    
      code: e.code,
      msg: e.sqlMessage
    })
  }
});

router.get('/api/shop/list', async function(req, res, next) {
  const rows = await query(`SELECT id, name FROM shop_list`)
  res.json({
    code: 200,
    list: rows
  })
});

router.post('/api/shop/update', async function(req, res, next) {
  let { id, is_open, name, latitude, longitude, service, set_number } = req.body
  let description = req.body.description || ''
  let location = req.body.location || ''
  description = description.replace(/\'/g, "\\'")
  location = location.replace(/\'/g, "\\'")
  if (id && name && is_open && latitude && longitude && service && set_number) {
    is_open = is_open === 'true' ? 1 : 0
    service = Array.isArray(service) ? service.join(',') : service
    try {
      const rows = await query(`UPDATE \`shop_list\` SET name='${name}', is_open='${is_open}', description='${description}', location='${location}', latitude='${latitude}', longitude='${longitude}', service='${service}', set_number='${set_number}' WHERE shop_list.id = ${id}`)
      res.json({    
        code: 200,
        msg: 'Success'
      })
    } catch (e) {
      res.json({
        code: e.code,
        msg: e.sqlMessage
      })
    }
  } else {
    res.json({    
      code: 404,
      msg: 'No params'
    })
  }
});

router.post('/api/shop/add', async function(req, res, next) {
  try {
    const rows = await query("INSERT INTO `shop_list` (`id`, `is_open`, `name`, `location`, `longitude`, `latitude`, `description`, `work_time`, `label`, `service`, `set_number`, `create_time`, `update_time`) VALUES (NULL, '0', '门店名称', '', '106.525257', '29.523009', '', '', '1', '1', '3', now(), now())")
    res.json({
      code: 200,
      msg: 'Success'
    })
  } catch (e) {
    res.json({    
      code: e.code,
      msg: e.sqlMessage
    })
  }
});

module.exports = router;
