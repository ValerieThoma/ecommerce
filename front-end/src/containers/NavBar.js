import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GetProductLines from '../actions/GetProductLines';
import { bindActionCreators } from 'redux';

class NavBar extends Component{
	constructor(){
		super();
	}

	componentDidMount(){
		this.props.getProductLines();
	}

	componentWillReceiveNewProps(newProps){
		// if(newProps.auth.name != undefined){

		// }
	}
	render(){
		if(this.props.auth.name != undefined){
			var rightMenuBar = [
				<li key={1} className="">Welcome, {this.props.auth.name}</li>,
				<li key={2}><Link to="/cart">(0) items in your cart | ($000)</Link></li>,
				<li key={3}><Link to="/logout">Logout</Link></li>
			]
		}else{
			var rightMenuBar = [
				<li key={1}><Link to="/login"> Sign In </Link> or <Link to="/register">Create Account</Link></li>,
            	<li key={2}><Link to="/cart">(0) items in cart</Link> |<Link to="/total"> ($0.00)</Link></li>
			]
		}
		console.log(this.props.auth);
		console.log(this.props.productLines);
		return(
			<div id="navbar">
				<nav className="navbar navbar-default navbar-fixed-top">
              		<div className="container-fluid navbar-white"    >
              			<div className="container">
		            		<ul className="nav navbar-nav">
		            		 	<li><Link to="/">Home</Link></li>
		            		 	<li><Link to="/shop">Shop</Link></li>
		            		 	<li><Link to="/about">About Us</Link></li>
		            		 	<li><Link to="/contact">Contact Us</Link></li>
		            		</ul>
                		</div>
                	</div>
                	<div className="container-fluid sub-nav">
                		<div className="container">
                			<div className="navbar-header">
                				 ClassicModels Logo
                			</div>	
                			<div className="nav navbar-nav pull-right">
                			 {rightMenuBar}
                			</div>	
                		</div>
                	</div>	
                </nav>	
			</div>
		)
	}

}
	function mapStateToProps(state){
	// key = this.props.key
	// value = propety of RootReducer
	return{
		auth: state.auth,
		productLines: state.pl
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getProductLines: GetProductLines
	},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
// export default NavBar;