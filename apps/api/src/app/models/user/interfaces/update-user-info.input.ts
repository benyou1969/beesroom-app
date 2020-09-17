import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInfo {
  @Field({ nullable: true })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  @IsOptional()
  username: string;


  @Field({ nullable: true })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @IsOptional()
  avatar: string;
}
