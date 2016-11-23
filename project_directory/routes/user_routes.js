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

// Set the username to empty by clearing the session
exports.Logout = function(req, res) {
    console.log(req.session);
    req.session = null;
    console.log(req.session);
    return res.json({});
}
