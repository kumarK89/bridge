package com.bridge.survey.config;

import com.bridge.survey.SurveyAdapter;
import com.bridge.survey.controller.config.SurveyAdapterConfig;

import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class SurveyAdapterConfigTest {

    private SurveyAdapter surveyAdapter;
    private DSLContext dsl = DSL.using(SQLDialect.POSTGRES);

    @Test
    public void testSurveyAdapterConfig() {
        SurveyAdapterConfig config = new SurveyAdapterConfig();
        surveyAdapter = config.surveyAdapter(dsl, config.surveyAdapterConverter());
        Assert.assertNotNull(config);
        Assert.assertNotNull(surveyAdapter);

    }

}
