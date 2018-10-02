import { headerMdHeight, headerSmHeight } from '../../assets/themes'

export default (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('md')]: {
      height: headerMdHeight
    },
    [theme.breakpoints.down('sm')]: {
      height: headerSmHeight
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    minHeight: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('md')]: {
      minHeight: headerMdHeight
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: headerSmHeight
    }
  },
  flexTitle: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})
