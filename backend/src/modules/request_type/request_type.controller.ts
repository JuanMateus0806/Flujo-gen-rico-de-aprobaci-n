import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRequestTypeDto } from './dto/create_request_type.dto';
import { RequestTypeService } from './request_type.service';

@Controller('request-type')
export class RequestTypeController {
  constructor(private requestTypeService: RequestTypeService) {}

  @Post('/create')
  async create(@Body() create_requestTypeDto: CreateRequestTypeDto) {
    return this.requestTypeService.create(create_requestTypeDto);
  }

  @Get('/all')
  async getAll() {
    return this.requestTypeService.getAll();
  }
}
