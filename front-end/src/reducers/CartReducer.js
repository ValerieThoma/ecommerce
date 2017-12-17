export default function(state = [], action){
	if(action.type === "UPDATE_CART"){
		return action.payload.data
	}else{
		return state;
	}
}