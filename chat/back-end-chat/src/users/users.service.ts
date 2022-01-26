import { Iuser } from './users.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDTO } from './create-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<Iuser>) {}
  // fetch all users
  async getAllUsers(): Promise<Iuser[]> {
    const users = await this.userModel.find().exec();
    return users;
  }
  // Get a single users
  async getUser(usersID): Promise<Iuser> {
    const user = await this.userModel.findById(usersID).exec();
    return user;
  }
  // post a single user
  async addUser(createUsersDTO: CreateUsersDTO): Promise<Iuser> {
    const newUser = await new this.userModel(createUsersDTO);
    return newUser.save();
  }
  // Edit user details
  async updateUser(userID, createUsersDTO: CreateUsersDTO): Promise<Iuser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUsersDTO,
      { new: true },
    );
    return updatedUser;
  }
  // Delete a user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }
}
