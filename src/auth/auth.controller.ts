import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return {msg: 'Logged in!'};
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req): string {
    return req.user;
  }
}
