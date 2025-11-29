import { Module } from '@nestjs/common';
import { RequestTypeController } from './request_type.controller';
import { RequestTypeService } from './request_type.service';

@Module({
  controllers: [RequestTypeController],
  providers: [RequestTypeService],
})
export class RequestTypeModule {}
