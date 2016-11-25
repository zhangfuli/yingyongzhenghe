var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function  (req,res) {
	res.sendFile(__dirname+'/public/index.html');
})
app.get('/admin',function  (req,res) {
	res.sendFile(__dirname+'/public/admin.html');
})
http.listen(9000,function(){
	console.log("Server starting ");
})