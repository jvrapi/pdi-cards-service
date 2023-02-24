import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import request from 'supertest-graphql'

import { Card } from '@/application/gql/models/card-model'
import { Set } from '@/application/gql/models/set-model'
import { prisma } from '@/infra/database/prisma'
import { PrismaSetsRepository } from '@/infra/database/prisma/repositories/prisma-sets-repository'
import { initServer } from '@/server'

import { makeCard } from '../factories/card-factory'
import { makeSet } from '../factories/set-factory'
import { GraphQlResponse } from './response'

type Cards = Set & {
  cards: Card[]
}

type CardsResponse = GraphQlResponse<'set', Cards>

type SetResponse = GraphQlResponse<'set', Set>

const getSetQuery = gql`
  query getSet($setFilters: SetFilters!) {
    set(setFilters: $setFilters) {
      id
      name
      code
      releasedAt
    }
  }
`

const getCardsQuery = gql`
  query getCards($setFilters: SetFilters!) {
    set(setFilters: $setFilters) {
      cards {
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
      }
    }
  }
`

const getCardsWithNameFilter = gql`
  query getCards($setFilters: SetFilters!, $cardsFilters: CardFilters) {
    set(setFilters: $setFilters) {
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
      }
    }
  }
`

describe('Get Sets', () => {
  let serverUrl: string
  let testServer: ApolloServer
  let setsRepository: PrismaSetsRepository

  beforeAll(async () => {
    setsRepository = new PrismaSetsRepository()

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

  it('should be able to get a set by id', async () => {
    const newSet = makeSet()
    newSet.cards = [makeCard()]
    const { id } = await setsRepository.create(newSet)
    const response = await request<SetResponse>(serverUrl)
      .query(getSetQuery)
      .variables({
        setFilters: {
          id,
        },
      })
    expect(response.errors).not.toBeDefined()
    expect(response.data?.set).toBeDefined()
  })

  it('should not be able to get a set with invalid id', async () => {
    const response = await request<SetResponse>(serverUrl)
      .query(getSetQuery)
      .variables({
        setFilters: {
          id: 'wrong-id',
        },
      })
    expect(response.errors).not.toBeDefined()
    expect(response.data?.set).toBeNull()
  })

  it('should be able to get a set cards', async () => {
    const newSet = makeSet()
    const setCard = makeCard()
    setCard.faces = [makeCard()]
    newSet.cards = [setCard]

    const { id } = await setsRepository.create(newSet)

    const response = await request<CardsResponse>(serverUrl)
      .query(getCardsQuery)
      .variables({
        setFilters: {
          id,
        },
      })

    expect(response.errors).not.toBeDefined()
    expect(response.data?.set).toBeDefined()
    expect(response.data?.set.cards).toHaveLength(1)
    expect(response.data?.set.cards[0].faces).toHaveLength(1)
  })

  it('should be able to get cards with name filter', async () => {
    const newSet = makeSet()
    const setCard = makeCard({ name: 'Creature' })
    setCard.faces = [makeCard()]
    newSet.cards = [setCard, makeCard()]

    const { id } = await setsRepository.create(newSet)

    const response = await request<CardsResponse>(serverUrl)
      .query(getCardsWithNameFilter)
      .variables({
        setFilters: {
          id,
        },
        cardsFilters: {
          name: 'creature',
        },
      })
    expect(response.errors).not.toBeDefined()
    expect(response.data?.set).toBeDefined()
    expect(response.data?.set.cards).toHaveLength(1)
    expect(response.data?.set.cards[0].faces).toHaveLength(1)
  })

  it('should be able to get cards with type filter', async () => {
    const newSet = makeSet()
    const setCard = makeCard({ typeLine: 'Creature' })
    setCard.faces = [makeCard()]
    newSet.cards = [setCard, makeCard()]

    const { id } = await setsRepository.create(newSet)

    const response = await request<CardsResponse>(serverUrl)
      .query(getCardsWithNameFilter)
      .variables({
        setFilters: {
          id,
        },
        cardsFilters: {
          type: 'creature',
        },
      })
    expect(response.errors).not.toBeDefined()
    expect(response.data?.set).toBeDefined()
    expect(response.data?.set.cards).toHaveLength(1)
    expect(response.data?.set.cards[0].faces).toHaveLength(1)
  })
})
