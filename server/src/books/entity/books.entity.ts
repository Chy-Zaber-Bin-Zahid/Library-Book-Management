import { Users } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book: string;

  @Column({ default: 0 })
  quantity: number;

  @ManyToOne(() => Users, (user) => user.books, { onDelete: 'CASCADE' })
  user: Users;
}
