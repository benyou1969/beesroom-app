import { config } from 'dotenv';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { UserRepository } from '../../user/user.repository';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TopSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email, tokenVersion } = payload;
    const user = await this.userRepository.findOne({ email });
    if (!user || user.tokenVersion !== tokenVersion) {
      throw new UnauthorizedException();
    }

    console.log(`user.tokenVersion`, user.tokenVersion);
    console.log(`tokenVersion`, tokenVersion);
    console.log(email);

    return user;
  }
}
