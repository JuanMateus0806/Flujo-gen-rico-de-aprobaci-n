import nodemailer from 'nodemailer';
import configuration from '../../common/config/configuration';

export const transporter = nodemailer.createTransport({
  host: configuration().EMAIL_HOST,
  port: configuration().EMAIL_PORT,
  secure: true,
  auth: {
    user: configuration().EMAIL_USER,
    pass: configuration().EMAIL_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => console.log('Servidor SMTP listo para enviar correos'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('No se pudo conectar al servidor SMTP:', err.message);
    } else {
      console.error('No se pudo conectar al servidor SMTP:', String(err));
    }
  });
