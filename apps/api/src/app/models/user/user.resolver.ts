import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    console.log(filename);
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`apps/api/src/app/uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}
