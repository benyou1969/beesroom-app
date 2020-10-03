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
import { Response, NextFunction } from 'express';

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
    console.log(user.username);
    return user;
  }

  private async createToken(
    email: string,
    user: User,
    { req, res }: MyContext
  ): Promise<UserWithAccessToken> {
    const payload: JwtPayload = {
      email: user.email,
      tokenVersion: user.tokenVersion,
    };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '15s',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    const jid = await this.jwtService.sign(payload, {
      expiresIn: '10d',
    });

    res.cookie('jid', jid, {
      httpOnly: true,
      // path: '/api/auth/refresh-token',
      // expires: new Date(Date.now() + 900000),
    });
    return { accessToken, user };
  }

  async incrementTokenVersion(user: User) {
    const found = await this.userRepository.findOne({ id: user.id });
    found.tokenVersion = found.tokenVersion + 1;
    await found.save();
    return found.tokenVersion;
  }

  async refreshToken(user: User, res: Response) {
    const tokenVersion = await this.incrementTokenVersion(user);
    const payload: JwtPayload = {
      email: user.email,
      tokenVersion,
    };
    const jid = await this.jwtService.sign(payload, {
      expiresIn: '10d',
    });

    res.cookie('jid', jid, {
      httpOnly: true,
      // path: '/api/auth/refresh-token',
      expires: new Date(Date.now() + 900000),
    });
    res.clearCookie('accessToken');
    console.log('jid', jid);
    return res.send({
      jid: jid,
    });
  }
}
