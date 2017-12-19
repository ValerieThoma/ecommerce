import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import CartRow from '../components/CartRow';
import GetCart from '../actions/GetCart';
import axios from 'axios';

class Cart extends Component{
    constructor(){
        super();
        this.makePayment = this.makePayment.bind(this);
    }
	
	componentDidMount() {
	   console.log(this.props.auth);
       if(this.props.auth.token === undefined){
            // this.props.history.push('/login');
       }else{
            this.props.getCart(this.props.auth.token);
       }
	}




	makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_y7KQVCBeDnUCufGXzj24pZPf',
            locale: 'auto',
            image: "http://hddfhm.com/images/she-ra-clipart-3.gif",
            token: (token) => {
                var theData = {
                    amount: Math.round(this.props.cart.totalPrice * 100),
                    stripeToken: token.id,
                    userToken: this.props.auth.token,
                }
                axios({
                    method: 'POST',
                    url: `${window.apiHost}/stripe`,
                    data: theData
                }).then((response) => {
                    console.log(response);
                    if (response.data.msg === 'paymentSuccess') {
                        this.props.history.push('/thankyou')
                    }else{
                        console.log(response.data.msg)
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'SHOW ME THE MONEY!',
            amount: this.props.cart.totalPrice * 100 //the total is in pennies  
        })
    }

    render(){
        if(!this.props.cart.totalItems){
            return(
                <div id="getCart">
                    <h1>Cart is empty, Shop 'til you Drop!</h1>
                </div>
            )
        }else{
            var cartArray = this.props.cart.products.map((product, index)=>{
                return(
                    <CartRow key={index} product={product} />
                )
            })
            return(
                <div id="getCart">
                    <h2>Your order total is: ${this.props.cart.totalPrice} <button className="btn btn-success" onClick={this.makePayment}>Checkout</button></h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartArray}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}




function mapStateToProps(state){
	return{
		auth: state.auth,
        cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCart: GetCart
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);	