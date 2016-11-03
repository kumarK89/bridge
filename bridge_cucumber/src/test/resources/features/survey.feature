Feature: This is a sample cucumber test


  Scenario: Get Survey request with default values
    Given The title value as "Fourth Survey" and ispublished "false" in  service request.
    When Service request is given to the service need to return the surveys.
    Then check the surveys returned contain the title as "Fourth Survey"