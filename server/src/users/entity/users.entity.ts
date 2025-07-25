import { Books } from 'src/books/entity/books.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Books, (book) => book.user)
  books: Books[];
}
