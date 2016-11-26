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

  $.post('/signup', formdata, function(data){
    if(data == 'usernameTaken'){
        //alert("Username Taken");
        $("#responseField").html("<p id=signupError>Username Taken</p>");
    } else{
      //alert("Signup Successful");
      $("#responseField").html("<p id=signupSuccess>Successful Signup</p>");
      setTimeout(function(){
        $.get('/main', function(data){
          window.location.href = "/main";
        })
      }, 500);
    }
  });
};


signupPage.init = function() {
	$('#SignupForm').submit(this.submitHandler);

}


// Start the app.
$(document).ready(function() {

	signupPage.init();

});
