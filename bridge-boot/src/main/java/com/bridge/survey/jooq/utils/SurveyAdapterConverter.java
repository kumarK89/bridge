package com.bridge.survey.jooq.utils;

import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.AnswerOption;
import com.bridge.survey.domain.AnswerType;
import com.bridge.survey.domain.Survey;
import com.bridge.survey.domain.SurveyQuestion;
import com.bridge.survey.domain.SurveyTemplate;

import org.jooq.Record;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.bridge.entity.tables.SurveyQuestions.SURVEY_QUESTIONS;
import static com.bridge.entity.tables.SurveyTemplates.SURVEY_TEMPLATES;
import static com.bridge.entity.tables.Surveys.SURVEYS;

public class SurveyAdapterConverter {
    private static final Logger LOGGER = LoggerFactory.getLogger(SurveyAdapterConverter.class);

    public SurveyResponse getSurveyReponse(List<Record> records) {
        SurveyResponse surveyResponse = new SurveyResponse();
        List<Survey> surveys = records.stream().map(record -> {
            Survey survey = new Survey();
            survey.setSurveyId(record.get(SURVEYS.ID).intValue());
            survey.setSurveyName(record.get(SURVEYS.NAME));
            return survey;
        }).collect(Collectors.toList());
        surveyResponse.setSurveys(surveys);
        return surveyResponse;
    }

    /**
     * Takes List<Record> as input and converts it into answerTypes response.
     *
     * @param records
     * @return SurveyResponse
     */
    public SurveyResponse getSurveyResponseForAnswerTypes(List<Record> records) {
        LOGGER.debug("In getSurveyResponseForAnswerTypes");
        SurveyResponse surveyResponse = new SurveyResponse();
        List<AnswerType> answerTypes = new ArrayList<>();
        if (!records.isEmpty()) {
            records.forEach(record -> {
                AnswerType answerType = new AnswerType();
                answerType.setId((Long) record.getValue("id"));
                answerType.setText(record.getValue("answer_type").toString());
                String options = record.getValue("options").toString();
                if (!StringUtils.isEmpty(options)) {
                    List<AnswerOption> answerOptions = Arrays.stream(options.split(","))
                            .map(option -> {
                                AnswerOption answerOption = new AnswerOption();
                                String[] optionArr = option.split("-");
                                answerOption.setId(Long.parseLong(optionArr[0]));
                                answerOption.setText(optionArr[1]);
                                return answerOption;
                            }).collect(Collectors.toList());
                    answerType.setAnswerOptions(answerOptions);
                }
                answerTypes.add(answerType);
            });
        }
        surveyResponse.setAnswerTypes(answerTypes);
        return surveyResponse;
    }

    public SurveyResponse getSurveyResponseForQuestions(List<Record> records,
                                                        long surveyId) {
        LOGGER.debug("In getSurveyResponseForAnswerTypes");
        SurveyResponse surveyResponse = new SurveyResponse();
        List<Survey> surveys = new ArrayList<>();
        Survey survey = new Survey();
        survey.setSurveyId(surveyId);
        List<SurveyQuestion> surveyQuestions = new ArrayList<>();
        if (!records.isEmpty()) {
            records.forEach(record -> {
                SurveyQuestion surveyQuestion = new SurveyQuestion();
                surveyQuestion.setId(record.getValue(SURVEY_QUESTIONS.ID));
                surveyQuestion.setText(record.getValue(SURVEY_QUESTIONS.QUESTION_TEXT));
                surveyQuestion.setSurveyId(record.getValue(SURVEY_QUESTIONS.SURVEY_ID));
                surveyQuestion.setRequired(record.getValue(SURVEY_QUESTIONS.IS_REQUIRED)
                        .booleanValue());
                surveyQuestion.setAnswerTypeId(record.getValue(SURVEY_QUESTIONS.ANSWER_TYPE_ID));
                surveyQuestion.setIdealAnswerOptionId(record.getValue(SURVEY_QUESTIONS.OPTION_ID));
                surveyQuestion.setPreTextMessage(record.
                        getValue(SURVEY_QUESTIONS.PRE_TEXT_MESSAGE));
                if (record.getValue(SURVEY_QUESTIONS.IS_ALLOW_PRE_TEXT) != null) {
                    surveyQuestion.setAllowPreText(record.
                            getValue(SURVEY_QUESTIONS.IS_ALLOW_PRE_TEXT)
                            .booleanValue());
                } else {
                    surveyQuestion.setAllowPreText(Boolean.FALSE);
                }
                surveyQuestions.add(surveyQuestion);
            });
        }
        survey.setSurveyQuestions(surveyQuestions);
        surveys.add(survey);
        surveyResponse.setSurveys(surveys);
        return surveyResponse;
    }

    public SurveyResponse getSurveytemplates(List<Record> records) {
        LOGGER.debug("In getSurveyResponseForAnswerTypes");
        SurveyResponse surveyResponse = new SurveyResponse();
        List<SurveyTemplate> surveyTemplates = new ArrayList<>();
        if (!records.isEmpty()) {
            records.stream().forEach(record -> {
                SurveyTemplate surveyTemplate = new SurveyTemplate();
                surveyTemplate.setId(record.get(SURVEY_TEMPLATES.ID).intValue());
                surveyTemplate.setName(record.get(SURVEY_TEMPLATES.NAME));
                surveyTemplate.setJsonObject(record.get(SURVEY_TEMPLATES.JSON_DATA).toString());
                surveyTemplates.add(surveyTemplate);
            });
            surveyResponse.setSurveyTemplates(surveyTemplates);
        }
        return surveyResponse;
    }

}
