import React, { PureComponent } from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';


const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class Loading extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }
}

export default withStyles(styles)(Loading);