var profilePage = {};

profilePage.submitHandler = function(evt) {
	evt.preventDefault();
	window.location.href = "/profile";
}

profilePage.init = function() {
	$('#profile').submit(this.submitHandler);
}


// Start the app.
$(document).ready(function() {
	profilePage.init();
});
