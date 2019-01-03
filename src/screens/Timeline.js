import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, withStyles, ListItem, List } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Tweet from '../components/Tweet';
import { tweetType } from '../types';
import TweetCompose from '../components/TweetCompose';
import * as api from '../api';


const styles = theme => ({
  container: {
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class Timeline extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetsLoaded: false,
    }
  }

  componentDidMount() {
    this.unregisterTweetListener = api.getTweets({
      callback: tweets => {
        console.log('tweets!', tweets);
        this.setState({
          tweets,
          tweetsLoaded: true,
        });
      },
    });
  }

  componentWillUnmount() {
    this.unregisterTweetListener();
  }

  render() {
    const { user, classes } = this.props;
    let { tweets } = this.state;
    tweets = _.map(tweets, (tweet, i) => (
      <ListItem
        key={i}
        alignItems="flex-start"
        disableGutters
      >
        <Tweet uid={user.uid} tweet={tweet} />
      </ListItem>
    ));

    return (
      <div className={classes.container}>
        <TweetCompose onTweet={this.onTweet} />
        <Grid
          container
          spacing={16}
        >
          <Grid
            item
            xs={12}
          >
            <List disablePadding>
              { tweets }
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ auth, profile }) {
  return { user: auth.user, profile };
}

const mapDispatchToProps = {};

const builder = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default builder(Timeline);