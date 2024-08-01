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

  @Get('register')
  @Render('auth/register')
  register() {}

  @Get('/dashboard')
  @Render('dashboard')
  dashboard() {
    return { message: 'Hello world!' };
  }
}
