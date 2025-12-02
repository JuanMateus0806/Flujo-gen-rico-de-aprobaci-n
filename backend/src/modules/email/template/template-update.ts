import { SendCreateEmailDto } from '../../request/dto/send_create_email.dto';

export const TemplateUpdateRequest = (request: SendCreateEmailDto) => {
  const isApproved = request.state?.toUpperCase() === 'APROBADA';
  const isRejected = request.state?.toUpperCase() === 'RECHAZADA';

  const statusColor = isApproved
    ? '#16a34a'
    : isRejected
      ? '#dc2626'
      : '#2563eb';

  const statusBg = isApproved ? '#dcfce7' : isRejected ? '#fee2e2' : '#dbeafe';

  const statusEmoji = isApproved ? '✅' : isRejected ? '❌' : '🔄';

  const statusText = isApproved
    ? 'Solicitud aprobada'
    : isRejected
      ? 'Solicitud rechazada'
      : 'Estado actualizado';

  const commentBlock =
    request.comment && request.comment.trim().length > 0
      ? `
      <tr>
        <td style="padding:8px 24px 24px;">
          <h3 style="margin:0 0 8px; font-size:15px; color:#1e293b;">
            💬 Comentario del aprobador
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
            ${request.comment}
          </div>
        </td>
      </tr>
      `
      : '';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estado actualizado</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f6fa; font-family:Arial, sans-serif; color:#0f172a;">

  <!-- Encabezado -->
  <table role="presentation" style="width:100%; border-collapse:collapse; background:#dbeafe;">
    <tr>
      <td style="padding:16px; text-align:center;">
        <h1 style="margin:0; font-size:20px; color:#1e3a8a;">
          ${statusEmoji} Actualización del estado de la solicitud
        </h1>
      </td>
    </tr>
  </table>

  <!-- Tarjeta -->
  <table role="presentation" style="width:100%; border-collapse:collapse;">
    <tr>
      <td align="center" style="padding: 30px 16px;">
        <table role="presentation" style="max-width:600px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">

          <!-- Cabecera -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#ffffff; padding:20px 24px;">
              <h2 style="margin:0; font-size:22px;">${request.title}</h2>
              <p style="margin:6px 0 0; font-size:14px;">Estado actualizado</p>
            </td>
          </tr>

          <!-- Estado -->
          <tr>
            <td style="padding:20px 24px 10px;">
              <div style="
                display:inline-block;
                padding:8px 14px;
                border-radius:999px;
                background:${statusBg};
                color:${statusColor};
                font-size:13px;
                font-weight:bold;
                text-transform:uppercase;
              ">
                ${statusEmoji} ${statusText}
              </div>
            </td>
          </tr>

          <!-- Información general -->
          <tr>
            <td style="padding:10px 24px 6px;">
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr>
                  <td style="padding:6px 0; font-weight:bold; width:35%;">📌 Tipo:</td>
                  <td style="padding:6px 0;">${request.type}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0; font-weight:bold;">👤 Gestionado por:</td>
                  <td style="padding:6px 0;">${request.performed_by}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Descripción -->
          <tr>
            <td style="padding:8px 24px 16px;">
              <h3 style="margin:0 0 8px; font-size:15px; color:#1e293b;">📄 Descripción</h3>
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

          ${commentBlock}

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9; text-align:center; padding:15px; font-size:12px; color:#64748b;">
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
