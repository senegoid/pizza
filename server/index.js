const { ApolloServer, gql } = require('apollo-server')
const db = require('./models')
const Op = db.Sequelize.Op

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
      sabor: Sabor!
      pextras: [Extra]
      valor: Int!
      tempo: Int!
    }

    type Query {
      tamanhos: [Tamanho]
      sabores: [Sabor]
      extras: [Extra]
      pizzas: [Pizza]
    }

    type Mutation {
      novoTamanho(nome: String!, valor: Int!, minutos: Int!): Tamanho
      novoSabor(nome: String!, valor: Int!, minutos: Int!): Sabor
      novoExtra(nome: String!, valor: Int!, minutos: Int!): Extra
      pedidoPizza(tamanhoId: Int!, saborId: Int!, extraId: [Int], valor: Int!, tempo: Int!): Pizza      
    }
`

// (root, args, context, info)
const resolvers = {
  Query: {
    tamanhos: () => db.Tamanho.findAll(),
    sabores: () => db.Sabor.findAll(),
    extras: () => db.Extra.findAll(),
    pizzas: () => db.Pizza.findAll()
  },
  Mutation: {
    novoTamanho: (root, { nome, valor, minutos }) => {
      return db.Tamanho.create({ nome: nome, valor: valor, minutos: minutos })
    },
    novoSabor: (root, { nome, valor, minutos }) => {
      return db.Sabor.create({ nome: nome, valor: valor, minutos: minutos })
    },
    novoExtra: (root, { nome, valor, minutos }) => {
      return db.Extra.create({ nome: nome, valor: valor, minutos: minutos })
    },
    pedidoPizza: async (root, args, context, info) => {
      const pizza = await db.Pizza.create({
        valor: args.valor,
        tempo: args.tempo,
        tamanhoId: args.tamanhoId,
        saborId: args.saborId
      })
      args.extraId.forEach((value, index) => {
        db.PizzaExtras.create({
          PizzaId: pizza.id,
          ExtraId: value
        })
      })
      return pizza
    }
  },
  Pizza: {
    pextras: async (root) => {
      // console.info(root)
      let pe = await db.PizzaExtras.findAll({
        attributes: ['ExtraId'],
        where: {
          PizzaId: root.id
        }
      })
      let ex = await Array.from(pe, e => e.ExtraId)
      let pextra = await db.Extra.findAll({        
        where: {
          PizzaId: {
            [Op.in]: ex
          }
        }
      })
      return pextra
    },
    tamanho: async (root) => {
      // console.info(root)
      let t = await db.Tamanho.findById(root.tamanhoId)
      return t
    },
    sabor: async (root) => {
      // console.info(root)
      let s = await db.Sabor.findById(root.saborId)
      return s
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {}
    }
  }
})

db.sequelize.sync({ force: true }).then(() => {
  server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀  Server ready at ${url}`)
    console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`)
  })
})
