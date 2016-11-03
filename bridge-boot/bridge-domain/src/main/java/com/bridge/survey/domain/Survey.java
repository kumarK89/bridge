package com.bridge.survey.domain;

import java.util.List;

public class Survey {

    private Integer surveyId;
    private String surveyName;
    private List<SurveyDistributions> surveyDistributionsList;

    public Integer getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Integer surveyId) {
        this.surveyId = surveyId;
    }

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public List<SurveyDistributions> getSurveyDistributionsList() {
        return surveyDistributionsList;
    }

    public void setSurveyDistributionsList(List<SurveyDistributions> surveyDistributionsList) {
        this.surveyDistributionsList = surveyDistributionsList;
    }
}
