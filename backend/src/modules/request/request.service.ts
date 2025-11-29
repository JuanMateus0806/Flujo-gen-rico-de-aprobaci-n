import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestEntity } from './entity/request.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create_request.dto';
import {
  FormatNamesString,
  NormalizeString,
} from '../../common/utils/string.utils';
import { Request_history } from './entity/request_history.entity';
import { Request_status } from './enum/request_status.enum';
import { UpdateRequestDto } from './dto/update_request.dto';
import { GetRequestDto, GetRequestDtoFront } from './dto/get_request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
    @InjectRepository(Request_history)
    private requestHistoryRepository: Repository<Request_history>,
  ) {}

  async create(create_requestDto: CreateRequestDto) {
    const request = this.requestRepository.create({
      title: NormalizeString(create_requestDto.title),
      description: NormalizeString(create_requestDto.description),
      applicant: {
        id: create_requestDto.applicant,
      },
      approver: {
        id: create_requestDto.approver,
      },
      create_at: new Date(),
      type: {
        id: create_requestDto.type,
      },
    });
    await this.requestRepository.save(request);
    await this.requestHistoryRepository.save(
      this.requestHistoryRepository.create({
        state: Request_status.PENDIENTE,
        update_at: request.create_at,
        request: {
          id: request.id,
        },
      }),
    );
    return { success: 'true', message: 'Solicitud creada con exito' };
  }

  async update(id: string, update_requestDto: UpdateRequestDto) {
    const request = await this.requestRepository.findOne({
      where: { id: id },
    });
    if (request) {
      await this.requestHistoryRepository.save(
        this.requestHistoryRepository.create({
          state: update_requestDto.state,
          update_at: new Date(),
          request: {
            id: request.id,
          },
        }),
      );
    }
  }

  async getAll(id: string, dto: GetRequestDtoFront): Promise<GetRequestDto[]> {
    const requests: RequestEntity[] = await this.requestRepository.find({
      relations: ['type', 'history', 'applicant', 'approver'],
    });
    switch (dto.role) {
      case 'ADMINISTRADOR':
        return this.mapToDto(requests);
      case 'SOLICITANTE':
        return this.mapToDto(requests.filter((r) => r.applicant.id === id));
      case 'APROBADOR':
        return this.mapToDto(requests.filter((r) => r.approver.id === id));
      default:
        return [];
    }
  }

  private mapToDto(requests: RequestEntity[]): GetRequestDto[] {
    const result: GetRequestDto[] = [];

    for (const r of requests) {
      for (const history of r.history) {
        const dto = new GetRequestDto();
        dto.id = r.id;
        dto.title = FormatNamesString(r.title);
        dto.description = FormatNamesString(r.description);
        dto.applicant = `${FormatNamesString(r.applicant.name)} ${FormatNamesString(r.applicant.last_name)}`;
        dto.approver = `${FormatNamesString(r.approver.name)} ${FormatNamesString(r.approver.last_name)}`;
        dto.create_at = new Date(r.create_at).toLocaleString('es-PE', {
          dateStyle: 'short',
          timeStyle: 'short',
        });
        dto.update_at = new Date(history.update_at).toLocaleString('es-PE', {
          dateStyle: 'short',
          timeStyle: 'short',
        });
        dto.status = FormatNamesString(history.state);
        dto.comment = history.comment ? FormatNamesString(history.comment) : '';

        result.push(dto);
      }
    }
    return result;
  }
}
