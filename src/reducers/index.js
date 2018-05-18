import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

//reducers
import modal from 'reducers/modal';

const rootReducer = combineReducers({
  modal,
  firebase: firebaseReducer
});

export default rootReducer;
