import { Get, Controller, Render } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  @Render('index')
  index() {}

  @Get('login')
  @Render('auth/login')
  login() {}

  @Get('register')
  @Render('auth/register')
  register() {}

  @Get('dashboard')
  @Render('dashboard')
  dashboard() {
    const viewData = [];
    viewData['title'] = 'Dashboard';
    return {
      viewData: viewData,
    };
  }
}
