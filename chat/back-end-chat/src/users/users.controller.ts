import { CreateUsersDTO } from './create-users.dto';
import {
  Controller,
  Post,
  Get,
  Res,
  Body,
  Param,
  NotFoundException,
  HttpStatus,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  // add a user
  @Post('/create')
  async addUser(@Res() res, @Body() createUserDTO: CreateUsersDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    });
  }

  // Get users list
  @Get('users')
  async getAllUsers(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  // Fetch a particular user using ID
  @Get('user/:userID')
  async getUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getUser(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  // Update a user's details
  @Put('/update')
  async updateUser(
    @Res() res,
    @Query('userID') userID,
    @Body() createUserDTO: CreateUsersDTO,
  ) {
    const user = await this.userService.updateUser(userID, createUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  // Delete a user
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID') userID) {
    const user = await this.userService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
