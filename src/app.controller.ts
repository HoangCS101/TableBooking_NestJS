import { Get, Controller, Render } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('login')
  @Render('auth/login')
  login() {}

  @Get('dashboard')
  @Render('app/dashboard')
  dashboard() {
    return { message: 'Hello world!' };
  }
}
