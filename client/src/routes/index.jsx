import path from '../utils/path'

import Pedir from '../containers/Pedido'

import LocalPizza from '@material-ui/icons/LocalPizza'

export default [
  {
    path,
    exact: true,
    component: Pedir
  },
  {
    path: '/pedir/',
    exact: true,
    label: 'pedir',
    icon: LocalPizza,
    component: Pedir
  }

]
