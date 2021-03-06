/**
 * This class is generated by jOOQ
 */
package com.bridge.entity.tables.records;


import com.bridge.entity.tables.AnswerOptions;

import java.sql.Timestamp;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record8;
import org.jooq.Row8;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.8.4"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class AnswerOptionsRecord extends UpdatableRecordImpl<AnswerOptionsRecord> implements Record8<Long, Long, String, String, Timestamp, Timestamp, String, String> {

    private static final long serialVersionUID = 1804434958;

    /**
     * Setter for <code>public.answer_options.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.answer_options.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>public.answer_options.answer_type_id</code>.
     */
    public void setAnswerTypeId(Long value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.answer_options.answer_type_id</code>.
     */
    public Long getAnswerTypeId() {
        return (Long) get(1);
    }

    /**
     * Setter for <code>public.answer_options.option_text</code>.
     */
    public void setOptionText(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.answer_options.option_text</code>.
     */
    public String getOptionText() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.answer_options.text_response</code>.
     */
    public void setTextResponse(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.answer_options.text_response</code>.
     */
    public String getTextResponse() {
        return (String) get(3);
    }

    /**
     * Setter for <code>public.answer_options.created_at</code>.
     */
    public void setCreatedAt(Timestamp value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.answer_options.created_at</code>.
     */
    public Timestamp getCreatedAt() {
        return (Timestamp) get(4);
    }

    /**
     * Setter for <code>public.answer_options.updated_at</code>.
     */
    public void setUpdatedAt(Timestamp value) {
        set(5, value);
    }

    /**
     * Getter for <code>public.answer_options.updated_at</code>.
     */
    public Timestamp getUpdatedAt() {
        return (Timestamp) get(5);
    }

    /**
     * Setter for <code>public.answer_options.created_by</code>.
     */
    public void setCreatedBy(String value) {
        set(6, value);
    }

    /**
     * Getter for <code>public.answer_options.created_by</code>.
     */
    public String getCreatedBy() {
        return (String) get(6);
    }

    /**
     * Setter for <code>public.answer_options.updated_by</code>.
     */
    public void setUpdatedBy(String value) {
        set(7, value);
    }

    /**
     * Getter for <code>public.answer_options.updated_by</code>.
     */
    public String getUpdatedBy() {
        return (String) get(7);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Long> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record8 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row8<Long, Long, String, String, Timestamp, Timestamp, String, String> fieldsRow() {
        return (Row8) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row8<Long, Long, String, String, Timestamp, Timestamp, String, String> valuesRow() {
        return (Row8) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
        return AnswerOptions.ANSWER_OPTIONS.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field2() {
        return AnswerOptions.ANSWER_OPTIONS.ANSWER_TYPE_ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return AnswerOptions.ANSWER_OPTIONS.OPTION_TEXT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return AnswerOptions.ANSWER_OPTIONS.TEXT_RESPONSE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Timestamp> field5() {
        return AnswerOptions.ANSWER_OPTIONS.CREATED_AT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Timestamp> field6() {
        return AnswerOptions.ANSWER_OPTIONS.UPDATED_AT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field7() {
        return AnswerOptions.ANSWER_OPTIONS.CREATED_BY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field8() {
        return AnswerOptions.ANSWER_OPTIONS.UPDATED_BY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value2() {
        return getAnswerTypeId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getOptionText();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getTextResponse();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp value5() {
        return getCreatedAt();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp value6() {
        return getUpdatedAt();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value7() {
        return getCreatedBy();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value8() {
        return getUpdatedBy();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value1(Long value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value2(Long value) {
        setAnswerTypeId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value3(String value) {
        setOptionText(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value4(String value) {
        setTextResponse(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value5(Timestamp value) {
        setCreatedAt(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value6(Timestamp value) {
        setUpdatedAt(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value7(String value) {
        setCreatedBy(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord value8(String value) {
        setUpdatedBy(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AnswerOptionsRecord values(Long value1, Long value2, String value3, String value4, Timestamp value5, Timestamp value6, String value7, String value8) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached AnswerOptionsRecord
     */
    public AnswerOptionsRecord() {
        super(AnswerOptions.ANSWER_OPTIONS);
    }

    /**
     * Create a detached, initialised AnswerOptionsRecord
     */
    public AnswerOptionsRecord(Long id, Long answerTypeId, String optionText, String textResponse, Timestamp createdAt, Timestamp updatedAt, String createdBy, String updatedBy) {
        super(AnswerOptions.ANSWER_OPTIONS);

        set(0, id);
        set(1, answerTypeId);
        set(2, optionText);
        set(3, textResponse);
        set(4, createdAt);
        set(5, updatedAt);
        set(6, createdBy);
        set(7, updatedBy);
    }
}
