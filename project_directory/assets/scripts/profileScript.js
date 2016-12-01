var profilePage = {};
//http://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
profilePage.previewFile = function (){
		var preview = document.querySelector('img'); //selects the query named img
		var file    = document.querySelector('input[type=file]').files[0]; //sames as here
		var reader  = new FileReader();

		reader.onloadend = function () {
				preview.src = reader.result;
				console.log(preview.src)
				var toSend = {imageURL: preview.src}
				var formatted = JSON.stringify(toSend)
				$.ajax({
						url: "/profile",
						type: "POST",
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						data: formatted,
						success: function(response) {
							console.log(response);
						}
				});

		}

		if (file) {
				reader.readAsDataURL(file); //reads the data as a URL
		} else {
				preview.src = "";
		}
}

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
