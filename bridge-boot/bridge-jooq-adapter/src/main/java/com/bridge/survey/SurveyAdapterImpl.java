package com.bridge.survey;

import com.bridge.survey.utils.SurveyAdapterConverter;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.SelectField;
import org.jooq.SortField;
import org.jooq.Table;
import org.jooq.impl.DSL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.bridge.survey.entity.tables.SurveyDistribution.SURVEY_DISTRIBUTION;
import static com.bridge.survey.entity.tables.Surveys.SURVEYS;
import static org.jooq.impl.DSL.trueCondition;

public class SurveyAdapterImpl implements SurveyAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(SurveyAdapterImpl.class);

    private static Map<String, SortField<?>> sortFieldMap = new HashMap<>();

    static {
        sortFieldMap.put("newest", DSL.field(SURVEYS.CREATED_AT).desc());
        sortFieldMap.put("duedate", DSL.field(SURVEY_DISTRIBUTION.CLOSES_AT).desc());
        sortFieldMap.put("title", DSL.field(SURVEYS.SURVEY_NAME).asc());
    }

    private final DSLContext dsl;

    private final SurveyAdapterConverter surveyAdapterConverter;

    public SurveyAdapterImpl(final DSLContext dsl, SurveyAdapterConverter surveyAdapterConverter) {
        this.dsl = dsl;
        this.surveyAdapterConverter = surveyAdapterConverter;
    }

    @Override
    public SurveyResponse getSurveyDetails(SurveyRequest surveyRequest) {
        LOGGER.debug("In getSurveyDetails");
        List<Record> surveysRecordList = dsl.select(select())
                .from(from(surveyRequest)).where(where(surveyRequest))
                .orderBy(orderBy(surveyRequest)).fetch();
        return surveyAdapterConverter.getSurveyReponse(surveysRecordList);
    }

    @Override
    public void deleteSurvey(SurveyRequest surveyRequest) {
        LOGGER.debug("In deleteSurvey");
        dsl.delete(SURVEY_DISTRIBUTION).where(SURVEY_DISTRIBUTION.SURVEY_ID
                .equal(surveyRequest.getSurveyId())).execute();
        dsl.delete(SURVEYS).where(SURVEYS.ID.equal(surveyRequest.getSurveyId())).execute();
    }


    private SelectField<?>[] select() {
        SelectField<?>[] select = {SURVEYS.ID, SURVEYS.SURVEY_NAME};
        return select;
    }

    private SortField<?> orderBy(SurveyRequest surveyRequest) {
        SortField<?> orderBy = null;
        if (!StringUtils.isEmpty(surveyRequest.getSortParameter())) {
            orderBy = sortFieldMap.get(surveyRequest.getSortParameter());
        }
        return orderBy;
    }

    private Table<?> from(SurveyRequest surveyRequest) {

        if (!StringUtils.isEmpty(surveyRequest.getSortParameter()) &&
                "duedate".equalsIgnoreCase(surveyRequest.getSortParameter())) {
           return SURVEYS.join(SURVEY_DISTRIBUTION)
                    .on(SURVEYS.ID.eq(SURVEY_DISTRIBUTION.SURVEY_ID));
        } else {
            return SURVEYS;
        }
    }

    private Condition where(SurveyRequest surveyRequest) {
        Condition condition = trueCondition();
        StringBuilder queryStringBuilder = new StringBuilder();
        if (!StringUtils.isEmpty(surveyRequest.getSrvyName())) {
            queryStringBuilder.append("%")
                    .append(surveyRequest.getSrvyName())
                    .append("%");
            condition = condition.and(SURVEYS.SURVEY_NAME.upper()
                    .like(queryStringBuilder.toString().toUpperCase()));
        }
        if (surveyRequest.isUnPublished()) {
            condition = condition.and(SURVEYS.ID.notIn
                    (dsl.select(SURVEY_DISTRIBUTION.SURVEY_ID).from(SURVEY_DISTRIBUTION)));
        }

        return condition;
    }
}
