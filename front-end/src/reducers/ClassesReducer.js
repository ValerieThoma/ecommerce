export default function(state = [], action){
	if(action.type === "GET_CLASSES"){
		return action.payload.data
	}else{
		return state;
	}
}