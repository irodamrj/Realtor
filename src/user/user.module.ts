import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { Home, HomeSchema } from '../schemas/home.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Message, MessageSchema } from '../schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Home.name, schema: HomeSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}
