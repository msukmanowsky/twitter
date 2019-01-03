import React, { Component, PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class AuthenticatedRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.instanceOf(Component),
    ]).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;

    return (
    <Route
        {...rest}
        render={props => isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: '/login', state: { from: props.location }}}
          />
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);


