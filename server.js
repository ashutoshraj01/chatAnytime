var express = require('express');
var http = require('http');
var socket = require('socket.io');
var users = [];

var app = express();  // created an instance of express
var server = http.Server(app); //function server creates an http server and in paramter here it told http handler to handle all the req.
var io = socket(server);

server.listen(3333, () =>{
   console.log('The development server is running at port 3333.');
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/styles/style.css",function(req,res){
    res.sendFile(__dirname + "/styles/style.css");
});

app.get("/js/script.js",function(req,res){
    res.sendFile(__dirname + "/js/script.js");
});


app.get("/img/logo.png",function(req,res){
    res.sendFile(__dirname + "/img/logo.png");
});


io.on("connection", function (socket) {
    console.log("A user has connected!");
     var name ="";
    socket.on("has connected",function(username){
      name = username;
      users.push(name);
      io.emit("has connected",users);      
    })
    
    socket.on("disconnect", function(){
        users.splice(users.indexOf(name),1);
        io.emit("has disconnected",users);
    });
    
    socket.on("new message",function(data){
       io.emit("new message",data);
    });
})

