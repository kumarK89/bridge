package com.bridge.survey.jooq;

import com.bridge.entity.tables.AnswerOptions;
import com.bridge.entity.tables.AnswerTypes;
import com.bridge.entity.tables.records.SurveyQuestionsRecord;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.domain.Survey;
import com.bridge.survey.domain.SurveyQuestion;
import com.bridge.survey.jooq.utils.SurveyAdapterConverter;

import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Record;
import org.jooq.Record1;
import org.jooq.Result;
import org.jooq.SelectField;
import org.jooq.SortField;
import org.jooq.Table;
import org.jooq.impl.DSL;
import org.jooq.tools.json.JSONValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.bridge.entity.Sequences.SURVEYS_ID_SEQ;
import static com.bridge.entity.Sequences.SURVEY_QUESTIONS_ID_SEQ;
import static com.bridge.entity.Sequences.SURVEY_TEMPLATES_ID_SEQ;
import static com.bridge.entity.tables.SurveyDistributions.SURVEY_DISTRIBUTIONS;
import static com.bridge.entity.tables.SurveyQuestions.SURVEY_QUESTIONS;
import static com.bridge.entity.tables.SurveyTemplates.SURVEY_TEMPLATES;
import static com.bridge.entity.tables.Surveys.SURVEYS;
import static org.jooq.impl.DSL.trueCondition;

@Component
public class SurveyAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(SurveyAdapter.class);

    private static final Map<String, SortField<?>> SORT_FIELD_MAP = new HashMap<>();

    static {
        SORT_FIELD_MAP.put("newest", DSL.field(SURVEYS.CREATED_AT).desc());
        SORT_FIELD_MAP.put("duedate", DSL.field(SURVEY_DISTRIBUTIONS.CLOSES_AT)
                .desc());
        SORT_FIELD_MAP.put("title", DSL.field(SURVEYS.NAME).asc());
    }

    private final DSLContext dsl;

    private final SurveyAdapterConverter surveyAdapterConverter;

    @Autowired
    public SurveyAdapter(final DSLContext dsl) {
        this.dsl = dsl;
        this.surveyAdapterConverter = new SurveyAdapterConverter();
    }

    public SurveyResponse getSurveyDetails(String surveyName,
                                           String sortParameter,
                                           boolean isUnpublished) {
        LOGGER.debug("In getSurveyDetails");
        List<Record> surveysRecordList = dsl.select(selectFields())
                .from(fromFields(sortParameter))
                .where(whereClause(surveyName, isUnpublished))
                .orderBy(orderByClause(sortParameter)).fetch();
        return surveyAdapterConverter.getSurveyReponse(surveysRecordList);
    }

    public void deleteSurvey(long surveyId) {
        LOGGER.debug("In deleteSurvey");
        dsl.delete(SURVEY_DISTRIBUTIONS)
                .where(SURVEY_DISTRIBUTIONS.SURVEY_ID
                        .equal(surveyId)).execute();
        dsl.delete(SURVEY_QUESTIONS).where(SURVEY_QUESTIONS.SURVEY_ID.equal(surveyId)).execute();
        dsl.delete(SURVEYS).where(SURVEYS.ID.equal(surveyId)).execute();
    }

    /**
     * Get the SurveyQuestions
     *
     * @return SurveyResponse
     */
    public SurveyResponse getSurveyQuestions(long surveyId) {
        SelectField<?>[] selectFields = new SelectField[]{SURVEY_QUESTIONS.ID,
                SURVEY_QUESTIONS.QUESTION_TEXT,
                SURVEY_QUESTIONS.SURVEY_ID, SURVEY_QUESTIONS.IS_REQUIRED,
                SURVEY_QUESTIONS.ANSWER_TYPE_ID, SURVEY_QUESTIONS.OPTION_ID,
                SURVEY_QUESTIONS.PRE_TEXT_MESSAGE, SURVEY_QUESTIONS.IS_ALLOW_PRE_TEXT};
        List<Record> records = dsl.select(selectFields).from(SURVEY_QUESTIONS).
                where(SURVEY_QUESTIONS.SURVEY_ID.eq(surveyId)).fetch();
        return surveyAdapterConverter.getSurveyResponseForQuestions(records, surveyId);
    }


    /**
     * Get the AnswerTypes along with the Options
     *
     * @return SurveyResponse
     */
    public SurveyResponse getAllAnswerTypeWithOptions() {
        LOGGER.debug("In getAnswerTypeWithOptions");

        AnswerTypes at = AnswerTypes.ANSWER_TYPES.as("at");
        AnswerOptions ao = AnswerOptions.ANSWER_OPTIONS.as(("ao"));
        Field options = dsl.select(DSL.field("string_agg(ao.id||'-'||ao.option_text,',')"))
                .from(ao)
                .where(ao.ANSWER_TYPE_ID.equal(at.ID)).asField("options");
        List<Record> surveysRecordList = dsl.select(
                new SelectField[]{at.ID, at.ANSWER_TYPE, options}).from(at)
                .orderBy(options).fetch();
        return surveyAdapterConverter.getSurveyResponseForAnswerTypes(surveysRecordList);
    }

    /**
     * update survey record.
     */
    public long updateSurvey(long id, String surveyName) {
        LOGGER.debug("In saveOrUpdateSurvey");
        dsl.update(SURVEYS)
                .set(SURVEYS.NAME, surveyName)
                .where(SURVEYS.ID.eq(id))
                .execute();
        return id;
    }

    /**
     * Save new survey record.
     */
    public long saveSurvey(String surveyName) {
        LOGGER.debug("In saveOrUpdateSurvey");
        Record1<Long> seqVal = dsl.select(SURVEYS_ID_SEQ.nextval()).fetchOne();
        dsl.insertInto(SURVEYS, SURVEYS.ID, SURVEYS.NAME)
                .values(seqVal.value1(), surveyName)
                .execute();
        return seqVal.value1();
    }

    /**
     * Save template on creating a new template  and update if the template already exists.
     *
     * @param id
     * @param templateName
     * @param questionsJson
     */
    public void saveorUpdateSurveyTemplate(long id, String templateName, String questionsJson) {
        LOGGER.debug("In saveorUpdateSurveyTemplate");
        Record1<Long> seqVal = dsl.select(SURVEY_TEMPLATES_ID_SEQ.nextval()).fetchOne();
        dsl.insertInto(SURVEY_TEMPLATES, SURVEY_TEMPLATES.ID, SURVEY_TEMPLATES.NAME,
                SURVEY_TEMPLATES.JSON_DATA)
                .values(seqVal.value1(), templateName,
                        JSONValue.toJSONString(questionsJson))
                .onDuplicateKeyUpdate()
                .set(SURVEY_TEMPLATES.JSON_DATA, JSONValue.toJSONString(questionsJson))
                .execute();
    }

    /**
     * Get the all the Templates availables
     *
     * @return SurveyResponse
     */
    public SurveyResponse getSurveyTemplates() {
        LOGGER.debug("In getSurveyTemplates");
        SelectField[] SelectField = new SelectField[]
                {SURVEY_TEMPLATES.ID, SURVEY_TEMPLATES.NAME, SURVEY_TEMPLATES.JSON_DATA};
        Result<Record> records = dsl.select(SelectField).from(SURVEY_TEMPLATES).fetch();
        return surveyAdapterConverter.getSurveytemplates(records);
    }

    public SurveyResponse getSurveyTemplate(long surveyTemplateId) {
        LOGGER.debug("In getSurveyTemplates");
        SelectField[] SelectField = new SelectField[]
                {SURVEY_TEMPLATES.ID, SURVEY_TEMPLATES.NAME, SURVEY_TEMPLATES.JSON_DATA};
        Result<Record> records = dsl.select(SelectField)
                .from(SURVEY_TEMPLATES)
                .where(SURVEY_TEMPLATES.ID.eq(surveyTemplateId))
                .fetch();
        return surveyAdapterConverter.getSurveytemplates(records);
    }

    /**
     * Save new survey Questions added , update existing questions for any changes.
     *
     * @param surveyQuestions
     */
    public void saveOrUpdateSurveyQuestions(List<SurveyQuestion> surveyQuestions) {
        surveyQuestions.stream()
                .map(surveyQuestion -> {
                    SurveyQuestionsRecord surveyQuestionsRecord = new SurveyQuestionsRecord();
                    boolean isSave = false;
                    if (surveyQuestion.getId() != 0L) {
                        surveyQuestionsRecord.setId(surveyQuestion.getId());
                    } else {
                        Record1<Long> seqVal = dsl.select(SURVEY_QUESTIONS_ID_SEQ.nextval())
                                .fetchOne();
                        surveyQuestionsRecord.setId(seqVal.value1());
                        isSave = true;
                    }
                    surveyQuestionsRecord.setQuestionText(surveyQuestion.getText());
                    surveyQuestionsRecord.setSurveyId(surveyQuestion.getSurveyId());
                    surveyQuestionsRecord.setIsRequired(surveyQuestion.isRequired());
                    surveyQuestionsRecord.setAnswerTypeId(surveyQuestion.getAnswerTypeId());
                    surveyQuestionsRecord.setOptionId(surveyQuestion.getIdealAnswerOptionId());
                    surveyQuestionsRecord.setPreTextMessage(surveyQuestion.getPreTextMessage());
                    surveyQuestionsRecord.setIsAllowPreText(surveyQuestion.isAllowPreText());
                    if (isSave) {
                        saveSurveyQuestion(surveyQuestionsRecord);
                    } else {
                        updateSurveyQuestion(surveyQuestionsRecord);
                    }
                    return surveyQuestionsRecord;
                }).collect(Collectors.toList());
    }

    public void deleteSurveyQuestion(Long surveyQuestionId) {
        dsl.deleteFrom(SURVEY_QUESTIONS).where(SURVEY_QUESTIONS.ID.eq(surveyQuestionId)).execute();
    }

    private void updateSurveyQuestion(SurveyQuestionsRecord surveyQuestionsRecord) {
        dsl.update(SURVEY_QUESTIONS)
                .set(SURVEY_QUESTIONS.QUESTION_TEXT, surveyQuestionsRecord.getQuestionText())
                .set(SURVEY_QUESTIONS.SURVEY_ID, surveyQuestionsRecord.getSurveyId())
                .set(SURVEY_QUESTIONS.IS_REQUIRED, surveyQuestionsRecord.getIsRequired())
                .set(SURVEY_QUESTIONS.ANSWER_TYPE_ID, surveyQuestionsRecord.getAnswerTypeId())
                .set(SURVEY_QUESTIONS.OPTION_ID, surveyQuestionsRecord.getOptionId())
                .set(SURVEY_QUESTIONS.PRE_TEXT_MESSAGE, surveyQuestionsRecord.getPreTextMessage())
                .set(SURVEY_QUESTIONS.IS_ALLOW_PRE_TEXT, surveyQuestionsRecord.getIsAllowPreText())
                .where(SURVEY_QUESTIONS.ID.eq(surveyQuestionsRecord.getId())).execute();
    }

    private void saveSurveyQuestion(SurveyQuestionsRecord surveyQuestionsRecord) {
        dsl.insertInto(SURVEY_QUESTIONS, SURVEY_QUESTIONS.ID,
                SURVEY_QUESTIONS.QUESTION_TEXT,
                SURVEY_QUESTIONS.SURVEY_ID,
                SURVEY_QUESTIONS.IS_REQUIRED,
                SURVEY_QUESTIONS.ANSWER_TYPE_ID,
                SURVEY_QUESTIONS.OPTION_ID,
                SURVEY_QUESTIONS.PRE_TEXT_MESSAGE,
                SURVEY_QUESTIONS.IS_ALLOW_PRE_TEXT).values(surveyQuestionsRecord.getId(),
                surveyQuestionsRecord.getQuestionText(),
                surveyQuestionsRecord.getSurveyId(),
                surveyQuestionsRecord.getIsRequired(),
                surveyQuestionsRecord.getAnswerTypeId(),
                surveyQuestionsRecord.getOptionId(),
                surveyQuestionsRecord.getPreTextMessage(),
                surveyQuestionsRecord.getIsAllowPreText()).execute();
    }

    private SelectField<?>[] selectFields() {
        return new SelectField[]{SURVEYS.ID, SURVEYS.NAME};
    }

    private SortField<?> orderByClause(String sortParameter) {
        SortField<?> orderBy = null;
        if (!StringUtils.isEmpty(sortParameter)) {
            orderBy = SORT_FIELD_MAP.get(sortParameter);
        }
        return orderBy;
    }

    private Table<?> fromFields(String sortParamter) {

        if (!StringUtils.isEmpty(sortParamter) &&
                "duedate".equalsIgnoreCase(sortParamter)) {
            return SURVEYS.join(SURVEY_DISTRIBUTIONS)
                    .on(SURVEYS.ID.eq(SURVEY_DISTRIBUTIONS.SURVEY_ID));
        } else {
            return SURVEYS;
        }
    }

    private Condition whereClause(String surveyName, boolean isUnPublished) {
        Condition condition = trueCondition();
        if (!StringUtils.isEmpty(surveyName)) {
            condition = condition.and("name @@ to_tsquery('" + surveyName + ":*')");
        }
        if (isUnPublished) {
            condition = condition.and(SURVEYS.ID.notIn
                    (dsl.select(SURVEY_DISTRIBUTIONS.SURVEY_ID)
                            .from(SURVEY_DISTRIBUTIONS)));
        }

        return condition;
    }
}
