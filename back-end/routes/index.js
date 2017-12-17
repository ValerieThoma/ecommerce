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

router.post('/login', (req, res, next)=>{
	// console.log(req.body);
	// res.json(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const checkLoginQuery = `SELECT * FROM users
		INNER JOIN customers ON users.cid = customers.customerNumber
		WHERE users.email = ?;`;
	connection.query(checkLoginQuery, [email], (error,results)=>{
		if(error){
			throw error;
		} 
		if(results.length === 0){
			res.json({
				msg: 'badUser'
			});
		}else{
			const checkHash = bcrypt.compareSync(password, results[0].password);
			if(checkHash){
				const name = results[0].customerName;
				const newToken = randToken.uid(100);
				const updateToken = `UPDATE users SET token = ?
	 				WHERE email = ?;`;
				connection.query(updateToken,[newToken,email],(error)=>{
					if(error){
						throw error;
					}else{
						console.log(results)
						res.json({
							msg: 'loginSuccess',
							name: name,
							token: newToken
						});
					}
				})
			}else{
				res.json({
					msg: 'wrongPassword'
				})
			}
		}
	})
});

router.get('/productlines/get', (req, res, next)=>{
	const selectQuery = `SELECT * FROM productlines;`;
	connection.query(selectQuery, (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json(results);
		}
	})
});

router.get('/productlines/:productline/get', (req, res, next)=>{
	const pl = req.params.productline;
	var plQuery = `SELECT * FROM productlines
        INNER JOIN products ON productlines.productLine = products.productLine
        WHERE productlines.productLine = ?;`;
	connection.query(plQuery, [pl], (error, results)=>{
		if(error){
			throw error
		}else{
			res.json(results);
		}
	})
})

router.post('/updateCart', (req, res, next)=>{
	const productCode = req.body.productCode;
	const userToken = req.body.userToken;
	const getUidQuery = `SELECT id FROM users WHERE token =?;`;
	connection.query(getUidQuery, [userToken], (error, results)=>{
		if(error){
			throw error;
		}else if(results.length === 0){
			res.json({
				msg: "badToken"
			});
		}else{
			const uid = results[0].id;
			const addToCartQuery = `INSERT INTO cart (uid, productCode)
				VALUES (?,?);`;
			connection.query(addToCartQuery,[uid, productCode],(error)=>{
				if(error){
					throw error;
				}else{
					const getCartTotals = `SELECT SUM(buyPrice) as totalPrice, count(buyPrice) as totalItems FROM cart
						INNER JOIN products ON products.productCode = cart.productCode
						WHERE cart.uid = ?;`;
					connection.query(getCartTotals, [uid], (error,cartResults)=>{
						if(error){
							throw error;
						}else{
							res.json(cartResults)
						}
					})	
				}
			})	
		}
	})
})

module.exports = router;
