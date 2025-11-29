import { Controller, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create_request.dto';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post('/create')
  async createRequest(create_requestDto: CreateRequestDto){
    return this.requestService.create(create_requestDto);
  }
}
