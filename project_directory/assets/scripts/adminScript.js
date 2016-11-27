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
  console.log('executing admin.init() function');
  $.get('/database', function(data){
    console.log(data[0].username);
    console.log('\n');
    for (var i=0; i < data.length; i++) {
      var nested_user = $("<tr></tr>");
      nested_user.append("<td id=Username>" + data[i].username + "</td>");
      nested_user.append("<td>" + data[i].password + "</td>");
      nested_user.append("<td>" + data[i].score + "</td>");
      nested_user.append("<td> <button onclick='admin.editHandler(this)'> Edit</button> <button class='deleteUser'>Delete</button> </td>");

      $("table").append(nested_user);
    }
    deleteButtonOnClick();
  });
}

admin.editHandler = function(evt){
  $('#focusdiv').toggle(true);
  $("input[name='password']").toggle(true);
  $('input[name="score"]').toggle(true);
  $('span[name="user_id"]').empty();
  $('div[name="password"]').empty();
  $("div[name=score]").empty();
  console.log('executing editHandler');
  var row = $(evt.parentNode.parentNode).children();
  $('span[name="user_id"]').append(row[0].innerHTML);
  $("input[name=password]").val(row[1].innerHTML);
  $("input[name=score]").val(row[2].innerHTML);
}

admin.updateHandler = function(evt){
  console.log('executing updateHandler');
    focusdata = $(evt.parentNode).children();
    var user_id = focusdata[0].innerHTML;
    var user_password = $("input[name=password]").val();
    var user_score = $("input[name=score]").val();
    console.log(user_id);
    console.log(user_password);
    console.log(user_score);
    var toSend = {user_name: user_id, user_key: user_password,
                  user_rate: user_score};
    var toSend_formatted = JSON.stringify(toSend);
    // console.log(toSend_formatted);
    $.ajax({
        url: "/database",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: toSend_formatted,
        success: function(response) {
          console.log(response);
          if (response.msg == "Successful Update"){
            window.location.reload();
          }
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
