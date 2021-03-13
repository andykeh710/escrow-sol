var express = require('express');
var router = express.Router();
const Video = require('../models/video');
const User = require('../models/user');
//THIS IS FOR ADDING A VIDEO TO A SPECIFIC USER (WHEN THEY CLICK ENROLL BUTTON ON VIDEO DETAILS PAGE)
let videoID;
let videoTitle;
//runs the enroll get request to display the video to be enrolled in...
router.get('/:id', function(req, res, next) {
  videoID = req.params.id;
  console.log('The enroll fired');
  Video.findOne({_id: videoID})
    .then((results) => {
      console.log("enroll request is ", results);
      videoTitle = results.title;
      console.log(videoTitle);
      // console.log("the users results from the details get route is ", results.users);
      res.render('enroll', {video: results, user: req.user});
    });
});
router.post('/:id', function(req, res, next) {
  let videoID = req.params.id;
  console.log('The enroll POST request fired', videoID);
  let person = req.user.username;
  let personID = req.user._id;
  console.log('person id', personID);
  // update the VIDEO to associate the user
  Video.findOneAndUpdate(
    {_id: videoID},
    //this pushes the username into the array held in the VIDEO model
    { $push: {"users": personID}},
    //upsert true means if it doesn't exist create it (false is the default value)
    { upsert: true }, 
    function(err) {if (err) console.log(err);}
);
  //update the USER to add the enrolled video "course"
  User.findOneAndUpdate(
      {_id: personID}, 
      { $push: {"courses": videoID}},
      { upsert: true }, 
      function(err) {if (err) console.log(err);
  });
res.redirect("/home");
});

module.exports = router;