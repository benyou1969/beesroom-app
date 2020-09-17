import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';

import { User } from '../../../entities/user.entity';
import { AuthService } from '../service/auth.service';
import { AuthSignUpInput } from '../interfaces/auth-sign-up.input';
import { AuthSignInInput } from '../interfaces/auth-sign-in.input';
import { GqlAuthGuard } from '../guards/graphql-jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetUserGraphQL } from '../decorators/graphql-get-user.decorators';
import { UserWithAccessToken } from '../interfaces/user-with-access-token.input';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserWithAccessToken)
  async signUp(
    @Args('authSignUpInput') authSignUpInput: AuthSignUpInput
  ): Promise<UserWithAccessToken> {
    return await this.authService.signUp(authSignUpInput);
  }

  @Mutation(() => UserWithAccessToken)
  async signIn(
    @Args('authSignInInput') authSignInInput: AuthSignInInput
  ): Promise<UserWithAccessToken> {
    return await this.authService.signIn(authSignInInput);
  }

  @Query(() => User!)
  @UseGuards(GqlAuthGuard)
  async currentUser(@GetUserGraphQL() user: User): Promise<User> {
    return this.authService.getCurrentUser(user);
  }
}
