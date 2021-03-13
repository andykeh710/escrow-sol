var express = require('express');
var router = express.Router();
const Video = require('../models/video');

/* GET logged in home page. */
router.get('/', function(req, res, next) {
  Video.find()
  .sort('-createdAt')
  .then((results) => {
    // console.log('user has made it to the /home page');
    res.render('home', { title:"Welcome to your home page", video: results, user: req.user });
  });
});



module.exports = router;