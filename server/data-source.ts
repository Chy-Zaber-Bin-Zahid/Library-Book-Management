import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Books } from './src/books/entity/books.entity';
import { Users } from './src/users/entity/users.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  entities: [Books, Users],
  migrations: ['migrations/**'],
  synchronize: false,
});
