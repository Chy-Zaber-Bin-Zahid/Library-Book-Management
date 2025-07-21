import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class Auth {
  constructor(private usersService: UsersService) {}
  async signIn(createAuthDto: CreateAuthDto): Promise<any> {
    try {
      const user = await this.usersService.findOne(createAuthDto);
      const { password, ...userWithoutPassword } = user;
      if (!user) {
        return null;
      }
      return {
        statusCode: 200,
        message: 'User authenticated successfully',
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new UnauthorizedException(`Authentication failed: ${error}`);
    }
  }
}
