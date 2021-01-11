<?php
use EETests\bootstrap\CoreLoader;

/**
 * Bootstrap for EE Unit Tests
 */
require __DIR__ . '/bootstrap/CoreLoader.php';
$core_loader = new CoreLoader();
$core_loader->init();


/**
 * Redefining wp_mail function here as a mock for our tests.  Has to be done early
 * to override the existing wp_mail.  Tests can use the given filter to adjust the responses as necessary.
 */
function wp_mail($to, $subject, $message, $headers = '', $attachments = array())
{
    return apply_filters('FHEE__wp_mail', true, $to, $subject, $message, $headers, $attachments);
}
