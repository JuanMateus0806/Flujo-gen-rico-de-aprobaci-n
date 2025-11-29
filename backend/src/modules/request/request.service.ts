import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestEntity } from './entity/request';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create_request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async create(create_requestDto: CreateRequestDto) {
    const request = this.requestRepository.create(create_requestDto);
    await this.requestRepository.save(request);
    return { success: 'true', request: request };
  }
}
