import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import ProductRow from '../components/ProductRow';
import { bindActionCreators } from 'redux';
import {Link, Route} from 'react-router-dom';
// import GetProductLines from '../actions/GetProductLines';
// import LoginAction from '../actions/LoginAction';
import Orders from './Orders';
import Information from './Information';

class Account extends Component{
	// constructor(){
	// 	super();
	// }

	componentDidMount(){

	}
	componentWillReceiveProps(newProps){

	}

	
	render(){
		console.log(this.props.match);
		return(
			<div id="account">
				<h1>Account Page</h1>
				<p><Link to='/account/orders'>Orders</Link></p>
				<p><Link to='/account/information'>Account information</Link></p>
				<div>
					<Route path='/account/orders' component={Orders} />
					<Route exact path='/account/information' component={Information} />
					<Route exact path='/account/orderDetails' component={Orders} />
				</div>	
			</div>
		)
	}

}
function mapStateToProps(state){
// key = this.props.key
// value = propety of RootReducer
	return{
		auth: state.auth
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
	
	},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);
// export default NavBar;