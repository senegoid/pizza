import { drawerWidth, primaryColor } from '../../assets/themes'

const profileStyle = theme => ({
  card: {
    width: `calc(${drawerWidth}px - ${theme.spacing.unit * 2}px)`,
    backgroundColor: primaryColor['500'],
    borderRadius: '0',
    padding: theme.spacing.unit
  },
  color: {
    color: primaryColor['100']
  },
  RGNumber: {
    fontSize: '24px',
    fontWeight: 700,
    textAlign: 'right',
    padding: '0 2px'
  },
  RGText: {
    fontSize: '12px',
    lineHeight: '18px'
  },
  userName: {
    lineHeight: '24px',
    fontSize: '20px',
    marginBottom: '0'
  },
  userEmail: {
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: '0'
  }
})

export default profileStyle
