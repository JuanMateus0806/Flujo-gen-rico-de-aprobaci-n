-- 002-seed-request-type.sql
INSERT INTO request_type (id, name)
VALUES
    (
        '7bb83581-c8b3-4e0d-b013-47681f4d2a9e',
        'DESPLIEGUE'
    ),
    (
        'da6edc73-be34-4077-be40-6b3bcaa0f437',
        'ACCESO'
    ),
    (
        '78a1ef2b-26aa-41ce-92ab-93540f53194e',
        'CAMBIO TECNICO'
    )
    ON CONFLICT (id) DO NOTHING;
