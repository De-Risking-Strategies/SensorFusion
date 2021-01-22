/* Check length of first name; ensure it is not blank */
/* Check length of email; ensure it is not blank; ensure it is in the right format */
function validateInputs() {
  // if validations pass, send the request to AWS
  var first = document.getElementById("firstName").value;
  var email = document.getElementById("email").value;
  var subBtn = document.getElementById("submit-btn");
  var alerts = "";

  //print("first name: " + firstName);
  console.log("validate function: no first name available")
  if (first === "") {
    // subBtn.disabled = false;   // can't do this on submit; must be attached to specific input
    //alert("Please enter first name");  // triggers the 'print' window to pop up for some reason
    console.log("Please enter first name");
    alerts += "Please enter first name\n";
    //return false;
  }
  else {
  //else if (first.length < 4 || first.length > 128) {
    // else if name does have something in it, make sure it's not too long and not too short; make 
	  // these separate if statements later

    //subBtn.disabled = false;
    //alert("First name is either too long or too short. Must be between 4 and 128 characters");
    //alerts += "First name is either too long or too short. Must be between 4 and 128 characters\n";

    if (first.length < 4) {
      console.log("First name is too short");
      alerts += "First name is too short\n";
    }
    if (first.length > 128) {
      console.log("Last name is too long");
      alerts += "Last name is too long\n";
    }

  }
  if (email == "") {
    // we should never get here between of the built in check for email inputs

    //subBtn.disabled = false;
    //alert("Please enter an email address");
    console.log("Please enter an email address");
    alerts += "Please enter an email address\n";
  }
  else {
//    let re = /.+@.+\.com /;
//    if (!re.exec(email)) {
//      alerts += "Please use a valid email\n";
//    }
    if (email.length < 8) {
      console.log("Email is too short");
      alerts += "Email is too short\n";
    }
    if (email.length > 255) {
      console.log("Email is too long");
      alerts += "Email is too long\n";
    }
  }
  //  // this should be switched with the one inside of it; check proper format first, then length
//  if (email.length < 8 || email.length > 255) {
//    subBtn.disabled = false;
//    alert("Email is either too long or too short. Must be between 4 and 128 characters");
//  }
//  else {
//    let re = /.+@.+\.com /;
//
//    // if email doesn't match the required format, send an alert
//    if (!re.exec(email)) {
//      
//      subBtn.disabled = false;
//      alert("Please use a valid email");
//    }
//    else {
//      print("Email is valid")
//      subBtn.disabled = true;
//    }
//  }
  if (alerts != "") {
    alert(alerts)
    return false;
  }
  //subBtn.disabled = false;
  return true;
}

function checkFirst() {
  var first = document.getElementById("firstName");
  var subBtn = document.getElementById("submit-btn");
  
  if (first == "") {
    // subBtn.disabled = false;   // can't do this on submit; must be attached to specific input
    alert("Please enter first name");
  }

}

/* Password Visibility (Icons) */

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

/* Check if passwords match and disable button */

function checkPwMatch() {
  var pw1 = document.getElementById("password");
  var pw2 = document.getElementById("re-enterPassword");
  var subBtn = document.getElementById("submit-btn");
  var warningMsgs = document.querySelector("div.msg-section > div.msgs");
  if (pw1.value === pw2.value) {
    // return message saying passwords match
    // 
    subBtn.disabled = false;
//    if (warningMsgs.innerHTML.length == 0) {
//      warningMsgs.innerHTML = "";
//    }
    //warningMsgs.style.display = "none";
    warningMsgs.querySelector(".warning-msgs").remove();
    return true;
  } else {
    // return message saying don't passwords match
    subBtn.disabled = true;
    // insert a warning message
    /*
    var row1 = "<div class='warning-msgs'>";
    var row2 = "<h3>Passwords do not match</h3>";
    var row3 = "</div>";
    mHTML = row1+row2+row3; */
    mHTML = "Passwords do not match";

    if (warningMsgs.querySelector(".warning-msgs") == null) {
      var msgDiv = document.createElement("DIV");
      var msgH3 = document.createElement("H3");
      //msgH3.innerText = document.createTextNode(mHTML);
      msgH3.appendChild(document.createTextNode(mHTML));
      msgDiv.appendChild(msgH3);
      msgDiv.classList.add('warning-msgs');
      warningMsgs.appendChild(msgDiv);
      warningMsgs.style.display = "block";
    }
    //else {}
    console.log("passwords do not match!")
    return false;
  }
}

/* Check if passwords match */ 
function verifyPswd() {
  var pw1 = document.getElementById("password");
  var pw2 = document.getElementById("re-enterPassword");
  //console.log(pw1.value);
  //console.log(pw2.value);
  if (pw1.value === pw2.value) {
    // return message saying passwords match
    console.log("passwords match!");
    //console.log(pw1.value === pw2.value)
    return true;
  } else {
    // return message saying don't passwords match
    console.log("passwords do not match!")
    return false;
  }
}
//
//
//

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


	

function registerUpload(first, last, email, password){
  // curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"your@email.com","password":"abc"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/register'


  const postRegisterUrl = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/register';
  /*var body = {
    first_name:first,
    last_name:last,
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

