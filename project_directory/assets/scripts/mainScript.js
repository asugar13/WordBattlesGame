var profilePage = {};
var userList = [];

profilePage.updateOnlineUsers = function(userList){
	$("table#online").find("tr:gt(0)").remove();
	for (var i in userList) {
		var onlineUser = $("<tr></tr>");
		onlineUser.append("<td id=Username>" + userList[i] + "</td>");
		onlineUser.append("<td><button>Profile</button></td>");
		onlineUser.append("<td><form action=/chat><button type='submit' class='chatbut'>Chat</button></form></td>");
		$("table#online").append(onlineUser);
	}
}

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
      $("table#leaderboard").append(nested_user);

    }
  });

	var socket = io();
	socket.on('update', function(connectedUsers){
		userList = connectedUsers;
		console.log(userList);
		profilePage.updateOnlineUsers(userList);
	});
}

// Start the app.
$(document).ready(function() {
	profilePage.init();
});
