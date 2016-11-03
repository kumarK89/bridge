package com.bridge.survey.impl;


import com.bridge.survey.SurveyAdapter;
import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.Survey;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
public class SurveyServiceImplTest {

    @Mock
    SurveyAdapter surveyAdapter;

    SurveyServiceImpl surveyService;

    @Before
    public void init() {

        MockitoAnnotations.initMocks(this);
        surveyService = new SurveyServiceImpl(surveyAdapter);
    }

    @Test
    public void testGetSurveys() {
        SurveyResponse surveyResponse = new SurveyResponse();
        List<Survey> surveys = new ArrayList<>();
        Survey survey = new Survey();
        survey.setSurveyId(20);
        surveys.add(survey);
        surveyResponse.setSurveys(surveys);
        Mockito.doReturn(surveyResponse).when(surveyAdapter)
                .getSurveyDetails(Mockito.any(SurveyRequest.class));
        SurveyRequest surveyRequest = new SurveyRequest();
        SurveyResponse surveyResponseRes = surveyService.getSurveys(surveyRequest);
        Assert.assertEquals(surveyResponseRes.getSurveys().get(0).getSurveyId(),
                survey.getSurveyId());

    }

    @Test
    public void testDeleteSurvey() {
        SurveyRequest surveyRequest = new SurveyRequest();
        Mockito.doNothing().when(this.surveyAdapter).deleteSurvey(surveyRequest);
        surveyService.deleteSurvey(surveyRequest);
        Mockito.verify(this.surveyAdapter).deleteSurvey(surveyRequest);
    }
}
