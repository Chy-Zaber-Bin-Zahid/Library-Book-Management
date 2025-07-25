import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';

type FindOne = {
  id: number;
  password: string;
  name: string;
  role?: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async findOne(createUserDto: CreateUserDto): Promise<FindOne | null> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          name: createUserDto.name,
          password: createUserDto.password,
        },
      });

      return user ?? null;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find user: ${error}`);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<FindOne | null> {
    try {
      const user = this.userRepo.create({
        name: createUserDto.name,
        password: createUserDto.password,
        role: 'user', // default role
      });

      const savedUser = await this.userRepo.save(user);
      return savedUser ?? null;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create user: ${error}`);
    }
  }
}
