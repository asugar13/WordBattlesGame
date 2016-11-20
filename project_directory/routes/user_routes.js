var User = require('../models/user_model');


exports.LogIn = function(req, res) {
    console.log('Logging In');
    if (req.query.user && req.query.key) {
      var user = req.query.user;
      var key = req.query.key;

      User.find({username: user, password: key}, function(err, user) {
          if (err) throw err;
          console.log(user);
          if (user[0]) {
            res.send('OK');
          }
          // res.send(allUsers);
      });
    }

};
