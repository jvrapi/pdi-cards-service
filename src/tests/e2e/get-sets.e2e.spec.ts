import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import request from 'supertest-graphql'

import { Set } from '@/application/gql/models/set-model'
import { PrismaSetsRepository } from '@/infra/database/prisma/repositories/prisma-sets-repository'
import { initServer } from '@/server'

import { makeSet } from '../factories/set-factory'
import { GraphQlResponse } from './response'

type SetsResponse = GraphQlResponse<'sets', Set>

const getSets = gql`
  query gelAllSets($filters: SetFilters!) {
    sets(filters: $filters) {
      id
      name
      code
      releasedAt
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

  afterAll(async () => {
    await testServer.stop()
  })

  it('should be able to get sets', async () => {
    const { id } = await setsRepository.create(makeSet())
    const getSetsResponse = await request<SetsResponse>(serverUrl)
      .query(getSets)
      .variables({ filters: { limit: 1 } })

    expect(getSetsResponse.data?.sets).toBeTruthy()
    expect(getSetsResponse.data?.sets).toHaveLength(1)
    expect(getSetsResponse.data?.sets[0].id).toEqual(id)

    expect(getSetsResponse.errors).not.toBeDefined()
  })

  it('should be able to paginate sets', async () => {
    const { id } = await setsRepository.create(makeSet())
    const allSets = await setsRepository.findAll()
    const getSetsResponse = await request<SetsResponse>(serverUrl)
      .query(getSets)
      .variables({ filters: { limit: 1 } })

    expect(getSetsResponse.data?.sets).toBeTruthy()
    expect(getSetsResponse.data?.sets).toHaveLength(1)
    expect(getSetsResponse.data?.sets[0].id).not.toEqual(id)

    expect(allSets).toHaveLength(2)
    expect(getSetsResponse.errors).not.toBeDefined()
  })
})
