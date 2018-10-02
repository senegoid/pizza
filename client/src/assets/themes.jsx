import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import purple from '@material-ui/core/colors/purple'
import red from '@material-ui/core/colors/red'

const primaryColor = purple
const secondaryColor = red
const drawerWidth = 260
const headerMdHeight = '56px'
const headerSmHeight = '48px'
const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: '300',
  lineHeight: '1.5em'
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: red
  },
  a: {
    textDecoration: 'none'
  }
})

export {
  theme,
  primaryColor,
  secondaryColor,
  drawerWidth,
  headerMdHeight,
  headerSmHeight,
  defaultFont
}
