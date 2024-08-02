import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { LocalStategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
// import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    // PassportModule.register({ session: true }),
    PassportModule,
    JwtModule.register({
      // global: true, // -> easier, don't need to import JwtModule anywhere else.
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  // providers: [AuthService, LocalStategy, SessionSerializer],
  providers: [AuthService, LocalStategy,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
