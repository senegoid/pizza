# Servidor com sequelize, sqlite e graphql

```bash
md server
cd server
yarn init --yes
yarn add apollo-server graphql
yarn add sequelize sequelize-cli sqlite3
yarn sequelize init
node index.js
```

 Acessar playground http://localhost:4000/
 para testes de graphql

 exemplo:
```js
 query getConfigs {
  tamanhos {
    id
    nome
    valor
    minutos
  }
  sabores {
    id
    nome
    valor
    minutos
  }
  extras {
    id
    nome  
  }
}
query getPizzas {
  pizzas {
    id
    tamanho{nome}
    sabor {nome}
    pextras{nome}
    valor
    tempo
  }
}
mutation NovoTamanho {
  novoTamanho(nome: "Pequeno", valor: 10, minutos: 15) {
    nome
  }
}
mutation NovoSabor {
  novoSabor(nome: "Marguerita", valor: 0, minutos: 0) {
    nome
  }
}
mutation NovoExtra {
  novoExtra(nome: "Vida(Bacon)", valor: 10, minutos: 10) {
    nome
  }
}
mutation Pedido {
  pedidoPizza(tamanhoId: 1, saborId: 1, extraId: [1], valor: 10, tempo: 10) {
    valor    
  }
}
```

# Client com react, apollo-client, graphql e material-ui  

```bash
cd client
yarn install
yarn start
```