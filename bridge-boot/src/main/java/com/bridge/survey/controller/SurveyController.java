package com.bridge.survey.controller;

import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.SurveyQuestion;
import com.bridge.survey.service.SurveyService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "survey")
public class SurveyController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SurveyController.class);

    private final SurveyService surveyService;

    /**
     * This is the parameterized constructor which takes the SurveyService
     * and creates SurveyController Object.
     *
     * @param surveyService
     */
    @Autowired
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    /**
     * This method will serve the HTTP request to get all the Survey Details.
     *
     * @param surveyName
     * @param sortParameters
     * @param isPublished
     * @return SurveyResponse
     */
    @RequestMapping(value = "/getSurveys",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public SurveyResponse getSurveyDetails(
            @RequestParam(value = "surveyName", required = false) final String surveyName,
            @RequestParam(value = "sortParameters", required = false) final String sortParameters,
            @RequestParam(value = "isPublished", required = false) final boolean isPublished) {
        LOGGER.info("In /getSurveyDetails GET Request for srvyName - {} , " +
                "sortParameters - {} ,isPublished - {} ", surveyName, sortParameters, isPublished);
        SurveyRequest surveyRequest = getSurveyRequest(null,
                surveyName, sortParameters, isPublished, null, null, null);
        return surveyService.getSurveys(surveyRequest);
    }

    /**
     * This method will serve the HTTP request to delete the Survey Details based on the
     * surveyId sent in request.
     *
     * @param surveyId
     */
    @RequestMapping(value = "/deleteSurvey",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteSurvey(
            @RequestParam(value = "surveyId", required = false) final long surveyId) {
        LOGGER.info("In /deleteSurvey DELETE Request for surveyId - {}", surveyId);
        SurveyRequest surveyRequest = getSurveyRequest
                (surveyId, null, null, false, null, null, null);
        surveyService.deleteSurvey(surveyRequest);
    }

    /**
     * This method will be used to get all the templates of a survey
     *
     * @return SurveyResponse
     */
    @RequestMapping(value = "/templates",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public SurveyResponse getSurveyTemplates() {
        return surveyService.getSurveyTemplates();
    }

    /**
     * This method will serve HTTP GET request for returning default answer type with options
     *
     * @return SurveyResponse
     */
    @RequestMapping(value = "/getAllAnswerTypeWithOptions", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public SurveyResponse getAllAnswerTypeWithOptions() {
        return surveyService.getAllAnswerTypeWithOptions();
    }

    /**
     * This method will serve HTTP POST request which saves/updates survey
     *
     * @param surveyId
     * @param surveyName
     * @param surveyQuestions
     * @return SurveyResponse
     */
    @RequestMapping(value = "/saveSurveyQuestions", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public SurveyResponse saveOrUpdateSurvey(
            @RequestParam(value = "surveyId", required = false) final long surveyId,
            @RequestParam(value = "surveyName", required = false) final String surveyName,
            @RequestBody(required = false) List<SurveyQuestion> surveyQuestions) {
        SurveyRequest surveyRequest = getSurveyRequest(surveyId, surveyName, null, false,
                surveyQuestions, null, null);
        surveyService.saveOrUpdateSurvey(surveyRequest);
        return surveyService.getSurveyQuestions(surveyRequest);
    }

    /**
     * This method will serve HTTP POST request which saves/updates survey
     *
     * @param surveyTemplateId
     * @return SurveyResponse
     */
    @RequestMapping(value = "/saveSurveyFromTemplate", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public SurveyResponse saveSurveyFromTemplate(
            @RequestParam(value = "surveyTemplateId") final long surveyTemplateId) {
        SurveyRequest surveyRequest = getSurveyRequest(null, null, null, false,
                null, null, surveyTemplateId);
        return surveyService.saveSurveyFromTemplate(surveyRequest);
    }

    @RequestMapping(value = "/deleteSurveyQuestion", method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public SurveyResponse deleteSurveyQuestion(
            @RequestParam(value = "surveyId", required = false) final long surveyId,
            @RequestParam(value = "surveyName", required = false) final String surveyName,
            @RequestParam(value = "surveyQuestionId", required = false) final long surveyQuestionId) {
        SurveyRequest surveyRequest = getSurveyRequest(surveyId, surveyName, null,
                false, null, surveyQuestionId, null);
        surveyService.deleteSurveyQuestion(surveyRequest);
        return surveyService.getSurveyQuestions(surveyRequest);
    }

    private SurveyRequest getSurveyRequest(Long surveyId,
                                           String surveyName,
                                           String sortParameter,
                                           boolean unPublished,
                                           List<SurveyQuestion> surveyQuestions,
                                           Long surveyQuestionId,
                                           Long surveyTemplateId) {

        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyId(surveyId);
        surveyRequest.setSurveyName(surveyName);
        surveyRequest.setSortParameter(sortParameter);
        surveyRequest.setUnPublished(unPublished);
        surveyRequest.setSurveyQuestions(surveyQuestions);
        surveyRequest.setSurveyQuestionId(surveyQuestionId);
        surveyRequest.setSurveyTemplateId(surveyTemplateId);
        return surveyRequest;
    }
}