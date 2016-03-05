
module.exports = function(app){
  
  var Schema = app.mongoose.Schema;

  // declare user model in scope
  var userSchema = new Schema ({
    id: String,
    name: {
      givenName: String,
      familyName: String
    }
  });

  var User = app.mongoose.model('User', userSchema);




  var models = {};
  models.User = User;

  return models;
}
