package com.bridge.survey.config;

import com.bridge.survey.SurveyAdapter;
import com.bridge.survey.SurveyAdapterImpl;
import com.bridge.survey.api.SurveyService;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class SurveyConfigTest {

    ServiceConfig serviceConfig = new ServiceConfig();

    @Mock
    SurveyAdapter surveyAdapter;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSurveyService() {
        SurveyService surveyService = serviceConfig.surveyService(surveyAdapter);
        Assert.assertNotNull(surveyService);
    }
}

