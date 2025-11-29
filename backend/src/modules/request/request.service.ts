import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestEntity } from './entity/request.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create_request.dto';
import { NormalizeString } from '../../common/utils/string.utils';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async create(create_requestDto: CreateRequestDto) {
    const request = this.requestRepository.create({
      title: NormalizeString(create_requestDto.title),
      description: NormalizeString(create_requestDto.description),
      applicant: create_requestDto.applicant,
      approver: create_requestDto.approver,
      create_at: new Date(),
      type: {
        id: create_requestDto.type,
      },
    });
    await this.requestRepository.save(request);
    return { success: 'true', message: 'Solicitud creada con exito' };
  }
}
