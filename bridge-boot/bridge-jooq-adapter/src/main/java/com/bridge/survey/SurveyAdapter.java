package com.bridge.survey;

import com.bridge.survey.SurveyResponse;
import com.bridge.survey.SurveyRequest;

public interface SurveyAdapter {
    SurveyResponse getSurveyDetails(SurveyRequest surveyRequest);
    void deleteSurvey(SurveyRequest surveyRequest);

}
