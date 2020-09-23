import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { createWriteStream } from 'fs';

import { GetUserGraphQL } from '../auth/decorators/graphql-get-user.decorators';
import { GqlAuthGuard } from '../auth/guards/graphql-jwt-auth.guard';
import { UpdateUserInfo } from './interfaces/update-user-info.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { User } from '../../entities/user.entity';
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

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async uploadFile(
    @GetUserGraphQL() user: User,
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    return await this.userService.uploadProfilePicture(user, file);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUserStatus(
    @GetUserGraphQL() user: User,
    @Args('status') status: boolean
  ): Promise<User> {
    return await this.userService.updateUserStatus(user, status);
  }

  @Subscription(() => [User!])
  async onlineUsers(): Promise<User[]> {
    return await this.userService.onlineUsers();
  }
}
