import React from 'react'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import Menu from '@material-ui/icons/Menu'
import Settings from '@material-ui/icons/Settings'

import styles from './styles'

const Header = ({ classes, toggleSideBar, title }) => (
  <AppBar position='absolute' className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <IconButton className={classes.menuButton} color='inherit' aria-label='Menu' onClick={toggleSideBar}>
        <Menu />
      </IconButton>
      <Typography variant='title' color='inherit' noWrap className={classes.flexTitle}>{title || 'Pizza'}</Typography>
      <IconButton color='inherit' className={classes.menuButton}>
        <Settings />
      </IconButton>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  toggleSideBar: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(Header)
