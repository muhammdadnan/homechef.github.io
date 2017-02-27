var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(
    new LocalStrategy(
      {
        usernameField: 'mobileNo',
        passwordField: 'userpassword',
      },
      function(mobileNo, userpassword, done) {

        console.log( mobileNo , userpassword  );

        User.findOne({ mobile: mobileNo }, function (err, user) {
           console.log("User.findOne: " , err );
          if (err) { 
            console.log(" err " , err );
            return done(err); 
          }
          if (!user) {
            console.log(" !user:  " , user );
            return done(null, false, { message: 'The mobile number or password you entered is incorrect. Please try again (check caps lock).' });
          }
          if (!user.validPassword(userpassword)) {
            console.log("  user.validPassword :  " , userpassword );
            return done(null, false, { message: 'The mobile number or password you entered is incorrect. Please try again (check caps lock).' });
          }
          
          return done(null, user);

        });
    }
));