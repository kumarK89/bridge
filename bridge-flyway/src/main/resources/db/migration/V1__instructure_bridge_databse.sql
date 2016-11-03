-- Table: public.surveys

-- DROP TABLE public.surveys;

CREATE TABLE public.surveys
(
  id bigint NOT NULL,
  survey_name text NOT NULL,
  created_at timestamp with time zone,
  updated_at timestamp without time zone,
  created_by text,
  updated_by text,
  CONSTRAINT surveys_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.surveys
  OWNER TO postgres;


-- Table: public.survey_distribution

-- DROP TABLE public.survey_distribution;

CREATE TABLE public.survey_distribution
(
  id bigint NOT NULL,
  survey_id bigint NOT NULL,
  name text,
  closes_at time without time zone NOT NULL,
  created_at time without time zone,
  updated_at time without time zone,
  created_by text,
  updated_by text,
  CONSTRAINT survey_distribution_pkey PRIMARY KEY (id),
  CONSTRAINT survey_distribution_survey_id_fkey FOREIGN KEY (survey_id)
      REFERENCES public.surveys (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.survey_distribution
  OWNER TO postgres;



