package com.bridge.survey.api;


import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;

public interface SurveyService {

    /**
     * Survey.
     * This method will retrieve all the surveys for the user
     *
     * @param surveyRequest
     * @return SurveyResponse.This returns all the surveys assigned to the user.
     */
    SurveyResponse getSurveys(SurveyRequest surveyRequest);

    /**
     * This method will serve the HTTP request to delete the Survey Details based on the
     * surveyId sent in request.
     *
     * @param surveyRequest
     */
    void deleteSurvey(SurveyRequest surveyRequest);

}
