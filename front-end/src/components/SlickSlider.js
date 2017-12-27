import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




class SlickSlider extends Component{
	render(){
		const settings = {
			dots: true,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true
		}
		return(
			<div>
				<Slider {...settings}>
					<div className="slider-images"><img className="slick-image" src="/slider-images/studio.jpg" alt=""/></div>
					<div className="slider-images"><img className="slick-image" src="/slider-images/ext1.jpg" alt=""/></div>
					<div className="slider-images"><img className="slick-image" src="/slider-images/ext2.jpg" alt=""/></div>
				</Slider>
			</div>
		)
	}
}




export default SlickSlider;