import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Button, Grid, TextField, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { postTweet } from '../api';


const styles = theme => ({
  container: {
    display: 'flex',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    marginTop: -12,
    marginLeft: -36,
    color: 'white',
  }
})

class TweetCompose extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      error: null,
      tweetSending: false,
    };
  }

  handleChange = (evt) => {
    this.setState({
      input: evt.target.value,
    });
  }

  handleTweet = (evt) => {
    evt.preventDefault();
    if (this.state.tweetSending) return;

    this.setState({ tweetSending: true, error: null });
    postTweet({
      user: this.props.user,
      profile: this.props.profile,
      content: this.state.input
    })
      .then(() => this.setState({ input: '', tweetSending: false, error: null }))
      .catch(error => {
        this.setState({ tweetSending: false, error });
      });
  }

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <Grid
        container
        alignItems="center"
        spacing={16}
        component="form"
        onSubmit={this.handleTweet}
      >
        <Grid item xs={9}>
          <TextField
            multiline
            rows="4"
            rowsMax="4"
            value={this.state.input}
            onChange={this.handleChange}
            variant="standard"
            fullWidth
            margin="normal"
            label="Compose a new tweet"
            error={error !== null}
            helperText={error === null ? null : error.message}
            autoCapitalize
          />
        </Grid>
        <Grid item xs={3}>
          <div style={{ position: 'relative' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={this.state.tweetSending}
            >
              Tweet
            </Button>
            { this.state.tweetSending &&
              <CircularProgress
                className={classes.progress}
                size={24}
                variant="indeterminate"
              />
            }
          </div>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps({ auth, profile }) {
  return { user: auth.user, profile };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetCompose));