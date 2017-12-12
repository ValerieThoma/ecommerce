// //this is the master or root reducer.
// //each reducer contains a peice of state. 
// //the root reducer contains all the reducers, i.e., the root reducer contains ALL peices of state
// //or the entire application state. 

// in order to get all the 'little' reducers or peices of state
// into one big, 'root' reducer, we need the combineReducers method from redux
import { combineReducers } from 'redux';

// import each individual reducer to hand to combineReducers
// first: AuthReducer
import AuthReducer from './AuthReducer';

//combreducers takes an object as an argument, that arg has key:value pair ... will return a value
const rootReducer = combineReducers({	
	auth: AuthReducer
})


export default rootReducer;