package com.bridge.survey.controller;

import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.AnswerOption;
import com.bridge.survey.domain.AnswerType;
import com.bridge.survey.domain.Survey;
import com.bridge.survey.domain.SurveyQuestion;
import com.bridge.survey.domain.SurveyTemplate;
import com.bridge.survey.service.SurveyService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(SurveyController.class)
@ContextConfiguration(classes = {SurveyController.class})
public class SurveyControllerTest {

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SurveyService surveyService;

    @Test
    public void testGetSurveyDetails() throws Exception {

        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyName("surveyName");
        surveyRequest.setSortParameter("sortParameters");
        surveyRequest.setUnPublished(true);

        SurveyResponse surveyResponse = new SurveyResponse();
        Survey survey = new Survey();
        survey.setSurveyId(1);
        survey.setSurveyName("surveyName");
        survey.setSurveyDistributionses(new ArrayList<SurveyDistribution>());
        List<Survey> surveys = new ArrayList<Survey>();
        surveys.add(survey);
        surveyResponse.setSurveys(surveys);

        given(this.surveyService.getSurveys(any(SurveyRequest.class)))
                .willReturn(surveyResponse);
        this.mockMvc.perform(get("/survey/getSurveys?surveyName=srvyName&" +
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

    @Test
    public void testGetSurveyTemplates() throws Exception {
        SurveyResponse surveyResponse = new SurveyResponse();
        SurveyTemplate surveyTemplate = new SurveyTemplate();
        List<SurveyTemplate> surveyTemplates = new ArrayList<>();
        surveyTemplate.setId(1);
        surveyTemplate.setName("Sample Survey Template");
        String json = "{\"question\": {\"id\":\"1\", \"questionText\":\"Test Question\", " +
                "\"required\":\"true\"}}";
        surveyTemplate.setJsonObject(json);
        surveyTemplates.add(surveyTemplate);
        surveyResponse.setSurveyTemplates(surveyTemplates);

        given(this.surveyService.getSurveyTemplates()).willReturn(surveyResponse);

        this.mockMvc.perform(get("/survey/templates").accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(this.surveyService).getSurveyTemplates();
    }

    @Test
    public void testGetAllAnswerTypesWithOptions() throws Exception {
        SurveyResponse surveyResponse = new SurveyResponse();
        AnswerType answerType = new AnswerType();
        AnswerOption answerOption = new AnswerOption();
        answerOption.setId(1l);
        answerOption.setText("Strongly Disagree");
        List<AnswerOption> answerOptions = new ArrayList<>();
        answerOptions.add(answerOption);
        answerType.setId(1l);
        answerType.setText("Agreement");
        answerType.setAnswerOptions(answerOptions);
        List<AnswerType> answerTypes = new ArrayList<>();
        answerTypes.add(answerType);
        surveyResponse.setAnswerTypes(answerTypes);
        given(this.surveyService.getAllAnswerTypeWithOptions()).willReturn(surveyResponse);
        this.mockMvc.perform(get("/survey/getAllAnswerTypeWithOptions").accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(this.surveyService).getAllAnswerTypeWithOptions();

    }

    @Test
    public void testSaveorUpdateSurvey_WhenSurveyIdIsZero_thenreturnSurveyId() throws Exception {
        willDoNothing().given(this.surveyService);
        this.surveyService.saveOrUpdateSurvey(any(SurveyRequest.class));
        this.mockMvc.perform(post("/survey/saveSurveyQuestions?surveyId=0&surveyName=test survey")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(this.surveyService).saveOrUpdateSurvey(any(SurveyRequest.class));

    }

    @Test
    public void testSaveorUpdateSurvey_WhenSurveyIDNameAndQuestionGiven_thenUpdateSurvey() throws Exception {
        willDoNothing().given(this.surveyService);
        this.surveyService.saveOrUpdateSurvey(any(SurveyRequest.class));
        this.mockMvc.perform(post("/survey/saveSurveyQuestions?surveyId=1&surveyName=test survey")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(this.surveyService).saveOrUpdateSurvey(any(SurveyRequest.class));

    }

    @Test
    public void testDeleteSurveyQuestion() throws Exception {
        willDoNothing().given(this.surveyService);
        this.surveyService.deleteSurveyQuestion(any(SurveyRequest.class));
        this.mockMvc.perform(delete("/survey/deleteSurveyQuestion?surveyId=1&" +
                "surveyName=test survey&surveyQuestionId=1")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(this.surveyService).deleteSurveyQuestion(any(SurveyRequest.class));
    }

    @Test
    public void testSaveSurveyFromTemplate() throws Exception{

        SurveyResponse response = new SurveyResponse();
        List<Survey> surveys = new ArrayList<>();
        Survey survey = new Survey();
        survey.setSurveyId(1l);
        survey.setSurveyName("Sample Survey Template");
        List<SurveyQuestion> surveyQuestions = new ArrayList<>();
        SurveyQuestion surveyQuestion = new SurveyQuestion();
        surveyQuestion.setId(1);
        surveyQuestion.setRequired(true);
        surveyQuestion.setAllowPreText(true);
        surveyQuestion.setText("question1");
        surveyQuestion.setIdealAnswerOptionId(1);
        surveyQuestion.setSurveyId(1);
        surveyQuestions.add(surveyQuestion);
        survey.setSurveyQuestions(surveyQuestions);
        surveys.add(survey);
        response.setSurveys(surveys);
        given(this.surveyService.saveSurveyFromTemplate(Mockito.any(SurveyRequest.class))).willReturn(response);
        this.surveyService.saveSurveyFromTemplate(any(SurveyRequest.class));
        this.mockMvc.perform(post("/survey/saveSurveyFromTemplate?surveyTemplateId=1")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());

    }

}