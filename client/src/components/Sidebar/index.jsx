import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import {Hidden, Drawer, Divider} from '@material-ui/core'

import Menu from './Menu'
import Profile from '../Profile'

import styles from './styles'

const SideBar = ({ classes, theme, routes, sidebarIsOpen, toggleSideBar, user }) => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.toolbar} />
      <Hidden mdUp className={classes.menu}>
        <Drawer variant='temporary' anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={sidebarIsOpen} onClose={toggleSideBar}
          classes={{paper: classes.drawerPaper}} className={classes.drawer} ModalProps={{keepMounted: true}}
        >
          <Profile user={user} />
          <Divider />
          <Menu routes={routes} toggleSideBar={toggleSideBar} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css' className={classes.menu}>
        <Drawer variant='persistent' open={sidebarIsOpen} classes={{paper: classes.drawerPaper}} className={classes.drawer}>
          <Profile user={user} />
          <Divider />
          <Menu routes={routes} toggleSideBar={toggleSideBar} />
        </Drawer>
      </Hidden>
    </div>
  )
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  sidebarIsOpen: PropTypes.bool.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default withStyles(styles, { withTheme: true })(SideBar)
