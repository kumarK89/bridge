package com.bridge.survey;


import com.bridge.survey.domain.Survey;

import java.util.List;

public class SurveyResponse {

    private List<Survey> surveys;

    public List<Survey> getSurveys() {
        return surveys;
    }

    public void setSurveys(List<Survey> surveys) {
        this.surveys = surveys;
    }
}
