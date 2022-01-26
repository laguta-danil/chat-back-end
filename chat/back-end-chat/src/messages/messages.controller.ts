
import { CreateMessagesDto } from './create-messages.dto';
import {
  Controller,
  Post,
  Get,
  Res,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // add a Messages
  @Post('/create')
  async addMessages(@Res() res, @Body() createMessagesDto: CreateMessagesDto) {
    const messages = await this.messagesService.create(createMessagesDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      messages,
    });
  }

  // Get Messages list
  @Get('messages')
  async getAllMessages(@Res() res) {
    const messages = await this.messagesService.getAllMessages();
    return res.status(HttpStatus.OK).json(messages);
  }
}