import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'admin@gmail.com', description: 'Почта юзера' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: 'admin', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строковым значением' })
  @Length(3, 20, { message: 'Не меньше 3 и не больше 20' })
  readonly username: string;

  @ApiProperty({ example: 'admin', description: 'Пароль пользователя' })
  @Length(4, 20, { message: 'Не меньше 4 и не больше 20' })
  readonly password: string;
}
