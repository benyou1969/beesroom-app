import { Repository, EntityRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';
import { AuthSignUpInput } from '../auth/interfaces/auth-sign-up.input';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthSignInInput } from '../auth/interfaces/auth-sign-in.input';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpInput: AuthSignUpInput): Promise<User> {
    const { username, email, password } = authSignUpInput;
    const user = new User();
    user.id = uuid();
    user.username = username;
    user.email = email;
    user.password = await this.hashPassword(password);
    user.avatar = null;

    try {
      console.log(user)
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email Already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authSignInInput: AuthSignInInput): Promise<User> {
    const { email, password } = authSignInInput;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      throw new UnauthorizedException('Wrong Credentials!');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }
}
