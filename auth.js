
module.exports = function(app) {

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
