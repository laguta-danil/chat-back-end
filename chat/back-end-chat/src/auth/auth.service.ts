import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(id: string, email: string): Promise<any> {
    const user = await this.usersService.getUser(id);
    if (user && user.email === email) {
      const { email, ...result } = user;
      return result;
    }
    return null;
  }
}
