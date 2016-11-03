package com.instructure.bridge.stepdefinitions.survey;

import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

/**
 * Created by skota on 10/27/2016.
 */
@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "html:build/cucumber-html-report",
        "pretty:build/cucumber-report.json"},
        features = "src/test/resources/features/")
public class CucumberClass {
}
