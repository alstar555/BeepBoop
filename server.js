const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 4000

const arrayUsers = [];
const rooms = [];
var username;


app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(req,res){
	res.sendfile('main.html');
});


//log connected users
io.on('connection', function(socket){
	socket.on("onlineuser", user=>{
		arrayUsers.push(user);
		username = user;
		io.emit("message", arrayUsers);
	})

	socket.on('backbtn', function(){
		var index = arrayUsers.indexOf(username);
		if(index>-1){
			arrayUsers.splice(index,1);
		}
	})

	socket.on('disconnect', function(){
		var index = arrayUsers.indexOf(username);
		if(index>-1){
			arrayUsers.splice(index,1);
		}
	});

	socket.on('ice-candidate', incoming=>{
		io.to(incoming.target).emit('ice-candidate', incoming-candidate);
	});
});


server.listen(PORT, ()=>console.log(`listening on port ${PORT}...`));