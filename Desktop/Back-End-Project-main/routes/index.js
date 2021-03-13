var express = require('express');
var router = express.Router();
const {handlebars} = require('hbs');
var router = express.Router();
const Videos = require('../models/video');
const Users = require('../models/user');
/* GET home page. */
router.get('/', function(req, res) {
    Videos.find()
    .sort('-users')
    .then((video) => {         
      var only3;
      let arr = [];
      
      for(let i = 0; i <= 2; i++) {
        only3 = video[i];
        arr.push(only3);
      } 
      // console.log('the vids', arr);
      res.render('guest-home', { video: arr, user: req.user });      
    });
  });

router.get('/logout', function(req, res, next) {
  console.log('user is logging out');
  req.logOut();
  res.redirect('/');
});
module.exports = router;