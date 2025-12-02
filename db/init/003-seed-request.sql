INSERT INTO public.request (
    id,
    title,
    description,
    state,
    created_at,
    updated_at,
    applicant_id,
    approver_id,
    type_id
)
VALUES
    (
        'abcc8a89-e456-463c-9bbb-eeed56921481',
        'Ajuste en despliegue de módulo',
        'Se solicita revisar el despliegue del módulo en el entorno de pruebas por inconsistencias detectadas.',
        'APROBADA',
        '2025-11-30 14:18:54.152',
        '2025-11-30 14:19:24.99',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '78a1ef2b-26aa-41ce-92ab-93540f53194e'
    ),
    (
        '8ce704fc-9345-4e4d-94a0-13e47e060d18',
        'Actualización de configuración técnica',
        'Se solicita validar y aplicar la mejor alternativa de configuración técnica propuesta para el sistema.',
        'APROBADA',
        '2025-11-30 14:22:34.18',
        '2025-11-30 14:23:00.912',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '78a1ef2b-26aa-41ce-92ab-93540f53194e'
    ),
    (
        '4855441c-0535-43a2-b627-61b27f237d72',
        'Despliegue de cambio menor',
        'Solicitud para desplegar un cambio menor en el entorno productivo. Se encontraron observaciones durante la revisión.',
        'RECHAZADA',
        '2025-11-30 14:41:42.643',
        '2025-11-30 14:41:59.194',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '7bb83581-c8b3-4e0d-b013-47681f4d2a9e'
    ),
    (
        'c9a1bb27-17ab-459a-be36-4b4df24d9880',
        'Solicitud de acceso a información',
        'Se requiere acceso a la información del módulo de gestión de usuarios para realizar labores de soporte.',
        'PENDIENTE',
        '2025-12-01 19:08:51.371',
        '2025-12-01 19:08:51.371',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        'da6edc73-be34-4077-be40-6b3bcaa0f437'
    ),
    (
        'c31d716b-2d96-4d89-8f69-f48cde338f03',
        'Despliegue de corrección',
        'Solicitud para desplegar una corrección puntual reportada por el usuario final en ambiente de pruebas.',
        'PENDIENTE',
        '2025-12-01 19:11:06.281',
        '2025-12-01 19:11:06.281',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '7bb83581-c8b3-4e0d-b013-47681f4d2a9e'
    ),
    (
        '02b67121-0898-4079-842c-9cdb8d1b87b4',
        'Evaluación de módulo de registro',
        'Se reporta que el módulo de registro fue entregado en el tiempo estimado y cumple los requerimientos, pero se solicita una revisión adicional de compatibilidad con diferentes plataformas.',
        'RECHAZADA',
        '2025-12-01 19:19:16.681',
        '2025-12-01 19:33:41.176',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '7bb83581-c8b3-4e0d-b013-47681f4d2a9e'
    ),
    (
        '06be721d-a358-4751-bedb-533e515c4b06',
        'Aprobación de módulo de registro',
        'Se confirma que el módulo de registro cumple con las pruebas funcionales y de compatibilidad realizadas en las distintas plataformas definidas.',
        'APROBADA',
        '2025-12-01 19:18:59.576',
        '2025-12-01 19:36:08.999',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '7bb83581-c8b3-4e0d-b013-47681f4d2a9e'
    ),
    (
        'a3f9cad6-3795-4334-810a-eb3ff8efbd2c',
        'Revisión adicional de módulo de registro',
        'Se solicita una nueva revisión del módulo de registro debido a observaciones funcionales encontradas durante las pruebas de usuario.',
        'RECHAZADA',
        '2025-12-01 19:18:28.2',
        '2025-12-01 19:38:24.691',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '7bb83581-c8b3-4e0d-b013-47681f4d2a9e'
    ),
    (
        'ee73519d-03bb-4798-bb7a-80ea7e747896',
        'Validación de descripción extensa',
        'Solicitud utilizada para validar que descripciones largas se visualicen correctamente en la tabla y en la interfaz, sin afectar el diseño ni la distribución dinámica de la información.',
        'APROBADA',
        '2025-12-01 19:14:14.806',
        '2025-12-01 19:38:32.526',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        '78a1ef2b-26aa-41ce-92ab-93540f53194e'
    )
    ON CONFLICT (id) DO NOTHING;
