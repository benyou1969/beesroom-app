import {
  Controller,
  Get,
  Next,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../../entities/user.entity';
import { GetUser } from '../decorators/get-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../service/auth.service';
import { Response, NextFunction } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@GetUser() user: User, @Res() res: Response) {
    console.log(user.username);
    await this.authService.refreshToken(user, res);
  }
}
