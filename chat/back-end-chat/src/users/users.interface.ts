import { Document } from 'mongoose';

export interface Iuser extends Document {
  name: string;
  email: string;
  created_at: Date;
  password: string;
}
