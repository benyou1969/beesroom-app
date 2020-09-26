import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest<T = any>(context: ExecutionContext): T {
    const request = context.switchToHttp().getRequest();
    if (!request.cookies.accessToken) {
      request.headers.authorization = `Bearer ${request.cookies.jid}`;
    } else {
      request.headers.authorization = `Bearer ${request.cookies.accessToken}`;
    }
    return request;
  }
}
