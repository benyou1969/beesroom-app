import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../../entities/user.entity';
import { GetUserGraphQL } from '../auth/decorators/graphql-get-user.decorators';
import { GqlAuthGuard } from '../auth/guards/graphql-jwt-auth.guard';
import { UpdateUserInfo } from './interfaces/update-user-info.input';

import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User!)
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @GetUserGraphQL() user: User,
    @Args('updateUserInfo') updateUserInfo: UpdateUserInfo
  ): Promise<User> {
    return this.userService.updateProfile(user, updateUserInfo);
  }
}
