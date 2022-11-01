const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => { // for authnticatioon form passport this function will be called
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'This email is not registered.' });
                    // wrong password
                    else if (!user.verifyPassword(password)) // calling verifyPassword function from user schema for password matching
                        return done(null, false, { message: 'Password is wrong.' });
                    // authentication succeeded
                    else
                        return done(null, user); // retruning user record if all succeeded 
                });
        })
);