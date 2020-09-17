import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './service/auth.service';
import { AuthResolver } from './resolver/auth.resolver';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
