import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = new Reflector().get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user)
      throw new UnauthorizedException(
        "You don't have permission to access this resource!."
      );

    const hasRole = () =>
      user.role.split('|').some((role) => roles.includes(role));

    if (user && user.role && hasRole()) return true;

    throw new ForbiddenException(
      "You don't have permission to access this resource!."
    );
  }
}
