import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import GetClasses from '../actions/GetClasses';

class Classes extends Component{
	constructor(props){
		super(props);
		this.state = {
			classesList: []
		}
		this.getClasses = this.getClasses.bind(this);
	}

	getClasses(props){
		const url = `${window.apiHost}/shop`;
		axios.get(url)
		.then((response)=>{
			// console.log(response)
			this.setState({
				classesList: response.data
			})
		});
	}

	componentDidMount(){
		this.getClasses(this.props);
	}

	// componentWillReceiveProps(newProps){
	// 	this.getClasses(newProps);
	// 	console.log(newProps)
	// }

	render(){
		console.log(this.state.classesList)
		const display = [];
		const products = this.state.classesList.map((product)=>{
			display.push(product.image.data)

		console.log(display)	
		})
		return(
				<div>
	
				</div>
			)
	}
}
function mapStateToProps(state){
	return{
		classes: state.classes 
	}
}

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators({
// 		getClasses: GetClasses
// 	},dispatch)
// }

export default connect(mapStateToProps)(Classes);