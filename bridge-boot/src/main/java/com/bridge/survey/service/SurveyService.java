package com.bridge.survey.service;

import com.google.gson.Gson;

import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.Survey;
import com.bridge.survey.domain.SurveyQuestion;
import com.bridge.survey.domain.SurveyTemplate;
import com.bridge.survey.jooq.SurveyAdapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class SurveyService {

    private final SurveyAdapter surveyAdapter;

    @Autowired
    public SurveyService(SurveyAdapter surveyAdapter) {
        this.surveyAdapter = surveyAdapter;
    }

    /**
     * Survey.
     * This method will retrieve all the surveys for the user
     *
     * @return SurveyResponse.This returns all the surveys assigned to the user.
     */
    public SurveyResponse getSurveys(SurveyRequest surveyRequest) {
        return surveyAdapter.getSurveyDetails(surveyRequest.getSurveyName()
                , surveyRequest.getSortParameter(), surveyRequest.isUnPublished());
    }

    /**
     * This method will serve the HTTP request to delete the Survey Details based on the
     * surveyId sent in request.
     */
    @Transactional
    public void deleteSurvey(SurveyRequest surveyRequest) {
        surveyAdapter.deleteSurvey(surveyRequest.getSurveyId());
    }

    /**
     * This method will serve HTTP GET request for returning default answer type with options
     *
     * @return SurveyResponse
     */
    public SurveyResponse getAllAnswerTypeWithOptions() {
        return surveyAdapter.getAllAnswerTypeWithOptions();
    }

    /**
     * This method will server HTTP POST request for save/update surveys and survey questions
     *
     * @param surveyRequest
     */
    @Transactional
    public void saveOrUpdateSurvey(SurveyRequest surveyRequest) {
        long generatedSurveyId = (surveyRequest.getSurveyId() == 0 ?
                surveyAdapter.saveSurvey(surveyRequest.getSurveyName()) :
                surveyAdapter.updateSurvey(surveyRequest.getSurveyId(),
                        surveyRequest.getSurveyName()));
        if (!surveyRequest.getSurveyQuestions().isEmpty()) {
            surveyRequest.getSurveyQuestions().forEach(record -> {
                record.setSurveyId(generatedSurveyId);
            });
        } else {
            List<SurveyQuestion> surveyQuestions = new ArrayList<>();
            SurveyQuestion surveyQuestion = new SurveyQuestion();
            surveyQuestion.setId(0L);
            surveyQuestion.setText("");
            surveyQuestion.setRequired(Boolean.FALSE);
            surveyQuestion.setAllowPreText(Boolean.FALSE);
            surveyQuestion.setAnswerTypeId(1L);
            surveyQuestion.setIdealAnswerOptionId(1L);
            surveyQuestion.setSurveyId(generatedSurveyId);
            surveyQuestions.add(surveyQuestion);
            surveyRequest.setSurveyQuestions(surveyQuestions);
        }
        surveyRequest.setSurveyId(generatedSurveyId);
        surveyAdapter.saveOrUpdateSurveyQuestions(surveyRequest.getSurveyQuestions());
    }

    /**
     * This method serves the HTTP GET request for retrieving survey templates
     *
     * @return SurveyResponse
     */
    public SurveyResponse getSurveyTemplates() {
        return surveyAdapter.getSurveyTemplates();
    }

    public SurveyResponse getSurveyQuestions(SurveyRequest surveyRequest) {
        SurveyResponse surveyResponse = surveyAdapter.getSurveyQuestions
                (surveyRequest.getSurveyId());
        if (!CollectionUtils.isEmpty(surveyResponse.getSurveys())) {
            surveyResponse.getSurveys().get(0).setSurveyName(surveyRequest.getSurveyName());
        }
        return surveyResponse;
    }

    @Transactional
    public SurveyResponse saveSurveyFromTemplate(SurveyRequest surveyRequest) {
        SurveyResponse surveyResponse = surveyAdapter.getSurveyTemplate
                (surveyRequest.getSurveyTemplateId());
        if (!CollectionUtils.isEmpty(surveyResponse.getSurveyTemplates())) {
            SurveyTemplate surveyTemplate = surveyResponse.getSurveyTemplates().get(0);
            String surveyJson = surveyTemplate.getJsonObject();
            System.out.println("surveyJson"+surveyJson);
            Gson gson = new Gson();
            Survey survey = gson.fromJson(surveyJson, Survey.class);
            long surveyId = surveyAdapter.saveSurvey(survey.getSurveyName());
            survey.getSurveyQuestions().forEach(record -> {
                record.setSurveyId(surveyId);
            });
            surveyAdapter.saveOrUpdateSurveyQuestions(survey.getSurveyQuestions());
            SurveyResponse surveyRes = surveyAdapter.getSurveyQuestions
                    (surveyId);
            if (!CollectionUtils.isEmpty(surveyRes.getSurveys())) {
                surveyRes.getSurveys().get(0).setSurveyName(survey.getSurveyName());
            }
            return surveyRes;
        } else {
            return new SurveyResponse();
        }
    }

    @Transactional
    public void deleteSurveyQuestion(SurveyRequest surveyRequest) {
        surveyAdapter.deleteSurveyQuestion(surveyRequest.getSurveyQuestionId());
    }
}
