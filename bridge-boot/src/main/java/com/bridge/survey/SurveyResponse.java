package com.bridge.survey;


import com.bridge.survey.domain.AnswerType;
import com.bridge.survey.domain.Survey;
import com.bridge.survey.domain.SurveyTemplate;

import java.util.List;

public final class SurveyResponse {

    private List<Survey> surveys;

    private List<AnswerType> answerTypes;

    private List<SurveyTemplate> surveyTemplates;

    public List<Survey> getSurveys() {
        return surveys;
    }

    public void setSurveys(List<Survey> surveys) {
        this.surveys = surveys;
    }

    public List<AnswerType> getAnswerTypes() {
        return answerTypes;
    }

    public void setAnswerTypes(List<AnswerType> answerTypes) {
        this.answerTypes = answerTypes;
    }

    public List<SurveyTemplate> getSurveyTemplates() {
        return surveyTemplates;
    }

    public void setSurveyTemplates(List<SurveyTemplate> surveyTemplates) {
        this.surveyTemplates = surveyTemplates;
    }
}
