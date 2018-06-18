var express = require('express');
var router = express.Router();

/* 登录. */
router.post('/api/login', function(req, res, next) {
  const { password, userName, type } = req.body;
  let data = {}
  if (password === '888888' && userName === 'admin') {
    req.session.regenerate(function(err) {
      if (err) {
        data = {
          status: 'error',
          type,
          currentAuthority: 'guest',
        }
      } else {
        data = {
          status: 'ok',
          type,
          currentAuthority: 'admin',
        }
        req.session.loginUser = userName;
      }
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      res.josn(data);
    });
  } else if (password === '123456' && userName === 'user') {
    req.session.regenerate(function(err) {
      if (err) {
        data = {
          status: 'error',
          type,
          currentAuthority: 'guest',
        }
      } else {
        data = {
          status: 'ok',
          type,
          currentAuthority: 'user',
        }
        req.session.loginUser = userName;
      }
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      res.json(data);
    });
  } else {
    data = {
      status: 'error',
      type,
      currentAuthority: 'guest',
    }
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.json(data);
  }
});

/* 退出登录. */
router.post('/api/logout', function(req, res, next) {
  req.session.destroy(function (err) {
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    if (err) {
      res.json({
        status: 'error',
        currentAuthority: 'guest'
      });
      return;
    }

    // req.session.loginUser = null;
    res.clearCookie(identityKey);
    res.json({
      status: 'error',
      currentAuthority: 'guest'
    });
  });
});

module.exports = router;
