import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase';
import { CssBaseline } from '@material-ui/core';
import AppBar from './components/AppBar';
import { store, actions } from './redux';
import routes from './routes';
import ConditionalAuthenticatedRoute from './components/ConditionalAuthenticatedRoute';
import Loading from './screens/Loading';

class App extends Component {

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      store.dispatch(actions.app.auth.authStateChanged({ user, authStateKnown: true }));
      if (user) {
        store.dispatch(actions.app.profile.get.request({ user }));
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const Routes = routes.map((route, i) => {
      const { authenticatedComponent, anonymousComponent, ...routeProps } = route;
      if (typeof authenticatedComponent !== 'undefined') {
        return (
          <ConditionalAuthenticatedRoute
            key={i}
            routeProps={routeProps}
            authStateUnknownComponent={Loading}
            anonymousComponent={anonymousComponent}
            authenticatedComponent={authenticatedComponent}
          />
        );
      }

      return (
        <Route
          key={i}
          {...routeProps}
        />
      );
    });

    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <CssBaseline />
            <AppBar />
            <Switch>
              { Routes }
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
