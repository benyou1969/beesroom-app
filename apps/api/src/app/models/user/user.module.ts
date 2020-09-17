import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, UserResolver],
  exports: [TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
