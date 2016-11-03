package com.bridge.survey.controller;

import com.bridge.survey.api.SurveyService;
import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.controller.converter.SuccessResponseConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "survey")
@CrossOrigin("http://localhost:3000")
public class SurveyController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SurveyController.class);

    private final SurveyService surveyService;

    private final RequestFactory requestFactory;

    private final SuccessResponseConverter successResponseConverter;

    /**
     * This is the parameterized constructor which takes the SurveyService, RequestFactory,
     * SuccessResponseConverter objects and creates SurveyController Object.
     *
     * @param surveyService
     * @param requestFactory
     * @param successResponseConverter
     */
    public SurveyController(SurveyService surveyService, RequestFactory requestFactory
            , SuccessResponseConverter successResponseConverter) {
        this.surveyService = surveyService;
        this.requestFactory = requestFactory;
        this.successResponseConverter = successResponseConverter;
    }

    /**
     * This method will serve the HTTP request to get all the Survey Details.
     *
     * @param srvyName
     * @param sortParameters
     * @param isPublished
     * @return ResponseEntity Object
     */
    @RequestMapping(value = "/getSurveys", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SurveyResponse> getSurveyDetails(
            @RequestParam(value = "srvyName", required = false) final String srvyName,
            @RequestParam(value = "sortParameters", required = false) final String sortParameters,
            @RequestParam(value = "isPublished", required = false) final boolean isPublished) {
        LOGGER.info("In /getSurveyDetails GET Request for srvyName - {}", srvyName);
        LOGGER.info("In /getSurveyDetails GET Request for sortParameters - {}", sortParameters);
        LOGGER.info("In /getSurveyDetails GET Request for isPublished - {}", isPublished);

        SurveyRequest surveyRequest = requestFactory.getSurveyRequest(null,
                srvyName, sortParameters, isPublished);

        SurveyResponse surveyResponse = surveyService.getSurveys(surveyRequest);
        return successResponseConverter.convert(surveyResponse);
    }

    /**
     * This method will serve the HTTP request to delete the Survey Details based on the
     * surveyId sent in request.
     *
     * @param surveyId
     */
    @RequestMapping(value = "/deleteSurvey", method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteSurvey(
            @RequestParam(value = "surveyId", required = false) final long surveyId) {
        LOGGER.info("In /deleteSurvey DELETE Request for surveyId - {}", surveyId);
        SurveyRequest surveyRequest = requestFactory.getSurveyRequest(surveyId, null, null, false);
        surveyService.deleteSurvey(surveyRequest);
    }

}

