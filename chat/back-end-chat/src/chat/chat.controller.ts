import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ChatsService } from './chat.service';
import { CreateChatDto } from './create-chat.dto';
import { Chat } from './schemas/chat.schema';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  findAll(): Promise<Chat[]> {
    return this.chatsService.findAll();
  }
  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    return await this.chatsService.create(createChatDto);
  }

  @Get(':id')
  findOne(@Param('id') _id: string): Promise<Chat> {
    return this.chatsService.findOne(_id);
  }

  @Delete(':id')
  remove(@Param('id') _id: string): Promise<void> {
    return this.chatsService.remove(_id);
  }

  // Update a chat's details
  @Patch(':_id')
  async updateMessages(
    @Param('_id') _id: string,
    @Body() createChatDTO: CreateChatDto,
  ) {
    const chat = await this.chatsService.updateMessage(_id, createChatDTO);
    if (!chat) throw new NotFoundException('Chat does not exist!');
    chat.messages = [...chat.messages, ...createChatDTO.messages];
    console.log(chat);
    return {
      message: 'Messages has been successfully updated',
      chat,
    };
  }
}
