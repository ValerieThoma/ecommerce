var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/config.js');
var stripe = require('stripe')(config.stripeKey);
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

router.post('/fakelogin', (req, res, next)=>{
	const getFirstUser = `SELECT * from users limit 1;`;
	connection.query(getFirstUser, (error, results)=>{
		if(error){
			throw error;
		}
		res.json({
			msg: "loginSuccess",
			token: results[0].token,
			name: results[0].name
		});				
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

router.post('/getCart', (req,res,next)=>{
	const userToken = req.body.token;
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
			const getCartTotals = `SELECT ROUND(SUM(buyPrice),2) as totalPrice, count(buyPrice) as totalItems FROM cart
				INNER JOIN products ON products.productCode = cart.productCode
				WHERE cart.uid = ?;`;
			connection.query(getCartTotals, [uid], (error,cartResults)=>{
				console.log(cartResults)
				if(error){
					throw error;
				}else{
					// res.json(cartResults)
					const getCartProducts = `SELECT * FROM cart
						INNER JOIN products on products.productCode = cart.productCode
						WHERE uid = ?;`;
					connection.query(getCartProducts, [uid], (error, cartContents)=>{
						if(error){
							throw error;
						}else{
							var finalCart = cartResults[0];
							finalCart.products = cartContents;
							res.json(finalCart)
							// console.log(finalCart);
						}
					})	
				}	
			})
		}		
	});		
});

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
					const getCartTotals = `SELECT ROUND(SUM(buyPrice),2) as totalPrice, count(buyPrice) as totalItems FROM cart
						INNER JOIN products ON products.productCode = cart.productCode
						WHERE cart.uid = ?;`;
					connection.query(getCartTotals, [uid], (error,cartResults)=>{
						// console.log(cartResults)
						if(error){
							throw error;
						}else{
							// res.json(cartResults)
							const getCartProducts = `SELECT * FROM cart
								INNER JOIN products on products.productCode = cart.productCode
								WHERE uid = ?;`;
							connection.query(getCartProducts, [uid], (error, cartContents)=>{
								if(error){
									throw error;
								}else{
									var finalCart = cartResults[0];
									finalCart.products = [];
									res.json(finalCart)
									// console.log(finalCart);
								}
							})	
						}	
					})	
				}
			})	
		}
	})
});

router.post("/stripe", (req, res, next)=>{
	// bring in vars from ajax request
	const userToken = req.body.userToken;
	const stripeToken = req.body.stripeToken;
	const amount = req.body.amount;
	stripe.charges.create({
		amount: amount,
		currency: 'usd',
		source: stripeToken,
		description: "Charges for classicmodels"
	},(error, charge)=>{
		// stripe, when the charge has been run, 
		// runs this callback, and sends it any errors, and the charge object
		if(error){
			res.json({
				msg: error
			})
		}else{
			// Insert stuff from cart that was just paid into:
			// - orders
			const getUserQuery = `SELECT MAX(users.id) as id, MAX(users.cid) as cid, MAX(cart.productCode) as productCode, MAX(products.buyPrice) as buyPrice, COUNT(cart.productCode) as quantity FROM users 
				INNER JOIN cart ON users.id = cart.uid
				INNER JOIN products ON cart.productCode = products.productCode
			WHERE token = ?
			GROUP BY cart.productCode;`;
			console.log(userToken)
			console.log(getUserQuery);
			connection.query(getUserQuery, [userToken], (error2, results2)=>{
				if(error2){
					throw error2;
				}
				// console.log("==========================")
				// console.log(results2)
				// console.log("==========================")
				const customerId = results2[0].cid;
				// console.log(results2[0])
				const insertIntoOrders = `INSERT INTO orders
					(orderDate, requiredDate, status, comments, customerNumber)
					VALUES
					(NOW(),NOW(),'Paid','Website Order',?);`;
					connection.query(insertIntoOrders,[customerId],(error3,results3)=>{
						if(error3){
							throw error3;
						}
						console.log(results3)
						// *****************
						console.log(error3);
						// ********************
						const newOrderNumber = results3.insertId;
						// results2 (the select query above) contains an array of rows. 
						// Each row has the uid, the productCOde, and the price
						// map through this array, and add each one to the orderdetails tabl

						// Set up an array to stash our promises inside of
						// After all the promises have been created, we wil run .all on this thing
						var orderDetailPromises = [];
						// Loop through all the rows in results2, which is...
						// a row for every element in the users cart.
						// Each row contains: uid, productCode,BuyPrice
						// Call the one we're on, "cartRow"
						results2.map((cartRow)=>{
							// Set up an insert query to add THIS product to the orderdetails table
							var insertOrderDetail = `INSERT INTO orderdetails
								(orderNumber,productCode,quantityOrdered,priceEach,orderLineNumber)
								VALUES
								(?,?,?,?,1);`;
							// Wrap a promise around our query (because queries are async)
							// We will call resolve if it succeeds, call reject if it fails
							// Then, push the promise onto the array above
							// So that when all of them are finished, we know it's safe to move forward

							const aPromise = new Promise((resolve, reject) => {
								connection.query(insertOrderDetail,[newOrderNumber,cartRow.productCode,cartRow.quantity, cartRow.buyPrice],(error4,results4)=>{
									// another row finished.
									if (error4){
										reject(error4)
									}else{
										resolve(results4)
									}
								})
							})
							orderDetailPromises.push(aPromise);
						})
						// When ALL the promises in orderDetailPromises have called resolve...
						// the .all function will run. It has a .then that we can use
						Promise.all(orderDetailPromises).then((finalValues)=>{
							console.log("All promises finished")
							console.log(finalValues)
							const deleteQuery = `
								DELETE FROM cart WHERE uid = ${results2[0].id};
							`;
							connection.query(deleteQuery, (error5, results5)=>{
								// - orderdetails
								// Then remove it from cart
								res.json({
									msg:'paymentSuccess'
								})								
							})
						});

					})
			}); 
		}
	});
})

router.post('/orders/get',(req,res,next)=>{
	// res.json(req.body.userToken);
	const getUserQuery = `SELECT * FROM users WHERE token = ?;`;
	connection.query(getUserQuery, [req.body.userToken], (error, results)=>{
		if(error){
			throw error;
		}if(results.length === 0){
			res.json({
				msg: "badToken"
			})
		}else{
			// res.json(results[0]);
			const usersId = results[0].id;
			const customerId = results[0].cid;
			const getOrderDetails = `SELECT * FROM orders
				INNER JOIN orderdetails ON orders.orderNumber = orderDetails.orderNumber
	 			WHERE customerNumber = ?;`;
	 		connection.query(getOrderDetails, [customerId], (error, orderResults)=>{
	 			if(error){
	 				throw error;
	 			}
	 			res.json(orderResults)
	 		});

		}	
		
	})
})

module.exports = router;
