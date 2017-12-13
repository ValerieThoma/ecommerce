var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/config.js');
var randToken = require('rand-token');

// console.log(randToken.uid(100));

var connection = mysql.createConnection(config);
connection.connect();


router.post('/register', (req,res,next)=>{
	console.log(req.body);
	// res.json(req.body);
	const userData = req.body;
	const checkEmail = new Promise((resolve, reject)=>{
		const checkEmailQuery = `SELECT * FROM users WHERE email = ?;`;
		connection.query(checkEmailQuery, [userData.email], (error, results)=>{
			if(error){ 
				throw error;
			}else if(results.length > 0){
				reject({msg: "userExists"});
			}else{
				resolve();
			}
		});

	})
	checkEmail.then(
		()=>{
			console.log("user is not in the datatbase")
			const insertIntoCust = `INSERT INTO customers 
			(customerName, city, state, salesRepEmployeeNumber, creditLimit)
				VALUES
			(?,?,?,?,?);`;
			connection.query(insertIntoCust, [userData.name, userData.city, userData.state,1337,10000],(error, results)=>{
				if(error){
					throw error;
				}
				const newID = results.insertId;
				const token = randToken.uid(60);
				const hash = bcrypt.hashSync(userData.password)
				console.log(newID);
				const insertUsers = `INSERT INTO users
				(cid, type, password, token, email, name)
					VALUES
				(?,?,?,?,?,?);`;
				connection.query(insertUsers, [newID,'customer',hash,token,userData.email, userData.name], (error, results)=>{
					if(error){
						throw error;
					}else{
						res.json({
							token: token,
							name: userData.name,
							msg: "registerSuccess"
						})
					}
				})
			})
		}		
	).catch(
		//code to run
		(error)=>{
			res.json(error);
		}
	)
});

module.exports = router;
