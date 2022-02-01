import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from './chat.controller';
import { ChatsService } from './chat.service';
import { Chat, ChatSchema } from "./schemas/chat.schema";
import { UserModule } from 'src/users/users.module';


@Module({
    imports: [UserModule, MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}])] ,
    controllers: [ChatsController],
    providers: [ChatsService],
  })
  export class ChatsModule {}
