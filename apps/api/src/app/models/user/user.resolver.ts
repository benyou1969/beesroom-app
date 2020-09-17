import { Resolver } from '@nestjs/graphql';
import { UserRepository } from './user.repository';

@Resolver()
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {}
}
