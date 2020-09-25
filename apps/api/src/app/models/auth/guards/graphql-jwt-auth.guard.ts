import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx.getContext().req.headers);
    ctx.getContext().req.headers.authorization = `Bearer ${
      ctx.getContext().req.cookies.accessToken
    }`;
    console.log(ctx.getContext().req.headers.authorization);
    return ctx.getContext().req;
  }
}
