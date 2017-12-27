import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import Order from '../components/Order';

class Orders extends Component{

	constructor(){
		super();
		this.state = {
			myOrders: {}
		}
	}

	componentDidMount(){
		// console.log(this.props.auth.token);
		// Only submit the request to express if they DO have a token
		if(this.props.auth.token !== undefined){
			const thePromise = axios({
				method: "POST",
				url: `${window.apiHost}/orders/get`,
				data: {
					userToken: this.props.auth.token
				}
			});

			thePromise.then((response)=>{
				const orderNumbers = {};
				response.data.forEach((order)=>{
				const key = order.orderNumber;
				if(orderNumbers[key] === undefined){
					orderNumbers[key] = [];
				}
				orderNumbers[key].push(order);
			});
				console.log(orderNumbers)
				console.log(response.data);
				this.setState({
					myOrders: orderNumbers
					})
				});
			}
		}
	render(){
		if(this.props.auth.token === undefined){
			return(
				<h1>Please <Link to="/login">login</Link> to view your cart</h1>
			)
		}
		var ordersByNumber = [];
		for(var key in this.state.myOrders){
			const thisOrder = this.state.myOrders[key];
			console.log(this.state.myOrders[key]);
			ordersByNumber.push(
				<td>
					<tr>
						<Link to={`/account/orders/${key}`}>{key}</Link>
					</tr>
				</td>	
			)}	
		return(
			<div>
				<h1>Orders</h1>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Order Number</th>
						</tr>
					</thead>
					<tbody>
						{ordersByNumber}
					</tbody>
				</table>
				<Route exact path='/account/orders/:orderNumber' render={(props) => (
                    <Order routeProps={props} orders={this.state.myOrders}/>
               )}/>
			</div>


		)
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Orders);