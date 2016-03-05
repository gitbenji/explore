
module.exports = function(app) {

  // used to serialize the user for the session
  app.passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  app.passport.deserializeUser(function(id, done) {
      app.models.User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  console.log('hello there');
  app.passport.use( new app.TwitterStrategy({
    consumerKey: 	'ccCF54E2el0tHEoivtptESrH4',
    consumerSecret: 'lgHOTEKDsz1HM49qJgryMesr5MM9iBY0OOIy3M9X5wUdC6GDDo',
    callbackURL: "http://d5c866b1.ngrok.io/auth/twitter/callback"
  },

  function(token, tokenSecret, profile, cb) {
    console.log('twitter callback!?');
    process.nextTick(function() {
      app.models.User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user, create them
                var newUser                 = new User();

                // set all of the user data that we need
                newUser.twitter.id          = profile.id;
                newUser.twitter.token       = token;
                newUser.twitter.username    = profile.username;
                newUser.twitter.displayName = profile.displayName;

                // save our user into the database
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });


    });
  }));



  // called by server.js to create/login user
  var auth = {

    // go through db to find/upsert user
    upsertUser: function(req, res) {


      // response with success/fail of user authentication
      res.send('upsertUser');
    }

  };

  return auth;
};
