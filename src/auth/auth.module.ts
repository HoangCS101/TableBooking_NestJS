import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles/role.guard';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    // JwtModule.register({
    //   global: true, // -> easier, don't need to import JwtModule anywhere else.
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    UsersModule,
    RolesModule,
    PassportModule.register({ session: true })
  ],
  providers: [
    AuthService,
    LocalStategy,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
  
})
export class AuthModule {}