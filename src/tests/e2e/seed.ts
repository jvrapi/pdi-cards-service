import { prisma } from '@/infra/database/prisma'
import { PrismaCardsMapper } from '@/infra/database/prisma/mappers/prisma-cards-mapper'
import { PrismaSetsMapper } from '@/infra/database/prisma/mappers/prisma-sets-mapper'

import {
  makeCard,
  Override as CardOverrideProps,
} from '../factories/card-factory'
import { makeSet, Override as SetOverrideProps } from '../factories/set-factory'

interface DefaultValuesOverrideProps {
  set?: SetOverrideProps
  card?: CardOverrideProps
}

interface AddCardProps {
  setId: string
  withFace?: boolean
  override?: CardOverrideProps
}

export async function defaultValues(override?: DefaultValuesOverrideProps) {
  const card = makeCard(override?.card)
  card.faces = [makeCard()]
  const prismaSet = PrismaSetsMapper.toPrisma(makeSet(override?.set))

  const setCreated = await prisma.set.create({
    data: prismaSet,
  })

  const prismaCard = PrismaCardsMapper.toPrisma(card, setCreated.id)

  const cardCreated = await prisma.card.create({
    data: prismaCard,
  })

  return {
    set: setCreated,
    card: cardCreated,
  }
}

async function addCard({ setId, withFace = false, override }: AddCardProps) {
  const card = makeCard(override)

  if (withFace) {
    card.faces = [makeCard()]
  }

  return await prisma.card.create({
    data: PrismaCardsMapper.toPrisma(card, setId),
  })
}

export const seed = {
  defaultValues,
  addCard,
}
