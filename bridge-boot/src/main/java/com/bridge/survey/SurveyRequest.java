package com.bridge.survey;


import com.bridge.survey.domain.SurveyQuestion;

import java.util.List;

public final class SurveyRequest {

    private String sortParameter;

    private boolean unPublished;

    private String surveyName;

    private Long surveyId;

    private List<SurveyQuestion> surveyQuestions;

    private Long surveyQuestionId;

    private Long surveyTemplateId;

    public String getSortParameter() {
        return sortParameter;
    }

    public void setSortParameter(String sortParameter) {
        this.sortParameter = sortParameter;
    }

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public boolean isUnPublished() {
        return unPublished;
    }

    public void setUnPublished(boolean unPublished) {
        this.unPublished = unPublished;
    }

    public Long getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Long surveyId) {
        this.surveyId = surveyId;
    }

    public List<SurveyQuestion> getSurveyQuestions() {
        return surveyQuestions;
    }

    public void setSurveyQuestions(List<SurveyQuestion> surveyQuestions) {
        this.surveyQuestions = surveyQuestions;
    }

    public Long getSurveyQuestionId() {
        return surveyQuestionId;
    }

    public void setSurveyQuestionId(Long surveyQuestionId) {
        this.surveyQuestionId = surveyQuestionId;
    }

    public Long getSurveyTemplateId() {
        return surveyTemplateId;
    }

    public void setSurveyTemplateId(Long surveyTemplateId) {
        this.surveyTemplateId = surveyTemplateId;
    }
}
