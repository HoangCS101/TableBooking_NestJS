import {
  Body,
  Controller,
  Get,
  Delete,
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
import { RolesService } from 'src/roles/roles.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  @UseGuards(LocalAuthGuard)
  // @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req): any {
    return { msg: 'Logged in!' };
  }

  @UseGuards(AuthenticatedGuard, RolesGuard)
  // @Roles('Admin','User')
  @SetMetadata('roles', ['Admin'])
  // @SetMetadata('permissions', ['read:profile'])
  @Get('profile')
  getProfile(@Request() req): Promise<string> {
    return req.user;
  }

  // @UseGuards(AuthenticatedGuard)
  // @Delete('logout')
  // @HttpCode(HttpStatus.OK)
  // logout(@Request() req): void {
  //   // Passport usually attaches a 'logout' method to the request object
  //   req.logout((err) => {
  //     if (err) {
  //       console.error('Error logging out:', err);
  //       throw new Error('Could not log out.');
  //     }
  //     // Destroy the session
  //     req.session.destroy((err) => {
  //       if (err) {
  //         console.error('Error destroying session:', err);
  //         throw new Error('Could not log out.');
  //       }
  //       // Optionally, send a response message or redirect
  //       return { msg: 'Logged out successfully!' };
  //     });
  //   });
  // }
}
