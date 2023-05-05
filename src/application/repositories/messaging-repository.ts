import { Set as PrismaSet } from '@prisma/client'
export interface Face {
  id: string
  imageUri: string
  name: string
  manaCost: string | null
  effectText: string | null
  flavorText: string | null
  language: string
  typeLine: string
  setId: string
  colors: string[]
  faceOfId: string
  cmc: number | null
}

export interface Card {
  name: string
  language: string
  layout: string | null
  cmc: number | null
  typeLine: string | null
  collectionId: string | null
  frame: string | null
  borderColor: string | null
  manaCost: string | null
  loyalty: string | null
  securityStamp: string | null
  effectText: string | null
  flavorText: string | null
  rarity: string | null
  isReserved: boolean | null
  isReprint: boolean | null
  isVariant: boolean | null
  isFoundInBooster: boolean | null
  isStorySpotlight: boolean | null
  colors: string[]
  formats: string[]
  versions: string[]
  id: string
  setId: string
  imageUri: string | null
  faces: Face[]
}

export interface Set {
  id: string
  name: string
  code: string
  isDigital: boolean
  isFoilOnly: boolean
  releasedAt: string
  type: string
  iconUri: string
  cards: Card[]
}

export interface MessagingRepository {
  getAllSetsCode(): Promise<string[]>
  updateData(set: Set): Promise<void>
  findSetById(setId: string): Promise<PrismaSet | null>
}
