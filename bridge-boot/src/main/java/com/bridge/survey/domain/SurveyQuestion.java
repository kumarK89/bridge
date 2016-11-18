package com.bridge.survey.domain;

public final class SurveyQuestion {

    private long id;
    private String text;
    private boolean isRequired;
    private boolean isAllowPreText;
    private long answerTypeId;
    private long idealAnswerOptionId;
    private long surveyId;
    private String preTextMessage;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isRequired() {
        return isRequired;
    }

    public void setRequired(boolean required) {
        isRequired = required;
    }

    public boolean isAllowPreText() {
        return isAllowPreText;
    }

    public void setAllowPreText(boolean allowPreText) {
        isAllowPreText = allowPreText;
    }

    public long getAnswerTypeId() {
        return answerTypeId;
    }

    public void setAnswerTypeId(long answerTypeId) {
        this.answerTypeId = answerTypeId;
    }

    public long getIdealAnswerOptionId() {
        return idealAnswerOptionId;
    }

    public void setIdealAnswerOptionId(long idealAnswerOptionId) {
        this.idealAnswerOptionId = idealAnswerOptionId;
    }

    public long getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(long surveyId) {
        this.surveyId = surveyId;
    }

    public String getPreTextMessage() {
        return preTextMessage;
    }

    public void setPreTextMessage(String preTextMessage) {
        this.preTextMessage = preTextMessage;
    }
}
