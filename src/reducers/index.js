import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

//reducers

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

export default rootReducer;
