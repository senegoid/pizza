import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import withStyles from '@material-ui/core/styles/withStyles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import { Router, Route, Switch, Redirect } from 'react-router-dom'

import routes from '../../routes'

import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'

import styles from './styles'

import users from '../../mock-data/users'


class App extends React.Component {
  state = {
    sidebarIsOpen: isWidthUp('md', this.props.width)
  }
  toggleSideBar = () => {
    this.setState({sidebarIsOpen: !this.state.sidebarIsOpen})
  }
  getCurrentRoute = (r) => {
    let route
    const path = this.props.history.location.pathname
    if(r.routes) route = this.getCurrentRoute(r.routes)
    else route = r.find((f)=>(f.path === path))
    if(route && route.length > 0) route = route[0]
    return route
  }
  renderNavigationRoutes = () => {
    const {classes} = this.props
    const { sidebarIsOpen } = this.state
    const activeRoute = this.getCurrentRoute(routes)
    if (window.location.pathname.endsWith('index.html')) return <Redirect to='/' />
    return (
      <div className={classes.root}>
        <Header toggleSideBar={this.toggleSideBar} title={activeRoute && activeRoute.label}/>
        <Sidebar routes={routes} sidebarIsOpen={sidebarIsOpen} toggleSideBar={this.toggleSideBar} user={users[0]}/>
        {
          flatten(routes).map(route => (
            route.component && route.path
              ? 
              <Route key={route.path} path={route.path} exact={route.exact}
                render={
                  props => (
                    <main
                      className={
                        (isWidthUp('md', this.props.width))
                        ?
                        classNames(classes.content, classes['content-left'], {
                          [classes.contentShift]: sidebarIsOpen,
                          [classes['contentShift-left']]: sidebarIsOpen
                        })
                        :
                        classes.content
                      }
                    >
                      <route.component {...props} sidebarIsOpen={sidebarIsOpen} />
                    </main>
                  )
                }
              />
              : null
          ))
        }
      </div>
    )
  }
  render () {
    return (
      <Router history={this.props.history}>
        <Switch>
          <Route render={this.renderNavigationRoutes} />
        </Switch>
      </Router>
    )
  }
}

function flatten (routes, rootPath) {
  let flatRoutes = []
  routes.forEach(route => {
    const path = (rootPath!==undefined?rootPath.concat(route.path):route.path)
    if (route.routes) flatRoutes.push(...flatten(route.routes, path))
    else if(route.path!==undefined) flatRoutes.push({...route, path})
  })

  return flatRoutes
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
}
export default withStyles(styles, { withTheme: true })(withWidth()(App))