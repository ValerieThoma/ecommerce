import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import ProductRow from '../components/ProductRow';

class Cart extends Component{
	constructor(){
		super();
	}


	componentDidMount() {
		
	}




	makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'YOUR PUBLIC KEY HERE',
            locale: 'auto',
            token: (token) => {
                var theData = {
                    amount: 10 * 100,
                    stripeToken: token.id,
                    userToken: this.props.tokenData,
                }
                $.ajax({
                    method: 'POST',
                    url: window.hostAdress'/stripe',
                    data: theData
                }).done((data) => {
                    console.log(data);
                    if (data.msg === 'paymentSuccess') {

                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Pay Now',
            amount: 10 * 100
        })
    }
}











function mapStateToProps(state){
	return{
		
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);	