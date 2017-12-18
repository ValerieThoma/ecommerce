 //A reducer is a FUNCTION that returns a peice of state

 export default function(state =[ ], action){
 	if(action.type === "AUTH_ACTION"){
 		return action.payload.data;
 	}else if(action.type === "LOGOUT"){
 		return [];	
 	}else{
 		return state;
 	}
 }