var admin = {};


admin.init = function() {
  $("#displaydiv").empty();
  $("#AddUserForm").hide();
  console.log('this is working');
  $.get('/database', function(data){
    console.log(data[0].username);
    console.log('\n');
    for (var i=0; i < data.length; i++) {
      var nested_user = $("<tr></tr>");
      nested_user.append("<td>" + data[i].username + "</td>");
      nested_user.append("<td>" + data[i].password + "</td>");
      nested_user.append("<td>" + data[i].score + "</td>");
      nested_user.append("<td> <button> Edit</button> <button>Delete</button> </td>");

      $("table").append(nested_user);

    }
  });
}

admin.toggleAddForm = function() {

  if ($("#AddUserForm").is(":visible")) {
    $("#AddUserForm").hide();
  }
  else{
    $("#AddUserForm").show();
  }
};

admin.addUser = function() {

  let inputUsername = $('#inputEmail').val();
  let inputPassword = $('#inputPassword').val();


  $.post('/addUser', {user: inputUsername, password: inputPassword}, function(data){
    if(data == 'usernameTaken'){
      $("#responseField").html("<p id=signupError>Username Taken</p>");
    } else{
      window.location.href = "/admin";
    }
  });

};


$(document).ready(function() {
	admin.init();
});
