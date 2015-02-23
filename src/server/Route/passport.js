
var passport = require('passport');
var user = require('./user.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports=passport;
	///connextion
	// Serialized and deserialized methods when got from session
	passport.serializeUser(function(user, done) {
	    done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	    done(null, user);
	});
	
	passport.use('local-login', new LocalStrategy({
	    usernameField : 'username',
	    passwordField : 'password',
	    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
	    },
	    function(req, username, password, done) {
	        if (username)
	            username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

	        // asynchronous
	        process.nextTick(function() {
	            user.users.findOne({ 'login' :  username }, function(err, user) {
	                // if there are any errors, return the error
	                if (err){console.log('erreur db');
	                    return done(err);}

	                // if no user is found, return the message
	                if (!user){console.log('no user found');
	                    return done(null, false,  { message: 'no user found.' });}

	                if (!user.validPassword(password)){console.log('wrong password');
	                    return done(null, false,  { message: 'Oops!! wrong password.' });}

	                // all is well, return user
	                else{ console.log('va benne');
	                    return done(null, user);}
	            });
	        });

	}));




	var auth = function(req, res, next){
	  if (!req.isAuthenticated()) 
	    res.send(401);
	  else
	    next();
	};