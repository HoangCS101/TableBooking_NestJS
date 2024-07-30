import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.exist(username);

    if (user && user?.password === password) {
      const { userName, password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
