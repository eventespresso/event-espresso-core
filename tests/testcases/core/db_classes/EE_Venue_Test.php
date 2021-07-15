<?php

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 *
 * EE_Venue_Test
 *
 * @package        Event Espresso
 * @subpackage     tests
 * @author         Darren Ethier
 * @since          4.6
 */

/**
 * @group core/db_classes
 */
class EE_Venue_Test extends EE_UnitTestCase
{


    /**
     * Test the events() method
     *
     * @since 4.6
     */
    public function test_events()
    {
        $this->loadFactories();
        $timezone_string = 'America/Toronto';
        update_option('timezone_string', $timezone_string);
        //setup some dates we'll use for testing with.
        $timezone            = new DateTimeZone($timezone_string);
        $upcoming_start_date = new DateTime("now +2hours", $timezone);
        $past_start_date     = new DateTime("now -5days", $timezone);
        $current_end_date    = new DateTime("now +2hours", $timezone);
        $current             = new DateTime("now", $timezone);
        $formats             = ['d/m Y', 'h:i:s a'];
        $full_format         = implode(' ', $formats);

        //setup some datetimes for event testing.
        $datetimes = [
            'expired_datetime'  => $this->factory->datetime->create(
                [
                    'DTT_EVT_start' => $past_start_date->format($full_format),
                    'DTT_EVT_end'   => $past_start_date->format($full_format),
                    'formats'       => $formats,
                ]
            ),
            'upcoming_datetime' => $this->factory->datetime->create(
                [
                    'DTT_EVT_start' => $upcoming_start_date->format($full_format),
                    'DTT_EVT_end'   => $upcoming_start_date->format($full_format),
                    'formats'       => $formats,
                ]
            ),
            'active_datetime'   => $this->factory->datetime->create(
                [
                    'DTT_EVT_start' => $current->format($full_format),
                    'DTT_EVT_end'   => $current_end_date->format($full_format),
                    'formats'       => $formats,
                ]
            ),
            'sold_out_datetime' => $this->factory->datetime->create(
                [
                    'DTT_EVT_start' => $upcoming_start_date->format($full_format),
                    'DTT_EVT_end'   => $upcoming_start_date->format($full_format),
                    'DTT_reg_limit' => 10,
                    'DTT_sold'      => 10,
                    'formats'       => $formats,
                ]
            ),
        ];


        $venue = $this->factory->venue->create();
        //assign events to the datetimes and then the events to the venue.
        foreach ($datetimes as $type => $datetime) {
            $event = $this->factory->event->create();
            $event->set_timezone($timezone_string);
            $event->set('status', 'publish');
            $event->_add_relation_to($datetime, 'Datetime');
            $event->save();
            $venue->_add_relation_to($event, 'Event');
            $venue->save();
        }

        //test with upcoming as false.  Should return 4 events.
        $events = $venue->events();
        $this->assertEquals(4, count($events));
        $this->assertInstanceOf('EE_Event', reset($events));

        //test with upcoming as true.  Should return 2 events.
        $events = $venue->events([], true);
        $this->assertEquals(2, count($events));
        $this->assertInstanceOf('EE_Event', reset($events));
    }


}// end class EE_Venue_Test
