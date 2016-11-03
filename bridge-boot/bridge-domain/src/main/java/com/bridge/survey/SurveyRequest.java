package com.bridge.survey;


public class SurveyRequest {

    private String sortParameter;

    private boolean unPublished;

    private String srvyName;

    private Long surveyId;

    public String getSortParameter() {
        return sortParameter;
    }

    public void setSortParameter(String sortParameter) {
        this.sortParameter = sortParameter;
    }

    public String getSrvyName() {
        return srvyName;
    }

    public void setSrvyName(String srvyName) {
        this.srvyName = srvyName;
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
}
