import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';

import { UserRepository } from '../../user/user.repository';
import { AuthSignInInput } from '../interfaces/auth-sign-in.input';
import { AuthSignUpInput } from '../interfaces/auth-sign-up.input';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { MyContext } from '../interfaces/my-context.interface';
import { UserWithAccessToken } from '../interfaces/user-with-access-token.input';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(
    authSignUpInput: AuthSignUpInput,
    ctx: MyContext
  ): Promise<UserWithAccessToken> {
    const user = await this.userRepository.signUp(authSignUpInput);
    return await this.createToken(user.email, user, ctx);
  }

  async signIn(
    authSignInInput: AuthSignInInput,
    ctx: MyContext
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
    { req, res }: MyContext
  ): Promise<UserWithAccessToken> {
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    res.cookie('accessToken', accessToken, { httpOnly: true });
    const jid = await this.jwtService.sign(payload, {
      expiresIn: '10d',
    });

    res.cookie('jid', jid, {
      httpOnly: true,
    });

    return { accessToken, user };
  }

  async refreshToken(user: User, res: Response) {
    const payload: JwtPayload = { email: user.email };
    const jid = await this.jwtService.sign(payload, {
      expiresIn: '10d',
    });

    res.cookie('jid', jid, {
      httpOnly: true,
    });

    await res.send({
      jid: jid,
    });
  }
}


