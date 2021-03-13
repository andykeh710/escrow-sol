var express = require('express');
const passport = require('passport');
var User = require('../models/user');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('login', { title: 'Login Page', user: req.user });
});

router.post('/', passport.authenticate('local', {failureRedirect: '/login' }), function(req, res) {
    console.log('User is logged in', req.body);
    res.redirect('/home');
});

module.exports = router;