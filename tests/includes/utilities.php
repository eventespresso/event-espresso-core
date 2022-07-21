<?php

/**
 * Redefining wp_mail function here as a mock for our tests.  Has to be done early
 * to override the existing wp_mail.  Tests can use the given filter to adjust the responses as necessary.
 */
function wp_mail($to, $subject, $message, $headers = '', $attachments = [])
{
    return apply_filters('FHEE__wp_mail', true, $to, $subject, $message, $headers, $attachments);
}


/**
 * copy of trailingslashit()
 *
 * @param string $string What to add the trailing slash to.
 * @return string String with trailing slash added.
 * @since 1.2.0
 *
 */
function addTrailingBackSlash(string $string): string
{
    return rtrim($string, '/\\') . '/';
}