var express = require('express');
var router = express.Router();
const {handlebars} = require('hbs');
var router = express.Router();
const Video = require('../models/video');
const User = require('../models/user');

/* GET users listing. */
router.get('/:id', async function(req, res) {
  try{
    // if(err) throw (err);
  let id = req.params.id;
  let user = req.user._id.toString();
  let isCreator = false;
  console.log("the user id is", user);
  //.populate('users')
  Video.findOne({_id: id}).populate('users')
    .then((aVideo) => {
      if(user === aVideo.creator) {
        isCreator = true;
      }
      console.log("The single video results from the details get route is ", aVideo);
      //go get all the users held in mongodb
      let userIDs = aVideo.users.map(x => {return x._id.toString();});
      console.log("The user IDs are ", userIDs);
      //iterate thru users array and look for match
      let isEnrolled;
      for(let i = 0; i < userIDs.length; i++){
        console.log(user);
        console.log(userIDs[i]);
        if(user == userIDs[i]){
          console.log("there is a match fired");
          isEnrolled = true;
        }else{
          console.log("there is not a match fired");
          isEnrolled = false;
        }
      }
      //render based on isEnrolled flag
      if(isEnrolled == true){
        return res.render('course-details', { video: aVideo, user: req.user, isEnrolled: isEnrolled, isCreator: isCreator });
      }else{
        return res.render('course-details', { video: aVideo, user: req.user, isEnrolled: isEnrolled, isCreator: isCreator });
      }
    });
  }catch(error){
    if(error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
  }
  });

module.exports = router;