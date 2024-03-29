const mysql = require('mysql');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended : false});
const server = {host : '127.0.0.1', port : 4000};
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'test',
	insecureAuth : true,
	port : 8889
});

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('*', function(req, res){
	res.render('welcome.ejs');
});
app.post('/main', urlencodedParser, function(req, res){
	console.log(req.body);
	let array;
	new Promise(function(response, reject){
		connection.query("SELECT * FROM test", function(error, result){
			array = result;
			// console.log(array);
			response();
		});
	})
	.then(
		() => {
			res.render('index.ejs', {array : JSON.stringify(array), size : Math.floor(Math.sqrt(array.length)), parameters: JSON.stringify(require('./parameters.json')), params: require('./parameters.json'), master_vector: require('./data.json'), solution: JSON.stringify(require('./solution.json')), date: req.body.date, map: req.body.map});
		}
	)
});

app.listen(server.port, server.host);
console.log(server);