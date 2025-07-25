import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule, TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
