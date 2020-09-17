import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../entities/user.entity';

@ObjectType()
export class UserWithAccessToken {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
