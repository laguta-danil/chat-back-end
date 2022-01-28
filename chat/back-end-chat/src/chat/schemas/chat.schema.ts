import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  name: string;

  @Prop()
  users: Array<string>;

  @Prop()
  messages: Array<string>;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
