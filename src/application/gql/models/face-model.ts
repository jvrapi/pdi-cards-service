import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Face {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  type: string

  @Field(() => [String])
  colors: string[]
}
