package com.bridge.survey.controller.config;

import com.bridge.survey.SurveyAdapter;
import com.bridge.survey.SurveyAdapterImpl;

import org.jooq.DSLContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.bridge.survey.utils.SurveyAdapterConverter;

@Configuration
public class SurveyAdapterConfig {

    @Bean
    public SurveyAdapterConverter surveyAdapterConverter() {
        return new SurveyAdapterConverter();
    }

    @Bean
    public SurveyAdapter surveyAdapter(final DSLContext dsl,
                                       final SurveyAdapterConverter surveyAdapterConverter) {
        return new SurveyAdapterImpl(dsl, surveyAdapterConverter);
    }
}
