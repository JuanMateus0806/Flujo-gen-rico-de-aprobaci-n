import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { TemplateNewRequest } from './template/template-create';
import { SendCreateEmailDto } from '../request/dto/send_create_email.dto';
import { TemplateUpdateRequest } from './template/template-update';

@Injectable()
export class EmailService {
  constructor(
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: nodemailer.Transporter,
  ) {}

  async sendEmailCreate(email: string, info: SendCreateEmailDto) {
    await this.transporter.sendMail({
      from: '"Registro de solicitud" <register@gmail.com>',
      to: email,
      subject: 'Registro de Solicitud',
      html: TemplateNewRequest(info),
    });
  }

  async sendEmailUpdate(email: string, info: SendCreateEmailDto) {
    await this.transporter.sendMail({
      from: '"Actualizacion de solicitud" <register@gmail.com>',
      to: email,
      subject: 'Actualizacion de Solicitud',
      html: TemplateUpdateRequest(info),
    });
  }
}
