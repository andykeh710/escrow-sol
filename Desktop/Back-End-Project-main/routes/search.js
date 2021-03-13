var express = require('express');
var router = express.Router();
const Video = require('../models/video');
const db = require('mongodb');


router.get('/', async (req, res) => {
    // console.log('req', req.title);
let searchText = req.query.search;
// console.log('search text:', searchText);
    let video;
    try {
        video = await Video.findOne({ title: searchText }).lean().exec(); // "lean" to get only JSON data (not Mongoose objects), faster
        console.log('Found Video :', video);
        
        // res.status(200).json(video);
        res.render('search', { video: video, user: req.user });
    } catch(err) {
        res.status(404).json(err);
    }  
});
module.exports = router;