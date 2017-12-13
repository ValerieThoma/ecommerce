// an action is a JavaScript function that returns an object.
// That object MUST have a property of TYPE!
import axios from 'axios';

export default function(formData){
	console.log("Auth Action is running...");
	console.log(formData);
	var axiosPromise = axios({
		url: `${window.apiHost}/register`,
		method: "POST",
		data: formData
	})
	//our reduxPromise middelware will kick in b/c the payload value is a promise
	return{
		type: "AUTH_ACTION",
		payload: axiosPromise
	}
}