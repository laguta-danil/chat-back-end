import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessagesDto } from './create-messages.dto';
import { IMessages } from './message.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('messages') private messagesModel: Model<IMessages>,
  ) {}

  async create(createMessagesDto: CreateMessagesDto): Promise<IMessages> {
    const createdMessages = new this.messagesModel(createMessagesDto);
    return createdMessages.save();
  }


  async getAllMessages(): Promise<IMessages[]> {
    const messages = await this.messagesModel.find().exec();
    return messages;
  }
}
