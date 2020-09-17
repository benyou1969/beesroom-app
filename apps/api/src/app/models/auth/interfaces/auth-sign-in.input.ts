import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthSignInInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
