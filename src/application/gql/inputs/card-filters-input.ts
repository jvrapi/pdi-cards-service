import { Field, InputType } from 'type-graphql'

@InputType()
export class CardFilters {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  type?: string
}
