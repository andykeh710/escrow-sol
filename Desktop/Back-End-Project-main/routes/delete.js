var express = require('express');
var router = express.Router();
const {handlebars} = require('hbs');
const Video = require("../models/video");

router.post('/:id', async (req, res) => {    
    let video;
    let id = req.params.id;
     try {
        video = await Video.findById(id);        
        await video.remove();
        // console.log('user delete', req.body);
        res.redirect('/home');
    }catch(err) {
        if(err) throw err;
            if (video == null) {
                res.redirect('/home');
            }else {
                res.redirect(`/course-details/${video._id}`);
            }       
    }     
});

module.exports = router;