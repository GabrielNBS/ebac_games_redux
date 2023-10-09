import { rest } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
  {
    id: 1,
    categoria: 'rpg',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'rpg',
    imagem: '',
    plataformas: ['Windows', 'Playstation 5', 'Xbox Series S/X'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'ação',
    imagem: '',
    plataformas: ['Windows', 'Playstation 5', 'Xbox Series S/X'],
    preco: 399.9,
    precoAntigo: 499.9,
    titulo: 'Red Dead Redemption 2'
  },
  {
    id: 4,
    categoria: 'rpg',
    imagem: '',
    plataformas: ['Windows', 'Playstation 5', 'Xbox Series S/X'],
    preco: 249.9,
    precoAntigo: 299.9,
    titulo: 'Final Fantasy XVI'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container Proddutos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregando', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Red Dead Redemption 2')).toBeInTheDocument()
    })
  })
})
