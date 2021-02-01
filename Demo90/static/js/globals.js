 var camera1;
 var xMin;
 var yMin;
 var label;
 var name;

const annotateRootDirectory = '../Pictures/';

function checkToken(){
	uid=getCookie('uid');
	token=getCookie('token');  
  logout=getCookie('logout');
  console.log('Check user login:'+uid+':'+token);
	
  if(logout != 'forgot'){
    if(token != ""){
     window.location.href = 'http://localhost:5000/sf';  
    }else{
     createLogin();//login.js
    }
  }else{
    forgotPasswordEmail();//login.js
    
  }
}

function validateEmail(em) {
    var e = em.value;
    if (e == '' ){
     alert('Please enter a valid email address');
     document.getElementById("emailAddress").value ="";
     document.getElementById("emailAddress").focus();
    } else{

      var re = /\S+@\S+\.\S+/;
      //return re.test(e);
      var vE = re.test(e);
      if(!vE){
        alert('Valid Email Address Required');
        document.getElementById("emailAddress").value ="";
        document.getElementById("emailAddress").focus();
      }else{
        console.log('eEmail validated!');
      }
    }
}
function validatePassword(p){
  var check1  = checkEmptyPassword(p);
  
  if(check1 = true){
  var chkPwd = p.value;
    console.log('Password Check 2...');
  if(chkPwd.length <6){
    alert("Password must be more than 6 digits!");
  }else{
    console.log('Password length check 2 OK!');
  }
 }
}  
function checkEmptyPassword(p){
  console.log('Password Check 1...');
if (p.value == "" ){
     alert("Password is required. \n Minimum 6 digits, mixed case and a symbol");
     return false;
  }else{
    console.log('Passwword empty check 1 OK!');
    return true;
  }
}
function checkEmptyDescription(d){
if (d.value == "" ){
     alert("Please fill out a valid description");
  }
}
function validateDescription(desc) {  
    if(desc.value.indexOf("\\") >= 0) {
     alert('\\ Slashes are not allowed in description');
     document.getElementById("uDescription").focus();
    };
}
function createTimeStamp(){
  var d = (new Date().toString());
  return d;
}
