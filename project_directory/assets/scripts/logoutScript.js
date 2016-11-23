var logout = {};

logout.submitHandler = function(evt) {
	evt.preventDefault();
	$.get('/logout', function(data){
		window.location.href = "/";
	});
	
}

logout.init = function() {
	$('#logout').submit(this.submitHandler);
}


// Start the app.
$(document).ready(function() {
	logout.init();
});
