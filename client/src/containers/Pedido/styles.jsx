import { headerMdHeight, headerSmHeight } from '../../assets/themes'
export default (theme) => ({
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      marginTop: headerMdHeight
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: headerSmHeight
    }
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})
