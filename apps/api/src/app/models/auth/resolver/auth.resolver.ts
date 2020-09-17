import { Args, Resolver, Mutation } from '@nestjs/graphql';

import { User } from '../../../entities/user.entity';
import { AuthService } from '../service/auth.service';
import { AuthSignUpInput } from '../interfaces/auth-sign-up.input';
import { AuthSignInInput } from '../interfaces/auth-sign-in.input';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signUp(
    @Args('authSignUpInput') authSignUpInput: AuthSignUpInput
  ): Promise<User> {
    return await this.authService.signUp(authSignUpInput);
  }

  @Mutation(() => User)
  async signIn(
    @Args('authSignInInput') authSignInInput: AuthSignInInput
  ): Promise<User> {
    return await this.authService.signIn(authSignInInput);
  }
}
