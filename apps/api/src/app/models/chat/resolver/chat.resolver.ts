import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  Field,
  ObjectType,
} from '@nestjs/graphql';

import { Message } from '../../../entities/message.entity';
import { User } from '../../../entities/user.entity';
import { GetUserGraphQL } from '../../auth/decorators/graphql-get-user.decorators';
import { GqlAuthGuard } from '../../auth/guards/graphql-jwt-auth.guard';
import { UpdateMessage } from '../interfaces/update-message.input';
import { ChatService } from '../service/chat.service';


@ObjectType()
class DeletedMessage {
  @Field()
  success: boolean;
}

@Resolver((of) => Message)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query((returns) => [Message])
  @UseGuards(GqlAuthGuard)
  async messages(): Promise<Message[]> {
    return await this.chatService.messages();
  }

  @Mutation((returns) => Message)
  @UseGuards(GqlAuthGuard)
  async addMessage(
    @GetUserGraphQL() user: User,
    @Args('content') content: string
  ): Promise<Message> {
    return await this.chatService.addMessage(user, content);
  }

  @Subscription((returns) => [Message!], {
    name: 'messages',
  })
  messageAdded(): Promise<any> {
    return this.chatService.messageAdded();
  }
  @Mutation((returns) => Message)
  @UseGuards(GqlAuthGuard)
  async updateMessage(
    @GetUserGraphQL() user: User,
    @Args('updateMessage') updateMessage: UpdateMessage
  ): Promise<Message> {
    return await this.chatService.updateMessage(user, updateMessage);
  }

  @Mutation((returns) => DeletedMessage)
  @UseGuards(GqlAuthGuard)
  async deleteMessage(
    @GetUserGraphQL() user: User,
    @Args('id') id: string
  ): Promise<{ success: boolean }> {
    return await this.chatService.deleteMessage(user, id);
  }
}
