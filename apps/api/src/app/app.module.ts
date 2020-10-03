import { Module, CacheModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

import { UserModule } from './models/user/user.module';
import { AuthModule } from './models/auth/auth.module';
import { User } from './entities/user.entity';
import { Message } from './entities/message.entity';
import { ChatModule } from './models/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'ben',
      database: 'beesroom',
      synchronize: true,
      entities: [User, Message],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      useGlobalPrefix: false,
      tracing: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
    }),
    CacheModule.register({
      ttl: 10,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ChatModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
