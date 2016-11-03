package com.bridge.survey.utils;

import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.Survey;

import org.jooq.Record;

import java.util.List;
import java.util.stream.Collectors;

import static com.bridge.survey.entity.tables.Surveys.SURVEYS;

public class SurveyAdapterConverter {

    public SurveyResponse getSurveyReponse(List<Record> records) {
        SurveyResponse surveyResponse = new SurveyResponse();
        List<Survey> surveys = records.stream().map(record -> {
            Survey survey = new Survey();
            survey.setSurveyId(record.get(SURVEYS.ID).intValue());
            survey.setSurveyName(record.get(SURVEYS.SURVEY_NAME).toString());
            return survey;
        }).collect(Collectors.toList());
        surveyResponse.setSurveys(surveys);
        return surveyResponse;
    }
}
