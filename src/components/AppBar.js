import React, { Component } from 'react';
import {
  AppBar as MUIAppBar,
  Avatar,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import { authType } from '../types';


const styles = theme => ({
  flexGrow: {
    flexGrow: 1
  },
  logo: {
    textDecoration: 'none',
    textTransform: 'none',
  },
  signInButton: {
    margin: theme.spacing.unit,
  },
  avatar: {
    cursor: 'pointer',
  },
});

class AppBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    auth: authType.isRequired,
    handleSignOut: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleProfileMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes, auth } = this.props;
    let authButtons = null;
    if (auth.authStateKnown && auth.user !== null) {
      const isProfileMenuOpen = this.state.anchorEl !== null;
      authButtons = (
        <React.Fragment>
          { typeof auth.user.photoURL === 'string' ? (
            <Avatar
              className={classes.avatar}
              src={auth.user.photoURL}
              onClick={this.handleProfileMenuOpen}
            />
          ) : (
            <IconButton
              onClick={this.handleProfileMenuOpen}
            >
              <Icon>
                account_circle
              </Icon>
            </IconButton>
          )}
          <Menu
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={this.state.anchorEl}
            open={isProfileMenuOpen}
            onClose={this.handleProfileMenuClose}
          >
            <MenuItem onClick={this.props.handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </React.Fragment>
      );
    } else if (auth.authStateKnown && auth.user === null) {
      const SignInLink = props => <Link to="/signin" {...props} />;
      const SignUpLink = props => <Link to="/signup" {...props} />;
      authButtons = (
        <React.Fragment>
          <Button
            color="inherit"
            className={classes.signInButton}
            component={SignInLink}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={SignUpLink}
          >
            Sign Up
          </Button>
        </React.Fragment>
      );
    }

    const HomeLink = props => <Link to="/" {...props} />;
    return (
      <div className={classes.flexGrow}>
        <MUIAppBar position="static">
          <Toolbar>
            <Button
              component={HomeLink}
              variant="text"
              color="inherit"
              style={{ textTransform: 'none' }}
              disableRipple
              disableFocusRipple
            >
              Twitter
            </Button>
            <div className={classes.flexGrow}></div>
            { authButtons }
          </Toolbar>
        </MUIAppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSignOut: () => dispatch(actions.app.auth.signOut.request()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppBar));