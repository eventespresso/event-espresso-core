<?php

use EventEspresso\core\admin\PostShortcodeTracking;

defined('ABSPATH') || exit;



/**
 * Class PostShortcodeTracking
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class PostShortcodeTrackingTests extends EE_UnitTestCase {

    public function test_get_post_ids_for_shortcode()
    {
        $page_for_posts = \EE_Config::get_page_for_posts();
        \EE_Registry::CFG()->core->post_shortcodes = array(
            'transactions'           =>
                array(
                    'ESPRESSO_TXN_PAGE' => 5,
                ),
            'registration-cancelled' =>
                array(
                    'ESPRESSO_CANCELLED' => 7,
                ),
            'os-event-list'          =>
                array(
                    'ESPRESSO_EVENTS' => 14,
                ),
            'homepage'               =>
                array(
                    'ESPRESSO_TICKET_SELECTOR' => 23,
                ),
            'thank-you'              =>
                array(
                    'ESPRESSO_THANK_YOU' => 6,
                ),
            'registration-checkout'  =>
                array(
                    'ESPRESSO_CHECKOUT' => 4,
                ),
            $page_for_posts                  =>
                array(
                    'ESPRESSO_EVENTS'          =>
                        array(
                            14 => true,
                        ),
                    'ESPRESSO_TICKET_SELECTOR' =>
                        array(
                            23  => true,
                            251 => true,
                        ),
                    'ESPRESSO_MY_EVENTS'       =>
                        array(
                            1 => true,
                        ),
                    'ESPRESSO_CALENDAR'        =>
                        array(
                            184 => true,
                            93  => true,
                        ),
                ),
            'calendar-shortcode'     =>
                array(
                    'ESPRESSO_CALENDAR' => 184,
                ),
            'calendar'               =>
                array(
                    'ESPRESSO_CALENDAR' => 93,
                ),
            'ts-shortcodes'          =>
                array(
                    'ESPRESSO_TICKET_SELECTOR' => 251,
                ),
        );

        $this->assertEquals(
            array(
                23 => 23,
                251 => 251,
            ),
            PostShortcodeTracking::get_post_ids_for_shortcode(
                'ESPRESSO_TICKET_SELECTOR'
            )
        );
        $this->assertEquals(
            array(
                'ESPRESSO_CALENDAR'  => array(
                    184 => 184,
                    93  => 93,
                ),
                'ESPRESSO_TICKET_SELECTOR' => array(
                    23  => 23,
                    251 => 251,
                ),
            ),
            PostShortcodeTracking::get_post_ids_for_shortcode(
                array(
                    'ESPRESSO_CALENDAR',
                    'ESPRESSO_TICKET_SELECTOR',
                )
            )
        );
        $this->assertEquals(
            array(
                184 => 184,
                93  => 93,
                23  => 23,
                251 => 251,
            ),
            PostShortcodeTracking::get_post_ids_for_shortcode(
                array(
                    'ESPRESSO_CALENDAR',
                    'ESPRESSO_TICKET_SELECTOR',
                ),
                false
            )
        );
    }

}
// End of file PostShortcodeTrackingTests.php
// Location: testcases/core/admin/PostShortcodeTrackingTests.php