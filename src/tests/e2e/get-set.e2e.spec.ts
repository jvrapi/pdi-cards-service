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

const getSet = gql`
  query getSet($filters: SetFilters!) {
    set(filters: $filters) {
      id
      name
      code
      releasedAt
    }
  }
`

const getCards = gql`
  query getCards($filters: SetFilters!) {
    set(filters: $filters) {
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
      .query(getSet)
      .variables({
        filters: {
          id,
        },
      })
    expect(response.errors).not.toBeDefined()
    expect(response.data?.set).toBeDefined()
  })

  it('should not be able to get a set with invalid id', async () => {
    const response = await request<SetResponse>(serverUrl)
      .query(getSet)
      .variables({
        filters: {
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
      .query(getCards)
      .variables({
        filters: {
          id,
        },
      })

    expect(response.errors).not.toBeDefined()
    expect(response.data?.set).toBeDefined()
    expect(response.data?.set.cards).toHaveLength(1)
  })
})
