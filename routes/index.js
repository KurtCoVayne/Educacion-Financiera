var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/val')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/problematica', (req, res ) =>{
  res.render('problematica');
});
router.get('/solucion', (req, res) => {
  res.render('solucion');
});
router.get('/ejemplos', (req, res) => {
  res.render('solucion');
});
router.get('/conceptos', (req, res) => {
  res.render('solucion');
});
router.get('/simulador',isAuthenticated ,(req, res) =>{
  res.render('simulador_form')
})

module.exports = router;
