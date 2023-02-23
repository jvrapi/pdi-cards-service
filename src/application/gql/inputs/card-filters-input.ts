import { Field, InputType } from 'type-graphql'

@InputType()
export class CardFilters {
  @Field(() => String)
  name?: string
}
