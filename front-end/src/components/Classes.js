import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import GetClasses from '../actions/GetClasses';
import { Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
			console.log(response)
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
				<div id="classes" className='container'>
					<span className="classes">
						<Link to="/shop/Barre"><img src="vinalhaven/barre1.jpg"/></Link>
						<Link to="/shop/Yoga"><img src="vinalhaven/kidsyoga3.jpg"/></Link>
						<Link to="/shop/Yoga"><img src="vinalhaven/yoga1.jpg"/></Link>
						<Link to="/shop/Pilates"><img src="vinalhaven/pilates3.jpg"/></Link>
					</span>	
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