import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Create a new user instance
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // Create a new user instance with the hashed password
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    // Save the user to the database
    return await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async exist(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ userName: username });
  }

  async roles(id: number): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (user && user.roles) {
      return user.roles.map(role => role.roleName); // Map roles to their names
    }

    return [];
  }
}
