import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-176-34-215-248.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'wrwyhcydvcsyyc',
      password: '971ef50a0fc29251e4d38de33d148c230dbb5b73e0cb0025371a6cd55fae6512',
      database: 'postgresql-regular-53484',
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
