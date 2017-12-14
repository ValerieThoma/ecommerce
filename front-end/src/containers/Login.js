import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthAction from '../actions/AuthAction';
import LoginAction from '../actions/LoginAction';

class Login extends Component{
	constructor(){
		super();
		this.state = {
			error: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);	

	}

	componentWillReceiveNewPRops(newProps){
		if(newProps.auth.msg === "wrongPassword"){
			this.setState({
				error: "This password doesn not match"
			});
		}else if(newProps.auth.msg === "badUser"){
			this.setState({
				error: "We do not have an account for this email"
			})
		}else if(newProps.auth.msg === "loginSuccess"){
			newProps.history.push('/');
		}
	}

	handleSubmit(event){
		event.preventDefault();
		// console.dir(event.target);
		const email = event.target[0].value;
		const password = event.target[1].value;
		const formData = {
			email: email,
			password: password
		}
		this.props.loginAction(formData);
    }



	render(){
		console.log(this.props.auth);
		return(
			<Form horizontal onSubmit={this.handleSubmit}>
				<h1>{this.state.error}</h1>
					<FormGroup controlId="formHorizontalName" validationState={this.state.error}>
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl required="true" type="email" name="email" placeholder="Email" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl required="true" type="password" name="password" placeholder="Password" />
						</Col>
					</FormGroup>				
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button bsStyle="primary" bsSize="small" type="submit">
								Login
							</Button>
						</Col>
					</FormGroup>
				</Form>

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
		loginAction: LoginAction
	},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);