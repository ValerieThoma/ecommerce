import React from 'react';

export default (props)=>{
	console.log(props);
	const orderNumber = props.routeProps.match.params.orderNumber;
	const thisOrder = props.orders[orderNumber];
	var totalOrder = 0;
	const orderDetails = thisOrder.map((item,index)=>{
		totalOrder += item.priceEach + item.quantityOrdered;
		return(
			<tr key={index}>
				<td>{item.item}</td>
				<td>{item.productCode}</td>
				<td>{item.priceEach}</td>
				<td>{item.quantityOrdered}</td>
			</tr>
		)
	})
	return(
			<table>
				<thead>
					<th>Item</th>
					<th>Item Number</th>
					<th>Price</th>
					<th>Quantity</th>
				</thead>
				<tbody>
					{orderDetails}
					<tr>
						<td colspan='4'><h1>${totalOrder}</h1></td>
					</tr>
				</tbody>
			</table>
	)
}