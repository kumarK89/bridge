package com.bridge.survey.controller.converter;

import com.bridge.survey.SurveyResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SuccessResponseConverter {

    /**
     * This method will convert the SurveyResponse into the UI acceptable format i.e.,
     * ResponseEntity type
     *
     * @param surveyResponse
     * @return ResponseEntity Object.
     */
    public ResponseEntity<SurveyResponse> convert(SurveyResponse surveyResponse) {
        return new ResponseEntity<>(surveyResponse, HttpStatus.OK);
    }
}
