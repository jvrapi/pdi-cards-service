import { ApolloServer } from '@apollo/server'
import gql from 'graphql-tag'
import request from 'supertest-graphql'

import { Set } from '@/application/gql/models/set-model'
import { prisma } from '@/infra/database/prisma'
import { PrismaSetsRepository } from '@/infra/database/prisma/repositories/prisma-sets-repository'
import { initServer } from '@/server'

import { makeSet } from '../factories/set-factory'
import { GraphQlResponse } from './response'

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
    const { id } = await setsRepository.create(makeSet())
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
})
