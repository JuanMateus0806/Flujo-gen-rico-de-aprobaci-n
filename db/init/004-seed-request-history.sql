INSERT INTO public.request_history (
    id,
    state,
    created_at,
    comment,
    request_id,
    actor_id
)
VALUES
    (
        '6cfdd313-d76e-465e-b33d-ef710756e384',
        'PENDIENTE',
        '2025-11-30 14:18:54.152',
        NULL,
        'abcc8a89-e456-463c-9bbb-eeed56921481',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        '32a0c7ed-504d-4671-af14-53640a240c35',
        'APROBADA',
        '2025-11-30 14:19:25.013',
        'Solicitud aprobada después de la revisión técnica.',
        'abcc8a89-e456-463c-9bbb-eeed56921481',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        '77e42a91-b7d4-413b-bcec-2d772fea721c',
        'PENDIENTE',
        '2025-11-30 14:22:34.18',
        NULL,
        '8ce704fc-9345-4e4d-94a0-13e47e060d18',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        '8eb60fb5-209d-4e48-a0cd-cf5db65c0b22',
        'APROBADA',
        '2025-11-30 14:23:00.916',
        'Resultado satisfactorio, se aprueba la solicitud.',
        '8ce704fc-9345-4e4d-94a0-13e47e060d18',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        '6b8f0d34-b9a0-4ff1-af71-242015580263',
        'PENDIENTE',
        '2025-11-30 14:41:42.643',
        NULL,
        '4855441c-0535-43a2-b627-61b27f237d72',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        'b11dce3d-ac5b-456a-ad3c-825aad48d391',
        'RECHAZADA',
        '2025-11-30 14:41:59.201',
        'Solicitud rechazada por no cumplir con los criterios establecidos.',
        '4855441c-0535-43a2-b627-61b27f237d72',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        '1f63e5ee-f950-429b-a554-ba6abe8b9e03',
        'PENDIENTE',
        '2025-12-01 19:08:51.371',
        NULL,
        'c9a1bb27-17ab-459a-be36-4b4df24d9880',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        '4a9517e5-3127-46e7-9cd8-f01e5fa4ac95',
        'PENDIENTE',
        '2025-12-01 19:11:06.281',
        NULL,
        'c31d716b-2d96-4d89-8f69-f48cde338f03',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        '5f144256-12b9-438e-8fb4-30be15946483',
        'PENDIENTE',
        '2025-12-01 19:14:14.806',
        NULL,
        'ee73519d-03bb-4798-bb7a-80ea7e747896',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        'd778ea75-3ff3-4e8a-b4c9-fcba3d7f280e',
        'PENDIENTE',
        '2025-12-01 19:18:28.2',
        NULL,
        'a3f9cad6-3795-4334-810a-eb3ff8efbd2c',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        'bc8a7e4c-7967-4602-b608-bfc043f7dc3c',
        'PENDIENTE',
        '2025-12-01 19:18:59.576',
        NULL,
        '06be721d-a358-4751-bedb-533e515c4b06',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        'a6309df0-0033-4efe-8013-423a81a77805',
        'PENDIENTE',
        '2025-12-01 19:19:16.681',
        NULL,
        '02b67121-0898-4079-842c-9cdb8d1b87b4',
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84'
    ),
    (
        'e074dd3d-f294-45ba-aee6-aa1cb6029f6d',
        'RECHAZADA',
        '2025-12-01 19:33:41.213',
        'Solicitud rechazada tras la revisión del responsable.',
        '02b67121-0898-4079-842c-9cdb8d1b87b4',
        'b1859c67-f9cb-45de-898c-c124cf9212b0'
    ),
    (
        '21cec033-d556-48a9-b921-0456a555743e',
        'APROBADA',
        '2025-12-01 19:36:09.012',
        'Solicitud aprobada luego de validar la información suministrada.',
        '06be721d-a358-4751-bedb-533e515c4b06',
        'b1859c67-f9cb-45de-898c-c124cf9212b0'
    ),
    (
        '443a4c48-9a52-4ef1-9397-1210984d22d3',
        'RECHAZADA',
        '2025-12-01 19:38:24.733',
        'Solicitud rechazada por observaciones en la revisión funcional.',
        'a3f9cad6-3795-4334-810a-eb3ff8efbd2c',
        'b1859c67-f9cb-45de-898c-c124cf9212b0'
    ),
    (
        'c6dcdd9e-adb7-4ab3-a919-2af51262e98e',
        'APROBADA',
        '2025-12-01 19:38:32.539',
        'Solicitud aprobada. La descripción extensa fue validada correctamente en la interfaz.',
        'ee73519d-03bb-4798-bb7a-80ea7e747896',
        'b1859c67-f9cb-45de-898c-c124cf9212b0'
    )
    ON CONFLICT (id) DO NOTHING;
