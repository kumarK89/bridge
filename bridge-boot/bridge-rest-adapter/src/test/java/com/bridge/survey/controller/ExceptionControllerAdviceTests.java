package com.bridge.survey.controller;

import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.api.SurveyService;
import com.bridge.survey.controller.RequestFactory;
import com.bridge.survey.controller.SurveyController;
import com.bridge.survey.controller.config.ControllerConfig;
import com.bridge.survey.controller.converter.ErrorResponseConverter;
import com.bridge.survey.controller.converter.SuccessResponseConverter;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by skota on 10/31/2016.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(SurveyController.class)
@ContextConfiguration(classes = ControllerConfig.class)
public class ExceptionControllerAdviceTests {
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
    public void testHandleException() throws Exception {

        SurveyRequest surveyRequest = new SurveyRequest();
        SurveyResponse surveyResponse = new SurveyResponse();
        surveyRequest.setSrvyName("srvyName");
        surveyRequest.setSortParameter("sortParameters");
        surveyRequest.setUnPublished(true);

        given(this.surveyService.getSurveys(any(SurveyRequest.class))).willReturn(surveyResponse);
        this.mockMvc.perform(get("/survey/getSurveys?srvyName=srvyName&sortParameters=sortParameters&isPublished=true")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(new ResultMatcher() {

                    @Override
                    public void match(MvcResult result) throws Exception {
                        result.getResponse().getContentAsString().contains("global_error_test");
                    }
                });
    }

    @Test
    public void testHandleExceptionForInvalidSurveyException() throws Exception {

        given(this.surveyService.getSurveys(any(SurveyRequest.class)))
                .willThrow(new RuntimeException("Invalid Survey"));
        mockMvc.perform(get("/survey/getSurveys?srvyName=srvyName&sortParameters=sortParameters&isPublished=true")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(new ResultMatcher() {
                    @Override
                    public void match(MvcResult result) throws Exception {
                        result.getResponse().getContentAsString().contains("global_error_test");
                    }
                })
                .andExpect(status().is5xxServerError());
    }
}
