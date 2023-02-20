import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class SetFilters {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  code?: string

  @Field(() => Int, { nullable: true })
  offset?: number

  @Field(() => Int)
  limit: number
}
