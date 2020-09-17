import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

import { UserModule } from './models/user/user.module';
import { AuthModule } from './models/auth/auth.module';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'ben',
      database: 'beesroom',
      synchronize: true,
      entities: [User],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      useGlobalPrefix: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
