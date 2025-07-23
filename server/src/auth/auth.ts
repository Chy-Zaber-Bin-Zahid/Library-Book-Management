import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';

type SignIn = {
  statusCode: number;
  message: string;
  access_token?: string;
};

@Injectable()
export class Auth {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(createAuthDto: CreateAuthDto): Promise<SignIn | null> {
    try {
      const user = await this.usersService.findOne(createAuthDto);
      if (!user) {
        return null;
      }
      return {
        statusCode: 200,
        message: 'User authenticated successfully',
        access_token: await this.jwtService.signAsync({
          sub: user.id,
          name: user.name,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException(`Authentication failed: ${error}`);
    }
  }

  async register(createAuthDto: CreateAuthDto): Promise<SignIn | null> {
    try {
      const user = await this.usersService.create(createAuthDto);
      console.log(user);
      if (!user) {
        return null;
      }
      return {
        statusCode: 201,
        message: 'User register successfully',
      };
    } catch (error) {
      throw new UnauthorizedException(`Register failed: ${error}`);
    }
  }
}
