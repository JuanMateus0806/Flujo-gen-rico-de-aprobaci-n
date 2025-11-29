import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { RequestModule } from './modules/request/request.module';

@Module({
  imports: [
    RequestModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().DB_HOST,
      port: configuration().DB_PORT,
      username: configuration().DB_USERNAME,
      password: configuration().DB_PASSWORD,
      database: configuration().DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
