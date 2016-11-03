package com.bridge.survey.config;

import com.bridge.survey.SurveyAdapter;
import com.bridge.survey.api.SurveyService;
import com.bridge.survey.impl.SurveyServiceImpl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {

    /**
     * Survey Service
     * This method will create SurveyService bean object.
     *
     * @param surveyAdapter
     * @return SurveyService bean object.
     */
    @Bean
    public SurveyService surveyService(final SurveyAdapter surveyAdapter) {
        return new SurveyServiceImpl(surveyAdapter);
    }
}
