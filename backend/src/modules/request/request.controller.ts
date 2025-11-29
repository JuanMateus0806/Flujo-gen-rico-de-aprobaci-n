import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create_request.dto';
import { UpdateRequestDto } from './dto/update_request.dto';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('/create')
  async createRequest(create_requestDto: CreateRequestDto) {
    return this.requestService.create(create_requestDto);
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, update_requestDto: UpdateRequestDto) {
    return this.requestService.update(id, update_requestDto);
  }

  @Get('/get-all')
  async getAll() {
    return this.requestService.getAll();
  }
}
