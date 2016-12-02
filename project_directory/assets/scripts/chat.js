var socket = io();
$(document).ready(function() {
	$('#messageForm').submit(function(){
		console.log($('#userMsg').val());
		socket.emit('chatMessage', $('#userMsg').val());
		$('#userMsg').val('');
		return false;
	});

	socket.on('chatMessage', function(msg){
	    $('#chatBox').append($('<li>').text(msg));
	  });
});
