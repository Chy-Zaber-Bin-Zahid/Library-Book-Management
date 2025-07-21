import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async findOne(createUserDto: CreateUserDto): Promise<any> {
    try {
      const res = await this.conn.query(
        'select name, password from users where name = ($1) and password = ($2)',
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
}
