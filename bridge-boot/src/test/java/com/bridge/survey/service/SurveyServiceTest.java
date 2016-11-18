package com.bridge.survey.service;

import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.AnswerOption;
import com.bridge.survey.domain.AnswerType;
import com.bridge.survey.domain.Survey;
import com.bridge.survey.domain.SurveyQuestion;
import com.bridge.survey.domain.SurveyTemplate;
import com.bridge.survey.jooq.SurveyAdapter;

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
public class SurveyServiceTest {

    @Mock
    SurveyAdapter surveyAdapter;

    SurveyService surveyService;

    @Before
    public void init() {

        MockitoAnnotations.initMocks(this);
        surveyService = new SurveyService(surveyAdapter);
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
                .getSurveyDetails(Mockito.any(String.class),
                        Mockito.any(String.class), Mockito.anyBoolean());
        SurveyRequest surveyRequest = new SurveyRequest();
        SurveyResponse surveyResponseRes = surveyService.getSurveys(surveyRequest);
        Assert.assertEquals(surveyResponseRes.getSurveys().get(0).getSurveyId(),
                survey.getSurveyId());

    }

    @Test
    public void testDeleteSurvey() {
        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyId(1l);
        Mockito.doNothing().when(this.surveyAdapter).deleteSurvey(Mockito.anyLong());
        surveyService.deleteSurvey(surveyRequest);
        Mockito.verify(this.surveyAdapter).deleteSurvey(Mockito.anyLong());
    }

    @Test
    public void testDeleteSurveyQuestion() {
        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyQuestionId(1l);
        Mockito.doNothing().when(this.surveyAdapter).deleteSurveyQuestion(Mockito.anyLong());
        surveyService.deleteSurveyQuestion(surveyRequest);
        Mockito.verify(this.surveyAdapter).deleteSurveyQuestion(Mockito.anyLong());
    }


    @Test
    public void testSaveorUpdateSurvey_WhenSurveyIDNameAndQuestionGiven_thenUpdateSurvey() {
        long surveyId = 1l;
        String surveyName = "Test Survey";
        List<SurveyQuestion> surveyQuestions = new ArrayList<>();
        SurveyQuestion surveyQuestion = new SurveyQuestion();
        surveyQuestion.setId(1);
        surveyQuestion.setRequired(true);
        surveyQuestion.setPreTextMessage("txt");
        surveyQuestion.setText("Test question 1");
        surveyQuestion.setIdealAnswerOptionId(1);
        surveyQuestion.setAllowPreText(true);
        surveyQuestion.setSurveyId(1);
        surveyQuestions.add(surveyQuestion);
        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyId(surveyId);
        surveyRequest.setSurveyName(surveyName);
        surveyRequest.setSurveyQuestions(surveyQuestions);

        Mockito.when(surveyAdapter.saveSurvey(surveyName)).thenReturn(1l);
        Mockito.when(surveyAdapter.updateSurvey(1l, surveyName)).thenReturn(1l);
        Mockito.doNothing().when(surveyAdapter).saveOrUpdateSurveyQuestions(
                surveyQuestions);
        surveyService.saveOrUpdateSurvey(surveyRequest);
        Mockito.verify(surveyAdapter).updateSurvey(surveyId, surveyName);
        Mockito.verify(surveyAdapter).saveOrUpdateSurveyQuestions(surveyQuestions);

    }


    @Test
    public void testSaveorUpdateSurvey_WhenSurveyIdIsZero_thenreturnSurveyId() {
        long surveyId = 0;
        String surveyName = "Test Survey";
        List<SurveyQuestion> surveyQuestions = new ArrayList<>();
        SurveyQuestion surveyQuestion = new SurveyQuestion();
        surveyQuestion.setId(1);
        surveyQuestion.setRequired(true);
        surveyQuestion.setPreTextMessage("txt");
        surveyQuestion.setText("Test question 1");
        surveyQuestion.setIdealAnswerOptionId(1);
        surveyQuestion.setAllowPreText(true);
        surveyQuestion.setSurveyId(1);
        surveyQuestions.add(surveyQuestion);

        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyId(surveyId);
        surveyRequest.setSurveyName(surveyName);
        surveyRequest.setSurveyQuestions(surveyQuestions);

        Mockito.when(surveyAdapter.saveSurvey(surveyName)).thenReturn(1l);
        Mockito.when(surveyAdapter.updateSurvey(1l, surveyName)).thenReturn(1l);
        Mockito.doNothing().when(surveyAdapter).saveOrUpdateSurveyQuestions(
                surveyQuestions);
        surveyService.saveOrUpdateSurvey(surveyRequest);
        Mockito.verify(surveyAdapter).saveSurvey(surveyName);
        Mockito.verify(surveyAdapter).saveOrUpdateSurveyQuestions(surveyQuestions);

    }

    @Test
    public void testGetSurveyTemplates() {

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
        Mockito.when(surveyAdapter.getSurveyTemplates()).thenReturn(surveyResponse);
        Assert.assertEquals(json, surveyService.getSurveyTemplates()
                .getSurveyTemplates().get(0).getJsonObject());

    }

    @Test
    public void testGetAllAnswersWithOptions() {
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
        Mockito.when(surveyAdapter.getAllAnswerTypeWithOptions()).thenReturn(surveyResponse);
        SurveyResponse response = surveyService.getAllAnswerTypeWithOptions();
        Assert.assertNotNull(response.getAnswerTypes());
        Assert.assertEquals("Agreement", response.getAnswerTypes().get(0).getText());

    }

    @Test
    public void testGetSurveyQuestions() {
        SurveyResponse surveyResponse = new SurveyResponse();
        List<Survey> surveys = new ArrayList<>();
        Survey survey = new Survey();
        survey.setSurveyId(1);
        survey.setSurveyName("Test Survey");
        List<SurveyQuestion> surveyQuestions = new ArrayList<>();
        SurveyQuestion surveyQuestion = new SurveyQuestion();
        surveyQuestion.setId(1l);
        surveyQuestion.setText("Test Question 1");
        surveyQuestion.setSurveyId(1l);
        surveyQuestion.setRequired(false);
        surveyQuestions.add(surveyQuestion);
        survey.setSurveyQuestions(surveyQuestions);
        surveys.add(survey);
        surveyResponse.setSurveys(surveys);
        Mockito.doReturn(surveyResponse).when(surveyAdapter)
                .getSurveyQuestions(Mockito.any(long.class));
        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyId(1l);
        SurveyResponse surveyResponseRes = surveyService.getSurveyQuestions(surveyRequest);
        Assert.assertEquals(surveyResponseRes.getSurveys().get(0).getSurveyQuestions().get(0).getText(),
                surveyQuestion.getText());

    }

    @Test
    public void testSaveSurveyFromTemplate() {
        SurveyResponse surveyResponse = new SurveyResponse();
        SurveyTemplate surveyTemplate = new SurveyTemplate();
        List<SurveyTemplate> surveyTemplates = new ArrayList<>();
        surveyTemplate.setId(1);
        surveyTemplate.setName("Sample Survey Template");
        String json = "{\n" +
                "   \"surveyId\":0,\n" +
                "   \"surveyName\":\"Employee Satisfaction\",\n" +
                "   \"surveyQuestions\":[\n" +
                "      {\n" +
                "         \"id\":0,\n" +
                "         \"text\":\"How meaningful is your work?\",\n" +
                "         \"answerTypeId\":1,\n" +
                "         \"idealAnswerOptionId\":1,\n" +
                "         \"surveyId\":0,\n" +
                "         \"preTextMessage\":null,\n" +
                "         \"required\":false,\n" +
                "         \"allowPreText\":false\n" +
                "      },\n" +
                "      {\n" +
                "         \"id\":0,\n" +
                "         \"text\":\"How challenging is your work?\",\n" +
                "         \"answerTypeId\":2,\n" +
                "         \"idealAnswerOptionId\":10,\n" +
                "         \"surveyId\":0,\n" +
                "         \"preTextMessage\":null,\n" +
                "         \"required\":true,\n" +
                "         \"allowPreText\":true\n" +
                "      },\n" +
                "      {\n" +
                "         \"id\":0,\n" +
                "         \"text\":\"How clearly are your responsibilities and goals defined?\",\n" +
                "         \"answerTypeId\":3,\n" +
                "         \"idealAnswerOptionId\":11,\n" +
                "         \"surveyId\":0,\n" +
                "         \"preTextMessage\":null,\n" +
                "         \"required\":true,\n" +
                "         \"allowPreText\":false\n" +
                "      },\n" +
                "      {\n" +
                "         \"id\":0,\n" +
                "         \"text\":\"How often do you feel stressed at work in a typical week?\",\n" +
                "         \"answerTypeId\":4,\n" +
                "         \"idealAnswerOptionId\":20,\n" +
                "         \"surveyId\":0,\n" +
                "         \"preTextMessage\":null,\n" +
                "         \"required\":false,\n" +
                "         \"allowPreText\":true\n" +
                "      },\n" +
                "      {\n" +
                "         \"id\":0,\n" +
                "         \"text\":\"How able are you to satisfy both your work and family responsibilities?\",\n" +
                "         \"answerTypeId\":5,\n" +
                "         \"idealAnswerOptionId\":21,\n" +
                "         \"surveyId\":0,\n" +
                "         \"preTextMessage\":null,\n" +
                "         \"required\":false,\n" +
                "         \"allowPreText\":false\n" +
                "      },\n" +
                "      {\n" +
                "         \"id\":0,\n" +
                "         \"text\":\"How much does your job give you a sense of personal satisfaction?\",\n" +
                "         \"answerTypeId\":6,\n" +
                "         \"idealAnswerOptionId\":30,\n" +
                "         \"surveyId\":0,\n" +
                "         \"preTextMessage\":null,\n" +
                "         \"required\":false,\n" +
                "         \"allowPreText\":false\n" +
                "      }\n" +
                "   ]\n" +
                "}";
        surveyTemplate.setJsonObject(json);
        surveyTemplates.add(surveyTemplate);
        surveyResponse.setSurveyTemplates(surveyTemplates);
        Mockito.doReturn(surveyResponse).when(surveyAdapter)
                .getSurveyTemplate(Mockito.any(long.class));
        Mockito.doReturn(1l).when(surveyAdapter)
                .saveSurvey(Mockito.any(String.class));
        Mockito.doNothing().when(surveyAdapter).saveOrUpdateSurveyQuestions(
                Mockito.anyListOf(SurveyQuestion.class));

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


        Mockito.doReturn(response).when(surveyAdapter)
                .getSurveyQuestions(Mockito.any(long.class));
        SurveyRequest surveyRequest = new SurveyRequest();
        surveyRequest.setSurveyTemplateId(1L);
        SurveyResponse output = surveyService.saveSurveyFromTemplate(surveyRequest);
        Survey surveyOutput = output.getSurveys().get(0);
        Assert.assertSame(surveyOutput.getSurveyName(), survey.getSurveyName());
    }

}
