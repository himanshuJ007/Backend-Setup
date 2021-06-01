import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {UserController} from "./user.controller";
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema} from './user.schema';
import {JwtModule} from "@nestjs/jwt";
import {AwsService} from "../aws/aws.service";

@Module({
  imports: [
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "60000000" },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService,AwsService],
  exports: [UserService],
})
export class UserModule {}
