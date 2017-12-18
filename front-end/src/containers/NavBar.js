import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GetProductLines from '../actions/GetProductLines';
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';
// import GetCart from '../actions/GetCart';

class NavBar extends Component{
	constructor(){
		super();
		this.fakeLogin = this.fakeLogin.bind(this);
	}

	fakeLogin(){
		this.props.loginAction('fake');
	}

	componentDidMount(){
		this.props.getProductLines();
	}

	
	render(){
		// console.log(this.props.cart);
		if(this.props.auth.name !== undefined){
			if(this.props.cart.totalPrice !== undefined){
				const totalPrice = this.props.cart.totalPrice.toFixed(2);
				const totalItems = this.props.cart.totalItems;
				var cartText = `(${totalItems}) itmes in your cart | ($${totalPrice})`;
			}else{
				const cartText = "Your cart is empty";
			}
			var rightMenuBar = [
				<li key={1} className="">Welcome, {this.props.auth.name}</li>,
				<li key={2}><Link to="/cart">{cartText}</Link></li>,
				<li key={3}><Link to="/logout">Logout</Link></li>
			]
		}else{
			rightMenuBar = [

				<li key={0}><button className="btn btn-primary" onClick={this.fakeLogin}>FAKE LOGIN</button></li>,
				<li key={1}><Link to="/login"> Sign In </Link> or <Link to="/register">Create Account</Link></li>,
            	<li key={2}><Link to="/cart">(0) items in cart</Link> |<Link to="/total"> ($0.00)</Link></li>
			]
		}
		// console.log(this.props.auth);
		// console.log(this.props.productLines);
		var shopMenu = this.props.productLines.map((pl, index)=>{
			const safeLink = encodeURIComponent(pl.productLine);
			// console.log(safeLink);
            return(<Link key={index} to={`/shop/${safeLink}`}>{pl.productLine}</Link>);
        });
		return(
			<div id="navbar">
				<nav className="navbar navbar-fixed-top">
              		<div className="container-fluid navbar-default">
              			<div className="container">
		            		<ul className="nav navbar-nav">
		            		 	<li><Link to="/">Home</Link></li>
		            		 	<li className="dropdown">
                                    <Link to="/shop"><i className="arrow down"/>Shop</Link>
                                    <ul>
                                        <li className="dropdown-links">
                                            {shopMenu}
                                        </li>
                                    </ul>
                                </li>
		            		 	<li><Link to="/about">About Us</Link></li>
		            		 	<li><Link to="/contact">Contact Us</Link></li>
		            		</ul>
		            		<form className="pull-right" id="search-form" onSubmit={this.handleSubmit}>
								<input type="text" id="search-item" placeholder="Type here to search"/>
								<button className="search" type="submit"><img src={"/searchImg.png"} alt=""/></button>
							</form>
                		</div>
                	</div>
                	<div className="container-fluid sub-nav">
                		<div className="container">
                			<div className="navbar-header">
                				 <img className="logo" alt="" src="/classicLogo.png"/>
                			</div>	
                			<div className="nav navbar-nav pull-right right-menu">
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
		productLines: state.pl,
		cart: state.cart
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getProductLines: GetProductLines,
		loginAction: LoginAction
	},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
// export default NavBar;