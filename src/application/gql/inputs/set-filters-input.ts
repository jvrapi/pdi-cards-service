import { Field, InputType } from 'type-graphql'

@InputType()
export class SetFilters {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  code?: string
}
