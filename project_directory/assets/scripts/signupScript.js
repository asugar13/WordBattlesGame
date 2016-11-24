var signupPage = {};

signupPage.submitHandler = function(evt) {
  // var username = $('#inputEmail').val();
  // console.log(username);
  // var password = $('#inputPassword').val();
  // console.log(password);
  evt.preventDefault();
  let formdata = $('#SignupForm').serialize();
  console.log(formdata);
  // var toSend = JSON.stringify(formdata);

  $.ajax({
  type: "POST",
  url: "/signup",
  data: formdata,
  // success: function() {$("#responseField").innerHTML = "Succesful signup!"},
  });
};


signupPage.init = function() {

	$('#SignupForm').submit(this.submitHandler);

}


// Start the app.
$(document).ready(function() {

	signupPage.init();

});
