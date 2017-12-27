import axios from 'axios';



export default function(){
	const ajaxPromise = axios.get(`${window.apiHost}/shop`);
	return{
		type: "GET_CLASSES",
		payload: ajaxPromise
	}
}