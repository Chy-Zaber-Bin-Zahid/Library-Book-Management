import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Auth } from 'src/auth/auth';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: Auth) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() createAuthDto: CreateAuthDto) {
    return await this.auth.signIn(createAuthDto);
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.auth.register(createAuthDto);
  }
}
