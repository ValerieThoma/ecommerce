import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import GetClasses from '../actions/GetClasses';

class Classes extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getClasses();
	}


	render(){
		return(
			<div>
				<h1>classes</h1>
			</div>
		)
	}
}
function mapStateToProps(state){
	return{
		classes: state.classes 
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getClasses: GetClasses
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Classes);