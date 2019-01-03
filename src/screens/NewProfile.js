import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles, Paper, Typography, TextField, InputAdornment, Button, Grid} from '@material-ui/core';

import { isProfileHandleTaken, createProfile } from '../api';


const styles = theme => ({
  container: {
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    minHeight: 600,
  },
  headingCopy: {
    marginBottom: theme.spacing.unit,
  },
  explainerCopy: {
    marginBottom: theme.spacing.unit * 2,
  },
  input: {
    margin: `${theme.spacing.unit * 2}px 0`,
  }

});


class NewProfile extends Component {

  constructor(props) {
    super(props);
    this.handleRe = /^[A-Za-z0-9]{3,15}$/;
    this.displayNameRe = /^[A-Za-z0-9- ]{1,50}$/;
    this.state = {
      handle: '',
      isHandleValid: null,
      handleError: null,

      displayName: '',
      isDisplayNameValid: null,
      displayNameError: null,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.isHandleValid !== true || this.state.isDisplayNameValid !== true) {
      return;
    }

    createProfile({
      uid: this.props.auth.user.uid,
      handle: this.state.handle,
      displayName: this.state.displayName,
    })
      .then(() => this.props.history.push('/'))
      .catch(console.error);
  }

  handleChange = name => event => {
    const value = event.target.value;
    this.setState({
      [name]: value,
    }, () => this.validateField(name, value));
  }

  validateField = (name, value) => {
    switch (name) {
      case 'handle':
        if (!this.handleRe.test(value)) {
          this.setState({
            isHandleValid: false,
            handleError: "Handles must be between 3 and 15 characters and can only contain letters and numbers (no spaces).",
          });
        } else {
          isProfileHandleTaken(this.state.handle)
            .then(isTaken => {
              if (isTaken) {
                this.setState({
                  isHandleValid: false,
                  handleError: `Sorry, ${this.state.handle} is already taken.`,
                });
              } else {
                this.setState({
                  isHandleValid: true,
                  handleError: null,
                });
              }
            })
          this.setState({
            isHandleValid: true,
            handleError: null,
          });
        }
        break;
      case 'displayName':
        if (!this.displayNameRe.test(value)) {
          this.setState({
            isDisplayNameValid: false,
            displayNameError: "Display names have to be between 1 and 50 characters and can only contain letters, numbers and spaces.",
          });
        } else {
          this.setState({
            isDisplayNameValid: true,
            displayNameError: null,
          });
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;

    // TODO: Redirect if already has a profile
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h2" className={classes.headingCopy}>
            New Profile
          </Typography>
          <Typography variant="body1" className={classes.explainerCopy}>
            Before you start tweetting, you'll need to give yourself a sweet
            handle.
          </Typography>
          <form
            noValidate
            autoComplete="off"
            autoCorrect="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              label="Handle"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    @
                  </InputAdornment>
                )
              }}
              className={classes.input}
              helperText={this.state.handleError || "This is how people will refer to you in tweets (you can change it later)."}
              value={this.state.handle}
              onChange={this.handleChange('handle')}
              error={this.state.isHandleValid === null ? false : !this.state.isHandleValid}

            />
            <TextField
              label="Display Name"
              fullWidth
              helperText={this.state.displayNameError || "People will see this name when you tweet."}
              className={classes.input}
              value={this.state.displayName}
              onChange={this.handleChange('displayName')}
              error={this.state.isDisplayNameValid === null ? false : !this.state.isDisplayNameValid}
            />
            <Grid container direction="row-reverse">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={this.state.isHandleValid !== true || this.state.isDisplayNameValid !== true}
                >
                  Create Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const builder = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default builder(NewProfile);