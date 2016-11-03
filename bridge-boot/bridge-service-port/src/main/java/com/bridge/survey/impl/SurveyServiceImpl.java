package com.bridge.survey.impl;

import com.bridge.survey.SurveyAdapter;
import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.api.SurveyService;

public class SurveyServiceImpl implements SurveyService {

    private final SurveyAdapter surveyAdapter;

    public SurveyServiceImpl(SurveyAdapter surveyAdapter) {
        this.surveyAdapter = surveyAdapter;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public SurveyResponse getSurveys(SurveyRequest surveyRequest) {
        return surveyAdapter.getSurveyDetails(surveyRequest);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteSurvey(SurveyRequest surveyRequest) {
        surveyAdapter.deleteSurvey(surveyRequest);
    }
}
