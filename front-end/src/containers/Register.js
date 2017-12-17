import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthAction from '../actions/AuthAction';

class Register extends Component{
	constructor(){
		super();
		this.state = {
			error: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);	

	}
	handleSubmit(event){
		event.preventDefault();
		// console.dir(event.target);
		var formData = {
            name: event.target[0].value,
            email: event.target[1].value,
            accountType: event.target[2].value,
            password: event.target[3].value,
            city: event.target[4].value,
            state: event.target[5].value,
            salesRep: event.target[6].value
        }
        if(formData.name === ""){
        	this.setState({
        		error: "Name field cannot be empty."
        	})
        }else{
        	this.props.authAction(formData);
        }
	}


    componentWillReceiveProps(newProps) {
		console.log(this.props)
		console.log(newProps);
		if(newProps.auth.msg === "registerSuccess"){
			this.props.history.push('/');
		}else if(newProps.auth.msg === "userExists"){
			this.setState({
				error: "This email address is already registered. Please login."
			})
		}

	}
	render(){
		console.log(this.props.auth);
		return(
			<Form id="register" horizontal onSubmit={this.handleSubmit}>
				<h1>{this.state.error}</h1>
					<FormGroup controlId="formHorizontalName" validationState={this.state.nameError}>
						<Col componentClass={ControlLabel} sm={2}>
							Name
						</Col>
						<Col sm={10}>
							<FormControl type="text" name="fullName" placeholder="Full Name" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl type="email" name="email" placeholder="Email" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Account Type
						</Col>
						<Col sm={10}>
							<FormControl type="text" name="type" value="customer" disabled />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" name="password" placeholder="Password" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							City
						</Col>
						<Col sm={10}>
							<FormControl type="text" name="city" placeholder="City" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							State
						</Col>
						<Col sm={10}>
							<FormControl type="text" name="state" placeholder="State" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Sales Rep
						</Col>
						<Col sm={10}>
							<FormControl type="text" name="employee" placeholder="Employee you worked with" />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button bsStyle="primary" bsSize="small" type="submit">
								Register
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
		authAction: AuthAction
	},dispatch)
}

// export default Register;

export default connect(mapStateToProps,mapDispatchToProps)(Register);