export default function(state = [], action){
	console.log(action.payload)
	if(action.type === "GET_CLASSES"){
		return action.payload
	}else{
		return state;
	}
}