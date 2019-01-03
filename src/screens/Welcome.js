import React from 'react';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const styles = theme => ({
  container: {
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '80vh',
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
});

class Welcome extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const SignIn = props => <Link to="/signin" {...props} />;
    const SignUp = props => <Link to="/signup" {...props} />;
    return (
      <div className={classes.container}>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Twitter
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              See what’s happening in the world right now. Follow your interests.
              Hear what people are talking about. Join the conversation.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} color="primary" justify="center">
                <Grid item>
                  <Button
                    component={SignUp}
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={SignIn}
                    variant="outlined"
                    color="default"
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Welcome);