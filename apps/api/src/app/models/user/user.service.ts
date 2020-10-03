import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserInfo } from './interfaces/update-user-info.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { UserRepository } from './user.repository';
import { createWriteStream } from 'fs';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async updateProfile(
    user: User,
    updateUserInfo: UpdateUserInfo
  ): Promise<User> {
    const { username } = updateUserInfo;

    const updatedUser = await this.userRepository.findOne({ id: user.id });
    updatedUser.username = username;
    updatedUser.save();
    return updatedUser;
  }

  async uploadProfilePicture(
    user: User,
    { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    const { id } = user;
    const findUser = await this.userRepository.findOne({ id });
    (findUser.avatar = `http://localhost:3333/api/user/image/${filename}`),
      await findUser.save();

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`apps/api/src/app/uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }

  async updateUserStatus(user: User, status: boolean): Promise<User> {
    const userStatus = await this.userRepository.findOne({ id: user.id });
    userStatus.isOnline = status;
    await userStatus.save();

    const users = await this.userRepository.find({
      where: { isOnline: true },
    });
    await pubsub.publish('onlineUsers', {
      onlineUsers: [...users],
    });

    return userStatus;
  }

  async onlineUsers(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { isOnline: true } });

    setTimeout(
      () =>
        pubsub.publish('onlineUsers', {
          onlineUsers: [...users],
        }),
      0
    );

    return pubsub.asyncIterator('onlineUsers');
  }
}
