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
import { GetRequestDto, History } from './dto/get_request.dto';
import { EmailService } from '../email/email.service';
import { SendCreateEmailDto } from './dto/send_create_email.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
    @InjectRepository(Request_history)
    private requestHistoryRepository: Repository<Request_history>,
    private nodeEmailerService: EmailService,
  ) {}

  async create(create_requestDto: CreateRequestDto) {
    let request = this.requestRepository.create({
      title: NormalizeString(create_requestDto.title),
      description: NormalizeString(create_requestDto.description),
      applicant: {
        id: create_requestDto.applicant,
      },
      approver: {
        id: create_requestDto.approver,
      },
      state: Request_status.PENDIENTE,
      created_at: new Date(),
      updated_at: new Date(),
      type: {
        id: create_requestDto.type,
      },
    });
    request = await this.requestRepository.save(request);
    await this.requestHistoryRepository.save(
      this.requestHistoryRepository.create({
        state: Request_status.PENDIENTE,
        created_at: request.created_at,
        performed_by: {
          id: create_requestDto.applicant,
        },
        request: {
          id: request.id,
        },
      }),
    );
    await this.sendEmailCreateRequest(request.id);
    return { success: 'true', message: 'Solicitud creada con exito' };
  }

  async update(id: string, update_requestDto: UpdateRequestDto) {
    const request = await this.requestRepository.findOne({
      where: { id: id },
      relations: ['approver'],
    });
    if (request) {
      request.state = update_requestDto.state;
      request.updated_at = new Date();
      await this.requestRepository.save(request);
      await this.requestHistoryRepository.save(
        this.requestHistoryRepository.create({
          comment: update_requestDto.comment,
          state: update_requestDto.state,
          created_at: new Date(),
          performed_by: {
            id: request.approver.id,
          },
          request: {
            id: request.id,
          },
        }),
      );
    }
    await this.sendEmailUpdateRequest(id, update_requestDto.comment);
    return { success: 'true', message: 'Solicitud actualizada con exito' };
  }

  async getAll(id: string, role: string): Promise<GetRequestDto[]> {
    const requests: RequestEntity[] = await this.requestRepository.find({
      relations: {
        type: true,
        history: {
          performed_by: true,
        },
        applicant: true,
        approver: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
    switch (role) {
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
    return requests.map((r) => {
      const dto = new GetRequestDto();
      dto.id = r.id;
      dto.title = FormatNamesString(r.title);
      dto.description = FormatNamesString(r.description);
      dto.applicant = `${FormatNamesString(r.applicant.name)} ${FormatNamesString(
        r.applicant.last_name,
      )}`;
      dto.approver = `${FormatNamesString(r.approver.name)} ${FormatNamesString(
        r.approver.last_name,
      )}`;
      dto.type = FormatNamesString(r.type.name);
      dto.create_at = new Date(r.created_at).toLocaleString('es-PE', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      dto.update_at = new Date(r.updated_at).toLocaleString('es-PE', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      dto.state = FormatNamesString(r.state);
      dto.editable = r.history.length === 1;
      const sortedHistory = [...r.history].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      dto.history = sortedHistory.map((h) => {
        const hDto = new History();

        hDto.state = FormatNamesString(h.state);
        hDto.comment = h.comment ? FormatNamesString(h.comment) : '';
        hDto.created_at = new Date(h.created_at).toLocaleString('es-PE', {
          dateStyle: 'short',
          timeStyle: 'short',
        });
        if (h.performed_by) {
          hDto.performed_by = `${FormatNamesString(h.performed_by.name)} ${FormatNamesString(
            h.performed_by.last_name,
          )}`;
        } else {
          hDto.performed_by = '';
        }
        return hDto;
      });
      return dto;
    });
  }

  private async sendEmailCreateRequest(id: string) {
    const request = await this.requestRepository.findOne({
      where: { id: id },
      relations: ['type', 'applicant', 'approver'],
    });
    const info = new SendCreateEmailDto();
    info.title = FormatNamesString(request!.title);
    info.description = FormatNamesString(request!.description);
    info.type = FormatNamesString(request!.type.name);
    info.state = FormatNamesString(request!.state);
    info.performed_by = `${FormatNamesString(request!.applicant.name)} ${FormatNamesString(
      request!.applicant.last_name,
    )}`;
    await this.nodeEmailerService.sendEmailCreate(
      request!.applicant.email,
      info,
    );
  }

  private async sendEmailUpdateRequest(id: string, comment: string) {
    const request = await this.findRequestById(id);
    const info = new SendCreateEmailDto();
    info.title = FormatNamesString(request!.title);
    info.description = FormatNamesString(request!.description);
    info.type = FormatNamesString(request!.type.name);
    info.state = FormatNamesString(request!.state);
    info.performed_by = `${FormatNamesString(request!.approver.name)} ${FormatNamesString(
      request!.approver.last_name,
    )}`;
    info.comment = FormatNamesString(comment);
    await this.nodeEmailerService.sendEmailUpdate(
      request!.applicant.email,
      info,
    );
  }

  private async findRequestById(id: string) {
    return await this.requestRepository.findOne({
      where: { id: id },
      relations: ['type', 'applicant', 'approver'],
    });
  }
}
