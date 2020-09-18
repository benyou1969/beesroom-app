import { Repository, EntityRepository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

import { User } from '../../entities/user.entity';
import { Message } from '../../entities/message.entity';
import { UpdateMessage } from './interfaces/update-message.input';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async updateMessage(
    user: User,
    updateMessage: UpdateMessage
  ): Promise<Message> {
    const { id, content } = updateMessage;
    const message = await this.findOne({ id });
    if (message && user && message.user.id === user.id) {
      message.content = content;
      try {
        await this.save(message);
        return message;
      } catch (err) {
        throw new UnauthorizedException('You are not authorized to do this');
      }
    } else {
      console.log("Hello")
    }
  }

  async deleteMessage(user: User, id: string): Promise<{ success: boolean }> {
    const message = await this.findOne({ id });

    if (message && user && message.user.id === user.id) {
      try {
        await this.remove(message);
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    } else {
      return { success: false };
    }
  }
}
