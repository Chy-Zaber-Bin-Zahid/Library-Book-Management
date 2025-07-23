import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth';
import { AuthGuard } from 'src/auth/auth.guard';
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

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.name;
  }
}
