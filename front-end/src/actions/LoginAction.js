import axios from 'axios';


export default function(formData){
	console.log("Login Action is running...");
	// console.log(formData);
	if(formData === 'fake'){  //this is to be removed in production
		var axiosPromise = axios({
			method: "POST",
			url: `${window.apiHost}/fakelogin`,
			data: formData
		});
	}else{
		axiosPromise = axios({
			url: `${window.apiHost}/login`,
			method: "POST",
			data: formData
	})
}
	return{
		type: "AUTH_ACTION",
		payload: axiosPromise
	}
}
