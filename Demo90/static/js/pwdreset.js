//login.js
var uid;
var token;
var logout;
var input;
//NOTE - Generic validation is in the globals.js file where functions are shared by login and index

  function resetPasswordView(){
    setCookie('logout', '', 1);
  //may need to move this to a file
    const pwdreset = document.getElementById("pwdreset-section");
    const row0 = '<table border="0"><h2>Reset Password</h2>';
    const row1 = '<tr><td id="ic1"><span >6-DIGIT CODE </span><br/><input class="input" id="pin" name="pin"  placeholder="Enter 6-digit Reset Code" maxlength="256"  onblur="validateKeyCode(this);return false"></input></td></tr>';
    const row2 = '<tr><td id="ic1"><span >Email </span><br/><input class="input" id="emailAddress" name="emailAddress"  placeholder="youremail@address.com" maxlength="256" autofocus onchange="validateEmail(this);return false"></input></td></tr>';
    const row3 = '<tr><td id="ic1"><span >New Password </span><br/><div class="with-eye pswd-tip"><div class="extend-input"><input class="input" id="newPwd" name="newPwd" type="password" placeholder="Enter a New password" type="password" minlength="6" pattern="^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9 ]).*$" onchange="validatePassword(this);return false"></div><div class="visibility-icon"><input id="pswd-vis" type="checkbox" onclick="showPassword()"><label for="pswd-vis"></label></div><span class="pswd-tip-text"><h3>Password requirements:</h3><h3 class="pswd-req">- must be at least 6 characters long</h3><h3 class="pswd-req">- must contain 1 capital letter</h3><h3 class="pswd-req">- must contain 1 lowercase letter</h3><h3 class="pswd-req">- must contain 1 number</h3><h3 class="pswd-req">- must contain 1 symbol</h3></span></td></tr>';

    const row4 = '<tr><td id="ic2"><span >Confirm New Password</span><br/><div class="with-eye"><div class="extend-input"><input class="input" id="newPwdConfirm" type="password" placeholder="Confirm New Passwrod" onchange="validatePassword(this);return false" onblur="validatePasswordsMatch();return false"></div><div class="visibility-icon"><input id="pswd-vis" type="checkbox" onclick="showPassword()"><label for="pswd-vis"></label></div></td></tr>';
    const row5 = '</table><br/>';
    const row6 = '<input class="btn" id="changePassword" type="button" onClick="changePassword();" value="CHANGE"></input><br/>';
    const row7 = '<a href="http://localhost:5000/"><p>SIGN IN</p></a>';
    const row8 = '<a href="http://localhost:5000/register"><p>CREATE ACCOUNT</p></a>';
    const row9 = '</table>'  
    var lHtml = row0+row1+row2+row3+row4+row5+row6+row7+row8+row9;
    pwdreset.innerHTML  = lHtml;
	var input = document.addEventListener("keyup", function(event){
		if(event.keyCode == 13){
		document.getElementById('changePassword').click();
		}
	});
}
function validateKeyCode(code){
 console.log('validateKeyCode: ' + JSON.stringify(code.value));
  if(code.value == ""){
    alert("Code cannot be empty");
 }
 if(code.langth < 6){
    alert("Code must be 6 characters");
 }
 
}
function validatePasswordsMatch(){
	console.log('validatePasswordsMatch ');
	var n1 =document.getElementById('newPwd').value;
	var n2 =document.getElementById('newPwdConfirm').value;
	
	if(n1 != n2){
		alert('New Passwords don`t match, try again!');
	}else{
	  console.log('Passwords match');
	}
}
function changePassword(){
	uid = document.getElementById('emailAddress').value;
	
	if(uid){
		resetPassword(uid)
	}else{
		alert('Please fill out the form try again!');
	}
}

function resetPassword(email){
/* STEP 2 of 2 - ENter KEY CODE, Email, and New Password to change
 * NOTE - KEYCODE expires in 1 hour!
1. Send an Email to get a TTL Key from server (24 hours) - THIS happens in login.js
curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"user@mail.com"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/reset_password'

2. Click on the email link or cut and paste the code here. The final reset part is called like this: From EMAIL
curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"user@gmail.com", "pin": "070864", "password": "resetMyPW0"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/reset_password'

Needs the 3 specified fields for it to do the reset.
*/
  var pin= document.getElementById('pin').value;
  var newPwd = document.getElementById('newPwd').value;
  
  const resetPwdURL = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/reset_password';
  var body ='{"user_email":"'+email+'", "pin":"'+pin+'", "password":"'+newPwd+'"}';
  var xhr3 = new XMLHttpRequest();
  xhr3.open("POST", resetPwdURL, true);
  xhr3.setRequestHeader('Content-Type','application/json');
  xhr3.onreadystatechange = function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
      var resetPasswordResponse = this.response;
      console.log('Change Password Response: '+ resetPasswordResponse);
      // Password Reset is completed!
      var msg = 'Password changed to: '+ newPwd;
      alert(msg);
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status != 200){
      var r = this.response;
      var msg = 'Change Password Failed! Please click `FORGOT PASSWORD` to get a new code and try again. \n\n'+ r;
      console.log(msg);
      alert(msg);
    }
  }
  xhr3.send(body);
}


