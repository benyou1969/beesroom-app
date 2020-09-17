import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Unique, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { GenericEntity } from './generic.entity';

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


  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
