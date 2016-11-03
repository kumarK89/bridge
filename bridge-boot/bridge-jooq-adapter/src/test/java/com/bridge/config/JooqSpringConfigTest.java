package com.bridge.config;

import com.bridge.survey.controller.config.SurveyAdapterConfig;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.jooq.ConnectionProvider;
import org.jooq.ConverterProvider;
import org.jooq.DSLContext;
import org.jooq.ExecuteListenerProvider;
import org.jooq.ExecutorProvider;
import org.jooq.RecordListenerProvider;
import org.jooq.RecordMapperProvider;
import org.jooq.SQLDialect;
import org.jooq.SchemaMapping;
import org.jooq.TransactionProvider;
import org.jooq.VisitListenerProvider;
import org.jooq.conf.Settings;
import org.jooq.impl.DSL;
import org.junit.Assert;
import org.junit.Test;
import org.junit.experimental.theories.DataPoint;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import java.sql.Connection;
import java.util.Map;

public class JooqSpringConfigTest {


    private DataSource dataSource = new DataSource();


    @Test
    public void testJooqSpringConfig() {
        JooqSpringConfig config = new JooqSpringConfig();
        DataSourceTransactionManager transactionManager = config.transactionManager(dataSource);

       //
        ConnectionProvider connectionProvider = config.connectionProvider(dataSource);
        org.jooq.Configuration configuration = config.jooqConfig(connectionProvider,
                config.executeListenerProvider(config.jooqExecuteListener()));
        DSLContext dsl = config.dsl(configuration);
        Assert.assertNotNull(transactionManager);
        Assert.assertNotNull(configuration);
        Assert.assertNotNull(connectionProvider);
        Assert.assertNotNull(dsl);


    }

}
