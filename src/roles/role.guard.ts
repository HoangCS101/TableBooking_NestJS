import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './entities/role.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    if (user) {
      const roles = await this.usersService.roles(user.id);
      return requiredRoles.some((role) => roles.includes(role));
    }
    
    return true;
  }
}
