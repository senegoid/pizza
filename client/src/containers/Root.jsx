import React from 'react'
import PropTypes from 'prop-types'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import App from './App'

import { theme } from '../assets/themes'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

const Root = ({ history }) => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App history={history} />
    </MuiThemeProvider >
  </ApolloProvider>
)

Root.propTypes = {
  history: PropTypes.object.isRequired
}

export default Root
