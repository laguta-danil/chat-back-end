import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateChatDto } from "./create-chat.dto"; 


@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>){}

  async create(createChatDto: CreateChatDto) {
    const createdChat = new this.chatModel(createChatDto);
    return createdChat.save();
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async findOne(_id: string): Promise<Chat> {
      return this.chatModel.findOne({_id});
  }

  async remove(_id: string): Promise<void> {
    const chat = await this.chatModel.findOne({_id});
    await chat.remove();
  }

  

}