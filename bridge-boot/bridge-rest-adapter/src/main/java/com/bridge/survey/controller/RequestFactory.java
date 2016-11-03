package com.bridge.survey.controller;


import com.bridge.survey.SurveyRequest;

import java.util.List;

public class RequestFactory {

    /**
     * This method will return the SurveyRequest Object
     *
     * @param surveyId
     * @param srvyName
     * @param sortParameter
     * @param unPublished
     * @return SurveyRequest Object.
     */
    public SurveyRequest getSurveyRequest(Long surveyId,
                                          String srvyName,
                                          String sortParameter,
                                          boolean unPublished) {

        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyId(surveyId);
        surveyRequest.setSrvyName(srvyName);
        surveyRequest.setSortParameter(sortParameter);
        surveyRequest.setUnPublished(unPublished);
        return surveyRequest;
    }
}
