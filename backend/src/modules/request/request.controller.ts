import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create_request.dto';
import { UpdateRequestDto } from './dto/update_request.dto';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('/create')
  async createRequest(@Body() dto: CreateRequestDto) {
    return this.requestService.create(dto);
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateRequestDto) {
    return this.requestService.update(id, dto);
  }

  @Get('/all/:id')
  async getAll(@Param('id') id: string, @Query('role') role: string) {
    return this.requestService.getAll(id, role);
  }
}
