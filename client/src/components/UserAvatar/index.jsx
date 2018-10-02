import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'

import Avatar from '@material-ui/core/Avatar'

import styles from './styles'

const UserAvatar = ({ classes, size, border, name, avatar, group }) => {
  let initials
  if (!avatar && name) {
    const t = name.match(/\b\w/g) || []
    initials = ((t.shift() || '') + (t.pop() || '')).toUpperCase()
  }
  if (!avatar && group) initials = group
  return (
    avatar
      ? <Avatar alt={name} src={avatar} className={
        classNames({
          [classes[size]]: size,
          [classes.border]: border,
          [classes.border36]: (size === '36x36' && border)
        })
      } />
      : <Avatar className={
        classNames({
          [classes[size]]: size,
          [classes.group]: group
        }, classes.color)}>
        {initials}
      </Avatar>
  )
}
UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  group: PropTypes.array,
  avatar: PropTypes.string,
  size: PropTypes.oneOf(['58x58', '48x48', '36x36']),
  border: PropTypes.bool
}
export default withStyles(styles)(UserAvatar)
