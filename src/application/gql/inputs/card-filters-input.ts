import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CardFilters {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  type?: string

  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => Int)
  take: number

  @Field(() => Int, { nullable: true })
  skip?: number
}
