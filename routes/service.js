var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */

router.get('/api/service/list', async function(req, res, next) {
  try {
    const countRow = await query(`SELECT count(1) AS count FROM service_type WHERE is_delete<>1`)
    const { count } = countRow[0]
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit
    const rows = await query(`SELECT * FROM service_type WHERE is_delete<>1 ORDER BY id LIMIT ${limit} OFFSET ${offset}`)
    rows.map(item => {
      item.create_time = `${item.create_time.getFullYear()}-${item.create_time.getMonth() + 1}-${item.create_time.getDate()}`
      item.update_time = `${item.update_time.getFullYear()}-${item.update_time.getMonth() + 1}-${item.update_time.getDate()}`
      return item
    })
    res.json({
      code: 200,
      total: count,
      list: rows
    })
  } catch (e) {
    res.json({    
      code: e.code,
      msg: e.sqlMessage
    })
  }
});

router.post('/api/service/delete', async function(req, res, next) {
  if (req.body.id) {
    try {
      const rows = await query(`UPDATE service_type SET is_delete = '1', update_time=now() WHERE service_type.id = ${req.body.id}`)
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
      msg: 'No id'
    })
  }
});

router.post('/api/service/insert', async function(req, res, next) {
  let { name, price, base_price } = req.body
  let description = req.body.description || ''
  name = name.replace(/\'/g, "\\'")
  description = description.replace(/\'/g, "\\'")
  if (name && price && base_price) {
    try {
      const rows = await query(`INSERT INTO \`service_type\` (\`id\`, \`name\`, \`description\`, \`price\`, \`base_price\`, \`is_delete\`, \`create_time\`, \`update_time\`) VALUES (NULL, '${name}', '${description}', '${price}', '${base_price}', '0', now(), now())`)
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

router.post('/api/service/modify', async function(req, res, next) {
  let { id, name, price, base_price } = req.body
  let description = req.body.description || ''
  name = name.replace(/\'/g, "\\'")
  description = description.replace(/\'/g, "\\'")
  if (name && price && base_price) {
    try {
      console.log(`UPDATE \`service_type\` SET name='${name}', description='${description}, price='${price}', base_price='${base_price}' WHERE service_type.id = ${id}`)
      const rows = await query(`UPDATE \`service_type\` SET name='${name}', description='${description}', price='${price}', base_price='${base_price}', update_time=now() WHERE service_type.id = ${id}`)
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

module.exports = router;
