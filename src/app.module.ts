import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

const URI = 'mongodb://localhost:27017/'

@Module({
  imports: [
    MongooseModule.forRoot(URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
