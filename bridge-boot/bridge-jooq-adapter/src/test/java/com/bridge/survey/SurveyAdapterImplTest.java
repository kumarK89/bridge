package com.bridge.survey;

import com.bridge.survey.entity.tables.records.SurveysRecord;
import com.bridge.survey.utils.SurveyAdapterConverter;

import org.jooq.DSLContext;
import org.jooq.Result;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;
import org.jooq.tools.jdbc.MockConnection;
import org.jooq.tools.jdbc.MockDataProvider;
import org.jooq.tools.jdbc.MockExecuteContext;
import org.jooq.tools.jdbc.MockResult;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.SQLException;

import static com.bridge.survey.entity.tables.Surveys.SURVEYS;

@RunWith(SpringRunner.class)
public class SurveyAdapterImplTest {

    private SurveyAdapter surveyAdapter;

    private SurveyAdapterConverter surveyAdapterConverter;

    private MockConnection mockConnection;

    private DSLContext dslContext;

    @Before
    public void setUp() {

        surveyAdapterConverter = new SurveyAdapterConverter();

    }

    @Test
    public void testGetSurveyDetails_WhenSortParamNewest_ThenReturnInNewestFirst() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForNewest());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("newest");
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request);
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());

    }

    @Test
    public void testDeleteSurvey() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForNewest());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        request.setSurveyId(5L);
        surveyAdapter.deleteSurvey(request);
    }


    @Test
    public void testGetSurveyDetails_WhenSortParamTitle_ThenReturnInAlphabeticalOrder() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTitle());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("title");
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request);
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenSortParamDueDate_ThenReturnInDueDateOrder() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForDueDate());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("duedate");
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request);
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenSearchParamTrue_ThenReturnSearchResults() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForSearch());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("title");
        request.setSrvyName("Surv");
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request);
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenIsUnpublishedTrue_ThenReturnSurveysUnpublished() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForIsPublished());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("title");
        request.setUnPublished(true);
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request);
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenEmptySortParmaterers() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTitle());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter("");
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request);
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
    }

    @Test
    public void testGetSurveyDetails_WhenNullSortParmaterers() {
        mockConnection = new MockConnection(new SurveyMockDataProviderForTitle());
        dslContext = DSL.using(mockConnection, SQLDialect.POSTGRES);
        SurveyRequest request = new SurveyRequest();
        request.setSortParameter(null);
        surveyAdapter = new SurveyAdapterImpl(dslContext, surveyAdapterConverter);
        SurveyResponse response = surveyAdapter.getSurveyDetails(request);
        Assert.assertEquals("Test Survey", response.getSurveys().get(0).getSurveyName());
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
        surveysRecords.get(0).setValue(SURVEYS.SURVEY_NAME, "Test Survey");

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
        surveysRecords.get(0).setValue(SURVEYS.SURVEY_NAME, "Test Survey");


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
        surveysRecords.get(0).setValue(SURVEYS.SURVEY_NAME, "Test Survey");

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
        surveysRecords.get(0).setValue(SURVEYS.SURVEY_NAME, "Test Survey");
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
        surveysRecords.get(0).setValue(SURVEYS.SURVEY_NAME, "Test Survey");
        mock[0] = new MockResult(1, surveysRecords);


        return mock;
    }
}
