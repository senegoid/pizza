import { headerMdHeight, headerSmHeight, drawerWidth } from '../../assets/themes'
export default (theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    overflow: 'auto',
    marginTop: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('md')]: {
      marginTop: headerMdHeight
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: headerSmHeight
    }
  },
  'content-left': {
    marginLeft: -drawerWidth
  },
  'content-right': {
    marginRight: -drawerWidth
  },
  content2Shift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'contentShift-left': {
    marginLeft: 0
  },
  'contentShift-right': {
    marginRight: 0
  }
})
