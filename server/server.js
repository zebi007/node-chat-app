 /* this file will be the root of our node application 
this file is gonna create a new express app
configure the public directory
server.js is gonna serve up the public directory
finally it will call app.listen to call the server


//we are not at the root of the directory so we have to go out of the server directory then insede the public directory to serve up the index.html
*/
//__dirname is the current directory #server dir
// .. moves one directory upper from current directory , this is the old way the new way is using npm module path
//path module is the build in module in node 

const path=require('path');
const http=require('http');

const socketIO=require('socket.io'); 

var express=require('express');

const {generateMessage , generateLocationMessage} = require('./utils/message');



const publicPath = path.join(__dirname,'../public');

//port for heroku
const port=process.env.PORT || 3000;

//we created an express app
var app=express();
var server=http.createServer(app)
/*
now we are going to create a variable io that calls socketIO that takes only argument that is server
with this variable io we can do anything we want in terms of emitting or listening to events
now we are ready to accept new connections
*/
var io=socketIO(server);
/*
now when we integrated socketIO library with out code we got access to a library that is useful for client to communicate with the server
this library is available at
localhost:3000/socket.io/socket.io.js
using this library at client side we can make the connection and transfer data from client to server or server to client 
*/

//console.log(__dirname + '/../public');
//console.log(publicPath);

//here we created a middle ware
app.use(express.static(publicPath));


io.on('connection', (socket) =>{
    console.log('New user connected');


     //challenge
     //1 socket.emit from admin text welcome to the chat app
     //2 socket.broadcast.emit sended to everybody but the user who joined i.e zebi just joined the chat app
    // socket.emit('newMessage',{
    //     from:'Admin',
    //     text:'Welcome to the Chat App',
    //     createdAt:new Date().getTime()
    // });
    // instead of this we will call message.js files method generateMessage to create message

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));


    //2
    
    // socket.broadcast.emit('newMessage',{
    //     from:'Admin',
    //     text:'New User Joined',
    //     createdAt:new Date().getTime()
    // })
    //instead we will call message.js file's method generateMessage to create message by passing arguments
    
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));





    //emit is an socket method that takes 2 arguments first is event name and second is the data we want to send or whole object
    //removed this because we have sended message to every user connected
    // socket.emit('newMessage',{
    //     from:'Zohaib malix',
    //     text:'Hey . whats up bro',
    //     createAt:1289
    // });





    //after challenge
    //socket is for one user while io is for all connected users
    //at server side for acknoledgment we need second argument a callback that is responsible to tell tha client that we got the request
    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        //this callback is going to send an event back to the front end and call the function inside createMessage function on index.js
        var zeb='server'
        callback();
        //instead we will call message.js file's method generateMessage to create message by passing arguments
        io.emit('newMessage', 
            //  {
            // from:message.from,
            // text:message.text,
            // createdAt:new Date().getTime()
            //  }
            //here we are calling method generateMessage of file message.js to create message
            generateMessage(message.from,message.text)
            );

        // socket.broadcast.emit('newMessage', {
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // })
    });

    socket.on('createLocationMessage' , (coords) => {
     io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });



     socket.on('disconnect', ()=> {
         console.log('User was disconnected');
     })

});





/*app.get('/:id',function(req,res){
    res.send(publicPath);
});
*/
//here we resistered server on a port
//app.listen automatically call the var server=http.createServer method of http automatically passing app as argument to create server
// without implementing http by outself
//app.listen(port,() => {
server.listen(port,() => {
    console.log('Server is up on port 3000');
});