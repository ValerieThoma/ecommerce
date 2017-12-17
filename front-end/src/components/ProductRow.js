import React from 'react';


function ProductRow(props){
	const product = props.product;
	const buyPrice = product.buyPrice.toFixed(2);
	const MSRP = product.MSRP.toFixed(2);
	if(props.token === undefined){
		//not logged in
		var button = "";
	}else{
		var button = <button className="btn btn-warning" onClick={()=>{
			props.addToCart(props.token, product.productCode)
		}}
		>Add To Cart</button>
	}
	if(product.quantityInStock > 100){
		var inStockClass = "";
		var inStock = "In Stock!"
	}else if(product.quantityInStock > 0){
		var inStockClass = "bg-warning";
		var inStock = 'Order Soon!'
	}else{
		var inStockClass = "bg-danger";
		var inStock = 'Out of stock!'
	}

	return(
		<tr>
			<td>{product.productName}</td>
			<td>{product.productScale}</td>
			<td>{product.productVendor}</td>
			<td>{product.productDescription}</td>
			<td className={inStockClass}>{inStock}</td>
			<td>${buyPrice}</td>
			<td>${MSRP}</td>	
			<td>{button}</td>		
		</tr>
	)
};





export default ProductRow;