import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './DTO/login-user-dto';
import { RegisterUserDto } from './DTO/register-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, description: 'Авторизация прошла успешно' })
  @ApiResponse({ status: 401, description: 'Ошибка авторизации' })
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, description: 'Регистрация прошла успешно' })
  @ApiResponse({
    status: 400,
    description: 'Пользователь с таким email существует',
  })
  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ token: string }> {
    console.log(registerUserDto);
    return await this.authService.registration(registerUserDto);
  }
}
