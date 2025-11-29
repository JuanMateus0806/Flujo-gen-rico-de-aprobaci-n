import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request as RequestEntity } from './entity/request.entity';
import { Request_history } from './entity/request_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity, Request_history])],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
