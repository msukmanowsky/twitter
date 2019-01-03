import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  withStyles,
  CardHeader,
  CardActions,
  CardContent,
  Icon,
  IconButton,
  Typography
} from '@material-ui/core';
import * as moment from 'moment';
import _ from 'lodash';
import Linkify from 'react-linkify';

import { tweetType } from '../types';
import * as api from '../api';


const styles = theme => ({
  card: {
    flexGrow: 1,
  }
});

class Tweet extends PureComponent {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    tweet: tweetType.isRequired,

    handleFavorite: PropTypes.func,
  }

  handleFavorite = () => {
    const { uid, tweet } = this.props;
    const hasFavorited = _.includes(tweet.favorites, uid);
    const func = hasFavorited ? api.unFavoriteTweet : api.favoriteTweet;

    func({ tweetId: tweet.id, uid })
  }

  render() {
    const {
      uid,
      classes,
      tweet,
    } = this.props;
    const { profile, favorites, timestamp, content } = tweet;
    const hasFavorited = _.includes(favorites, uid);
    const canFavorite = tweet.uid !== uid;

    return (
      <Card
        className={classes.card}>
        <CardHeader
         title={profile.displayName}
         titleTypographyProps={{ variant: 'h6' }}
         subheader={moment(timestamp.toDate()).fromNow()}
         action={
           <IconButton aria-label="Favorite tweet">
             <Icon>
               more_vert
             </Icon>
           </IconButton>
         }
        />
        <CardContent>
          <Typography component="p">
            <Linkify
              properties={{ target: '_blank' }}
            >
              { content }
            </Linkify>
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton
            onClick={this.handleFavorite}
            disabled={!canFavorite}
          >
            <Icon>
              { hasFavorited ? 'favorite' : 'favorite_border' }
            </Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Tweet);