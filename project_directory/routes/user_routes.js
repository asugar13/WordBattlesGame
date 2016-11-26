var User = require('../models/user_model');

exports.LogIn = function(req, res) {
    console.log('Logging In');
    if (req.query.user && req.query.key) {
      req.session.user = req.query.user;

      var user = req.session.user;
      var key = req.query.key;

      User.find({username: user, password: key}, function(err, user) {
        //  if (err) throw err;
          console.log(user);
          if (user.length > 0) {
            if(user[0].isAdmin == true) {
              return res.send("isAdmin");
            }
            if (user[0] && !(user[0].isAdmin)) {
              return res.send('isUser');
            }
            else {
              return res.send('error');
            }
          }
          else
          {
            return res.send('invalidUser');
          }

      });
    }

};

exports.UserInfo = function(req, res) {

    //var score;
    var user = req.session.user;
    User.find({username: user}, function(err, user) {
        if (err) throw err;
        console.log(user);
        if (user[0]) {
          res.json({
            answer: "OK",
            username: user[0].username,
            score: user[0].score
          });
        }
    });

};

exports.DisplayDB = function(req, res) {

    User.find({}, function(err, all_users) {
        if (err) throw err;
        console.log(all_users);
        res.send(all_users);
    });
};

exports.UserLookup = function(req, res) {
  var user_name = req.body.user;
  User.find({username: user_name}, function(err, user){

  })
}

// Set the username to empty by clearing the session
exports.Logout = function(req, res) {
    console.log(req.session);
    req.session = null;
    console.log(req.session);
    return res.json({});
}

//Signs up new user to database
exports.SignUp = function(req, res) {
  var user_name = req.body.user;
  var key = req.body.password;
  console.log(user_name);
  console.log(key);


  if (user_name && key) {

    User.find({username: user_name}, function(err, user) {
        //if user is already stored in the mongoDB
        if (user.length > 0) {
            return res.send("usernameTaken");
          }
          else {
            var the_user = new User({username: user_name, password:key, score:0,
                    isAdmin: false});
            console.log(the_user);
            the_user.save();
            User.find({}, function(err,users){
              console.log(users);
            });
            res.send("signupSuccessful");
          }
        })



  }
}
