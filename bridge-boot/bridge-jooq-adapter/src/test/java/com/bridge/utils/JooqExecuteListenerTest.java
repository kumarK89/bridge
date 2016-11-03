package com.bridge.utils;

import org.jooq.ExecuteContext;
import org.jooq.SQLDialect;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.filter.TypeExcludeFilters;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.SQLException;

import static org.mockito.Mockito.times;

@RunWith(SpringRunner.class)
public class JooqExecuteListenerTest {

    JooqExecuteListener jooqExecuteListener = new JooqExecuteListener();

    @Mock
    ExecuteContext executeContext;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testStart() {
        Mockito.doReturn(new Object()).when(executeContext)
                .data(Mockito.any(Object.class), Mockito.any(Object.class));
        jooqExecuteListener.start(executeContext);
        Mockito.verify(executeContext, times(1))
                .data(Mockito.any(Object.class), Mockito.any(Object.class));
    }

    @Test
    public void testEnd() {
        Mockito.doReturn(new Long(1234567891011L)).when(executeContext)
                .data(Mockito.any(String.class));
        Mockito.doReturn("sql").when(executeContext).sql();
        jooqExecuteListener.end(executeContext);
        Mockito.verify(executeContext, times(1))
                .data(Mockito.any(String.class));
        Mockito.verify(executeContext, times(1))
                .sql();
    }

    @Test
    public void testException_when_SQLException_NULL() {
        Mockito.doReturn(null).when(executeContext).sqlException();
        jooqExecuteListener.exception(executeContext);
        Mockito.verify(executeContext).sqlException();
    }

}
