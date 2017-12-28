import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { bindActionCreators } from 'redux';
import GetClasses from '../actions/GetClasses';

class Classes extends Component{
	// constructor(props){
	// 	super(props);
	// 	// this.state = {
	// 	// 	classesList: []
	// 	// }
	// 	// this.getClasses = this.getClasses.bind(this);
	// }

	// getClasses(props){
	// 	const url = `${window.apiHost}/shop`;
	// 	axios.get(url)
	// 	.then((response)=>{
	// 		// console.log(response);
	// 		this.setState({
	// 			classesList: response.data.image.data
	// 		})
	// 	});
	// }

	// componentDidMount(){
	// 	this.getClasses(this.props);
	// }

	// componentWillReceiveProps(newProps){
	// 	this.getClasses(newProps);
	// }

	render(){
		// console.log(this.props.match.params)
		return(
			<div>
				<h1>classes</h1>
			</div>
		)
	}
}
// function mapStateToProps(state){
// 	return{
// 		classes: state.classes 
// 	}
// }

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getClasses: GetClasses
	},dispatch)
}

export default connect(null,mapDispatchToProps)(Classes);