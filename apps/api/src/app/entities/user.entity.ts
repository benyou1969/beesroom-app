import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Unique, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { GenericEntity } from './generic.entity';
import { Message } from './message.entity';

@ObjectType()
@Entity('users')
@Unique(['email'])
export class User extends GenericEntity {
  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  @Column({ default: false })
  isOnline: boolean;

  @Column("int",{ default: 0 })
  tokenVersion: number;

  @Field((type) => [Message], { nullable: true })
  @OneToMany((type) => Message, (message) => message.user, { cascade: true })
  messages: Message[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
