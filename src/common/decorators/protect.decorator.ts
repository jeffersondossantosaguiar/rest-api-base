import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { NestCustomDecorator } from '../../utils/apply-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { RolesEnum } from '../roles.enum';
import { Roles } from './roles.decorator';

export function ProtectTo(...roles: string[]): NestCustomDecorator {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    ApiForbiddenResponse({
      description: "You don't have permission to access this resource!."
    })
  );
}

export function UnprotectedRoute(): NestCustomDecorator {
  return applyDecorators(
    Roles(RolesEnum.ADMIN, RolesEnum.USER),
    UseGuards(AuthGuard(RolesEnum.ANONYMOUS), RolesGuard)
  );
}
