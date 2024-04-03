--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: thoryur
--

CREATE TABLE public.activity (
    id integer NOT NULL,
    operationtype character varying(255),
    durationrange integer[],
    targettemprange integer[],
    initialtempset integer,
    finaltempset integer,
    processtemp integer,
    rpmrange integer[],
    flowrange integer[],
    ppumpsetrange integer[],
    vpumptorrprocess integer,
    vpumptorrrange integer[]
);


ALTER TABLE public.activity OWNER TO thoryur;

--
-- Name: activity_equipment; Type: TABLE; Schema: public; Owner: thoryur
--

CREATE TABLE public.activity_equipment (
    id integer NOT NULL,
    activity_id integer,
    equipment_id integer
);


ALTER TABLE public.activity_equipment OWNER TO thoryur;

--
-- Name: activity_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: thoryur
--

CREATE SEQUENCE public.activity_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_equipment_id_seq OWNER TO thoryur;

--
-- Name: activity_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thoryur
--

ALTER SEQUENCE public.activity_equipment_id_seq OWNED BY public.activity_equipment.id;


--
-- Name: activity_id_seq; Type: SEQUENCE; Schema: public; Owner: thoryur
--

CREATE SEQUENCE public.activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_id_seq OWNER TO thoryur;

--
-- Name: activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thoryur
--

ALTER SEQUENCE public.activity_id_seq OWNED BY public.activity.id;


--
-- Name: equipment; Type: TABLE; Schema: public; Owner: thoryur
--

CREATE TABLE public.equipment (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    description text,
    label character varying(255),
    size character varying(255),
    material character varying(255),
    utensils boolean NOT NULL
);


ALTER TABLE public.equipment OWNER TO thoryur;

--
-- Name: equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: thoryur
--

CREATE SEQUENCE public.equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.equipment_id_seq OWNER TO thoryur;

--
-- Name: equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thoryur
--

ALTER SEQUENCE public.equipment_id_seq OWNED BY public.equipment.id;


--
-- Name: operation; Type: TABLE; Schema: public; Owner: thoryur
--

CREATE TABLE public.operation (
    id integer NOT NULL,
    content text,
    other text
);


ALTER TABLE public.operation OWNER TO thoryur;

--
-- Name: operation_equipment; Type: TABLE; Schema: public; Owner: thoryur
--

CREATE TABLE public.operation_equipment (
    id integer NOT NULL,
    operation_id integer,
    equipment_id integer
);


ALTER TABLE public.operation_equipment OWNER TO thoryur;

--
-- Name: operation_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: thoryur
--

CREATE SEQUENCE public.operation_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.operation_equipment_id_seq OWNER TO thoryur;

--
-- Name: operation_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thoryur
--

ALTER SEQUENCE public.operation_equipment_id_seq OWNED BY public.operation_equipment.id;


--
-- Name: operation_id_seq; Type: SEQUENCE; Schema: public; Owner: thoryur
--

CREATE SEQUENCE public.operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.operation_id_seq OWNER TO thoryur;

--
-- Name: operation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thoryur
--

ALTER SEQUENCE public.operation_id_seq OWNED BY public.operation.id;


--
-- Name: activity id; Type: DEFAULT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.activity ALTER COLUMN id SET DEFAULT nextval('public.activity_id_seq'::regclass);


--
-- Name: activity_equipment id; Type: DEFAULT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.activity_equipment ALTER COLUMN id SET DEFAULT nextval('public.activity_equipment_id_seq'::regclass);


--
-- Name: equipment id; Type: DEFAULT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.equipment ALTER COLUMN id SET DEFAULT nextval('public.equipment_id_seq'::regclass);


--
-- Name: operation id; Type: DEFAULT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.operation ALTER COLUMN id SET DEFAULT nextval('public.operation_id_seq'::regclass);


--
-- Name: operation_equipment id; Type: DEFAULT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.operation_equipment ALTER COLUMN id SET DEFAULT nextval('public.operation_equipment_id_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: thoryur
--

COPY public.activity (id, operationtype, durationrange, targettemprange, initialtempset, finaltempset, processtemp, rpmrange, flowrange, ppumpsetrange, vpumptorrprocess, vpumptorrrange) FROM stdin;
\.


--
-- Data for Name: activity_equipment; Type: TABLE DATA; Schema: public; Owner: thoryur
--

COPY public.activity_equipment (id, activity_id, equipment_id) FROM stdin;
\.


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: thoryur
--

COPY public.equipment (id, name, code, description, label, size, material, utensils) FROM stdin;
1	balances	007-1	max=3kg	\N	\N	\N	f
2	balances	007-10	max=2kg	\N	\N	\N	f
3	balances	007-12	max=1kg	\N	\N	\N	f
4	balances	007-16	max=220kg	\N	\N	\N	f
5	balances	007-21	max=1.3kg	\N	\N	\N	f
6	balances	007-25	max=3.5kg	\N	\N	\N	f
7	balances	007-26	max=3.5kg	\N	\N	\N	f
8	balances	007-27	max=3.5kg	\N	\N	\N	f
9	balances	007-34	max=3.5kg	\N	\N	\N	f
10	balances	007-6	max=10kg	\N	\N	\N	f
11	balances	007-20	max=3kg	\N	\N	\N	f
12	balances	007-23	max=150kg	\N	\N	\N	f
13	balances	007-24	max=30kg	\N	\N	\N	f
14	balances	007-39	max=30kg	\N	\N	\N	f
15	balances	007-40	max=30kg	\N	\N	\N	f
16	balances	007-41	max=3kg	\N	\N	\N	f
17	balances	007-42	max=30kg	\N	\N	\N	f
18	balances	007-43	max=1kg	\N	\N	\N	f
19	balances	007-44	max=120kg	\N	\N	\N	f
20	balances	007-45	max=60kg	\N	\N	\N	f
21	reactor	002-10	30L glass	\N	\N	\N	f
22	reactor	002-11	15L glass	\N	\N	\N	f
23	reactor	002-12	150L glass	\N	\N	\N	f
24	reactor	002-13	100L glass	\N	\N	\N	f
25	reactor	002-14	100L g-lined	\N	\N	\N	f
26	reactor	002-15	150L glass	\N	\N	\N	f
27	reactor	002-16	50L glass	\N	\N	\N	f
28	reactor	002-17	100L glass	\N	\N	\N	f
29	d_filter	046-4	ss 40/80L	\N	\N	\N	f
30	d_filter	046-6	ss 30/45L	\N	\N	\N	f
31	d_filter	046-7	ss agit 100/140L	\N	\N	\N	f
32	n_filter	046-1	\N	\N	\N	\N	f
33	n_filter	046-13	\N	\N	\N	\N	f
34	n_filter	046-14	\N	\N	\N	\N	f
35	n_filter	046-2	\N	\N	\N	\N	f
36	n_filter	046-3	\N	\N	\N	\N	f
37	m_pump	001-22	\N	\N	\N	\N	f
38	m_pump	001-23	\N	\N	\N	\N	f
39	m_pump	001-24	\N	\N	\N	\N	f
40	p_pump	001-13	\N	\N	\N	\N	f
41	p_pump	001-21	\N	\N	\N	\N	f
42	p_pump	001-29	\N	\N	\N	\N	f
43	o_pump	001-38	\N	\N	\N	\N	f
44	o_pump	001-43	\N	\N	\N	\N	f
45	oven	012-10	vac.	\N	\N	\N	f
46	oven	012-13	conv.	\N	\N	\N	f
47	oven	012-14	conv.	\N	\N	\N	f
48	oven	012-15	vac.	\N	\N	\N	f
49	oven	012-16	conv.	\N	\N	\N	f
50	oven	012-17	vac.	\N	\N	\N	f
51	oven	012-6	conv.	\N	\N	\N	f
52	oven	012-9	vac.	\N	\N	\N	f
\.


--
-- Data for Name: operation; Type: TABLE DATA; Schema: public; Owner: thoryur
--

COPY public.operation (id, content, other) FROM stdin;
\.


--
-- Data for Name: operation_equipment; Type: TABLE DATA; Schema: public; Owner: thoryur
--

COPY public.operation_equipment (id, operation_id, equipment_id) FROM stdin;
\.


--
-- Name: activity_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thoryur
--

SELECT pg_catalog.setval('public.activity_equipment_id_seq', 1, false);


--
-- Name: activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thoryur
--

SELECT pg_catalog.setval('public.activity_id_seq', 1, false);


--
-- Name: equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thoryur
--

SELECT pg_catalog.setval('public.equipment_id_seq', 52, true);


--
-- Name: operation_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thoryur
--

SELECT pg_catalog.setval('public.operation_equipment_id_seq', 1, false);


--
-- Name: operation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thoryur
--

SELECT pg_catalog.setval('public.operation_id_seq', 1, false);


--
-- Name: activity_equipment activity_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.activity_equipment
    ADD CONSTRAINT activity_equipment_pkey PRIMARY KEY (id);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (id);


--
-- Name: operation_equipment operation_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.operation_equipment
    ADD CONSTRAINT operation_equipment_pkey PRIMARY KEY (id);


--
-- Name: operation operation_pkey; Type: CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.operation
    ADD CONSTRAINT operation_pkey PRIMARY KEY (id);


--
-- Name: activity_equipment activity_equipment_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.activity_equipment
    ADD CONSTRAINT activity_equipment_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activity(id) ON DELETE CASCADE;


--
-- Name: activity_equipment activity_equipment_equipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.activity_equipment
    ADD CONSTRAINT activity_equipment_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.equipment(id) ON DELETE CASCADE;


--
-- Name: operation_equipment operation_equipment_equipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.operation_equipment
    ADD CONSTRAINT operation_equipment_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.equipment(id) ON DELETE CASCADE;


--
-- Name: operation_equipment operation_equipment_operation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thoryur
--

ALTER TABLE ONLY public.operation_equipment
    ADD CONSTRAINT operation_equipment_operation_id_fkey FOREIGN KEY (operation_id) REFERENCES public.operation(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

