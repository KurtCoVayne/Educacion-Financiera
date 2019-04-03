const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');
const passport = require('passport')

/* GET users listing. */
router.get('/!ingresar', function(req, res, next) {
  res.render('users/ingresar');

});
router.get('/ingresar', (req, res)=> {
  res.render('users/ingresar');
  req.flash('error_msg');
});
router.post('/ingresar', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/ingresar',
  failureFlash: true
}));
router.get('/registro', function(req, res, next) {
  res.render('users/registrar');
});
router.get('/logout', (req, res) =>{
  req.logOut()
  res.redirect('/')
});
router.post('/registro', userCtrl.signup);

module.exports = router;
