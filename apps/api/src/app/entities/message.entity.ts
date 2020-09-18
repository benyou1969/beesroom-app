import {
  Entity,
  Column, ManyToOne
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { GenericEntity } from './generic.entity';
import { User } from './user.entity';


@ObjectType()
@Entity('messages')
export class Message extends GenericEntity {
  @Field()
  @Column()
  content: string;

  @Field((type) => User!)
  @ManyToOne((type) => User, (user) => user.messages, { eager: true })
  user: User;
}
