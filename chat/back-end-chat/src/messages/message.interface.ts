import { Document } from 'mongoose';

export interface IMessages extends Document {
  body: string;
  title: string;
}
