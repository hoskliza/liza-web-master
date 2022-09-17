import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ example: 'loke@yandex.ru', description: 'Почта пользователя' })
  @IsString({ message: 'Должно быть строковым значением' })
  @IsEmail({}, { message: 'Некорректная почта' })
  readonly email: string;

  @ApiProperty({ example: 'loke@yandex.ru', description: 'Почта пользователя' })
  @IsString({ message: 'Должно быть строковым значением' })
  @Length(4, 15, {
    message: 'Имя пользователя должно быть больше 4 и меньше 15 символов',
  })
  readonly username: string;

  @ApiProperty({ example: '4aacwe55s', description: 'Пароль пользователя' })
  @Length(4, 20, {
    message: 'Пароль пользователя должен быть больше 4 и меньше 20 символов',
  })
  readonly password: string;
}
