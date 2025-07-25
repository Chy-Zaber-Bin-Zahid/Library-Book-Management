import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Books } from './entity/books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly bookRepo: Repository<Books>,
  ) {}

  async create(createBookDto: CreateBookDto, userId: number) {
    const newBook = this.bookRepo.create({
      book: createBookDto.book,
      user: { id: userId },
    });

    return await this.bookRepo.save(newBook);
  }

  async findAll() {
    try {
      const books = await this.bookRepo.find({ order: { id: 'ASC' } });
      console.log(books);
      return {
        message: 'Books fetched successfully',
        data: books,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch books: ${error}`);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.bookRepo.findOne({ where: { id } });

      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      const updated = await this.bookRepo.save({
        ...book,
        ...updateBookDto,
      });

      return {
        message: 'Book updated successfully',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Failed to update book: ${error}`);
    }
  }

  async remove(id: number) {
    try {
      const book = await this.bookRepo.findOne({ where: { id } });

      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      await this.bookRepo.remove(book);

      return {
        message: 'Book deleted successfully',
        data: book,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Failed to delete book: ${error}`);
    }
  }
}
