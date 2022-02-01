import { ObjectId } from 'mongodb';
import { Iuser } from './../users/users.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateChatDto } from './create-chat.dto';
import { CreateUsersDTO } from '../users/create-users.dto';
// import { ObjectId } from 'mongoose';
import { log } from 'console';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async create(createChatDto: CreateChatDto) {
    const createdChat = new this.chatModel(createChatDto);
    return createdChat.save();
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async findOne(_id: string): Promise<Chat> {
    return this.chatModel.findOne({ _id });
  }

  async remove(_id: string): Promise<void> {
    const chat = await this.chatModel.findOne({ _id });
    await chat.remove();
  }

  // Edit messages in chats
  async updateMessage(id, createChatDto: CreateChatDto): Promise<any> {
    try {
      // const chat = await this.chatModel.findOne({ id });
      // const chat = await this.chatModel.updateOne(
      //   { id: new ObjectId(id) },
      //   createChatDto,
      //   {
      //     multi: true,
      //   },
      // );
      // const chat = await this.chatModel.findOne({ id: id });

      // await chat.update(createChatDto, { new: true });
      const chat = await this.chatModel.findOneAndUpdate(
        { id },
        { $set: createChatDto },
        { new: true, upsert: false, fields: {} },
      );
      const updated = await this.chatModel.findById(id);

      console.log(updated);
      return chat;
    } catch (e) {
      console.log('something wrong');
      return null;
    }
  }
}
