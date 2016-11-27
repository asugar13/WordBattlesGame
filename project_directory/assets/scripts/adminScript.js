var admin = {};


admin.init = function() {
  // $("#displaydiv").empty();
  console.log('executing admin_page init function');
  $.get('/database', function(data){
    for (var i=0; i < data.length; i++) {
      var nested_user = $("<tr></tr>");
      nested_user.append("<td>" + data[i].username + "</td>");
      nested_user.append("<td>" + data[i].password + "</td>");
      nested_user.append("<td>" + data[i].score + "</td>");
      nested_user.append("<td> <button onClick='editHandler(this)'> Edit</button> <button>Delete</button> </td>");
      $("table").append(nested_user);

    }
  });

}

editHandler = function(evt){
  $('#focusdiv').toggle(true);
  $("input[name=password]").toggle(true);
  $("input[name=score]").toggle(true);
  $('span[name="user_id"]').empty();
  $("div[name=password]").empty();
  $("div[name=score]").empty();
  console.log('executing editHandler');
  var row = $(evt.parentNode.parentNode).children();
  $('span[name="user_id"]').append(row[0].innerHTML);
  $("input[name=password]").val(row[1].innerHTML);
  $("input[name=score]").val(row[2].innerHTML);
}

updateHandler = function(evt){
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



$(document).ready(function() {
	admin.init();
});
