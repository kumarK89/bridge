package com.bridge.survey.controller;


import com.bridge.survey.controller.converter.ErrorResponseConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice(basePackages = {"com.bridge.survey.controller"})
@RestController
public class ExceptionControllerAdvice {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionControllerAdvice.class);

    private final ErrorResponseConverter errorResponseConverter;

    /**
     * This is the parameterized constructor which creates ExceptionControllerAdvice Object.
     *
     * @param errorResponseConverter
     */
    public ExceptionControllerAdvice(ErrorResponseConverter errorResponseConverter) {
        this.errorResponseConverter = errorResponseConverter;
    }

    /**
     * This method will handle all RuntimeException occured in RestAdapter
     *
     * @param ex
     * @return ResponseEntity Object.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> exceptionHandler(RuntimeException ex) {
        LOGGER.error("RuntimeException Raised - ", ex);
        String errMSg = "Some Error occured While processing the request";
        return errorResponseConverter.convert(errMSg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
