package com.bridge.survey.controller;


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

    /**
     * This method will handle all RuntimeException occurred in RestAdapter
     *
     * @param ex
     * @return ResponseEntity Object.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> exceptionHandler(RuntimeException ex) {
        LOGGER.error("RuntimeException Raised - ", ex);
        String errMSg = "Some Error occurred While processing the request";
        return new ResponseEntity<>(errMSg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
