var welcomePage = {};

welcomePage.submitHandler = function(evt) {
		evt.preventDefault();
		var formData = $('form').serialize();
		console.log(formData); //prints nothing so I decided to take username and password manually from respective divs
		var username = $('#inputEmail').val();
		console.log(username);
		var password = $('#inputPassword').val();
		console.log(password);
		$.get('/login', {user: username, key: password}, function(data){
			var answer = data;
			console.log(answer);
			if (answer == "OK") {
				$.get('/main', function(data){
					window.location.href = "/main";
					console.log("that's it");

				});
			}
});
}

welcomePage.init = function() {

	$('#LogInForm').submit(this.submitHandler);

}


// Start the app.
$(document).ready(function() {
	welcomePage.init();
});
