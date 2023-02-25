import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import request from 'supertest-graphql'

import { Card } from '@/application/gql/models/card-model'
import { Face } from '@/application/gql/models/face-model'
import { Set } from '@/application/gql/models/set-model'
import { prisma } from '@/infra/database/prisma'
import { initServer } from '@/server'

import { GraphQlResponse } from './response'
import { seed } from './seed'

type CardResponseProps = Card & {
  set: Set
  faces?: Face[]
}

type CardsResponse = GraphQlResponse<'cards', CardResponseProps[]>

const getCardsQuery = gql`
  query getCards($cardsFilters: CardFilters!) {
    cards(cardsFilters: $cardsFilters) {
      id
      name
      rarity
      type
      colors
      formats
      versions
      faces {
        id
        name
        type
        colors
      }
      set {
        id
        name
        code
        releasedAt
      }
    }
  }
`

describe('Get Sets', () => {
  let serverUrl: string
  let testServer: ApolloServer

  beforeAll(async () => {
    const { url, server } = await initServer()
    testServer = server
    serverUrl = url
  })

  beforeEach(async () => {
    await prisma.set.deleteMany()
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should be able to get cards', async () => {
    await seed.defaultValues()
    const response = await request<CardsResponse>(serverUrl)
      .query(getCardsQuery)
      .variables({
        cardsFilters: {
          take: 10,
        },
      })

    expect(response.errors).not.toBeDefined()
    expect(response.data?.cards).toHaveLength(1)
    expect(response.data?.cards[0].faces).toHaveLength(1)
  })

  it('should be able to get cards with name filter', async () => {
    const { set } = await seed.defaultValues({
      card: { name: 'Creature' },
    })

    await seed.addCard({ setId: set.id })

    const response = await request<CardsResponse>(serverUrl)
      .query(getCardsQuery)
      .variables({
        cardsFilters: {
          take: 2,
          name: 'creature',
        },
      })

    const allCardsResponse = await request<CardsResponse>(serverUrl)
      .query(getCardsQuery)
      .variables({
        cardsFilters: {
          take: 10,
        },
      })
    expect(response.errors).not.toBeDefined()
    expect(response.data?.cards).toHaveLength(1)
    expect(response.data?.cards[0].faces).toHaveLength(1)
    expect(allCardsResponse.data?.cards).toHaveLength(2)
  })

  it('should be able to get cards with type filter', async () => {
    const { set } = await seed.defaultValues({
      card: { typeLine: 'Creature' },
    })
    await seed.addCard({ setId: set.id })

    const response = await request<CardsResponse>(serverUrl)
      .query(getCardsQuery)
      .variables({
        cardsFilters: {
          take: 2,
          type: 'creature',
        },
      })

    const allCardsResponse = await request<CardsResponse>(serverUrl)
      .query(getCardsQuery)
      .variables({
        cardsFilters: {
          take: 10,
        },
      })

    expect(response.errors).not.toBeDefined()
    expect(response.data?.cards).toHaveLength(1)
    expect(response.data?.cards[0].faces).toHaveLength(1)
    expect(allCardsResponse.data?.cards).toHaveLength(2)
  })

  it('should be able to get a card by id', async () => {
    const { set, card } = await seed.defaultValues()
    await seed.addCard({ setId: set.id })

    const response = await request<CardsResponse>(serverUrl)
      .query(getCardsQuery)
      .variables({
        cardsFilters: {
          id: card.id,
          take: 10,
        },
      })
    expect(response.errors).not.toBeDefined()
    expect(response.data?.cards).toHaveLength(1)
    expect(response.data?.cards[0].faces).toHaveLength(1)
  })
})
