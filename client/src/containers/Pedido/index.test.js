import React from 'react'
import renderer from 'react-test-renderer'
import { MockedProvider } from 'react-apollo/test-utils'
import { QUERY_LISTS, Pedir } from './index'
const mocks = [
  {
    request: {
      query: QUERY_LISTS
    },
    result: {
      data: {
        'tamanhos': [
          {
            'id': '1',
            'nome': 'Pequena',
            'valor': 20,
            'minutos': 15
          },
          {
            'id': '2',
            'nome': 'Média',
            'valor': 30,
            'minutos': 20
          },
          {
            'id': '3',
            'nome': 'Grande',
            'valor': 40,
            'minutos': 25
          }
        ],
        'sabores': [
          {
            'id': '1',
            'nome': 'Calabresa',
            'valor': 0,
            'minutos': 0
          },
          {
            'id': '2',
            'nome': 'Marguerita',
            'valor': 0,
            'minutos': 0
          },
          {
            'id': '3',
            'nome': 'Portuguesa',
            'valor': 0,
            'minutos': 5
          }
        ],
        'extras': [
          {
            'id': '1',
            'nome': 'Extra Bacon'
          },
          {
            'id': '2',
            'nome': 'Sem cebola'
          },
          {
            'id': '3',
            'nome': 'Borda Recheada'
          }
        ]
      }
    }
  }
]

it('renders without error', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Pedir />
    </MockedProvider>
  )
})
