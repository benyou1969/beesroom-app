import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { User } from '../../../entities/user.entity';
import { GetUser } from '../decorators/get-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { MyContext } from '../interfaces/my-context.interface';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@GetUser() user: User, @Res() res: Response) {
    await this.authService.refreshToken(user, res);
  }
}
