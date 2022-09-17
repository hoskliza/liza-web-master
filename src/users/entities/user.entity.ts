import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'loke@yandex.ru', description: 'Почта пользователя' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'loke', description: 'Имя пользователя' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: '44aasdxzc', description: 'Пароль пользователя' })
  @Column()
  password: string;
}
