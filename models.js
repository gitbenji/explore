
module.exports = function(app){

  var Schema = app.mongoose.Schema;

  // declare user model in scope
  var userSchema = new Schema ({
    username: String,
    points: Array
  });

  var User = app.mongoose.model('User', userSchema);




  var models = {};
  models.User = User;

  return models;
}
