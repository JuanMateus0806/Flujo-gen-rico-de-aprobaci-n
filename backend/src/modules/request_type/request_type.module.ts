import { Module } from '@nestjs/common';
import { RequestTypeController } from './request_type.controller';
import { RequestTypeService } from './request_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request_type } from './entity/request_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request_type])],
  controllers: [RequestTypeController],
  providers: [RequestTypeService],
  exports: [RequestTypeService],
})
export class RequestTypeModule {}
