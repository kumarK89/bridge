package com.bridge.survey.jooq.config;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.jooq.ConnectionProvider;
import org.jooq.DSLContext;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class JooqSpringConfigTest {

    private DataSource dataSource = new DataSource();

    @Test
    public void testJooqSpringConfig() {
        JooqSpringConfig config = new JooqSpringConfig();
        DataSourceTransactionManager transactionManager = config.transactionManager(dataSource);
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