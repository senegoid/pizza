import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import withStyles from '@material-ui/core/styles/withStyles'

import UserAvatar from '../UserAvatar'

import styleProfile from './styles'

class Profile extends React.Component {
  show = () => {
    this.setState({showList:!this.state.showList})
  }
  state = {showList:false}
  render () {
    const { classes, user } = this.props
    return (
      <Paper className={classes.card} elevation={0}>
        <Grid container wrap='nowrap' spacing={16}>
          <Grid item>
            <UserAvatar avatar={user.avatar} size='58x58'/>
          </Grid>
          <Grid item xs>
            <Grid item xs={12} container>
              <Grid item xs={4} className={classNames(classes.color, classes.RGNumber)}>{user.redeem}</Grid>
              <Grid item xs={8} className={classNames(classes.color, classes.RGText)}>{}</Grid>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={4} className={classNames(classes.color, classes.RGNumber)}>{user.give}</Grid>
              <Grid item xs={8} className={classNames(classes.color, classes.RGText)}>{}</Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="title" gutterBottom className={classNames(classes.color, classes.userName)}>{user.name}</Typography>
        <Typography variant="subheading" gutterBottom className={classNames(classes.color, classes.userEmail)}>{user.email}</Typography>
      </Paper>
    )
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
export default withStyles(styleProfile)(Profile)
