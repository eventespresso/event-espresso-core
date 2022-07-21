<?php

namespace EventEspresso\tests;

use EventEspresso\tests\includes\CoreLoader;

/**
 * Bootstrap for EE Unit Tests
 */
require __DIR__ . '/includes/utilities.php';
require __DIR__ . '/includes/CoreLoader.php';
$core_loader = new CoreLoader();
$core_loader->init();
