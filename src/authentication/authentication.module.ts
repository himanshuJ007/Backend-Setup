import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "60000000" },
    }),
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
