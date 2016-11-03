package com.bridge.survey.controller.config;

import com.bridge.survey.api.SurveyService;
import com.bridge.survey.controller.ExceptionControllerAdvice;
import com.bridge.survey.controller.RequestFactory;
import com.bridge.survey.controller.SurveyController;
import com.bridge.survey.controller.converter.ErrorResponseConverter;
import com.bridge.survey.controller.converter.SuccessResponseConverter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerConfig {

    /**
     * Create SuccessResponseConverter Object
     *
     * @return SuccessResponseConverter Object.
     */
    @Bean
    public SuccessResponseConverter successResponseConverter() {
        return new SuccessResponseConverter();
    }

    /**
     * Create ErrorResponseConverter Object
     *
     * @return ErrorResponseConverter Object.
     */
    @Bean
    public ErrorResponseConverter errorResponseConverter() {
        return new ErrorResponseConverter();
    }

    /**
     * Create RequestFactory Object
     *
     * @return RequestFactory Object.
     */
    @Bean
    public RequestFactory requestFactory() {
        return new RequestFactory();
    }

    /**
     * Create SurveyController Object
     *
     * @return SurveyController Object.
     */
    @Bean
    public SurveyController surveyController(final SurveyService surveyService,
                                             final RequestFactory requestFactory,
                                             final SuccessResponseConverter
                                                     successResponseConverter) {
        return new SurveyController(surveyService, requestFactory, successResponseConverter);
    }

    /**
     * Create ExceptionControllerAdvice Object
     *
     * @return ExceptionControllerAdvice Object.
     */
    @Bean
    public ExceptionControllerAdvice exceptionControllerAdvice(final ErrorResponseConverter
                                                                       errorResponseConverter) {
        return new ExceptionControllerAdvice(errorResponseConverter);
    }

}
