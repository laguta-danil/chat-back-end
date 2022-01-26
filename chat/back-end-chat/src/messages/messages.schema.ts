import * as mongoose from 'mongoose';

export const MessagesSchema = new mongoose.Schema({
  body: String,
  title: String
})
