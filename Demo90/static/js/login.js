//login.js
var uid;
var token;
var logout;
var input;
//NOTE - Generic validation is in the globals.js file where functions are shared by login and index
function initLogin(){
	checkToken();//In globals.js
}
function forgotPasswordEmail(){
    const forgotPwdEmail = document.getElementById("login-section");
    const row0 = '<table border="0"><h2>Forgot Password</h2>';
    const row1 = '<tr><td id="ic1"><span >Email </span><br/><input class="input" id="emailAddress" name="emailAddress"  placeholder="your@email.com" maxlength="256" autofocus onchange="validateEmail(this);return false"></input></td></tr>';
    const row2 = '</table>';
    const row3 = '<input class="btn" id="EmailPasswordKey" type="button" onClick="changePassword();" value="EMAIL CODE"></input><br/>';
    const row4 = '<a onclick="createLogin(); return false"><p>SIGN IN</p></a>';
    const row5 = '<a href="http://localhost:5000/register"><p>CREATE ACCOUNT</p></a>';
    const row6 = '</table>'  
    var lHtml = row0+row1+row2+row3+row4+row5+row6;
    forgotPwdEmail.innerHTML  = lHtml;
	var input = document.addEventListener("keyup", function(event){
		if(event.keyCode == 13){
		document.getElementById('createLogin()').click();
		}
    });
}
function validatePasswordsMatch(){
	console.log('validatePasswordsMatch ');
	var n1 =document.getElementById('newPwd').value;
	var n2 =document.getElementById('newPwdConfirm').value;
	
	if(n1 != n2){
		alert('New Passwords don`t match, try again!');
	}
}
function changePassword(n1){
	uid = document.getElementById('emailAddress').value;
	
	if(uid){
		resetPasswordEmail(uid)
	}else{
		alert('Please Sign In to change password and try again!');
	}
}
function createLogin(){
    const login = document.getElementById("login-section");
    const row0 = '<table border="0"><h2>Log In</h2>';
    const row1 = '<tr><td id="ic1"><span >Email </span><br/><input class="input" id="emailAddress" name="emailAddress" type="text" placeholder="your@email.com" autofocus onchange="validateEmail(this);return false"></input></td></tr>';
    const row2 = '<tr><td id="ic2"><span >Password</span><br/><div class="with-eye"><div class="extend-input"><input class="input" id="pass" type="password" type="password" placeholder="Password" minlength="6" pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9 ]).*$" onchange="validatePassword(this);return false" onblur=""></div><div class="visibility-icon"><input id="pswd-vis" type="checkbox" onclick="showPassword2()"><label for="pswd-vis"></label></div></div></td></tr>';
    const row3 = '</table><br/>';
    const row4 = '<input class="btn" id="Signin" type="button" onClick="signin()" value="SIGN IN"></input><br/>';
    const row5 = '<a onClick="forgotPasswordEmail();"><p>FORGOT PASSWORD</p></a>';
    const row6 = '<a href="http://localhost:5000/reset"><p>RESET PASSWORD</p></a>';
    const row7 = '<a href="http://localhost:5000/register"><p>CREATE ACCOUNT</p></a>';
    const row8 = '</table>'  
	var lHtml = row0+row1+row2+row3+row4+row5+row6+row7+row8;
    login.innerHTML  = lHtml;
	var input = document.addEventListener("keyup", function(event){
		if(event.keyCode == 13){
		document.getElementById('Signin').click();
		}
	});
}
function signin(){
	console.log('Get a Token');
	var email = document.getElementById('emailAddress').value;
	var pass = document.getElementById('pass').value;
	
	loginUpload(pass, 'noFile', email, 'noDesc', 'login');
}
function logOut(type){
      var d = createTimeStamp();
      console.log('Signing Out at'+d);
      setCookie('uid','',1);
      setCookie('token','',1);
      setCookie('logout', type, 1);
      window.location.href ='http://localhost:5000';
}
function resetPasswordEmail(email){
/* THIS IS STEP 1 OF 2 - STEP 2 IN pwdreset.html
1. Send an Email to get a TTL Key from server (1 hour)
o
2. Click on the email link or cut and paste the code here. The final reset part is called like this: From EMAIL
curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"your@email.com", "pin": "070864", "password": "resetMyPW0"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/reset_password'

Needs the 3 specified fields for it to do the reset.
*/
  
  const resetPwdURL = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/reset_password';
  var body ='{"user_email":"'+email+'"}';
  var xhr3 = new XMLHttpRequest();
  xhr3.open("POST", resetPwdURL, true);
  xhr3.setRequestHeader('Content-Type','application/json');
  xhr3.onreadystatechange = function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
      var resetPasswordResponse = this.response;
      console.log('Change Password URL Response: '+ resetPasswordResponse);
      // now open Password Reset Page
      msg = 'Check your email for a Reset Code. \n, In Sensor Fusion, click `RESET PASSWORD` to change it with the Cpde. \n\nThe Reset Code will last for 1 hour';
      alert(msg);
      window.location.href = 'http://localhost:5000';
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status != 200){
      var r = this.response;
      var msg = 'Change Password URL error, Please try again: '+ r;
      console.log(msg);
      alert(msg);
    }
  }
  xhr3.send(body);
}
function loginUpload(password, file, email, desc, type){
  //1. Login and get Token
  //EX: curl -v -X POST -H "Content-Type: application/json" -d '{"user_email":"some@email.com","password":"abc"}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/login'                                                         
  const postLoginUrl = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/login';
  var body ='{"user_email":"'+email+'","password":"'+password+'"}';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", postLoginUrl, true);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.onreadystatechange = function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
      var token = this.response;
      console.log('Login Response: '+ token);
      //if Upload or if Login
      if(type == 'login'){
		var d = createTimeStamp();
		console.log('Logged in with token: '+token+ ' at '+ d);
		setCookie('uid',email,1);
		setCookie('password',password,1);
		setCookie('token',token,1);
		window,location.href ='http://localhost:5000';
		
	  }else{
		getUploadURL(token, file, desc, type);
     }
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status != 200){
      var r = this.response;
      var msg = 'Login error, please try again: '+ r;
      console.log(msg);
      alert(msg);
    }
  }
  xhr.send(body);
}
async function getUploadURL(token, file, desc, type){
  //2. Get Signed URL  for Upload with Token
  //EX: curl -v -X POST -H "Content-Type: application/json" -d '{"token": “<token>“, "desc": "This is my description."}' 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/get_upload_url'
  const getUploadURL = 'https://beo7gqvf3j.execute-api.us-east-2.amazonaws.com/production/get_upload_url';
  var t = JSON.parse(token);
  var tok = t.token;
  
  var body ='{"token":"'+tok+'","desc":"'+desc+'"}';
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", getUploadURL, true);
  xhr2.setRequestHeader('Content-Type','application/json');
  xhr2.onreadystatechange = function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
      var upLoadURL = this.response;
      console.log('Get Upload URL Response: '+ upLoadURL);
      putUpload(upLoadURL, file);
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status != 200){
      var r = this.response;
      var msg = 'Get Upload URL error, please try again: '+ r;
      console.log(msg);
      alert(msg);
    }
  }
  xhr2.send(body);
}
function putUpload(upLoadURL, file){
  //3. Upload zip file
  //curl -i --request PUT --upload-file "<file>" "<upLoadURL>"
  console.log('Uploading File: '+file);
  var putSourcePath = "/home/pi/SensorFusion/Pictures/"+file;
  var data = {};
  data.file = putSourcePath;
  var json = JSON.stringify(data);
  var pBar = document.getElementById('progressBar');
  var pBarLabel = document.getElementById('pbarLabel');
  
  var xhr3 = new XMLHttpRequest();
  xhr3.upload.addEventListener("progress", function(e){
    if(e.lengthComputable){
      var percent =  parseInt((e.loaded / e.total)*100);
      console.log("Uploading File: "+percent);
      pBar.style.display = 'block';
      pBarLabel.innerText = file +' uploaded: '+ (percent +1)+ '%';
      pBar.style.background = "linear-gradient(to right, #57c2c1 " + percent + "%, #4a4a52 " + percent + "%)";
      postAPI('restore_tesnorFlow');
    }
  });
  xhr3.upload.addEventListener("load", function(e){
      pBar.style.display = 'none';
      msg = 'Your file:  '+file+' was successfully Uploded!'
      console.log(msg);
      alert(msg);
      postAPI('restore_tesnorFlow');
  });
  
  xhr3.open("PUT", upLoadURL, true);
  xhr3.overrideMimeType(file.type);
  xhr3.onreadystatechange = function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
      var res = this.response;
      console.log('File Upload Response: '+ res);
      
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status != 200){
      var r = this.response;
      var msg = 'Upload File error, please try again: '+ r;
      console.log(msg);
      alert(msg);
    }
  }
  xhr3.send(fileObject);

}

