import axios from 'axios';


export default function(userToken, productCode){
	// console.log(userToken, productCode);
	console.log("Update cart running");
	const thePromise = axios({
		method: "POST",
		url: `${window.apiHost}/updateCart`,
		data:{
			userToken,
			productCode
		}
	})
	return{
		type: "UPDATE_CART",
		payload: thePromise
	}
}
