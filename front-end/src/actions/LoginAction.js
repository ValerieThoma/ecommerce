import axios from 'axios';


export default function(formData){
	console.log("Login Action is running...");
	// console.log(formData);
	var axiosPromise = axios({
		url: `${window.apiHost}/login`,
		method: "POST",
		data: formData
	})
	return{
		type: "AUTH_ACTION",
		payload: axiosPromise
	}
}