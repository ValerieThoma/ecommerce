var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/config.js');

var connection = mysql.createConnection(config);
connection.connect();


router.post('/register', (req,res,next)=>{
	console.log(req.body);
	// res.json(req.body);
	const userData = req.body;
	// var promiseOne = new Promise((resolve, reject)=>{
	// 	var selectQuery = `SELECT * FROM customers WHERE email = ?;`;
	// 	connection.query(selectQuery, [email], (error, results)=>{
	// 		if(error) throw error;
	// 		if(results.length > 0){
	// 			reject({msg: "userExists"});
	// 		}else{
	// 			resolve();
	// 		}
	// 	})

	// })
});

module.exports = router;
