var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res) {
    res.render('register', { title: 'Please Register', user: req.user });
});

router.post('/',[
    body('username')
        .trim()
        .isAlphanumeric()
        .withMessage('Username must contain only alphanumberic characters')
        .isLength({min: 5})
        .withMessage('Username Must Be At Least 5 Characters Long'),
    body('password')
        .trim()
        .isAlphanumeric()
        .withMessage('Password must contain only alphanumberic characters')
        .isLength({min: 8})
        .withMessage('Password Must Be At Least 8 Characters Long'),
    body('repeatPassword')
        .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('The Passwords do not match');
        }
        return true;
    })
], async (req, res, next) => {
   console.log('the req is', req.cookies);
    try {
        var displayErr;
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                displayErr = error.msg;
                // console.log(displayErr);                
            });
            res.render('register', { errors: errors.array() });
            return;
        } 
        let newUser = new User({ username: req.body.username, password: req.body.password});
        let validateErrs = newUser.validateSync();  
        if(validateErrs == undefined && req.body.password === req.body.repeatPassword){
            User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                res.render('register', {title: 'Please Register', err: err});
            } else {
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function(err) {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        // console.log('the User is', user);
                        res.redirect('/home');
                    });
                });
            }        
        });        
    } 
    }catch(err) {
        console.log(err);
    }
});

module.exports = router;