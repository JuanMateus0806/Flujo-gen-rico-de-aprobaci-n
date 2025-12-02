import { SendCreateEmailDto } from '../../request/dto/send_create_email.dto';

export const TemplateNewRequest = (request: SendCreateEmailDto) => {
  return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nueva solicitud registrada</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f6fa; font-family:Arial, sans-serif; color:#0f172a;">

    <!-- Encabezado -->
    <table role="presentation" style="width:100%; border-collapse:collapse; background:#dbeafe;">
      <tr>
        <td style="padding:16px; text-align:center;">
          <h1 style="margin:0; font-size:20px; color:#1e3a8a;">
            📝 Se ha creado una nueva solicitud
          </h1>
        </td>
      </tr>
    </table>

    <!-- Tarjeta de la solicitud -->
    <table role="presentation" style="width:100%; border-collapse:collapse;">
      <tr>
        <td align="center" style="padding: 30px 16px;">
          <table role="presentation" style="max-width:600px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(15,23,42,0.08);">

            <!-- Cabecera de la tarjeta -->
            <tr>
              <td style="background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#ffffff; padding:20px 24px;">
                <h2 style="margin:0; font-size:22px;">${request.title}</h2>
                <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">
                  Nueva solicitud registrada en el sistema
                </p>
              </td>
            </tr>

            <!-- Contenido principal -->
            <tr>
              <td style="padding:24px 24px 8px;">
                <p style="margin:0 0 16px; font-size:15px; line-height:1.5;">
                  Hola,
                  <br />
                  <span style="display:inline-block; margin-top:6px;">
                    Se ha registrado una nueva solicitud con la siguiente información:
                  </span>
                </p>

                <table style="width:100%; border-collapse:collapse; font-size:14px;">
                  <tr>
                    <td style="padding:8px 0; font-weight:bold; width:35%;">👤 Solicitante:</td>
                    <td style="padding:8px 0;">${request.performed_by}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold;">📌 Tipo de solicitud:</td>
                    <td style="padding:8px 0;">${request.type}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:bold;">📝 Título:</td>
                    <td style="padding:8px 0;">${request.title}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Descripción -->
            <tr>
              <td style="padding:8px 24px 24px;">
                <h3 style="margin:0 0 8px; font-size:15px; color:#1e293b;">
                  📄 Descripción de la solicitud
                </h3>
                <div style="
                  margin:0;
                  padding:12px 14px;
                  border-radius:8px;
                  background:#f9fafb;
                  border:1px solid #e5e7eb;
                  font-size:14px;
                  line-height:1.6;
                  white-space:pre-wrap;
                ">
                  ${request.description}
                </div>
              </td>
            </tr>

            <!-- Pie / mensaje final -->
            <tr>
              <td style="padding:16px 24px 22px; font-size:13px; color:#6b7280;">
                <p style="margin:0 0 6px;">
                  Puedes gestionar esta solicitud desde el sistema de aprobación.
                </p>
                <p style="margin:0;">
                  Si tú no deberías recibir este correo, ignóralo o contacta al administrador del sistema.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9; text-align:center; padding:14px; font-size:12px; color:#94a3b8;">
                © ${new Date().getFullYear()} Sistema de Gestión de Solicitudes
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
