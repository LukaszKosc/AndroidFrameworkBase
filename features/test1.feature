Feature: Some Feature

    @wip
    Scenario: Scenario no 1
        Given page is open
        Then login with following credentials
          | standard_user | secret_sauce |
        Then 'Products' page is shown