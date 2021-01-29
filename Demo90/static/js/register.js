var uid;
var token;
var logout;
var input;
//Register and Create Account - NOTE - Email is valideded server side to avoid account collissions.
function initReg(){
  createAccount();
}
function createAccount(){
	var forgot = document.getElementById("login-section");
 	const row0 = '<br/><div border="0"><span>Create New Account</span>';
  // row1
  const row1 = '<br><div class="iBox form-section"><label for="firstName">First</label><input id="firstName" name="first" placeholder="First name" maxlength="128" autofocus></input></div>';
  // row2
  const row2 = '<br><div class="iBox form-section"><label for="lastName">Last</label><input id="lastName" name="last" placeholder="Last Name" maxlength="128" onautofocus></input></div>';
  // row3
  const row3 = '<br><div class="iBox form-section"><label for="email">Email</label><input class="input" id="email" name="email" placeholder="your@email.com" maxlength="256" onchange="validateEmail(this);return false"></input></div>';
  // row4
  //const row4 = '<br><div class="iBox"><label for="password">Password </label><input id="password" name="password" placeholder="Password" type="password" minlength="6" pattern="^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9 ]).*$" onChange="" required></input></div>';

  const row4 = '<br><div class="iBox form-section with-eye pswd-tip"><div class="no-outline"><label for="password">Password </label><input id="password" name="password" placeholder="Password" type="password" minlength="6" pattern="^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9 ]).*$" onChange="" required></input></div>';
  
  const row5 = '<div class="visibility-icon"><input id="pswd-vis" type="checkbox" minlength="8" onclick="showPassword1()"></input><label for="pswd-vis"></label></div><span class="pswd-tip-text"><h3>Password requirements:</h3><h3 class="pswd-req">- must be at least 6 characters long</h3><h3 class="pswd-req">- must contain 1 capital letter</h3><h3 class="pswd-req">- must contain 1 lowercase letter</h3><h3 class="pswd-req">- must contain 1 number</h3><h3 class="pswd-req">- must contain 1 symbol</h3></span></div>';
  // row 5
  const row6 = '<br><div class="iBox form-section with-eye"><div class="no-outline"><label for="re-enterPassword">Re-Enter Password</label><input id="re-enterPassword" name="re-enterPassword" placeholder="Re-Enter Password" type="password" onChange="validatePasswordsMatch();return false" required></input></div>';
  const row7 = '<div class="visibility-icon"><input id="confirm-pswd-vis" type="checkbox" onclick="showPassword2()"></input><label for="confirm-pswd-vis"></label></div></div>';
  // row6
  const row8 = '</div><br/>';
  
  //eye - future
  const fEye1 ='<div class="form-section with-eye"><div class="no-outline">';
  const fEye2 ='<label for="re-enterPassword">Re-Enter Password</label>';
  const fEye3 ='<input id="re-enterPassword" name="re-enterPassword" placeholder="Re-Enter Password" type="password" onChange="return checkPwMatch()" required></input></div>';
  const fEye4 ='<div class="visibility-icon">';
  const fEye5 ='<input id="confirm-pswd-vis" type="checkbox" onclick="showPassword2()"></input><label for="confirm-pswd-vis"></label></div></div>';
  const fEye = fEye1+fEye2+fEye3+fEye4+fEye5;
  
  const terms1 ='<div class="terms" id="terms"><span>I Agree:</span><br> <div class="chkbox-group" id="chkbox-group" >';
  const terms2 ='<div class="term"><input id="agree-term" name="agree-term" type="checkbox" required></input>';
  const terms3 ='<label for="agree-term"><a href="/static/assets/drs-terms-and-conditions.md" style="color:#fff" target="_blank" >Terms and Conditions</a></label></div>';
  const terms = terms1 +terms2+terms3
  
  const priv1 ='<div class="term" >';
  const priv2 ='<input id="privacy-term" name="privacy-term" type="checkbox" required></input>';
  const priv3 ='<label  for="privacy-term"><a href=/static/assets/"drs-privacy-policy.md" style="color:#fff"  target="_blank">Privacy Policy</a></label></div>';
  const privTerm = priv1+priv2+priv3;
  
  const age1 = '<div class="term">'
  const age2 ='<input id="age-term" name="age-term" type="checkbox" required></input>';
  const age3 ='<label for="age-term"><a href="/static/assets/drs-I-am-17-or-older.md" style="color:#fff" target="_blank"  >I am 17 years or Older</a></label>';
  const termBtn ='<div class="term-btns" id="term-btns"></div></div>';
  const ageTerm = age1+age2+age3+termBtn; 
  
  const foot1 = '<a href="http://localhost:5000"><span   class="btn" style="color:#bb86fc">CANCEL</span></a>';
  const foot2 = '<a id="submit-btn" class="btn" onclick="sendRegReq(); return false"><span style="color:#bb86fc">CREATE ACCOUNT</span></a>';
  const foot3 = '</div>'  
	const footer = foot1+foot2+foot3;
  
  const wMsg1 = '<div class="msg-section" style="display:none"><div class="msgs"><div class="warning-msgs"></div></div><div>';
  const sMsg = '<div class="msgs" style="display:none"><div class="success-msgs"><h3>{{ message }}</h3><a href="http://localhost:5000">Login</a></div></div>';    
      
      
  var regHtml = row0+row1+row2+row3+row4+row5+row6+row7+row8+terms+privTerm+ageTerm+footer+wMsg1+sMsg;
    forgot.innerHTML  = regHtml;
	var input = document.addEventListener("keyup", function(event){
		if(event.keyCode == 13){
		document.getElementById('submit-btn').click();
		}
	});
}

/* Check length of first name; ensure it is not blank */
/* Check length of email; ensure it is not blank; ensure it is in the right format */
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
function validatePasswordsMatch(){
	console.log('validatePasswordsMatch ');
	var n1 =document.getElementById('password').value;
	var n2 =document.getElementById('re-enterPassword').value;
	
	if(n1 != n2){
		alert('Passwords don`t match, try again!');
	}
}
/*the below is for future use */
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
    var msg = "Passwords do not match - please try again";
    console.log(msg);
    alert(msg);
    return false;
  }
}
//Login and get Token
//EX: curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"some@email.com","password":"abc"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/login'

function validateInputs() {
  // if validations pass, send the request to AWS
  var first = document.getElementById("firstName").value;
  var email = document.getElementById("email").value;
  var subBtn = document.getElementById("submit-btn");
  var alerts = "";

  //print("first name: " + firstName);
  console.log("validate function: no first name available")
  // make sure names are restricted to alpha-numeric characters
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
    // check if email have any internet characters
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




function registerUser(first, last, email, password){
  // curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"your@email.com","password":"abc"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/register'


  const postRegisterUrl = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/register';
  /*var body = {
    first_name:first,
    last_name:last,
    user_email:email,
    password: password
  }*/
  //console.log(first);
  var body ='{"first_name":"'+first+'", "last_name":"'+last+'", "user_email":"'+email+'","password":"'+password+'"}';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", postRegisterUrl, true);
  xhr.setRequestHeader('Content-Type','application/json');

  xhr.onreadystatechange = function(){
    console.log("Welcome to registerUpload!")
    if (this.readyState === XMLHttpRequest.DONE && this.status === 201){
      var token = this.response;
      console.log("Register response: " + token);
      alert(token);
      //var msg = 'User Created' 
      //console.log(msg);
      //alert(msg);
      //getUploadURL(token, file, desc);
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status === 202){
      var token = this.response;
      console.log("Register response: " + token);
      alert(token);
      //var msg = 'This user already exists. Please try again.';
      //console.log(msg);
      //alert(msg);
      //return false;
      //getUploadURL(token, file, desc);
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status != 201 && this.status != 202){
      var r = this.response;
      var msg = 'Register error, please try again!'+ r;
      console.log(msg);
      alert(msg);
      //return false;
    }
  }
  xhr.send(body);
}

function registerUser1(first, last, email, password) {
  const postRegisterUrl = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/register';

  var body = '{"first_name":"'+first+'", "last_name":"'+last+'", "user_email":"'+email+'","password":"'+password+'"}';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", postRegisterUrl, true);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.onreadystatechange = function () {
    console.log("Hey look Ma, I made it!")
    console.log(this.readyState)
  }
  xhr.send(body);
}

function sendRegReq() {
  var first = document.getElementById("firstName").value;
  var last = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  if(first == '' || last == '' || email == ''|| password == ''){
      alert("you must fill out the fields!");
      return false;
  }
  
  var term = document.getElementById("agree-term").checked;
  var privacyterm = document.getElementById("privacy-term").checked;
  var ageterm = document.getElementById("age-term").checked;
  
  console.log("validating request: " + term +":"+ privacyterm +": "+ ageterm);
  
  if(term == false || privacyterm == false || ageterm == false){
      alert("you must agree to terms and conditions first!");
      return false;
  }else{

    var isValid = validateInputs();
    // validate the inputs
    if (isValid) {
      // verify the email does not already exist?
      // send POST request
      registerUser(first, last, email, password);
      return true;
    }
    return false;
    //return isValid;
 }
}

function validateEmail(em) {
    var e = em.value;
    if (e == '' ){
     alert('Please enter a valid email address');
     document.getElementById("email").value ="";
     document.getElementById("email").focus();
    } else{

      var re = /\S+@\S+\.\S+/;
      //return re.test(e);
      var vE = re.test(e);
      if(!vE){
        alert('Valid Email Address Required');
        document.getElementById("email").value ="";
        document.getElementById("email").focus();
      }else{
        console.log('eEmail validated!');
      }
    }
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

