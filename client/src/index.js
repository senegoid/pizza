import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root'

import configureHistory from './routes/configureHistory'
import registerServiceWorker from './registerServiceWorker'

import './assets/style.css'

// i18n.changeLanguage('pt-BR')

ReactDOM.render(
  <Root history={configureHistory()} />,
  document.getElementById('root')
)
registerServiceWorker()
