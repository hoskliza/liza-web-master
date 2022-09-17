import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AddUserDto } from './DTO/add-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Получение всех зарегестрированных пользователей' })
  @ApiResponse({
    status: 200,
    type: [User],
    description: 'Пользователи найдены',
  })
  @ApiResponse({ status: 400, description: 'Пользователи не найдены' })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Добавление пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь добавлен',
  })
  @ApiResponse({ status: 400, description: 'Неудалось добавить пользователя' })
  @Post('add-user')
  async addUser(@Body() userDto: AddUserDto) {
    await this.userService.addUser(userDto);
  }
}
