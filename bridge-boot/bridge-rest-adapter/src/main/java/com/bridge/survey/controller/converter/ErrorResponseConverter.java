package com.bridge.survey.controller.converter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorResponseConverter {

    /**
     * This method will convert the error message and HTTPStatus into the UI acceptable format
     * i.e., ResponseEntity type
     *
     * @param errMsg
     * @param httpStatus
     * @return ResponseEntity Object
     */
    public ResponseEntity<Object> convert(String errMsg, HttpStatus httpStatus) {
        return new ResponseEntity<>(errMsg, httpStatus);
    }
}
