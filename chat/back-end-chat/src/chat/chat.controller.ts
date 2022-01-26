import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { CreateChatDto } from './create-chat.dto';
import { ChatsService } from './chat.service';
import { Chat } from './schemas/chat.schema';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  findAll(): Promise<Chat[]> {
    return this.chatsService.findAll();
  }
  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    await this.chatsService.create(createChatDto);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string): Promise<Chat> {
    return this.chatsService.findOne(_id);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string): Promise<void> {
    return this.chatsService.remove(_id);
  }

}
