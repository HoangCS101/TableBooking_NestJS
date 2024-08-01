import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './local.strategy';
// import { SessionSerializer } from './session.serializer';
import { RolesModule } from 'src/roles/roles.module';
import { JwtStrategy } from './jwt.strategy';

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
