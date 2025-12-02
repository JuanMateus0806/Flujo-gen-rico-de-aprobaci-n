import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Module({
  providers: [
    {
      provide: 'MAIL_TRANSPORTER',
      useFactory: (config: ConfigService) => {
        const transporter = nodemailer.createTransport({
          host: config.get<string>('EMAIL_HOST'),
          port: config.get<number>('EMAIL_PORT'),
          secure: config.get<number>('EMAIL_PORT') === 465,
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASSWORD'),
          },
        });

        transporter
          .verify()
          .then(() => console.log('SMTP listo para enviar correos'))
          .catch((err) => console.error('Error SMTP:', err?.message));

        return transporter;
      },
      inject: [ConfigService],
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
