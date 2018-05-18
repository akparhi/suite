import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createHashHistory';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { reactReduxFirebase } from 'react-redux-firebase';
import reducer from 'reducers';

export const history = createHistory();

const initialState = {};
const middleware = [];
const enhancers = [];
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};
const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  firebaseStateName: 'firebase'
};

firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStoreWithFirebase(reducer, initialState, composedEnhancers);

// store.firebaseAuthIsReady.then(() => {
//   console.log('Auth has loaded');
// });

export default store;
