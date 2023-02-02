import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SetModel {
  @Field(() => String)
  id: string
  
  @Field(() => String)
  code: string;
  
  @Field(() => String)
  name: string;
  
  @Field(() => String)
  type: string;
  
  @Field(() => String)
  releasedAt: string;

  @Field(() => String)
  iconUri: string
  
  @Field(() => Boolean)
  isDigital: boolean;
  
  @Field(() => Boolean)
  isFoilOnly: boolean;
  
  @Field(() => Date)
  createdAt: Date;
  
  @Field(() => Date)
  updatedAt: Date;
 
}