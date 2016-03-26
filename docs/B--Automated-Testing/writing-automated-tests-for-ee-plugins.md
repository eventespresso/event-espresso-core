# Writing Automated Tests for Event Espresso Dependent Plugins

Event Espresso has an automated testing suite available in versions at and after 4.3.0+.   One of the things we made a point of doing in designing our testing suite is made sure its easy for EE add-ons to integrate with the core testing suite for their own tests.

> This document assumes you are familiar with writing tests using the [wordpress-plugin-tests](https://github.com/benbalter/wordpress-plugin-tests) technique (the [wp-cli unit tests scaffold tool](http://wp-cli.org/blog/plugin-unit-tests.html) is an even easier method of getting the initial test scaffold setup).

Event Espresso provides two useful kinds of utilities your Event Espresso add-on's tests can take advantage of.  We'll take a look briefly at these two utilities, and then we'll follow it with a working example.

> **Note:** In this document, we're showing how to extend Event Espresso's test suite for use in a *plugin*.  However, a similar technique could be used for Event Espresso themes, as well for setting up integration tests for an entire, highly-customized Event Espresso installation.

## Utilities

### Event Espresso installation and Bootstrapping

If your plugin depends on Event Espresso, then you'll need to make sure that Event Espresso is installed and running when running your tests.  Establishing the proper dependencies manually can be very tricky, because Event Espresso's setup routine requires the installation of custom tables and other important one-time configurations, and it all has to happen in a very specific order for a functioning version of Event Espresso.  Fortunately, you don't have to do this manually.  Just require `event-espresso-core/tests/includes/loader.php` in a callback function hooked to `muplugins_loaded` using` tests_add_filter()` - right before you manually load your own plugin - and this will ensure that Event Espresso gets installed correctly and is fully loaded before loading your plugin.

### EE_UnitTestCase and Data Factories

When you use `EE_UnitTestCase` class for your test cases, you have access to a number of helpful utility methods as well as the Event Espresso data factories for generating Events, Registrations, Tickets etc.  If your plugin has additional requirements for data factories, you might consider building your own `_UnitTestCase` that extends `EE_UnitTestCase`.

## Sample Bootstrap File

Below is an annotated version of the `bootstrap.php` we use for our Promotions add-on tests.  It's a great example of how to setup the bootstrap for EE add-ons.  The plugin in the example below can be found via our [github repo](https://github.com/eventespresso/event-espresso-core/tree/master/tests).  The code is from the file `espresso-promotions/tests/bootstrap.php`.  You should be able to copy and paste this code into your own `tests/bootstrap.php` file - just change the paths for your plugin loader file, and your optional `_UnitTestCase` class file.

```php
<?php
/**
 * Bootstrap for EE4 Promotions Unit Tests
 *
 * @since 		1.0.0
 * @package 		EE4 Promotions
 * @subpackage 	Tests
 */

// All constants used in here are defined in the `define-constants.php` file.  You can open up this file to see how
// they are defined.  This allows for setups where Event Espresso tests may be installed in a non-standard location.
require( dirname( __FILE__ ) . '/includes/define-constants.php' );

// Check for the existence of the wp tests functions.php file.  It needs to be defined really early because of the
// necessary filters (not to mention needing the WP Test case for running!~
if ( ! file_exists( WP_TESTS_DIR . '/includes/functions.php' ) ) {
	die( "The WordPress PHPUnit test suite could not be found.\n" );
}
require_once WP_TESTS_DIR . '/includes/functions.php';

//Hooked into the `muplugins_loaded` filter, this callback function is responsible for bootstrapping Event Espresso
//as well as your own plugin.
function _install_and_load_core_and_ee_promos() {
	require EE_TESTS_DIR . 'includes/loader.php';
	require EEPRO_TESTS_DIR . 'includes/loader.php';
}
tests_add_filter( 'muplugins_loaded', '_install_and_load_core_and_ee_promos' );

//starts up the WP testing environment.
require WP_TESTS_DIR . '/includes/bootstrap.php';

//Load the EE_specific testing tools.  If you have any custom UnitTestCase class for your addon, this is where you'd require it so its available when your testcases are loaded.
require EE_TESTS_DIR . 'includes/EE_UnitTestCase.class.php';
```
