package com.bridge.survey.jooq;

import com.bridge.entity.tables.AnswerOptions;
import com.bridge.entity.tables.AnswerTypes;
import com.bridge.entity.tables.records.SurveyQuestionsRecord;
import com.bridge.entity.tables.records.SurveyTemplatesRecord;
import com.bridge.entity.tables.records.SurveysRecord;
import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.AnswerOption;
import com.bridge.survey.domain.AnswerType;
import com.bridge.survey.domain.SurveyQuestion;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Record;
import org.jooq.Result;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.jooq.tools.jdbc.MockConnection;
import org.jooq.tools.jdbc.MockDataProvider;
import org.jooq.tools.jdbc.MockExecuteContext;
import org.jooq.tools.jdbc.MockResult;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigInteger;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static com.bridge.entity.tables.SurveyQuestions.SURVEY_QUESTIONS;
import static com.bridge.entity.tables.SurveyTemplates.SURVEY_TEMPLATES;
import static com.bridge.entity.tables.Surveys.SURVEYS;

@RunWith(SpringRunner.class)
public class SurveyAdapterTest {

    private SurveyAdapter surveyAdapter;

    private MockConnection mockConnection;

    private DSLContext dslContext;

    @Test
    public void testGetSurveyDetails_WhenSortParamNewest_ThenReturnInNewestFirst() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForNewest());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("newest");
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request.getSurveyName(),
                request.getSortParameter(), request.isUnPublished());
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());

    }

    @Test
    public void testDeleteSurvey() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForNewest());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        surveyAdapter = new SurveyAdapter(dslContext);
        request.setSurveyId(5L);
        surveyAdapter.deleteSurvey(request.getSurveyId());
    }


    @Test
    public void testGetSurveyDetails_WhenSortParamTitle_ThenReturnInAlphabeticalOrder() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTitle());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("title");
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request.getSurveyName(),
                request.getSortParameter(), request.isUnPublished());
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenSortParamDueDate_ThenReturnInDueDateOrder() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForDueDate());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("duedate");
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request.getSurveyName(),
                request.getSortParameter(), request.isUnPublished());
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenSearchParamTrue_ThenReturnSearchResults() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForSearch());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("title");
        request.setSurveyName("SurveName");
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request.getSurveyName(),
                request.getSortParameter(), request.isUnPublished());
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenIsUnpublishedTrue_ThenReturnSurveysUnpublished() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForIsPublished());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("title");
        request.setUnPublished(true);
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request.getSurveyName(),
                request.getSortParameter(), request.isUnPublished());
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenEmptySortParmaterers() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTitle());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("");
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request.getSurveyName(),
                request.getSortParameter(), request.isUnPublished());
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenNullSortParmaterers() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTitle());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request.getSurveyName(),
                request.getSortParameter(), request.isUnPublished());
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testForgetAllAnswerTypeWithOptions() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForAnswerTypes());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getAllAnswerTypeWithOptions();
        List<AnswerType> answerTypes = response.getAnswerTypes();
        Assert.assertNotNull(answerTypes);
        Assert.assertSame(1L, answerTypes.get(0).getId());
        Assert.assertEquals("AGREEMENT", answerTypes.get(0).getText());
        List<AnswerOption> answerOptions = answerTypes.get(0).getAnswerOptions();
        Assert.assertSame(1L, answerOptions.get(0).getId());
        Assert.assertEquals("Strongly Disagree", answerOptions.get(0).getText());
    }

    @Test
    public void testForSurveyQuestions_WhenSurveyIDisGiven_ThenReturnQuestions() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForSurveyQuestions());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
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

        SurveyResponse response = surveyAdapter.getSurveyQuestions(1);
        response.getSurveys().get(0).getSurveyQuestions().stream().forEach(question -> {
            Assert.assertEquals(surveyQuestion.getId(), question.getId());
            Assert.assertEquals(surveyQuestion.getText(), question.getText());
            Assert.assertEquals(surveyQuestion.getSurveyId(), question.getSurveyId());

        });


    }

    @Test
    public void testForSurveyTemplateQuestions_WhenSurveyIDisGiven_ThenReturnTemplates() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForSurveyQuestions());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
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

        SurveyResponse response = surveyAdapter.getSurveyTemplate(1l);
        Assert.assertNotNull(response.getSurveyTemplates());

    }

    @Test
    public void testForSurveyTemplate_WhenSurveyIDAndMOckDataProviderIsGiven_ThenReturnTemplates() {
        mockConnection = new MockConnection
                (new SurveyMockDataProviderForTemplateQuestions());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
        String str = new String("{\"survey_question\":\" +\n" +
                "\"[{\\\"question_text\\\":\\\"test1\\\",\\\"is_required\\\":\\\"true\\\",\" +\n" +
                "\"\\\"answer_type_id\\\":\\\"1\\\",\\\"option_id\\\":\\\"1\\\"}," +
                "{\\\"question_text\\\":\\\"test2\\\"\" +\n" +
                "\",\"is_required\":\"true\",\"answer_type_id\":\"1\",\"option_id\":\"2\"}]}");

        SurveyResponse response = surveyAdapter.getSurveyTemplate(1l);
        Assert.assertNotNull(response.getSurveyTemplates());

    }

    @Test
    public void testGetTemplateJsonInfo_ThenReturnAllJSONTemplateData() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTemplateQuestions());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
        SurveyResponse response = surveyAdapter.getSurveyTemplates();
        response.getSurveyTemplates().stream().forEach(question -> {
            Assert.assertEquals(1l, question.getId());
        });
    }

    @Test
    public void testSaveSurvey() {
        Long expected = Long.valueOf(1);
        mockConnection = new MockConnection(new SurveyMockDataProviderForSaveOrUpdateSurvey());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
        Long i = surveyAdapter.saveSurvey("Test");
        Assert.assertEquals(expected, i);

    }

    @Test
    public void testUpdateSurvey() {
        BigInteger expected = BigInteger.valueOf(1);
        mockConnection = new MockConnection(new SurveyMockDataProviderForSaveOrUpdateSurvey());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
        surveyAdapter.updateSurvey(1, "Test");
        Assert.assertEquals(expected, dslContext.lastID());

    }


    @Test
    public void testSaveOrUpdateSurveyQuestions_WhenMockDataProviderIsGiven_ThenReturnValues() {
        BigInteger expected = BigInteger.valueOf(1);
        mockConnection = new MockConnection(new SurveyMockDataProviderForSaveOrUpdateSurveyQuestions());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
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
        surveyAdapter.saveOrUpdateSurveyQuestions(surveyQuestions);
        Assert.assertEquals(expected, dslContext.lastID());

    }



    @Test
    public void testSaveorUpdateSurveyTemplate_WhenIDNameAndJSONIsGiven_ThenRunWithoutError() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTemplateQuestions());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);
        String str = new String("{\"survey_question\":\" +\n" +
                "\"[{\\\"question_text\\\":\\\"test1\\\",\\\"is_required\\\":\\\"true\\\",\" +\n" +
                "\"\\\"answer_type_id\\\":\\\"1\\\",\\\"option_id\\\":\\\"1\\\"}," +
                "{\\\"question_text\\\":\\\"test2\\\"\" +\n" +
                "\",\"is_required\":\"true\",\"answer_type_id\":\"1\",\"option_id\":\"2\"}]}");
        surveyAdapter.saveorUpdateSurveyTemplate(1l, "TEXT", str);
    }

    @Test
    public void testdeleteSurveyQuestion_GivenMockDataProvider_thenReturnDeletedId() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForDeleteSurveyQuestion());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapter(dslContext);

        surveyAdapter.deleteSurveyQuestion(112l);
        BigInteger expected = BigInteger.valueOf(1);
        Assert.assertEquals(expected, dslContext.lastID());

    }

}

class SurveyMockDataProviderForDeleteSurveyQuestion implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        if (sql.toUpperCase().startsWith("DROP")) {
            throw new SQLException("Statement not supported: " + sql);
        }
        Result<SurveyQuestionsRecord> surveysRecords = create.newResult(SURVEY_QUESTIONS);
        surveysRecords.add(create.newRecord(SURVEY_QUESTIONS));
        Field<BigInteger> id = DSL.field("id", BigInteger.class);
        BigInteger expected = BigInteger.valueOf(1);
        surveysRecords.get(0).setValue(id, expected);
        mock[0] = new MockResult(1, surveysRecords);
        return mock;
    }
}

class SurveyMockDataProviderForNewest implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        if (sql.toUpperCase().startsWith("DROP")) {
            throw new SQLException("Statement not supported: " + sql);
        }
        Result<SurveysRecord> surveysRecords = create.newResult(SURVEYS);
        surveysRecords.add(create.newRecord(SURVEYS));
        surveysRecords.get(0).setValue(SURVEYS.ID, 1l);
        surveysRecords.get(0).setValue(SURVEYS.NAME, "Test Survey");
        mock[0] = new MockResult(1, surveysRecords);
        return mock;
    }
}

class SurveyMockDataProviderForTitle implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        if (sql.toUpperCase().startsWith("DROP")) {
            throw new SQLException("Statement not supported: " + sql);
        }
        Result<SurveysRecord> surveysRecords = create.newResult(SURVEYS);
        surveysRecords.add(create.newRecord(SURVEYS));
        surveysRecords.get(0).setValue(SURVEYS.ID, 1l);
        surveysRecords.get(0).setValue(SURVEYS.NAME, "Test Survey");
        mock[0] = new MockResult(1, surveysRecords);
        return mock;
    }
}

class SurveyMockDataProviderForDueDate implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        if (sql.toUpperCase().startsWith("DROP")) {
            throw new SQLException("Statement not supported: " + sql);
        }
        Result<SurveysRecord> surveysRecords = create.newResult(SURVEYS);
        surveysRecords.add(create.newRecord(SURVEYS));
        surveysRecords.get(0).setValue(SURVEYS.ID, 1l);
        surveysRecords.get(0).setValue(SURVEYS.NAME, "Test Survey");
        mock[0] = new MockResult(1, surveysRecords);
        return mock;
    }
}

class SurveyMockDataProviderForSearch implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        if (sql.toUpperCase().startsWith("DROP")) {
            throw new SQLException("Statement not supported: " + sql);
        }
        Result<SurveysRecord> surveysRecords = create.newResult(SURVEYS);
        surveysRecords.add(create.newRecord(SURVEYS));
        surveysRecords.get(0).setValue(SURVEYS.ID, 1l);
        surveysRecords.get(0).setValue(SURVEYS.NAME, "Test Survey");
        mock[0] = new MockResult(1, surveysRecords);
        return mock;
    }
}

class SurveyMockDataProviderForIsPublished implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        if (sql.toUpperCase().startsWith("DROP")) {
            throw new SQLException("Statement not supported: " + sql);
        }
        Result<SurveysRecord> surveysRecords = create.newResult(SURVEYS);
        surveysRecords.add(create.newRecord(SURVEYS));
        surveysRecords.get(0).setValue(SURVEYS.ID, 1l);
        surveysRecords.get(0).setValue(SURVEYS.NAME, "Test Survey");
        mock[0] = new MockResult(1, surveysRecords);
        return mock;
    }
}

class SurveyMockDataProviderForAnswerTypes implements MockDataProvider {
    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();

        AnswerTypes at = AnswerTypes.ANSWER_TYPES.as("at");
        AnswerOptions ao = AnswerOptions.ANSWER_OPTIONS.as(("ao"));
        Field options = create.select(DSL.field("string_agg(ao.id||'-'||ao.option_text,',')"))
                .from(ao)
                .where(ao.ANSWER_TYPE_ID.equal(at.ID)).asField("options");

        Result<Record> answerTypesRecords = create.newResult(at.ID, at.ANSWER_TYPE, options);
        answerTypesRecords.add(create.newRecord(at.ID, at.ANSWER_TYPE, options));
        answerTypesRecords.get(0).setValue(at.ID, 1L);
        answerTypesRecords.get(0).setValue(at.ANSWER_TYPE, "AGREEMENT");
        answerTypesRecords.get(0).set(options, "1-Strongly Disagree,2-Somewhat Disagree" +
                ",3-Netural,4-Somewhat Agree,5-Strongly Agree");
        mock[0] = new MockResult(1, answerTypesRecords);
        return mock;
    }
}

class SurveyMockDataProviderForSaveOrUpdateSurveyQuestions implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        Result<SurveyQuestionsRecord> records = create.newResult(SURVEY_QUESTIONS);
        records.add(create.newRecord(SURVEY_QUESTIONS));
        records.get(0).setValue(SURVEY_QUESTIONS.ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.OPTION_ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.SURVEY_ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.ANSWER_TYPE_ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.QUESTION_TEXT, "Test question 1");
        records.get(0).setValue(SURVEY_QUESTIONS.IS_REQUIRED, true);
        mock[0] = new MockResult(1, records);
        return mock;
    }
}

class SurveyMockDataProviderForSaveOrUpdateSurvey implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();
        Result<SurveysRecord> records = create.newResult(SURVEYS);
        records.add(create.newRecord(SURVEYS));
        Field<BigInteger> id = DSL.field("id", BigInteger.class);
        BigInteger expected = BigInteger.valueOf(1);
        records.get(0).setValue(id, expected);
        mock[0] = new MockResult(1, records);
        return mock;
    }
}


class SurveyMockDataProviderForTemplateQuestions implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();

        String str = new String("{\"survey_question\":\" +\n" +
                "\"[{\\\"question_text\\\":\\\"test1\\\",\\\"is_required\\\":\\\"true\\\",\" +\n" +
                "\"\\\"answer_type_id\\\":\\\"1\\\",\\\"option_id\\\":\\\"1\\\"}," +
                "{\\\"question_text\\\":\\\"test2\\\"\" +\n" +
                "\",\"is_required\":\"true\",\"answer_type_id\":\"1\",\"option_id\":\"2\"}]}");
        Result<SurveyTemplatesRecord> records = create.newResult(SURVEY_TEMPLATES);
        records.add(create.newRecord(SURVEY_TEMPLATES));
        records.get(0).setValue(SURVEY_TEMPLATES.ID, 1l);
        records.get(0).setValue(SURVEY_TEMPLATES.NAME, "Template");
        records.get(0).setValue(SURVEY_TEMPLATES.JSON_DATA, str);

        mock[0] = new MockResult(1, records);
        return mock;
    }
}

class SurveyMockDataProviderForSurveyQuestions implements MockDataProvider {

    @Override
    public MockResult[] execute(MockExecuteContext ctx) throws SQLException {
        DSLContext create = DSL.using(SQLDialect.POSTGRES);
        MockResult[] mock = new MockResult[1];
        String sql = ctx.sql();

        Result<SurveyQuestionsRecord> records = create.newResult(SURVEY_QUESTIONS);
        records.add(create.newRecord(SURVEY_QUESTIONS));
        records.get(0).setValue(SURVEY_QUESTIONS.IS_ALLOW_PRE_TEXT, Boolean.TRUE);
        records.get(0).setValue(SURVEY_QUESTIONS.ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.OPTION_ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.SURVEY_ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.ANSWER_TYPE_ID, 1l);
        records.get(0).setValue(SURVEY_QUESTIONS.QUESTION_TEXT, "Test question 1");
        records.get(0).setValue(SURVEY_QUESTIONS.IS_REQUIRED, true);
        records.get(0).setValue(SURVEY_QUESTIONS.PRE_TEXT_MESSAGE, "Text");
        mock[0] = new MockResult(1, records);
        return mock;
    }
}