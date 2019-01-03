import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authType } from '../types';


class ConditionalAuthenticatedRoute extends PureComponent {
  static propTypes = {
    routeProps: PropTypes.object.isRequired,
    auth: authType.isRequired,
    authStateUnknownComponent: PropTypes.func.isRequired,
    authenticatedComponent: PropTypes.func.isRequired,
    anonymousComponent: PropTypes.func.isRequired,
  }

  render() {
    const {
      auth,
      authenticatedComponent,
      anonymousComponent,
      authStateUnknownComponent,
      routeProps,
      ...props
    } = this.props;

    let Component;
    if (!auth.authStateKnown) {
      Component = authStateUnknownComponent;
    } else {
      Component = auth.isAuthenticated ? authenticatedComponent : anonymousComponent;
    }

    return (
      <Route {...routeProps}>
        <Component {...props} />
      </Route>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {})(ConditionalAuthenticatedRoute);