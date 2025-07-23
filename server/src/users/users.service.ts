import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

type FindOne = {
  id: number;
  password: string;
  name: string;
  role?: string;
};

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async findOne(createUserDto: CreateUserDto): Promise<FindOne | null> {
    try {
      const res = await this.conn.query(
        'select * from users where name = ($1) and password = ($2)',
        [createUserDto.name, createUserDto.password],
      );
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    } catch (error) {
      throw new NotFoundException(`Failed to find user: ${error}`);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<FindOne | null> {
    try {
      const res = await this.conn.query(
        'insert into users (name, password, role) values ($1, $2, $3) returning *',
        [createUserDto.name, createUserDto.password, 'user'],
      );
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    } catch (error) {
      throw new NotFoundException(`Failed to find user: ${error}`);
    }
  }
}
