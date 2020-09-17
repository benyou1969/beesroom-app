import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsEmail,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthSignUpInput {
  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

}
