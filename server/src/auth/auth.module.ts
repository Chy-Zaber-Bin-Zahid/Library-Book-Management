import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth } from './auth';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [Auth],
  imports: [UsersModule],
})
export class AuthModule {}
