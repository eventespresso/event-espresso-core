# WPGraphQL TestCase
![continuous_integration](https://github.com/wp-graphql/wp-graphql-testcase/workflows/continuous_integration/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/wp-graphql/wp-graphql-testcase/badge.svg)](https://coveralls.io/github/wp-graphql/wp-graphql-testcase)

Is a library of tools for testing WPGraphQL APIs, designed for both WPGraphQL and WPGraphQL extension development. Currently the library only consisted of a Codeception Testcase built on top wp-browser's WPTestCase class.

## Installing
1. Run `composer require wp-graphql/wp-graphql-testcase` from your project directory in the terminal.
2. _(Optionally: Codeception only)_ If your didn't already have codeception installed in the project, run `vendor/bin/codecept init wpbrowser`.
3. To make a test case generate a with `vendor/bin/codecept generate:wpunit wpunit TestName`. Then just change the extending class to `\Tests\WPGraphQL\TestCase\WPGraphQLTestCase` :man_shrugging:

## Going forward
There are plans to add more to this library, and contribution are greatly appreciated :pray:.

## Contributors
<a href="https://github.com/kidunot89"><img src="https://avatars.githubusercontent.com/u/13604318?v=3" title="kidunot89" width="80" height="80"></a>