<?php

namespace EventEspresso\tests\testcases\core\helpers;

use EEH_URL;
use PHPUnit\Framework\TestCase;

/**
 * Class EEH_URL_Test
 *
 * @author  Brent Christensen
 * @package EventEspresso\tests\testcases\core\helpers
 * @since   4.10.15.p
 * @group   URL
 */
class EEH_URL_Test extends TestCase
{
    /**
     * @return string[][]
     */
    public function urlProvider()
    {
        return [
            [
                admin_url('admin.php?page=espresso_registrations'),
                'http://example.org/wp-admin/admin.php?page=espresso_registrations',
            ],
            [
                'https://local.wordpress.dev/wp-admin/admin.php',
                'https://local.wordpress.dev/wp-admin/admin.php',
            ],
            [
                'http://local.wordpress.dev/wp-admin/admin.php?page=espresso_events&action=edit&post=39&edit_nonce=be452be953',
                'http://local.wordpress.dev/wp-admin/admin.php?page=espresso_events&action=edit&post=39&edit_nonce=be452be953',
            ],
            [
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
            ],
            [
                'http://www.dev.test/events/halloween-party/?"><script>_q_q=)(</script>',
                'http://www.dev.test/events/halloween-party/?script_q_q=)(/script',
            ],
            [
                'http://testsite.test/<script>alert("TEST");</script>',
                'http://testsite.test/scriptalert(TEST);/script',
            ],
            [
                'http://www.google.com/search?q=flowers+%3Cscript%3Eevil_script()%3C/script%3E',
                'http://www.google.com/search?q=flowers+%3Cscript%3Eevil_script()%3C/script%3E',
            ],
            [
                "/example.php?cookie_data=' + escape(document . cookie)",
                '/example.php?cookie_data=%20+%20escape(document%20.%20cookie)',
            ],
            [
                'http://testing.com/book.html?default=<script>alert(document.cookie)</script>',
                'http://testing.com/book.html?default=scriptalert(document.cookie)/script',
            ],
        ];
    }


    /**
     * @dataProvider urlProvider
     */
    public function testFilterInputServerUrl($test_url, $expected)
    {
        $previous               = $_SERVER['REQUEST_URI'];
        $_SERVER['REQUEST_URI'] = $test_url;
        $filtered_url           = EEH_URL::filter_input_server_url();
        $_SERVER['REQUEST_URI'] = $previous;
        $this->assertEquals($expected, $filtered_url);
    }
}
