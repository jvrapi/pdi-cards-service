import { Field, ObjectType } from 'type-graphql'

import { Face } from './face-model'

@ObjectType()
export class Card {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  rarity: string

  @Field(() => String)
  type: string

  @Field(() => [String])
  colors: string[]

  @Field(() => [String])
  formats: string[]

  @Field(() => [String])
  versions: string[]

  @Field(() => [Face], { nullable: true })
  faces?: Face[]
}
