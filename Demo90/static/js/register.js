function showPassword1() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showPassword2() {
  var x = document.getElementById("re-enterPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function checkPwMatch() {
  var pw1 = document.getElementById("password");
  var pw2 = document.getElementById("re-enterPassword");
  var subBtn = document.getElementById("submit-btn");
  if (pw1.value === pw2.value) {
    // return message saying passwords match
    //subBtn.disabled = true;
    return true;
  } else {
    // return message saying don't passwords match
    //subBtn.disabled = false;
    return false;
  }
}

function verifyPswd() {
  var pw1 = document.getElementById("password");
  var pw2 = document.getElementById("re-enterPassword");
  //console.log(pw1.value);
  //console.log(pw2.value);
  if (pw1.value === pw2.value) {
    // return message saying passwords match
    console.log("passwords match!")
    //console.log(pw1.value === pw2.value)
    return true;
  } else {
    // return message saying don't passwords match
    console.log("passwords do not match!")
    return false;
  }
}

function registerUpload(first, last, email, password){

/*  - what if I listen for an event to occur (such as the success message popping up) before actually sending this?
        - if success message (green), then send; if error message (red), then don't send
    - Seems like the easiest way to do this is going to be to add some more client side validation to ensure the form 
      doesn't actually submit until the user has properly put in all the information
        - what about if the client side fails to check properly? Or what if the client side check passes and the 
	  server side check fails?
        - if being sent only after the client side is validated, might be trying to post new information even though 
	  the server checks failed which then makes it invalid information
    - I could try to see what happens when I try to get a user account from the AWS server using the email (which 
      should be unique)
        - if it exists, I don't submit it; if it doesn't exist, I am free to try to submit it 
          (assuming all other validations pass; might need to add more client side validation for this) 

    - Ok, let's just start off with some client-side checking to prevent the form from being sent at all if the inputs are invalid 
	- once this is successful, we will improve from there */

  //Login and get Token
  //EX: curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"some@email.com","password":"abc"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/login'

  // curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"your@email.com","password":"abc"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/register'
  const postRegisterUrl = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/register';
  /*var body = {
    user_email:email,
    password: password
  }*/
  var body ='{"first_name":"'+first+'", "last_name":"'+last+'", "user_email":"'+email+'","password":"'+password+'"}';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", postRegisterUrl, true);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.onreadystatechange = function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
      var token = this.response;
      console.log('Register Response: '+ token);
      //getUploadURL(token, file, desc);
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status != 200){
      var r = this.response;
      var msg = 'Register error, please try again!'+ r;
      console.log(msg);
      alert(msg);
    }
  }
  xhr.send(body);
}

function testSubmit() {
  x = document.querySelector("div.success-msgs")
  y = document.querySelector("div.warning-msgs")
  x.addEventListener("load", successMsg())
  y.addEventListener("load", errorMsg())
}

function successMsg() {
  console.log("Successfully Submitted!")
  // then remove Event listener from both success and error messages
}

function errorMsg() {
  console.log("Form could not be submitted")
  // then remove Event listener from both success and error messages
}

