import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateMessage {
  @Field()
  id: string;
  @Field()
  @IsString()
  content: string;
}
