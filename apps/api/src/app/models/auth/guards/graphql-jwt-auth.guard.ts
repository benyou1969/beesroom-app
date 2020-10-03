import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    console.log(request);
    if (request.cookies.jid) {
      request.headers.authorization = `Bearer ${request.cookies.jid}`;
    } else if (request.cookies.jid) {
      request.headers.authorization = `Bearer ${request.cookies.accessToken}`;
    }

    return ctx.getContext().req;
  }
}
