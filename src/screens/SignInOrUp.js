import React, { PureComponent } from 'react';
import { ui, uiConfig } from '../firebase';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import '../../node_modules/firebaseui/dist/firebaseui.css';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { authType } from '../types';


const styles = theme => ({
  container: {
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  },
  signInUi: {
    marginBottom: theme.spacing.unit * 2,
  },
  headingCopy: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
  },
  welcomeCopy: {
    marginBottom: theme.spacing.unit * 4,
  },
});

class SignInOrUp extends PureComponent {

  static propTypes = {
    auth: authType.isRequired,
  }

  constructor(props) {
    super(props);
    this.signInButton = React.createRef();
    this.uiConfig = {
      ...uiConfig,
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          if (isNewUser) {
            this.props.history.push('/profile/new');
          } else {
            this.props.history.push('/');
          }
        }
      },
    };
  }

  componentDidMount() {
    ui.start(this.signInButton.current, this.uiConfig);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <Redirect
          to={{ pathname: '/' }}
        />
      );
    }

    const { location, classes } = this.props;
    const mode = location.pathname === '/signin' ? 'signin' : 'signup';
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h3" className={classes.headingCopy}>
            Sign { mode === 'signin' ? 'In' : 'Up' }
          </Typography>
          <Typography variant="body1" className={classes.welcomeCopy}>
            { mode === 'signin' ? "Welcome back, let's do this." : "Get ready to tweet." }
          </Typography>
          <div
            id="signIn"
            className={classes.signInUi}
            ref={this.signInButton}
          />
          <Typography variant="body1">
            { mode === 'signin' ? (
              <React.Fragment>
                Don't have an account?{" "}
                <Link to="/signup">Sign up</Link>.
              </React.Fragment>
            ) : (
              <React.Fragment>
                Already have an account?{" "}
                <Link to="/signin">Sign in</Link>.
              </React.Fragment>
            )}
          </Typography>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) { return {}; }

const builder = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)

export default builder(SignInOrUp);