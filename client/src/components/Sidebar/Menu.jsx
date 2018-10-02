import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import _ from 'lodash'

import withStyles from '@material-ui/core/styles/withStyles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import styles from './styles'

const GenerateItem = ({item, nivel, classes, activeRouter}) => {
  const nivelMenu = {className: classNames(
    (nivel > 0 ? classes[`nivelMenu${nivel}`] : null),
    {[classes.activeItem]:item.activeItem}
  )}
  const listItem = (
    <ListItem button {...(item.href ? {component: 'a', href: (item.href), target: '_blank'} : null)} {...nivelMenu} onClick={()=>{activeRouter(item.path)}}>
      {item.icon && <ListItemIcon className={classes.itemIcon}><item.icon /></ListItemIcon>}
      <ListItemText disableTypography primary={item.label} className={classes.itemText} />
    </ListItem>
  )
  const navLink = item.path ? (<NavLink to={item.path}>{listItem}</NavLink>) : listItem
  return navLink
}
const GenerateMenu = ({rotas, nivel, classes, activeRouter}) => {
  return (
    <List className={classes.list}>
      {
        rotas.map((item, key) => {
          if ((item.href || item.path) && item.exact && item.label) return <GenerateItem item={item} key={key} nivel={nivel} classes={classes} activeRouter={activeRouter}  />
          if (item.routes) {
            const nivelMenu = {className: (nivel > 0 ? classes[`nivelMenu${nivel}`] : null)}
            return (
              <React.Fragment key={key}>
                <ListItem className={classes.item} button {...nivelMenu} onClick={()=>{
                  activeRouter(item.path)
                }}>
                  {item.icon && <ListItemIcon className={classes.itemIcon}><item.icon /></ListItemIcon>}
                  <ListItemText disableTypography primary={item.label} className={classes.itemText} />
                  {item.active ? <ExpandLess/> : <ExpandMore />}
                </ListItem>
                <Collapse in={item.active} timeout='auto' unmountOnExit>
                  <GenerateMenu rotas={item.routes} nivel={nivel + 1} classes={classes} activeRouter={activeRouter} />
                </Collapse>
              </React.Fragment>
            )
          }
          if (item.divider) return <Divider key={key} />
          return null
        })
      }
    </List>
  )
}
const pathActive = (path) => {
  if(path){
    const a = (path.split("/").filter(f=>(f!=="")))
    const b = (window.location.pathname.split("/").filter((f=>(f!==""))))
    return _.isEqual(a, b)
  }else return false
}
const prepareRoutes = (routes) => {
  return routes.map((m)=>{
    if(m.divider === undefined){
      if(m.routes) {
        let t = {active: false, ...m, routes: prepareRoutes(m.routes)}
        t.active = t.routes.filter(f => (f.active)).length>0
        return t
      }else return {...m, active: pathActive(m.path), activeItem: pathActive(m.path)}
    }else return m
  })
}
const changeState = (path, routes) => {
  return routes.map((m) => {
    if(m.path === path){
      m.activeItem = true
      m.active = !m.active
    } else m.activeItem = false
    if(m.routes) return {...m, routes: changeState(path, m.routes)}
    return m
  }, routes)
}
const createRootPath = (routes, rootPath) =>{
  return routes.map(route => {
    const path = (rootPath!==undefined?rootPath.concat(route.path):route.path)
    if(route.routes) return {...route, path, routes:createRootPath(route.routes, path)}
    else if(route.path) return {...route, path}
    else return route
  })
}
class Menu extends React.Component {
  state = {routes: prepareRoutes(createRootPath(this.props.routes))}
  activeRouter = (path) =>{
    this.setState({routes: changeState(path, this.state.routes)})
    if(!isWidthUp('md', this.props.width)) this.props.toggleSideBar(false)
  }
  render () {
    const { routes, classes } = this.props
    if (routes.length > 0) { return <GenerateMenu rotas={this.state.routes} nivel={0} classes={classes} activeRouter={this.activeRouter} /> } else { return null }
  }
}

Menu.propTypes = {
  routes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(withWidth()(Menu))
