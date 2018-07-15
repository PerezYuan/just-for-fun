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


router.post('/api/banner/modify', async function(req, res, next) {
  let { id, url, link } = req.body
  link = link.replace(/\'/g, "\\'")
  if (id && url) {
    try {
      const rows = await query(`UPDATE \`banner_img\` SET url='${url}', set_url='${link}' WHERE banner_img.id = ${id}`)
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
