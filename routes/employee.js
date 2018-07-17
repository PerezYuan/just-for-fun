var express = require('express');
var query = require('../mysql');
var router = express.Router();

/* GET home page. */

router.get('/api/employee/list', async function(req, res, next) {
  try {
    const countRow = await query(`SELECT count(1) AS count FROM employee_list`)
    const { count } = countRow[0]
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit
    const rows = await query(`SELECT * FROM employee_list ORDER BY id LIMIT ${limit} OFFSET ${offset}`)
    rows.map(item => {
      item.create_time = `${item.create_time.getFullYear()}-${item.create_time.getMonth() + 1}-${item.create_time.getDate()}`
      if (parseInt(item.is_out, 10) === 1) {
        item.exit_time = `${item.exit_time.getFullYear()}-${item.exit_time.getMonth() + 1}-${item.exit_time.getDate()}`
      } else {
        item.exit_time = '未离职'
      }
      return item
    })
    res.json({    
      code: 200,
      total: count,
      list: rows
    })
  } catch(e) {
    res.json({    
      code: e.code,
      msg: e.sqlMessage
    })
  }
});


router.post('/api/employee/out', async function(req, res, next) {
  if (req.body.id) {
    try {
      const rows = await query(`UPDATE employee_list SET is_out = '1', exit_time=now() WHERE employee_list.id = ${req.body.id}`)
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

router.post('/api/employee/insert', async function(req, res, next) {
  let { name, sex, shop, title, phone_number } = req.body
  let wx_number = req.body.wx_number || ''
  let info = req.body.info || ''
  name = name.replace(/\'/g, "\\'")
  wx_number = wx_number.replace(/\'/g, "\\'")
  info = info.replace(/\'/g, "\\'")
  if (name && sex && shop && title && phone_number) {
    try {
      const countRow = await query(`SELECT count(1) AS count FROM employee_list`)
      let { count } = countRow[0]
      count = parseInt(count, 10) + 1
      count = ("000000" + count ).substr(-6);
      const rows = await query(`INSERT INTO \`employee_list\` (\`id\`, \`number\`, \`name\`, \`sex\`, \`shop\`, \`title\`, \`wx_number\`, \`phone_number\`, \`is_out\`, \`create_time\`, \`info\`) VALUES (NULL, '${count}', '${name}', '${sex}', '${shop}', '${title}', '${wx_number}', '${phone_number}', '0', now(), '${info}')`)
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

router.post('/api/employee/modify', async function(req, res, next) {
  let { id, name, sex, shop, title, phone_number } = req.body
  let wx_number = req.body.wx_number || ''
  let info = req.body.info || ''
  name = name.replace(/\'/g, "\\'")
  wx_number = wx_number.replace(/\'/g, "\\'")
  info = info.replace(/\'/g, "\\'")
  if (name && sex && shop && title && phone_number) {
    try {
      console.log(`UPDATE \`employee_list\` SET name='${name}', sex='${sex}', shop='${shop}', title='${title}', phone_number='${phone_number}', wx_number='${wx_number}', info='${info}' WHERE employee_list.id = ${id}`)
      const rows = await query(`UPDATE \`employee_list\` SET name='${name}', sex='${sex}', shop='${shop}', title='${title}', phone_number='${phone_number}', wx_number='${wx_number}', info='${info}' WHERE employee_list.id = ${id}`)
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
