const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash'); 

const User = mongoose.model('User'); 


//---signup---
module.exports.register = (req, res, next) => {
    // console.log(" req.body.fullName::", req.body.fullName);
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, docData) => { 
        if (!err)
            res.send(docData);
        else {
            // console.log(err);
            if (err.code == 11000)
                res.status(422).send(['This email is already registered.']);
            else
                return next(err);
        }

    });
}


//---authentication---
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => { // all parameters values are passed from passportConfig.js by passport or calling arrow function inside passportConfig.js file 
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user success with jwt token
        else if (user) return res.status(200).json({ "JWTtoken": user.generateJwt() }); // calling generateJwt function for JWT token 
        // unknown user or wrong password
        else return res.status(404).json(info); // resposing in json format with status code 404
    })(req, res);
}


//---login---
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(403).json({ status: false, message: 'Recored not found with this User.' }); // 404
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) }); // using lodash _.pick() to get inly some field from user model not all
        }
    );
}