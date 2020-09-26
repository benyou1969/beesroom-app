import { Controller, Get, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/image/:imgpath')
  seeUploadFile(@Param('imgpath') image: string, @Res() res): void {
    res.sendFile(image, { root: 'apps/api/src/app/uploads/' });
  }
}
