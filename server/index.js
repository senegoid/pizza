const { ApolloServer, gql } = require('apollo-server')
const db = require('./models')

const typeDefs = gql`
    type Tamanho {
      id: ID!
      nome: String!
      valor: Int
      minutos: Int
    }

    type Sabor {
      id: ID!
      nome: String!
      valor: Int
      minutos: Int
    }

    type Extra {
      id: ID!
      nome: String!
      valor: Int
      minutos: Int
    }

    type Pizza {
      id: ID!
      tamanho: Tamanho
      sabor: Sabor
      extra: Extra
      valor: Int
      tempo: Int
    }
`

// (root, args, context, info)
const resolvers = {
    // TODO PIZZA
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

db.sequelize.sync({ force: true }).then(() => {
  server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀  Server ready at ${url}`)
    console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`)
  })
})
