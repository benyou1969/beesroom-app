import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtStrategy } from '../auth/strategies/jwt-auth.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'TopSecret51',
      signOptions: {
        expiresIn: 3600 ,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [JwtStrategy, UserService, UserResolver],
  exports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtStrategy,
    PassportModule,
  ],
})
export class UserModule {}
