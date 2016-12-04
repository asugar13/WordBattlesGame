var models = require('../models/user_model');

exports.connectedUsers = [];

exports.LogIn = function(req, res) {
    console.log('Logging In');
    if (req.body.user && req.body.password) {
      req.session.user = req.body.user;

      var user = req.session.user;
      var key = req.body.password;

      models.User.find({username: user, password: key}, function(err, user) {
        //  if (err) throw err;
          console.log(user);
          if (user.length > 0) {
            if(user[0].isAdmin == true) {
              req.session.isAdmin = true; //added this line
              return res.send("isAdmin");
            }
            if (user[0] && !(user[0].isAdmin)) {
              if(exports.connectedUsers.indexOf(user[0].username) == -1){
                exports.connectedUsers.push(user[0].username);
              }
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

exports.msgHandler = function(req, res) {
  console.log(req.session.user);
  var the_score;
  models.User.find({username: req.session.user}, function(err, user){
    if (err) throw err;
    user[0].score = user[0].score + 1;
    the_score = user[0].score;
    user[0].save(function(err){
      if (err) throw err;
    });
    var toSend = {name: req.session.user, count: the_score};
    res.send(toSend);
});



}


exports.UpdateUser = function(req, res){
  // var object = JSON.parse(req.body);
  console.log('executing UpdateUser');
  var name = req.body.user_name;
  models.User.find({username: name}, function(err, user){
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

    // console.log("user session: ");
    var user = req.session.user;
    models.User.find({username: user}, function(err, user) {
        if (err) throw err;
        // console.log(user);
        if (user[0]) {
          return res.json({
            answer: "OK",
            username: user[0].username,
            score: user[0].score
          });
        }
    });

};

exports.DisplayDB = function(req, res) {
    models.User.find({}, function(err, all_users) {
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
  models.User.find({username: user_name}, function(err, user){
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
    exports.connectedUsers.splice(exports.connectedUsers.indexOf(req.session.user), 1);
    req.session = null;
    console.log(req.session);
    return res.json({});
}

exports.DeleteUser = function(req, res) {
  var result = res;
  var user = req.body.username;
  models.User.remove({username: user}, function(req, res){
    result.send("deleteSuccessful");
  });
}

exports.ResetDB = function(req, res) {
  var flag = false;
  models.User.remove({isAdmin: {$ne: true}}, function(err, the_users){
    if (err) throw err;
    res.send('Successful Reset');
  })
}

exports.uploadPic = function(req, res){
  console.log('hey');
  // console.log(req.session.user);
  // console.log(req.body);
  var user_name = req.session.user;
//  console.log(user_name);
  // console.log(imagedata);


  models.Image.find({username: user_name}, function(err, image) {
      //if user is already stored in the mongoDB
      if (err) throw err;
      var imagedata = req.body.imageURL;
      console.log(typeof imagedata);
      console.log(imagedata);

      console.log("models.image executing");
      if (image.length > 0) {
        image[0].remove(function(err, data) {
          if (err) throw err;
          console.log("Successful Deletion")
// data will equal the number of docs removed, not the document itself
});
          var the_image = new Image({username: user_name, imageurl: imagedata});
          console.log(the_image);
          the_image.save();
          console.log("and more executing");
          return res.send("goodstuff");
        }
      else {
          console.log("till here");
          var the_image = new Image({username: user_name, imageurl: imagedata});
          console.log(the_image);
          the_image.save();
          console.log("and more executing");
          return res.send("goodstuff");
        }
      });
}

exports.getPic = function(req, res) {
  console.log("getPic executing");
  console.log(req.session.user);
  models.Image.find({username: req.session.user}, function(err,image){
    if (image.length > 0){
      var imagefile = image[0].imageurl;
      return res.send(imagefile);
    }
    else {
      return res.send("No Pic");
    }
  })
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

    models.User.find({username: user_name}, function(err, user) {
        //if user is already stored in the mongoDB
        if (user.length > 0) {
            return res.send("usernameTaken");
          }
          else {
            var the_user = new User({username: user_name, password:key, score: user_score,
                    isAdmin: false});
            console.log(the_user);
            the_user.save();
            models.User.find({}, function(err,users){
              console.log(users);
            });
            res.send("signupSuccessful");
          }
        })
  }
}
