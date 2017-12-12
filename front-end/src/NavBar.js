import React, { Component } from 'react';

class NavBar extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div id="navbar">
				<nav className="navbar navbar-default navbar-fixed-top">
              		<div className="container-fluid navbar-white"    >
              			<div className="container">
		            		<ul className="nav navbar-nav">
		            		 	<li>Home</li>
		            		 	<li>Shop</li>
		            		 	<li>About Us</li>
		            		 	<li>Contact Us</li>
		            		</ul>
                		</div>
                	</div>
                	<div className="container-fluid sub-nav">
                		<div className="container">
                			<div className="navbar-header">
                				 ClassicModels Logo
                			</div>	
                			<div className="nav navbar-nav pull-right">
                				<ul>
                					<li>Sign In or Create Account</li>
                					<li>(0) items in cart | ($0.00)</li>
                				</ul>
                			</div>	
                		</div>
                	</div>	
                </nav>	
			</div>
		)
	}
}

export default NavBar;