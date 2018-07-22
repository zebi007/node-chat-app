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

var frm,txt;

io.on('connection', (socket) =>{
    console.log('New user connected');


    //emit is an socket method that takes 2 arguments first is event name and second is the data we want to send or whole object
    //removed this because we have sended message to every user connected
    // socket.emit('newMessage',{
    //     from:'Zohaib malix',
    //     text:'Hey . whats up bro',
    //     createAt:1289
    // });





    //after challenge
    //socket is for one user while io is for all connected users
    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        io.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()

        });
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