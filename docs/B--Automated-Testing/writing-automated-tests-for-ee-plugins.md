# Writing Automated Tests for Event Espresso Dependent Plugins

Event Espresso has an automated testing suite available in versions at and after 4.3.0+.   One of the things we made a point of doing in designing our testing suite is made sure its easy for EE add-ons to integrate with the core testing suite for their own tests.

> This document assumes you are familiar with writing tests using the [wordpress-plugin-tests](https://github.com/benbalter/wordpress-plugin-tests) technique (the [wp-cli unit tests scaffold tool](http://wp-cli.org/blog/plugin-unit-tests.html) is an even easier method of getting the initial test scaffold setup).

Event Espresso provides two useful kinds of utilities your Event Espresso add-on's tests can take advantage of.  We'll take a look briefly at these two utilities, and then we'll follow it with a working example.

> **Note:** In this document, we're showing how to extend Event Espresso's test suite for use in a *plugin*.  However, a similar technique could be used for Event Espresso themes, as well for setting up integration tests for an entire, highly-customized Event Espresso installation.

## Utilities

### Event Espresso installation and Bootstrapping

If your plugin depends on Event Espresso, then you'll need to make sure that Event Espresso is installed and running when running your tests.  Establishing the proper dependencies manually can be very tricky, because Event Espresso's setup routine requires the installation of custom tables and other important one-time configurations, and it all has to happen in a very specific order for a functioning version of Event Espresso.  

Event Espresso core provides a handy class for making it _really_ easy to bootstrap any add-on tests.  In your add-on's `bootstrap.php` file, simply include this:

```php
<?php
/**
 * Bootstrap for my Event Espresso add-on
 */
 use EventEspresso\tests\includes\AddonLoader
 //assuming your add-on is installed in the wp-content/plugins/my-addon folder
 //and Event Espresso is installed in the same WordPress instance at wp-
 //content/plugins/event-espresso-core.
 $core_tests_dir = dirname(dirname(dirname(__FILE__))) . '/event-espresso-core/tests/';
 require $core_tests_dir . 'includes/CoreLoader.php';
 require $core_tests_dir . 'includes/AddonLoader.php';
 
 $addon_path = dirname(dirname(__FILE__)) . '/';
 
 $addon_loader = new AddonLoader(
   $addon_path . 'tests', //path to the add-ons test directory,
   $addon_path, //path to the add-ons main directory (i.e. ..wp-content/plugins/my-addon)
   'my-addon.php', //path to your main addon file (the one that has the WordPress plugin header in it).
 );
 $addon_loader->init();
```

That's it!  The `EventEspresso\tests\includes\AddonLoader` class will take care of all the bootstrapping needed for your add-on against the installed version of Event Espresso.  If you namespace your unit tests and you aren't doing any custom registering of autoloaders for the namespaces (via composer or some other method), this class also exposes a helper for registering a Psr4 Autoloader for your namespace.  Something like this (after the call to `$addon_loader->init()`:

```php
$addon_loader->registerPsr4Path(
  array(
   'MyNameSpace' => $addon_path .'tests' 
  )
);

//the above will point namespace MyNameSpace to the tests directory for your add-on.
```

### EE_UnitTestCase and Data Factories

When you use `EE_UnitTestCase` class for your test cases, you have access to a number of helpful utility methods as well as the Event Espresso data factories for generating Events, Registrations, Tickets etc.  If your plugin has additional requirements for data factories, you might consider building your own `_UnitTestCase` that extends `EE_UnitTestCase`.

There is also a `EE_REST_TestCase` class that you can use for any testcases you build that are working with REST endpoints in the EE REST API.
