
module.exports = function(app) {

  // called by server.js to create/login user
  var auth = {

    // go through db to find/upsert user
    upsertUser: function(req, res) {
      var userObject = new Object();
      userObject.username = req.body.username;

      saveUser(userObject);

      // response with success/fail of user authentication
      // res.send('upsertUser');
    }

  };

  function saveUser(userObject) {
    var user = new app.models.User ({
      username: userObject.username
    });

    app.models.User.findOne({ username: user.username }, function(err, doc) {
      if (err)
        return console.log(err);
      if (doc)
        return console.log('exists';
      user.save(function(err, doc) {
        if (err)
          console.log(err);
        console.log('saved');
      });
    });
  }

  return auth;
};
