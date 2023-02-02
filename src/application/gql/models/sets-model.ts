import { Field, ID, ObjectType } from "type-graphql";
import { PaginationModel } from "./pagination-model";
import { SetModel } from "./set-model";

@ObjectType()
export class SetsModel {
  @Field(() => [SetModel])
  items: SetModel[]

  @Field(() => PaginationModel)
  pagination: PaginationModel
}