import { firebase } from '../firebase';
import { createActions } from 'redux-actions';
import * as api from '../api';


const actions = createActions({
  APP: {
    AUTH: {
      AUTH_STATE_CHANGED: undefined,
      SIGN_OUT: {
        REQUEST: () => dispatch => {
          firebase.auth().signOut()
            .then(() => dispatch({ type: 'APP/AUTH/SIGN_OUT/SUCCESS' }))
            .catch(error => dispatch({ type: 'APP/AUTH/SIGN_OUT/ERROR', payload: { error } }));
        },
        SUCCESS: undefined,
        ERROR: undefined
      }
    },
    PROFILE: {
      CREATE: {
        REQUEST: ({ user, handle, displayName }) => dispatch => {
          // Check if a profile with the same handle already exists
          api.createProfile({ uid: user.uid, handle, displayName })
            .then(() => dispatch({ type: 'APP/PROFILE/CREATE/SUCCESS' }))
            .catch(error => dispatch({ type: 'APP/PROFILE/CREATE/ERROR', payload: { error } }));
        },
        SUCCESS: undefined,
        ERROR: undefined,
      },
      GET: {
        REQUEST: ({ user }) => dispatch => {
          api.getProfile({ user })
            .then(profile => dispatch({ type: 'APP/PROFILE/GET/SUCCESS', payload: { profile } }))
            .catch(error => dispatch({ type: 'APP/PROFILE/GET/ERROR', payload: { error }}))
        },
        SUCCESS: undefined,
        ERROR: undefined,
      }
    }
  }
});

export default actions;