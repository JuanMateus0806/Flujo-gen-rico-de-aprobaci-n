import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request_type } from './entity/request_type.entity';
import { Repository } from 'typeorm';
import { CreateRequestTypeDto } from './dto/create_request_type.dto';
import {
  FormatNamesString,
  NormalizeString,
} from '../../common/utils/string.utils';
import { GetAllRequestTypeDto } from './dto/get_all_request_type.dto';

@Injectable()
export class RequestTypeService {
  constructor(
    @InjectRepository(Request_type)
    private requestTypeRepository: Repository<Request_type>,
  ) {}

  async create(create_requestTypeDto: CreateRequestTypeDto) {
    const requestType = this.requestTypeRepository.create({
      name: NormalizeString(create_requestTypeDto.name),
    });
    await this.requestTypeRepository.save(requestType);
    return { success: 'true', message: 'Tipo de solicitud creado con exito' };
  }

  async getAll(): Promise<GetAllRequestTypeDto[]> {
    const types = await this.requestTypeRepository.find();
    return types.map((type) => ({
      id: type.id,
      name: FormatNamesString(type.name),
    }));
  }
}
