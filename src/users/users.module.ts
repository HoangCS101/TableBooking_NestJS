import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // forFeature() allow Entities to be found by autoLoadEntities.
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
  // Add the UsersService to the exports array of the @Module decorator
  // so that it is visible outside this module (will soon use it in our AuthService).
})
export class UsersModule { }
