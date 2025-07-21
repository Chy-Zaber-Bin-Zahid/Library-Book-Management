import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const res = await this.conn.query(
        'insert into books (book) values ($1) returning *',
        [createBookDto.book],
      );
      console.log(res.rows[0]);
      return {
        statusCode: 201,
        message: 'Book created successfully',
        data: res.rows[0],
      };
    } catch (error) {
      throw new NotFoundException(`Failed to create book: ${error}`);
    }
  }

  async findAll() {
    try {
      const res = await this.conn.query('select * from books');
      console.log(res.rows);
      return {
        statusCode: 200,
        message: 'Book fetched successfully',
        data: res.rows,
      };
    } catch (error) {
      throw new NotFoundException(`Failed to create book: ${error}`);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      console.log(id, updateBookDto);

      const found = await this.conn.query(
        'select * from books where id = ($1)',
        [id],
      );

      if (found.rows.length === 0) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      const res = await this.conn.query(
        'update books set book = ($1) where id = ($2) returning *',
        [updateBookDto.book, id],
      );
      console.log(res.rows[0]);
      return {
        statusCode: 200,
        message: 'Book updated successfully',
        data: res.rows[0],
      };
    } catch (error) {
      throw new NotFoundException(`Failed to create book: ${error}`);
    }
  }

  async remove(id: number) {
    try {
      const found = await this.conn.query('select * from books where id = ($1)', [
        id,
      ]);

      if (found.rows.length === 0) {
        console.log('Book not found');
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      const res = await this.conn.query(
        'delete from books where id = ($1) returning *',
        [id],
      );
      console.log(res.rows[0]);
      return {
        statusCode: 200,
        message: 'Book deleted successfully',
        data: res.rows[0],
      };
    } catch (error) {
      throw new NotFoundException(`Failed to create book: ${error}`);
    }
  }
}
