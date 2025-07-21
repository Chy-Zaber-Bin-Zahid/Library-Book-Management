import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Auth } from 'src/auth/auth';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: Auth) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.auth.signIn(createAuthDto);
  }
}
