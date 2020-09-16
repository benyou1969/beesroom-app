import { Repository, EntityRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from '../../entitiy/user.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }
}
