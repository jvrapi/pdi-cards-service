import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Set {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  code: string

  @Field(() => String)
  releasedAt: string

  @Field(() => String)
  iconUri: string
}
