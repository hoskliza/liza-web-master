import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './DTO/login-user-dto';
import { RegisterUserDto } from './DTO/register-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(loginUserDto);
    return this.generateToken(user);
  }

  async registration(
    registerUserDto: RegisterUserDto,
  ): Promise<{ token: string }> {
    const candidate = await this.userService.getUserByEmail(
      registerUserDto.email,
    );
    if (registerUserDto === undefined || candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
    const user = await this.userService.addUser({
      ...registerUserDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payLoad = { email: user.email, id: user.id, username: user.username };
    return {
      token: this.jwtService.sign(payLoad),
    };
  }

  getName(bearer: string) {
    const token = bearer.split(' ')[1];
    const user = this.jwtService.decode(token);
    if (user['username'] === undefined) {
      throw new HttpException(
        { message: 'Неизвестный токен' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user['username'];
  }
}
