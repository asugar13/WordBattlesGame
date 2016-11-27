var chatPage = {};

chatPage.submitHandler = function(evt) {
	evt.preventDefault();
	window.location.href = "/chat";
}

chatPage.init = function() {
	$('#chatbut').submit(this.submitHandler);
}

$(document).ready(function() {
	chatPage.init();
});
