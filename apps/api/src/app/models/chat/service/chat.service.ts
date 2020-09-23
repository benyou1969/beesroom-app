import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuid } from 'uuid';
import { Message } from '../../../entities/message.entity';
import { User } from '../../../entities/user.entity';
import { UpdateMessage } from '../interfaces/update-message.input';
import { MessageRepository } from '../message.repository';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository
  ) {}

  async messages(): Promise<Message[]> {
    return await this.messageRepository.find({
      order: { createdAt: 'ASC' },
      cache: 10000,
    });
  }

  async addMessage(user: User, content: string): Promise<Message> {
    const newMessage = await this.messageRepository.create({
      id: uuid(),
      user,
      content,
    });
    await this.messageRepository.save(newMessage);

    const messages = await this.messages();

    pubsub.publish('messages', {
      messages: [...messages],
    });

    return newMessage;
  }

  async messageAdded(): Promise<any> {
    const messages = await this.messages();
    setTimeout(
      () =>
        pubsub.publish('messages', {
          messages: [...messages],
        }),
      0
    );

    return pubsub.asyncIterator('messages');
  }

  async updateMessage(
    user: User,
    updateMessage: UpdateMessage
  ): Promise<Message> {
    return await this.messageRepository.updateMessage(user, updateMessage);
  }
  async deleteMessage(user: User, id: string): Promise<{ success: boolean }> {
    return await this.messageRepository.deleteMessage(user, id);
  }
}
