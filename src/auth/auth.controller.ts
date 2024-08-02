import {
  Request,
  Redirect,
  Body,
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

import { Roles } from 'src/roles/roles.decorator';

import { JwtAuthGuard } from './jwt-auth.guard';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthenticatedGuard } from './authenticated.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { PermissionsGuard } from './permissions.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local')) // Or straight-up use this
  @Post('login')
  // @Redirect('/app/dashboard')
  login(@Request() req): any {
    // return { msg: 'Logged in!' };
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Request() req): any {
    return { msg: 'Register Successful!' };
  }

  // @UseGuards(AuthenticatedGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  // @Roles('Admin','User')
  // @SetMetadata('roles', ['Admin'])
  // @SetMetadata('permissions', ['read:profile'])
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(AuthenticatedGuard)
  // @Get('logout')
  // @Redirect('/app')
  // async logout(@Request() req): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     req.logout(async (err) => {
  //       if (err) {
  //         console.error('Error logging out:', err);
  //         reject(new Error('Could not log out.'));
  //       } else {
  //         req.session.destroy((err) => {
  //           if (err) {
  //             console.error('Error destroying session:', err);
  //             reject(new Error('Could not log out.'));
  //           } else {
  //             resolve({ msg: 'Logged out successfully!' });
  //           }
  //         });
  //       }
  //     });
  //   });
  // }
}
