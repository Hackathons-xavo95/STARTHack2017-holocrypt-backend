CREATE SEQUENCE users_id_seq;
ALTER TABLE public.users
    ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY public.users.id;

