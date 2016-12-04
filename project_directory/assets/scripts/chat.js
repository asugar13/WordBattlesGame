var socket = io();
$(document).ready(function() {
	$('#messageForm').submit(function(){
		console.log($('#userMsg').val());
		socket.emit('chatMessage', $('#userMsg').val());
		$('#userMsg').val('');
		return false;
	});

	socket.on('chatMessage', function(msg){
			$.get('/chatmsg',function(data){

					console.log(data);
				  $('#chatBox').append($('<li>').text(data.name + " (score: " + data.count + ") said:").css({ 'color': 'red'}));
					$('#chatBox').append($('<li>').text(msg));

			});
	  });
});
