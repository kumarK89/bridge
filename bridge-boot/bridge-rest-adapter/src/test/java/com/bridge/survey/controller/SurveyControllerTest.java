package com.bridge.survey.controller;

import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.api.SurveyService;
import com.bridge.survey.controller.config.ControllerConfig;
import com.bridge.survey.controller.converter.ErrorResponseConverter;
import com.bridge.survey.controller.converter.SuccessResponseConverter;
import com.bridge.survey.domain.Survey;
import com.bridge.survey.domain.SurveyDistributions;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(SurveyController.class)
@ContextConfiguration(classes = {ControllerConfig.class, RequestFactory.class})
public class SurveyControllerTest {

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SurveyService surveyService;

    @Autowired
    private ErrorResponseConverter errorResponseConverter;

    @Autowired
    RequestFactory requestFacMockBean;

    @Autowired
    SuccessResponseConverter successResponseConverter;

    @Test
    public void testGetSurveyDetails() throws Exception {

        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSrvyName("srvyName");
        surveyRequest.setSortParameter("sortParameters");
        surveyRequest.setUnPublished(true);

        SurveyResponse surveyResponse = new SurveyResponse();
        Survey survey = new Survey();
        survey.setSurveyId(1);
        survey.setSurveyName("srvyName");
        survey.setSurveyDistributionsList(new ArrayList<SurveyDistributions>());
        List<Survey> surveys = new ArrayList<Survey>();
        surveys.add(survey);
        surveyResponse.setSurveys(surveys);

        given(this.surveyService.getSurveys(any(SurveyRequest.class)))
                .willReturn(surveyResponse);
        this.mockMvc.perform(get("/survey/getSurveys?srvyName=srvyName&" +
                "sortParameters=sortParameters&isPublished=true")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(this.surveyService).getSurveys(any(SurveyRequest.class));
    }

    @Test
    public void testDeleteSurveyDetails() throws Exception {
        willDoNothing().given(this.surveyService);
        this.surveyService.deleteSurvey(any(SurveyRequest.class));
        this.mockMvc.perform(delete("/survey/deleteSurvey?surveyId=1")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(this.surveyService).deleteSurvey(any(SurveyRequest.class));
    }
}