package com.instructure.bridge.stepdefinitions.survey;

import com.bridge.survey.SurveyAdapterImpl;
import com.bridge.survey.SurveyRequest;
import com.bridge.survey.SurveyResponse;
import com.bridge.survey.api.SurveyService;
import com.bridge.survey.impl.SurveyServiceImpl;
import com.bridge.survey.utils.SurveyAdapterConverter;
import com.instructure.bridge.connection.DBSetUp;

import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.junit.Assert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;


/**
 * Created by skota on 10/27/2016.
 */

public class SurveyStepDefinitions {

    private Logger LOGGER = LoggerFactory.getLogger(SurveyStepDefinitions.class);

    SurveyService surveyService;

    SurveyRequest surveyRequest;

    SurveyResponse surveyResponse;

    Connection connection = DBSetUp.connection();
    DSLContext dslContext = DSL.using(connection);

    SurveyAdapterConverter surveyAdapterConverter = new SurveyAdapterConverter();

    @Given("^The title value as \"(.*?)\" and ispublished \"(.*?)\" in  service request\\.$")
    public void the_title_value_as_and_ispublished_in_service_request(String arg1, String arg2)
            throws Throwable {
        LOGGER.debug("Entered @Given " +
                "the_title_value_as_First_Survey_and_ispublished_false_in_service_request ");
        surveyService = new SurveyServiceImpl(new SurveyAdapterImpl(dslContext, surveyAdapterConverter));
        surveyRequest = new SurveyRequest();
        surveyRequest.setPublished(Boolean.parseBoolean(arg2));
        surveyRequest.setSortParameters("title");
        surveyRequest.setSrvyName(arg1);

        LOGGER.debug("Exiting @Given " +
                "the_title_value_as_First_Survey_and_ispublished_false_in_service_request ");
    }

    @When("^Service request is given to the service need to return the surveys\\.$")
    public void service_request_is_given_to_the_service_need_to_return_the_surveys()
            throws Throwable {
        surveyResponse = surveyService.getSurveys(surveyRequest);
    }

    @Then("^check the surveys returned contain the title as \"(.*?)\"$")
    public void check_the_surveys_returned_contain_the_title_as(String arg1)
            throws Throwable {
        Assert.assertNull(surveyResponse);
    }
}
