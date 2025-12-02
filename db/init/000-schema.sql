CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.person (
                                             id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL UNIQUE,
    role character varying NOT NULL,
    CONSTRAINT pk_person PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public.request_type (
                                                   id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    CONSTRAINT pk_request_type PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public.request (
                                              id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    state character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    applicant_id uuid,
    approver_id uuid,
    type_id uuid,
    CONSTRAINT pk_request PRIMARY KEY (id),
    CONSTRAINT fk_request_applicant
    FOREIGN KEY (applicant_id) REFERENCES public.person(id),
    CONSTRAINT fk_request_approver
    FOREIGN KEY (approver_id) REFERENCES public.person(id),
    CONSTRAINT fk_request_type
    FOREIGN KEY (type_id) REFERENCES public.request_type(id)
    );

CREATE TABLE IF NOT EXISTS public.request_history (
                                                      id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    state character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    comment character varying,
    request_id uuid,
    actor_id uuid,
    CONSTRAINT pk_request_history PRIMARY KEY (id),
    CONSTRAINT fk_history_request
    FOREIGN KEY (request_id) REFERENCES public.request(id),
    CONSTRAINT fk_history_actor
    FOREIGN KEY (actor_id) REFERENCES public.person(id)
    );
