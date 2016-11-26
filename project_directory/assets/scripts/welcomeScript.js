var welcomePage = {};

welcomePage.submitHandler = function(evt) {
		evt.preventDefault();
		var formData = $('#LogInForm').serialize();
		console.log(formData);
	
		$.post('/login', formData, function(data){
			var answer = data;
			console.log(answer);
			if (answer == "isUser") {
				$.get('/main', function(data){
					window.location.href = "/main";
					console.log("that's it");
				});
			}
			if (answer == "isAdmin") {

				$.get('/admin', function(data){
					window.location.href = "/admin"
					console.log("that's it");
				});
			}
			if (answer == "invalidUser") {
				if(!$(".form-signin-heading p").length) {
					$(".form-signin-heading").append("<p style='color:red'>Invalid user login. Please try again. </p>");
				}
				
			}
		});
}



welcomePage.init = function() {

	$('#LogInForm').submit(this.submitHandler);

	$("#signUpbut").click(function(evt) {
		$.get('/signup', function(data){
			window.location.href = "/signup";
		});
	});

}


// Start the app.
$(document).ready(function() {

	welcomePage.init();

});
