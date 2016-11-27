
$(document).ready(function() {
	$.get('/user_info', function(data){
		var answer = data.answer;
		if (answer == "OK") {
			let parent = $('#info');
		    let p = $('<p>').text("Username: " + data.username);
		    p.attr('id', 'username');
		    parent.append(p);

		    p = $('<p>').text("Score: " + data.score);
		    p.attr('id', 'score');
		    parent.append(p);
		}
	});
	
});
