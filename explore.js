
module.exports = function(app) {

  // called to create an exploration route avoiding common routes for specified time
  var explore = {

    // called to handle request for new loop --- call geo.js
    createLoop: function(req, res) {

      // response with loop route starting and ending at current location
      res.send('createLoop');
    }
    
  };

  return explore;
};
