import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UpdateUserInfo } from './interfaces/update-user-info.input';

import { UserRepository } from './user.repository';

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
    console.log(updatedUser);
    updatedUser.username = username;
    updatedUser.save();
    return updatedUser;
  }
}
