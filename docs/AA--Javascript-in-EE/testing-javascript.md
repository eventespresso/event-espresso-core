## Testing Javascript in EE

At Event Espresso we recognize the value of automated testing of code and how that contributes towards a stable codebase. We have [phpunit automated testing](../B--Automated-Testing/automated-testing-in-event-espresso.md) for php along with [acception tests using codeception](https://github.com/eventespresso/ee-codeception). This document highlights the automated testing we do for javascript in EE.

## Unit Tests

### Framework

The framework we use for unit testing javascript in Event Espresso is [jest](https://facebook.github.io/jest/). Jest is a testing framework developed by Facebook and one of its benefits (along with the ability to unit test native javascript) is that out of the box it also works for testing any React project. Since React is/will be used for much of the javascript functionality we build in EE, it's a good fit.

### Folder Structure

Currently `assets/src` is monitored for any test files. Our convention is to have all tests within a `test` folder within the component/directory corresponding to the source javascript. This helps with organization as well as easily identifying what tests are being run.

Example:

```
./event-espresso-core
├─ assets
    └─ src
        └─ eejs
            └─ test
                └─ index.js //this is the test file for all `eejs` tests.
            └─ index.js

```

## Running tests

The following scripts are available for running tests from the root folder of the project.

| Command                         | What it does                                                                                                                                                                                                                                                |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run ci`                    | This is used in travis builds to execute tests. It runs the linter, the build script (to make sure there's no errors with building), and the test-unit command with the coverage flag. You won't typically use this script locally.                         |
| `npm run test`                  | This runs the linter and then the jest unit tests (with no coverage)                                                                                                                                                                                        |
| `npm run test-php`              | This triggers the phpunit tests to run                                                                                                                                                                                                                      |
| `npm run test-unit`             | This runs _only_ the jest unit tests (with no coverage)                                                                                                                                                                                                     |
| `npm run test-unit:coverage`    | This runs _only_ the jest unit test but includes a coverage report.                                                                                                                                                                                         |
| `npm run test-unit:coverage-ci` | This is another command used by our travis builds.                                                                                                                                                                                                          |
| `npm run test-unit:watch`       | This runs the javascript unit tests in watch mode. So any changes in files will trigger a new test run. This can be useful to keep running in a separate terminal tab when working on js for automatically running tests when you are debugging test fails. |

## Automation

All our tests are automatically run on travis for changes pushed to master or pull requests.
