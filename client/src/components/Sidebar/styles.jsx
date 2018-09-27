import { headerMdHeight, headerSmHeight, drawerWidth, defaultFont, primaryColor } from '../../assets/themes'

export default (theme) => ({
  sidebar: {
    zIndex: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    borderRight: 'none'
  },
  drawer: {
    height: '100%'
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('md')]: {
      minHeight: headerMdHeight
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: headerSmHeight
    }
  },
  menu: {
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    [theme.breakpoints.up('md')]: {
      minHeight: `calc(100% - ${headerMdHeight})`
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: `calc(100% - ${headerSmHeight})`
    }
  },
  list: {
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '0',
    marginBottom: '0',
    listStyle: 'none',
    color: 'inherit',
    '&:before,&:after': {
      display: 'table',
      content: '" "'
    },
    '&:after': {
      clear: 'both'
    },
    '& a': {
      textDecoration: 'none',
      color: primaryColor[500]
    }
  },
  itemIcon: {
    color: 'inherit',
    opacity: '0.8',
    marginRight: '0'
  },
  itemText: {
    color: 'inherit',
    ...defaultFont,
    margin: '4px 0 0 0',
    lineHeight: '25px',
    fontSize: '14px',
    transform: 'translate3d(0px, 0, 0)',
    opacity: '1',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    position: 'relative',
    display: 'block',
    height: 'auto',
    whiteSpace: 'nowrap',
    padding: '0 12px'
  },
  activeItem: {
    backgroundColor: '#f1f1f1'
  },
  nivelMenu1: {
    paddingLeft: theme.spacing.unit * 4
  },
  nivelMenu2: {
    paddingLeft: theme.spacing.unit * 8
  },
  nivelMenu3: {
    paddingLeft: theme.spacing.unit * 12
  }
})
