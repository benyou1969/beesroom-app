import { Args, Resolver, Mutation, Query, Context } from '@nestjs/graphql';

import { User } from '../../../entities/user.entity';
import { AuthService } from '../service/auth.service';
import { AuthSignUpInput } from '../interfaces/auth-sign-up.input';
import { AuthSignInInput } from '../interfaces/auth-sign-in.input';
import { GqlAuthGuard } from '../guards/graphql-jwt-auth.guard';
import { Res, UseGuards } from '@nestjs/common';
import { GetUserGraphQL } from '../decorators/graphql-get-user.decorators';
import { UserWithAccessToken } from '../interfaces/user-with-access-token.input';
import { MyContext } from '../interfaces/my-context.interface';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserWithAccessToken)
  async signUp(
    @Args('authSignUpInput') authSignUpInput: AuthSignUpInput,
    @Context() ctx: MyContext
  ): Promise<UserWithAccessToken> {
    return await this.authService.signUp(authSignUpInput, ctx);
  }

  @Mutation(() => UserWithAccessToken)
  async signIn(
    @Args('authSignInInput') authSignInInput: AuthSignInInput,
    @Context() ctx: MyContext
  ): Promise<UserWithAccessToken> {
    return await this.authService.signIn(authSignInInput, ctx);
  }

  @Query(() => User!)
  @UseGuards(GqlAuthGuard)
  async currentUser(@GetUserGraphQL() user: User): Promise<User> {
    return this.authService.getCurrentUser(user);
  }
}
