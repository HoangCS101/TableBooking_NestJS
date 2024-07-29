import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
// import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
// import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    // JwtModule.register({
    //   global: true, // -> easier, don't need to import JwtModule anywhere else.
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    UsersModule,
    PassportModule.register({ session: true })
  ],
  providers: [AuthService, LocalStategy, SessionSerializer],
  controllers: [AuthController],
  exports: [AuthService],
  
})
export class AuthModule {}