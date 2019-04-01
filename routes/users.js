var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/ingresar', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/registro', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
