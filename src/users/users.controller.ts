import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, Render, Req, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/roles/role.guard';
import { UserValidator } from 'src/validators/user.validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Redirect('/users')
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const errors: string[] = UserValidator.validate(createUserDto);
    if (errors.length > 0) {
      return errors;
    }
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // // @UseGuards(RolesGuard)
  // // @Roles('Admin')
  // // @SetMetadata('roles', ['Admin'])
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get()
  @Render('users_management')
  async index(@Req() request) {
    const viewData = [];
    viewData['title'] = 'User';
    return {
      viewData: viewData,
      userData: await this.usersService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
