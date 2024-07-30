import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';

import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/entities/role.entity';
import { RolesGuard } from 'src/roles/role.guard';
import { PermissionsGuard } from './permissions.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  // @Public()
  @UseGuards(LocalAuthGuard)
  // @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req): any {
    return { msg: 'Logged in!' };
  }

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('Admin')
  // @SetMetadata('permissions', ['read:profile'])
  @Get('profile')
  getProfile(@Request() req): string {
    return req.user;
  }
}
