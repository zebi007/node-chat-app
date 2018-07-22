//here we wright javascript code with the methods provided by the socket library that we imported above
        //io is a method available in that library
        //we are making a request from client to the server to open up a web socket and keep that connection open
        //io method returns a connection so we create a variable socket
        //with this variabel socket we can send and receive data to and from server and client
        var socket=io();

        //we are gonna write a function that will fire when client connects to server
        socket.on('connect',()=>{
            console.log('Connected to server');

            //  socket.emit('createMessage',{
            //      from:'Zohaib',
            //      text:'Haan mery wasty kam kar gya aye.'
            //  });

        });

        

        socket.on('disconnect',() => {
            console.log('Disconnected from server');
        });
         
        //the event we emitted from the server sends a list of emails and the callback function have that email

        socket.on('newMessage',function(message){
         console.log('newMessage',message);
        });