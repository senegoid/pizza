import { secondaryColor, primaryColor } from '../../assets/themes'

export default (theme) => ({
  color: {
    backgroundColor: secondaryColor['500'],
    color: primaryColor['900'],
    fontSize: '28px',
    fontWeight: 700
  },
  '58x58': {
    width: 58,
    height: 58
  },
  '48x48': {
    width: 48,
    height: 48
  },
  '36x36': {
    width: 36,
    height: 36
  },
  border: {
    border: `3px solid ${primaryColor[100]}`
  },
  border36: {
    border: `2px solid ${primaryColor[100]}`
  },
  group: {
    display: 'block',
    backgroundColor: secondaryColor[500],
    height: '48px',
    width: '48px',
    marginLeft: '2px',
    '& div': {
      display: 'block',
      textAlign: 'center',
      color: '#000'
    },
    '& div:nth-child(1)': {
      fontSize: '24px',
      fontWeight: 700
    },
    '& div:nth-child(2)': {
      fontSize: '12px'
    }
  }
})
