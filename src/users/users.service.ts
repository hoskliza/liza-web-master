import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AddUserDto } from './DTO/add-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository
      .find({
        loadRelationIds: true,
      })
      .catch((e) => {
        throw new HttpException(
          'Неудалось получить пользователей',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async addUser(userDto: AddUserDto): Promise<User> {
    await this.userRepository.insert(userDto).catch((e) => {
      throw new HttpException(
        'Невозможно добавить данного пользователя',
        HttpStatus.BAD_REQUEST,
      );
    });
    return this.getUserByEmail(userDto.email);
  }

  async getUserByEmail(email: string) {
    if (email === undefined) {
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.userRepository.findOne({
      where: { email: email },
      loadRelationIds: true,
    });
  }
}
