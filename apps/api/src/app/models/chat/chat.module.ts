import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from './service/chat.service';
import { ChatResolver } from './resolver/chat.resolver';
import { MessageRepository } from './message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageRepository]),
  ],
  providers: [
    ChatResolver,
    ChatService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class ChatModule {}
