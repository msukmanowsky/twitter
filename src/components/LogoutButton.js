import React, { PureComponent } from 'react';

import { firebase } from '../firebase';


class LogoutButton extends PureComponent {
  render() {
    return (
      <div>
        <button onClick={() => firebase.auth().signOut()}>
          Sign out
        </button>
      </div>
    )
  }
}

export default LogoutButton;