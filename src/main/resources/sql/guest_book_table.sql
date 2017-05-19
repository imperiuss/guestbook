CREATE TABLE public.guest_book
(
    id integer NOT NULL DEFAULT nextval('guest_book_id_seq'::regclass),
    name character varying(80) COLLATE pg_catalog."default" NOT NULL,
    email character varying(80) COLLATE pg_catalog."default" NOT NULL,
    message text COLLATE pg_catalog."default" NOT NULL,
    date timestamp(6) without time zone NOT NULL,
    CONSTRAINT guest_book_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;