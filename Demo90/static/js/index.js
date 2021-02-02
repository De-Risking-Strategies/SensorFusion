//Sensor Fusion Index page functions
var toggleCameraBtnFlag = true;
var toggleInfoCanvasFlag = false;
var toggleLabels = true;//On by default
var toggleScores = true;
var span; 
var modal;
var modalOpen = false;
var preLoadedModel = ['Demo90','Model01.Deer', 'Model02.Head', 'Model03.Eyes', 'Model04.Tree'];
var customModel = ['Check.ID','Custom.01','Custom.02', 'Custom.03', 'Custom.04'];

var preLoadedModelSelected = 'Demo90';//Default Model
var camera1;
var modelType = 'preLoaded';
var fileSavedIndex = 0;//progress basrin data.js sfCallBack
var sfCommandAnnotate;
var annotateImages;//Number of images to capture for annotation
var annotateName;
var annotateDescription;//Annotation description
var upLoadFolder;

var customModelIndex = 0;
var preLoadedModelIndex = 0;

var fName;
var fType;
var fSize;
var fileObject;

var uid;
var token;
var password;

var toggleTFCamera = true;

function init(){
//check login
	uid=getCookie('uid');
	token=getCookie('token'); 
	password=getCookie('password'); 
  
// check Free Trial
var url= window.location.href;

var sfSkip = url.split('?')[1];
console.log('Check Skip:'+sfSkip);

if(sfSkip == 'i=skip'){
  uid = 'GUEST';
  var d = createTimeStamp();
  token = 'skip-'+d;
}

if(token != "" && uid != ""){
  console.log('Login checked');  
  var avatarLabel = document.getElementById('avatarLabel');
  var avatarImg = document.getElementById('profileImg');
  avatarLabel.innerHTML = uid;
  avatarImg.src = ('./static/assets/profile_icon_002.png');
  
  var toggleLabelsBtn = document.getElementById("toggleLabelsBtn");
  var toggleScoresBtn = document.getElementById("toggleCameraBtn");

   if(toggleTFCamera){//dynamically add tensor flow camera
    addCamera();
   }

  //Clear Modal on outside click
  document.getElementById("main").addEventListener("click", function() {
   postAPI('restore_tesnorFlow');
   modal.style.display = "none";
   modalOpen = false;
  });
  //modal = document.getElementById("sfModal");
  modal = document.getElementsByClassName("modal")[0];

  // Get the button that opens the modal
  var btn = document.getElementsByClassName("myBtn");
  var btnLength = btn.length;

  // Get the <span> element that closes the modal
  span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
     postAPI('restore_tesnorFlow');
     modal.style.display = "none";
     modalOpen = false;

  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
     postAPI('restore_tesnorFlow');
     modal.style.display = "none";
     modalOpen = false;
    }
    var status1 = document.getElementById("annotateFileStatus");
    status1.innerText = "";

   }
  document.body.onkeydown = function(e){
   // console.log(String.fromCharCode(e.keyCode)+"-->"+e.keyCode);
    if (modalOpen == false){
      if(e.keyCode =='32'){//SPACEBAR
          modal1_click('annotate');
        //}else if(e.keyCode == '81'){//Q
        //  postAPI('quit');
        }else if(e.keyCode == '70'){
          postAPI('fps')
        } 
     }
   }

  //INIT - Load stored Model setting
  modelType = getCookie('modelType');

  if (modelType == 'preLoaded'|| modelType ==""){
    // preLoadedModelIndex = getCookie('modelIndex');
    preLoadedModelIndex = parseInt(getCookie('modelIndex'));
    customModelIndex = parseInt(getCookie('customModelIndex'));
    setCookie("modelType", "preLoaded", 30);
    
    if (isNaN(preLoadedModelIndex)){
      preLoadedModelIndex = 0;
      setCookie("modelIndex", preLoadedModelIndex, 30);
    }
    
    if (isNaN(customModelIndex)){
      customModelIndex = 0;
      setCookie("customModelIndex", customModelIndex, 30);
    }
     
     document.getElementById('switchModelLabel').innerText = preLoadedModelIndex;  
     document.getElementById('switchModelImg').src = 'http://localhost:5000/static/assets/models_icon_selected_001.png'; 
     document.getElementById('switchCustomImg').src = 'http://localhost:5000/static/assets/models_icon_001.png'; 
     
     document.getElementById('toggleModelLabel').innerText = 'Pre Loaded';
     document.getElementById('toggleModelImg').src = 'http://localhost:5000/static/assets/toggle_switch_off_001.png'; 
    
  }else{
     //customModelIndex = getCookie('customModelIndex');
     preLoadedModelIndex = parseInt(getCookie('modelIndex'));
     customModelIndex = parseInt(getCookie('customModelIndex'));
     setCookie("modelType", "Custom", 30);

     document.getElementById('switchModelLabel').innerText = customModelIndex;
     document.getElementById('switchModelImg').src = 'http://localhost:5000/static/assets/models_icon_001.png'; 
     document.getElementById('switchCustomImg').src = 'http://localhost:5000/static/assets/models_icon_selected_001.png'; 
     
     document.getElementById('toggleModelLabel').innerText = 'Custom';
     document.getElementById('toggleModelImg').src = 'http://localhost:5000/static/assets/toggle_switch_on_001.png'; 
    
  }
  //Index value of selected item
  document.getElementById('switchModelLabel').innerText = preLoadedModel[preLoadedModelIndex];
  document.getElementById('switchCustomLabel').innerText = customModel[customModelIndex];
}else{
   console.log('No Token - need to login');
   alert("Please Sign In!");
   window.location.href='http://localhost:5000';
 }    
}

function toggleCamera(){
  camera1 = document.getElementById("cameraStream");
  toggleCameraBtn = document.getElementById("toggleCameraBtn");
  var sensorTitleText = document.getElementById("sensor_toggle_title");
  var infoCam = document.getElementById("infoCam");
  
   if (toggleCameraBtnFlag == false) {//turn camera on
      toggleCameraBtnFlag = true
      //camera1.src = "{{ url_for('video_feed') }}";
      //camera1.src = "http://localhost:5000/video_feed";
      camera1.style.display = "block";
      sensorTitleText.innerText="SENSOR 1: ON";
      infoCam.style.display = "none";
      toggleCameraBtn.src = "/static/assets/toggle_switch_on_001.png";
      
    }else{
      toggleCameraBtnFlag = false
      //camera1.src = "";
      camera1.style.display = "none";
      sensorTitleText.innerText="SENSOR 1: OFF";
      toggleCameraBtn.src = "/static/assets/toggle_switch_off_001.png";
      infoCam.style.display = "block";
    }
  
}
function postAPI(command) {
// POST commands to Flask/Python API route
  console.log('Posting: '+ command);
  sfCommandAnnotate = false;
  
  if(command == 'annotate'){
    modalOpen = true;
    sfCommandAnnotate = true;
    
    annotateName = document.getElementById('aName').value;
      console.log(annotateName);
    annotateImages = document.getElementById('aImages').value;//number of images to capture
        console.log(annotateImages);    
        
    if (annotateName == "" || annotateImages == "" ){
      alert("No Blank Fields Allowed! Try Again.");
    }else{    
      command = command+','+annotateName+','+annotateImages;    
   }
  }             
  if(command == 'labels'){
    if(toggleLabels == true){
      toggleLabels = false;
      command = command + '_off';
      toggleLabelsBtn.src = "/static/assets/toggle_switch_off_001.png";
    
    }else{
      toggleLabels = true;
      toggleLabels = true;
      command = command + '_on';
      toggleLabelsBtn.src = "/static/assets/toggle_switch_on_001.png";
    }
  }
    if(command == 'scores'){
      if(toggleScores == true){
      toggleScores = false;
      command = command + '_off';
      toggleScoresBtn.src = "/static/assets/toggle_switch_off_001.png";
    
    }else{
      toggleScores = true;
      command = command + '_on';
      toggleScoresBtn.src = "/static/assets/toggle_switch_on_001.png";
    }
   }
    if(command == 'toggle'){//TOGGLE MODELS - preLoaded or customModel
      if(modelType == 'preLoaded'|| modelType == ""){// blank = first time load
        modelType = ('custom');
        document.getElementById('toggleModelLabel').innerText = 'Custom';
        document.getElementById('toggleModelImg').src = 'http://localhost:5000/static/assets/toggle_switch_on_001.png'; 
        
        //CUS: Set Preloaded
        var currentlySelected = document.getElementById('switchModelLabel').innerHTML;
        for(var i = 0; i < preLoadedModel.length; i++) {
          if(preLoadedModel[i] == currentlySelected){
            currentlySelected = i;
          }
        }
        setCookie('modelIndex', currentlySelected, 30);
     
        //CUS: Set Custom
        var currentlySelectedCustom = document.getElementById('switchCustomLabel').innerHTML;
        for(var i = 0; i < customModel.length; i++) {
          if(customModel[i] == currentlySelectedCustom){
            currentlySelectedCustom = i;
          }
        }
        setCookie('customModelIndex', currentlySelectedCustom, 30);
     
        //Render Custom
        setCookie("modelType", "Custom", 30);
        command = 'custom,'+ customModel[currentlySelectedCustom];
        console.log('Toggle to Custom Model: '+ currentlySelectedCustom);
        document.getElementById('switchModelImg').src = 'http://localhost:5000/static/assets/models_icon_001.png'; 
        document.getElementById('switchCustomImg').src = 'http://localhost:5000/static/assets/models_icon_selected_001.png'; 
     
        timeRefresh(0);//Reload broswer
      }else{// PRELOADED
        modelType = ('preLoaded');
        document.getElementById('toggleModelLabel').innerText = 'Pre Loaded';
        document.getElementById('toggleModelImg').src = 'http://localhost:5000/static/assets/toggle_switch_off_001.png'; 
        
        //PRE: Set Preloaded
        var currentlySelected = document.getElementById('switchModelLabel').innerHTML;
        for(var i = 0; i < preLoadedModel.length; i++) {
          if(preLoadedModel[i] == currentlySelected){
            currentlySelected = i;
          }
        }
        setCookie('modelIndex', currentlySelected, 30);
     
        //PRE: Set Custom
        var currentlySelectedCustom = document.getElementById('switchCustomLabel').innerHTML;
        for(var i = 0; i < customModel.length; i++) {
          if(customModel[i] == currentlySelectedCustom){
            currentlySelectedCustom = i;
          }
        }
        setCookie('customModelIndex', currentlySelectedCustom, 30);
      
        //Render PreLoad
        setCookie("modelType", "preLoaded", 30);
        command = 'model,'+ preLoadedModel[currentlySelected];
        console.log('Switch PreLoaded Model'+ currentlySelected);
        document.getElementById('switchModelImg').src = 'http://localhost:5000/static/assets/models_icon_selected_001.png'; 
        document.getElementById('switchCustomImg').src = 'http://localhost:5000/static/assets/models_icon_001.png'; 
        timeRefresh(0);//Reload broswer
      }
    }
   if(command == 'custom'){//CUSTOM MODEL
      //switchCustomImage();
      var len = customModel.length;
      customModelIndex = parseInt(getCookie('customModelIndex'));
      
      if (isNaN(customModelIndex)){customModelIndex = 0};
      
      if(customModelIndex >= 5){
        customModelIndex = 0;//Skip over the initial placeholder 'custom'
      }else{
        customModelIndex += 1;
      }
      
      if(customModelIndex >= len){
        customModelIndex = 0;
      }
      setCookie("modelType", "Custom", 30);
      setCookie('customModelIndex', customModelIndex, 30);
      command += ','+ customModel[customModelIndex];
      document.getElementById('switchCustomLabel').innerText = customModel[customModelIndex];
      document.getElementById('switchModelImg').src = 'http://localhost:5000/static/assets/models_icon_001.png'; 
      document.getElementById('switchCustomImg').src = 'http://localhost:5000/static/assets/models_icon_selected_001.png'; 
      
      console.log('Switch Custom Model: '+ customModel[customModelIndex])
      timeRefresh(0);//Reload broswer
   }

   if(command == 'model'){//PRE LOADED MODEL
      //switchModelImage();
      var len = preLoadedModel.length;
      var preLoadedModelIndex = parseInt(getCookie('modelIndex'));
      customModelIndex = 0;
      if (isNaN(preLoadedModelIndex)){preLoadedModelIndex = 0}
      
      preLoadedModelIndex += 1;
      if(preLoadedModelIndex >= len){
        preLoadedModelIndex = 0;
      }
      setCookie("modelType", "preLoaded", 30);
      setCookie('modelIndex', preLoadedModelIndex, 30);
      command += ','+ preLoadedModel[preLoadedModelIndex];
      document.getElementById('switchModelLabel').innerText = preLoadedModel[preLoadedModelIndex];
      
      document.getElementById('switchCustomLabel').innerText = customModel[customModelIndex];
      document.getElementById('switchModelImg').src = 'http://localhost:5000/static/assets/models_icon_selected_001.png'; 
      document.getElementById('switchCustomImg').src = 'http://localhost:5000/static/assets/models_icon_001.png'; 
     
      console.log('Switch PreLoaded Model'+ preLoadedModel[preLoadedModelIndex])
      timeRefresh(0);//Reload broswer

   }   
   if(command == 'quit'){
      console.log('quitting');
      setCookie('uid',null,1);
      setCookie('token',null,1);
      var path = window.location.pathname;
      if(path !="/"){
        timeRefresh(0);//Reload broswer if not on the Index page
      }
    }
   if(command == 'kill_tesnorFlow'){
      console.log('kill_tesnorFlow');
    } 
   if(command == 'restore_tensorFlow'){

      console.log('restore_tensorFlow');
    }
  fetch('/api',{
    method: 'post',
    headers:{
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(command)
    }).then(function (response) {
        //return response.json(); //Its already in JSON coming back from Flask, so don't need to parse it
        return response; 
    })
    .then(function (json) {
        console.log('POST response from Flask');
        console.log(json); 
        
        if(json.status== 200 && sfCommandAnnotate ){
          var status1 = document.getElementById("annotateFileStatus");
          var link = "/home/pi/SensorFusion/Pictures/"+ annotateName
          
          status1.innerText = "Your files are saved to: "+link + ".  Click to continue";
          modal.style.display = "none";
        }
       var cd = command.split(",");     
       if (json.status == 403 && cd[0] =='dirCheck'){
         alert('This Name is already Taken, please try again');
         document.getElementById('aName').value='';
         
       }
    })
}
function switchTrainImageOn(){
    document.getElementById('switchTrainImg').src = 'http://localhost:5000/static/assets/train_model_selected_001.png'; 
    setTimeout(function(){switchTrainImageOff(); }, 3000);
  }
function switchTrainImageOff(){ 
   document.getElementById('switchTrainImg').src = 'http://localhost:5000/static/assets/train_model_001.png'; 
}
function display_info(){
  var infoPic = document.getElementById("infoPic");
    if (toggleInfoCanvasFlag == false) {//turn info canvas  on
      toggleInfoCanvasFlag = true
      infoPic.style.display = "block";
    }else{
      toggleInfoCanvasFlag = false
      infoPic.style.display = "none";
    }
}
function close_info(){
   toggleCameraBtnFlag = false;
   toggleInfoCanvasFlag = false;
   infoPic.style.display = "none";
   infoCam.style.display= "none";
}
function checkDirectoryExists(dir){//Capture Images
    console.log('Check Directory Exists '+dir)
    checkDir = document.getElementById('aName').value
    postAPI('dirCheck,'+checkDir)
}
function modal1_click(event){
  modalOpen = true;
  var hdr = document.getElementById("modal_header");
  var modal1 = document.getElementById("modal_body1");
  var modal2 = document.getElementById("modal_body2");
  var ftr = document.getElementById("modal_footer");
  
  
  var mTitle= 'Not Implemented Yet'; 
  var mHtml1='<br><strong>Please come back soon!</strong>'; 
  var mHtml2= '<br>';
  var mFooter='Click X to Exit';

  if(event =='annotate'){
    postAPI('kill_tesnorFlow');
    mTitle = 'Capture Images for Annotation';
    mHtml1 ='<strong>Enter a Directory Name and Number of Images to Capture </strong><br/><br/>';
    
    //Annotation Form - values to pass to Flask/Python
    var row0 = '<table border="1">';
    var row1 = '<tr><td id="ic1">Directory Name</td><td id="ic2"><br/><input id="aName" type="text" style="width:250px" onchange="checkDirectoryExists(this)" autofocus></input><br/><br/>';
    var row2 = '<strong style="color:red">Files are saved in /home/pi/SensorFusion/Directory Name</strong><br/><br/></td></tr>';
    var row3 = '<tr><td id="ic3">Images to Capture</td><br/><td id="ic4"><input id="aImages" type="text" style="width:250px"><br/>2,000 Images MAX!</input><br/></td></tr>';
    //moved to Upload
    //var row4 = '<tr><td id="ic5">Description</td><td id="ic6"><input id="aDescription" type="text" style="width:300px"></input></td></tr>';
    var row5 = '</table>'
    var row6 = "<br/><br/><input type='button' value='Submit' onclick=postAPI('annotate')>";
    mHtml2 = row0+row1+row2+row3+row5+row6;
  }
  if(event == 'upload'){
    //SKIP TO SENSOR FUSION
  if(uid == 'GUEST'){
    alert('You must register and sign in to upload Annotated images!');
    
    return false;    
  }else{
    
    //Upload Form - values to pass to Server
    postAPI('kill_tesnorFlow');
    mTitle = 'Capture Images to Annotate<br/><small>Use Main Menu 4 to Label, Menu 8 to Zip your Package!</small>';
    mHtml1 ='<br><strong>Upload Annotated ZIP files only!</strong><br>';
    var row0 = '<table border="1">';
    var row1 = '<tr><td id="ic1">Email Address</td><td id="ic4"><input id="emailAddress" name="emailAddress" type="text" style="width:250px;background-color:#414141" readonly value='+uid+' ></input></td></tr>';
    var row2 = '<tr><td id="ic2">Password</td><td id="ic6"><input id="pwd" type="password" style="width:300px;background-color:#414141" onchange="" readonly value='+password+'></input></td></tr>';
    var row3 = '<tr><td id="ic3">Description</td><td id="ic6"><input id="uDescription" type="text" style="width:300px" onchange="validateDescription(this);return false" autofocus ></input></td></tr>';
    var row4 = '<tr><td id="ic4" colspan=2>&nbsp;</td></tr>';
    var row5 = '<tr><td id="ic5">Pick A Zip File</td><td id="ic2"><input id="picker" type="file" style="width:350px" onchange="" ></input><br/><span id="filePicked"></span><br/></td></tr>';
    var row6 = '</table>'
    var row7 = "<br><button type='button' value='Upload' onclick=validateUpload();>Upload</a>";
    mHtml2 = row0+row1+row2+row3+row4+row5+row6+row7;
    }
  }//skip
  //Draw the Modal
  hdr.innerHTML  = mTitle
  modal1.innerHTML = mHtml1;
  modal2.innerHTML = mHtml2;
  ftr.innerHTML = mFooter;
  modal.style.display = "block";

  if(event == 'annotate'){
    document.getElementById("aName").focus;
  }
  //File Picker!
  if(event == 'upload'){
    let picker = document.getElementById('picker');
    picker.addEventListener('change', (event) =>{
      var theFiles = event.target.files;
      var file = theFiles[0].name;
      console.log("You Picked "+file);   
 
      //Validate File
      var input = document.getElementById('picker');
         fileObject = event.target.files[0];
         fName = fileObject.name;
         fType = fileObject.type;
         fSize = fileObject.size;    

         if (fSize > 2000000000){alert("File Size too large, please try again")}
         if (fType != 'application/zip'){alert("File must be a ZIP archive, please try again")}
      document.getElementById("filePicked").innerHTML = fName;
    })
  }
  


}
function uploadImages(){
  switchTrainImageOn();
  modal1_click('upload');
}
function validateUpload(){
  var email = document.getElementById("emailAddress").value;
  var pwd = document.getElementById("pwd").value;
  
  var desc =  document.getElementById("uDescription").value;
  var zFile= document.getElementById("filePicked").innerHTML;
  var vE = false;
  var file;
    
  if (email == "" ){
     alert("Please fill out a valid email address");
  } 
  if (pwd == "" ){
     alert("Password Required!");
  } 
  if (desc ==""){
     alert("Please fill out a description");
  }
  if (zFile == ""){
     alert("Please select a Zip File to upload");
  }

    //Confirm Upload
    var msg ='Confirm Upload: File: ' + fName +'\n';
    msg += 'User: ' + email +'\n';
    msg += 'Pwd: Validated\n';
    msg += 'Description: ' + desc +'\n';
    var txt;
    
    var r = confirm(msg);
    if (r == true){
      txt = 'Uploading Sensor Fusion Package';
      modal.style.display = "none";
      modalOpen = false;
      //Login Upload
      loginUpload(pwd, fName, email, desc, 'upload');
    }else{
      txt = 'Cancelled Uploading Sensor Fusion Package';
    }
  
}

function addCamera(){
  //Dynamic Version of: <img class='videoStream' id='cameraStream' src="{{ url_for('video_feed') }}" width="100%" style='display:block'>-->
  var videoStream = document.createElement('img');
  videoStream.class = 'videoStream';
  videoStream.id ="cameraStream"; 
  videoStream.src ="/video_feed";
  videoStream.style.width = "100%";
  videoStream.style.display = "block";
  //SENSOR 1 CAMERA  
  document.getElementById('camera1Div').appendChild(videoStream);
  //DEBUG: For Javascript debugging, comment the line above and uncomment the lines below
  /*var nullStream = document.createElement('img');
  nullStream.style.display = "none";
  document.getElementById('camera1Div').appendChild(nullStream);//for debugging
  */ 
}



