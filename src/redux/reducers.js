import { handleActions } from 'redux-actions';
import actions from './actions';

import defaultState from './defaultState';

const rootReducer = handleActions({
  [actions.app.auth.authStateChanged]: (state, action) => ({
    ...state,
    auth: {
      user: action.payload.user,
      authStateKnown: action.payload.authStateKnown,
      isAuthenticated: !!action.payload.user,
    },
  }),

  [actions.app.profile.get.success]: (state, action) => ({
    ...state,
    profile: action.payload.profile,
  }),

}, defaultState);

export default rootReducer;