var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Video = require("../models/video");
const {handlebars} = require('hbs');
const { body, validationResult } = require('express-validator');
/*get the create cube page*/
router.get('/', function(req, res, next) {
    res.render('create-course', { title: 'Create Course', user: req.user });
});
//process the create cube form
router.post('/', [
    body('title')
        .trim()
        .isLength({min: 4})
        .withMessage('Title Must Be At Least 4 Characters Long'),
    body('description')
        .trim()
        .isLength({min: 20})
        .withMessage('Description Must Be At Least 20 Characters'),
    body('imageUrl')
        .trim()
        .isURL({ protocols: ['http', 'https'], require_protocol: true})
        .withMessage('URL Must Start With HTTP or HTTPS'),
], async (req, res, next) => {
    try {
        var displayErr;
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                displayErr = error.msg;
                // console.log(displayErr);       
            });
            res.render('create-course', {errors: errors.array()});
            return;
        }
        console.log('create video form fired');
        // console.log(req.body);
        let data = req.body;
        let status = data.isPublic; //status = is video public or not via checkbox
        // console.log(status);
        if(status == "on"){
            let video = new Video({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                creator: req.user._id,
                isPublic: true,
                createdAt: new Date()
            });
            video.save()
            .then((response) => {
                console.log(response);
                res.redirect('/home');
            });
        }else{
            let video = new Video({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                creator: req.user._id,
                isPublic: false,
                createdAt: new Date()
            });
            video.save()
            .then((response) => {
                console.log(response);
                res.redirect('/home');
            });
        }
    }catch(err) {
        console.log(err);
    }});
module.exports = router;