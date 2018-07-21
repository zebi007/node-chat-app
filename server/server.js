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

var express=require('express');


const publicPath = path.join(__dirname,'../public');

//port for heroku
const port=process.env.PORT || 3000;

var app=express();

//console.log(__dirname + '/../public');
//console.log(publicPath);

app.use(express.static(publicPath));




/*app.get('/:id',function(req,res){
    res.send(publicPath);
});
*/
app.listen(port,() => {
    console.log('Server is up on port 3000');
});