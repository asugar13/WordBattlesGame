var admin = {};

function deleteButtonOnClick(){
  $(".deleteUser").click(function(){
   var button = this;
   var user = $(button).parents("tr:first").children("td#Username").html();
   $.ajax({
     url: '/admin',
     type: 'DELETE',
     data: {username: user},
     success: function(result) {
       var placeholder = $(button).parents("tr:first");
       console.log(placeholder);
       $(button).parents("tr:first").remove();
     }
   });
 });
}

admin.init = function() {
  $("#displaydiv").empty();
  $("#AddUserForm").hide();
  console.log('this is working');
  $.get('/database', function(data){
    console.log(data[0].username);
    console.log('\n');
    for (var i=0; i < data.length; i++) {
      var nested_user = $("<tr></tr>");
      nested_user.append("<td id=Username>" + data[i].username + "</td>");
      nested_user.append("<td>" + data[i].password + "</td>");
      nested_user.append("<td>" + data[i].score + "</td>");
      nested_user.append("<td> <button> Edit</button> <button class=deleteUser>Delete</button> </td>");

      $("table").append(nested_user);
    }
    deleteButtonOnClick();
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
