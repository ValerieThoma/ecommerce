import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';

//createStore needs a reducer. More specifically a root reducer.
import RootReducer from './reducers/RootReducer';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//we have set up redux, now we need a way to tell react about it.




ReactDOM.render(
	<Provider store={theStore}>
		<App />
	</Provider>,	 
	document.getElementById('root'));

