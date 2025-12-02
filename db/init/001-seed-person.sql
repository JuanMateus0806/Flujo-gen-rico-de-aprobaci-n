INSERT INTO person (id, name, last_name, email, role)
VALUES
    (
        'b1859c67-f9cb-45de-898c-c124cf9212b0',
        'JUAN SEBASTIAN',
        'RODRIGUEZ MATEUS',
        'RODRIGUEZMATEUSJUAN0706@GMAIL.COM',
        'APROBADOR'
    ),
    (
        'a5d00856-e35f-41f0-be4a-0be6824e5e45',
        'DAVID SANTIAGO',
        'LOTERO RODRIGUEZ',
        'JUANSEBASTIANRODRIGUEZMATEUS7B@GMAIL.COM',
        'APROBADOR'
    ),
    (
        '9bfaae97-dfb1-4d51-92ec-e12c32ac4cc5',
        'SAMUEL DAVID',
        'VARGAS MILLAN',
        'SAMUEL.VARGAS02@UPTC.EDU.CO',
        'ADMINISTRADOR'
    ),
    (
        '3093f1d9-5e84-44cd-b2f5-858cad06ea84',
        'ANDRES',
        'MELO',
        'JUAN.RODRIGUEZ99@UPTC.EDU.CO',
        'SOLICITANTE'
    )
    ON CONFLICT (id) DO NOTHING;
