# Automated Testing in Event Espresso

Event Espresso has embraced the value of building automated tests into its products.  These tests are designed to prevent the accidental introduction – or reintroduction – of bugs. If you are a developer of Event Espresso addons, or if you are contributing to Event Espresso core, please consider using (and writing!) these tests. The Event Espresso test suite is based off of the WordPress unit test system so if you haven't already, you'll want to [familiarize yourself with what WordPress has built first](https://make.wordpress.org/core/handbook/automated-testing/).

## 1. Setup the base testing suite.

You’ll need to install PHPUnit, check out the WordPress core test repository, create a blank MySQL database, and set up your `wp-tests-config.php` file. Follow [the instructions in the WordPress contributor handbook](https://make.wordpress.org/core/handbook/automated-testing/#installation) to get set up. The WordPress test suite can be located anywhere on your development machine, though it’s recommended that you place it somewhere outside your normal WordPress/Event Espresso development environment.

## 2. Check out the Event Espresso Core repository and install.

We do not include our automated test suite with the stable releases.  However, when you check out MASTER branch the tests folder is present (note you can also retrieve any stable tag that does not have the "sans tests folder" prefix and you'll get the tests folder included).  To get started, you'll need to check out the MASTER branch of Event Espresso from our [public github repo](https://github.com/eventespresso/event-espresso-core).

Navigate to where you have the `wordpress-develop` directory setup in your system and then:

```bash
~:$ cd src/wp-content && git clone git@github.com:eventespresso/event-espresso-core.git event-espresso-core && cd event-espresso-core && git checkout -b MASTER origin/MASTER
```

> NOTE: alternatively, you can define the environment variable `WP_TESTS_DIR` that points to the `/tests/phpunit` directory in the `wordpress-develop` install which should then allow you to run EE unit tests wherever you have EE installed on that same server.

After this, Event Espresso should be installed correctly.

## 3. Running the Tests

Navigate to the `/tests/` directory in your Event Espresso install, and type `phpunit`. That's it!

> Next up: [Writing automated tests for Event Espresso dependent plugins](writing-automated-tests-for-ee-plugins.md).