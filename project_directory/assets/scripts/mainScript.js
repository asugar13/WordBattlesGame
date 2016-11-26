var profilePage = {};

profilePage.submitHandler = function(evt) {
	evt.preventDefault();
	window.location.href = "/profile";
}

profilePage.init = function() {
	$('#profile').submit(this.submitHandler);

	$.get('/top20', function(data){
    console.log(data[0].username);
    console.log('\n');
    for (var i=0; i < data.length; i++) {
      var nested_user = $("<tr></tr>");
      nested_user.append("<td>" + data[i].username + "</td>");
      nested_user.append("<td>" + data[i].score + "</td>");
      $("table").append(nested_user);

    }
  });
}


// Start the app.
$(document).ready(function() {
	profilePage.init();
});
