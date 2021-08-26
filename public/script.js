const socket = io('/');
//output message to web 
socket.on('message', message=>{
	console.log(message);
	outputUsernames(message);
})

const username = document.getElementById('username');

function displaypage(x){
	var mainpage = document.getElementById('mainpage');
	var videopage = document.getElementById('videopage');
	if(x==0){
		mainpage.style.display = "none";
		videopage.style.display = "inline";
	}
	else if(x==1){
		mainpage.style.display = "inline";
		videopage.style.display = "none";
	}
	//show welcome username
	document.getElementById("outputname").innerText = username.value;
};

function startcall(){
	var video = document.querySelector("#localVideo");
	navigator.mediaDevices.getUserMedia({ audio: true, video: true})
	.then(stream =>{
		localstream = stream
		video.srcObject = stream;
		video.play();
	});
}

function stopcall(){
	localstream.getAudioTracks()[0].enabled = false;
	localstream.getVideoTracks()[0].enabled = false;
}

let audio = true;
function muteaudio(){
	audio=!audio;
	 localstream.getAudioTracks()[0].enabled = audio;
	 if(!audio){
	 	document.getElementById("audiobtn").style.backgroundColor = "red";
	 	document.getElementById("audiobtn").innerText="✖ audio";
	 }else{
	 	document.getElementById("audiobtn").style.backgroundColor = "#e8bd85";
	 	document.getElementById("audiobtn").innerText="♬ audio";
	 }
}

let camera = false;
function mutecam(){
	camera=!camera;
	 localstream.getVideoTracks()[0].enabled = camera;
	 if(!camera){
	 	document.getElementById("camerabtn").style.backgroundColor = "red";
	 	document.getElementById("camerabtn").innerText="✖ cam";
	 }else{
	 	document.getElementById("camerabtn").style.backgroundColor = "#e8bd85";
	 	document.getElementById("camerabtn").innerText="● cam";
	 }
}


//const arrayUsers = ["\n"];
function addOnlineUser(){
	var user = username.value;
	//arrayUsers.push(user);
	socket.emit("onlineuser", user);
}

//output online users to dom
function outputUsernames(users){
	document.getElementById('online').innerText = "\n";
	for(const user of users){
		document.getElementById('online').innerText += `●${user}\n`;
	}
	
}

//remove user form list of online users and stop video call
function backbtn(){
	stopcall();
	socket.emit('backbtn', username.value);
}


function joincall(){
	var ringtext = document.getElementById("ringplaceholder");
	ringtext.innerText = "beep paa poo bee paa poo";
	setInterval(function(){
	    ringtext.innerText = 'ring ring';
	},1000);
	
}




