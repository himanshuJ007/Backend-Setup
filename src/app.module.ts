import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';

const URI = 'mongodb://localhost:27017/'

@Module({
  imports: [
    MongooseModule.forRoot(URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ConfigModule.forRoot( {
      isGlobal: true,
      envFilePath: ['.development.env'],
    }),
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
