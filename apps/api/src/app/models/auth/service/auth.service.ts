import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';

import { UserRepository } from '../../user/user.repository';
import { AuthSignInInput } from '../interfaces/auth-sign-in.input';
import { AuthSignUpInput } from '../interfaces/auth-sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async signUp(authSignUpInput: AuthSignUpInput): Promise<User> {
    return await this.userRepository.signUp(authSignUpInput);
  }

  async signIn(authSignInInput: AuthSignInInput): Promise<User>{
    return await this.userRepository.signIn(authSignInInput)
  }
}
