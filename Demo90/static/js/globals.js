 var camera1
 var xMin
 var yMin
 var label
 var name

const annotateRootDirectory = '../Pictures/';
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
        console.log('email validated!');
      }
    }
}
function validatePassword(p){
  var chkPwd = p.value;
  if(chkPwd.length <=6){
    alert("Password must be more than 6 digits!");
  }
}  
function checkEmptyPassword(p){
if (p.value == "" ){
     alert("Password is required. \n Minimum 6 digits, mixed case and a symbol");
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
