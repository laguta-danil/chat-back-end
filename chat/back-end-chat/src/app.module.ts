import { UserModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    UserModule,
    ChatsModule,
    AuthModule,
    MessagesModule,
    MongooseModule.forRoot(
      'mongodb+srv://chat-project:chat-project123@cluster0.8o0qg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
