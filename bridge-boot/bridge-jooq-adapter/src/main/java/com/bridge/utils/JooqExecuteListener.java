package com.bridge.utils;

import org.jooq.ExecuteContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DefaultExecuteListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.support.SQLErrorCodeSQLExceptionTranslator;
import org.springframework.jdbc.support.SQLExceptionTranslator;
import org.springframework.jdbc.support.SQLStateSQLExceptionTranslator;

public class JooqExecuteListener extends DefaultExecuteListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(JooqExecuteListener.class);

    @Override
    public void exception(ExecuteContext ctx) {
        if (ctx.sqlException() != null) {
            SQLDialect sqlDialect = ctx.dialect();
            SQLExceptionTranslator sqlExceptionTranslator = sqlDialect != null
                    ? new SQLErrorCodeSQLExceptionTranslator(sqlDialect.thirdParty().springDbName())
                    : new SQLStateSQLExceptionTranslator();
            ctx.exception(sqlExceptionTranslator.translate("jOOQ", ctx.sql(), ctx.sqlException()));
        }
    }

    @Override
    public void start(ExecuteContext ctx) {
        super.start(ctx);
        ctx.data("start_time", System.nanoTime());
    }

    @Override
    public void end(ExecuteContext ctx) {
        super.end(ctx);
        Long startTime = (Long) ctx.data("start_time");
        Double timeInMilliSeconds = System.nanoTime() - startTime / 1000 / 1000.0;
        LOGGER.info("Execution timeIn Milli Seconds - {} for query - {}",
                timeInMilliSeconds, ctx.sql());
    }
}