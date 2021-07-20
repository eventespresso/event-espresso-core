<?php
/**
 * Bootstrap for EE4 Addon Skeleton Unit Tests
 */
use EventEspresso\tests\includes\AddonLoader;

$core_tests_dir = dirname(dirname(dirname(__FILE__))) . '/event-espresso-core/tests/';
//if still don't have $core_tests_dir, then let's check tmp folder.
if (! is_dir($core_tests_dir)) {
    $core_tests_dir = '/tmp/event-espresso-core/tests/';
}
require $core_tests_dir . 'includes/CoreLoader.php';
require $core_tests_dir . 'includes/AddonLoader.php';

define('EEADDON_PLUGIN_DIR', dirname(dirname(__FILE__)) . '/');
define('EEADDON_TESTS_DIR', EEADDON_PLUGIN_DIR . 'tests/');

$addon_loader = new AddonLoader(
    EEADDON_TESTS_DIR,
    EEADDON_PLUGIN_DIR,
    'eea-new-addon.php'
);
$addon_loader->init();
