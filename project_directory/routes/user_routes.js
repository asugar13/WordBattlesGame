var User = require('../models/user_model');
//var Image = require('../models/img_model');


exports.LogIn = function(req, res) {
    console.log('Logging In');


    if (req.body.user && req.body.password) {
      req.session.user = req.body.user;

      var user = req.session.user;
      var key = req.body.password;

      User.find({username: user, password: key}, function(err, user) {
        //  if (err) throw err;
          console.log(user);
          if (user.length > 0) {
            if(user[0].isAdmin == true) {
              req.session.isAdmin = true; //added this line
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


exports.UpdateUser = function(req, res){
  // var object = JSON.parse(req.body);
  console.log('executing UpdateUser');
  var name = req.body.user_name;
  User.find({username: name}, function(err, user){
    if (err) throw err;
    user[0].password = req.body.user_key;
    user[0].score = req.body.user_rate;
    user[0].save(function(err){
      if (err) throw err;
    });
});
    var answer = {msg: "Successful Update"};
    var formatted_answer = JSON.stringify(answer);
    res.send(formatted_answer);
};

exports.UserInfo = function(req, res) {

    console.log("user session: ");
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

exports.DisplayTop20 = function(req, res) {

  var query = User.find({});

  query.select('username score');
  query.sort({'score': -1});
  query.limit(20);

  query.exec(function(err, top_users) {
        if (err) throw err;
        console.log(top_users);
        res.send(top_users);
  });

};

exports.UserLookup = function(req, res) {
	//console.log("route: " + req.query.user);
  var user_name = req.query.user;
  User.find({username: user_name}, function(err, user){
	if (user[0]) {
          res.json({
            answer: "OK",
            username: user[0].username,
            score: user[0].score
          });
        }
  });
}



// Set the username to empty by clearing the session
exports.Logout = function(req, res) {
    console.log(req.session);
    req.session = null;
    console.log(req.session);
    return res.json({});
}

exports.DeleteUser = function(req, res) {
  var result = res;
  var user = req.body.username;
  User.remove({username: user}, function(req, res){
    result.send("deleteSuccessful");
  });
}

exports.ResetDB = function(req, res) {
  var flag = false;
  User.remove({isAdmin: {$ne: true}}, function(err, the_users){
    if (err) throw err;
    res.send('Successful Reset');
  })
}

exports.uploadPic = function(req, res){
  console.log('hey');
  console.log(req.session.user);
  console.log(req.body);


}

//Signs up new user to database
exports.SignUp = function(req, res) {
  var user_name = req.body.user;
  var key = req.body.password;
  var user_score = parseInt(req.body.score);
  console.log(user_name);
  console.log(key);
  console.log(user_score);

  if(!user_score)
  {
    user_score = 0;
  }


  if (user_name && key) {

    User.find({username: user_name}, function(err, user) {
        //if user is already stored in the mongoDB
        if (user.length > 0) {
            return res.send("usernameTaken");
          }
          else {
            var the_user = new User({username: user_name, password:key, score: user_score,
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
