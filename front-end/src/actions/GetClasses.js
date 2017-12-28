import axios from 'axios';



export default function(){
	console.log("classes action");
	const ajaxPromise = axios.get(`${window.apiHost}/shop`);
	return{
		type: "GET_CLASSES",
		payload: ajaxPromise
	}
}