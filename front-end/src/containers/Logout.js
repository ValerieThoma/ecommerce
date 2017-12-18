import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthAction from '../actions/AuthAction';
import LogoutAction from '../actions/LogoutAction';

class Logout extends Component{
	constructor(){
		super();
	}

	componentDidMount(){
		this.props.logoutAction();
		this.props.history.push('/');
	}

	render(){
		// console.log(this.props.auth);
		return(
			<div>
				Logging out...
			</div>

		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		logoutAction: LogoutAction
	},dispatch)
}


export default connect(null,mapDispatchToProps)(Logout);