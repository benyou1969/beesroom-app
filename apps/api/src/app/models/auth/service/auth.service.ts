import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';

import { UserRepository } from '../../user/user.repository';
import { AuthSignInInput } from '../interfaces/auth-sign-in.input';
import { AuthSignUpInput } from '../interfaces/auth-sign-up.input';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserWithAccessToken } from '../interfaces/user-with-access-token.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(
    authSignUpInput: AuthSignUpInput,
    ctx
  ): Promise<UserWithAccessToken> {
    const user = await this.userRepository.signUp(authSignUpInput);
    return await this.createToken(user.email, user, ctx);
  }

  async signIn(
    authSignInInput: AuthSignInInput,
    ctx
  ): Promise<UserWithAccessToken> {
    const user = await this.userRepository.signIn(authSignInInput);
    return await this.createToken(user.email, user, ctx);
  }

  async getCurrentUser(user: User): Promise<User> {
    return user;
  }

  private async createToken(
    email: string,
    user: User,
    ctx
  ): Promise<UserWithAccessToken> {
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    ctx.res.cookie('accessToken', accessToken)
    const userWithAccessToken: UserWithAccessToken = { accessToken, user };

    return userWithAccessToken;
  }
}
