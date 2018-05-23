import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

//reducers
import modal from 'reducers/modal';

const appReducer = combineReducers({
  modal,
  firebase: firebaseReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
