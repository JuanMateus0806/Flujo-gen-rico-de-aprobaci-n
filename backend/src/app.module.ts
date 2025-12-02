import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { RequestModule } from './modules/request/request.module';
import { RequestTypeModule } from './modules/request_type/request_type.module';
import { PersonModule } from './modules/person/person.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
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
    EmailModule,
    RequestModule,
    RequestTypeModule,
    PersonModule,
  ],
})
export class AppModule {}
