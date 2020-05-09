<?php

$phpunit_version = function_exists('tests_get_phpunit_version')
    ? tests_get_phpunit_version()
    : '6.0';
if ( version_compare($phpunit_version, '7.0', '>=' ) ) {
	require __DIR__ . '/phpunit7/speed-trap-listener.php';
} else {
	require __DIR__ . '/speed-trap-listener.php';
}
