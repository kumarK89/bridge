package com.bridge.utils;

import com.bridge.utils.JooqExecuteListener;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.jooq.ExecuteContext;
import org.jooq.SQLDialect;
import org.jooq.exception.DataAccessException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;

import java.sql.SQLException;

@RunWith(SpringRunner.class)
public class JooqExecutionListenerTest {

    JooqExecuteListener jooqExecuteListener = new JooqExecuteListener();

    @Mock
    ExecuteContext executeContext;

    @Test
    public void testStart() {
        Object object = new Object();
        Mockito.doReturn(object).when(executeContext).data(Mockito.anyObject(), Mockito.anyObject());
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<String> strArgumentCaptor = ArgumentCaptor.forClass(String.class);
        jooqExecuteListener.start(executeContext);
        Mockito.verify(executeContext).data(strArgumentCaptor.capture()
                , longArgumentCaptor.capture());
    }

    @Test
    public void testEnd() {
        Mockito.doReturn((Long) 1L).
                when(executeContext).data(Mockito.anyObject());
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);

        jooqExecuteListener.end(executeContext);
        Mockito.verify(executeContext).data(longArgumentCaptor.capture());
    }

    @Test
    public void testExceptionforNullSqlException() {
        Mockito.doReturn(null).when(executeContext).sqlException();
        jooqExecuteListener.exception(executeContext);
        Mockito.verify(executeContext).sqlException();
    }

    @Test
    public void testExceptionforSqlException() {
        Mockito.doReturn(new SQLException()).when(executeContext).sqlException();
        Mockito.doReturn(SQLDialect.POSTGRES).when(executeContext).dialect();
        Mockito.doReturn("").when(executeContext).sql();
        Mockito.doNothing().when(executeContext).exception(Mockito.any(DataAccessException.class));
        jooqExecuteListener.exception(executeContext);
        Mockito.verify(executeContext).dialect();
    }
}
