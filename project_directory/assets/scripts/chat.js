var socket = io();
$(document).ready(function() {
	$('#messageForm').submit(function(){
		var msg = $('#userMsg').val();
		console.log(msg);
		$.post('/chatmsg', function(data){
			if(data == "pointAdded"){
				$.get('user_info', function(data){
					socket.emit('chatMessage', {username:data.username, msg:msg, score:data.score});
				});
			}
		});
		$('#userMsg').val('');
		return false;
	});

	socket.on('chatMessage', function(msg_data){
	  $('#chatBox').append($('<li>').text(msg_data.username + " (score: " + msg_data.score + ") said:").css({ 'color': 'red'}));
		$('#chatBox').append($('<li>').text(msg_data.msg));
	});
});
