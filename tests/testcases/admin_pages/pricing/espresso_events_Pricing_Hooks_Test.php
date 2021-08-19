<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * espresso_events_Pricing_Hooks_Test
 *
 * @package        Event Espresso
 * @subpackage     tests
 * @author         Darren Ethier
 */
class espresso_events_Pricing_Hooks_Test extends EE_UnitTestCase
{


    /**
     * This will hold the pricing hooks mock
     *
     * @var espresso_events_Pricing_Hooks_mock
     */
    protected $_pricingMock;


    /**
     * This is used to hold an initial event object that saved data will be added to.
     *
     * @var EE_Event
     */
    protected $_event;



    public function setUp()
    {
        parent::setUp();
        $this->loadAdminMocks();
    }



    /**
     * loads the pricing mock object for tests
     *
     * @param string $timezone Timezone string to initialize the times in.
     * @throws EE_Error
     * @since 4.6
     */
    protected function _load_pricing_mock($timezone = 'America/Vancouver')
    {
        $this->loadFactories();
        $this->_pricingMock = new espresso_events_Pricing_Hooks_Mock();
        $this->_event = $this->factory->event->create();
        $this->_event->set_timezone($timezone);
        $this->_event->save();
        $this->_set_default_dates($timezone);
    }



    /**
     * Contains tests for the update_dtts method and update_tkts method.
     *
     * @since 4.6
     */
    public function test_update_dtts_and_update_tkts()
    {
        $this->_load_pricing_mock();
        $formats_to_test = $this->date_formats_to_test();
        $saved_dtts_for_tickets = $formats_for_compare = $saved_tkts = array();
        //test each date and time format combination for creating datetime objects
        foreach ($formats_to_test['date'] as $date_format) {
            foreach ($formats_to_test['time'] as $time_format) {
                $full_format = $date_format . ' ' . $time_format;
                $this->_pricingMock->set_date_format_strings(array('date' => $date_format, 'time' => $time_format));
                $data = $this->_get_save_data($full_format);
                $dtts = $this->_pricingMock->update_dtts($this->_event, $data);
                foreach ($dtts as $dtt) {
                    $this->assertInstanceOf('EE_Datetime', $dtt);
                    /** @var EE_Datetime $dtt */
                    //verify start and date
                    $this->assertEquals(
                        $dtt->start_date_and_time(),
                        $this->_default_dates['DTT_start']->format($full_format),
                        sprintf('Start Date Format Tested: %s', $full_format)
                    );
                    $this->assertEquals(
                        $dtt->end_date_and_time(),
                        $this->_default_dates['DTT_end']->format($full_format),
                        sprintf('End Date Format Tested: %s', $full_format)
                    );
                    $saved_dtts_for_tickets[$full_format] = $dtt;
                    $formats_for_compare[$dtt->ID()] = array($date_format, $time_format);
                }
            }
        }
        //test each date and time format combination for creating ticket objects
        foreach ($formats_to_test['date'] as $date_format) {
            foreach ($formats_to_test['time'] as $time_format) {
                $full_format = $date_format . ' ' . $time_format;
                $this->_pricingMock->set_date_format_strings(array('date' => $date_format, 'time' => $time_format));
                $data = $this->_get_save_data($full_format);
                $dtt_for_ticket['1'] = $saved_dtts_for_tickets[$full_format];
                $tkts = $this->_pricingMock->update_tkts($this->_event, $dtt_for_ticket, $data);
                foreach ($tkts as $tkt) {
                    $this->assertInstanceOf('EE_Ticket', $tkt, sprintf('Format: %s', $full_format));
                    //verify start and date
                    $this->assertEquals(
                        $tkt->start_date(),
                        $this->_default_dates['TKT_start']->format($full_format),
                        sprintf('Start Ticket DateFormat Tested: %s', $full_format)
                    );
                    $this->assertEquals(
                        $tkt->end_date(),
                        $this->_default_dates['TKT_end']->format($full_format),
                        sprintf('End Ticket Date Format Tested: %s', $full_format)
                    );
                    $saved_tkts[$full_format] = $tkt;
                }
            }
        }
        //now let's verify these items were saved correctly in the db.
        /*$new_tkts = $new_dtts = array();
        foreach ( $tkt as $format => $tkt ) {
            $new_tkts[$format] = EEM_Ticket::instance()->refresh_entity_map_from_db( $tkt->ID() );
        }

        foreach ( $saved_dtts_for_tickets[$full_format] as $format => $dtt ) {
            $new_dtts[$format] = EEM_Datetime::instance()->refresh_entity_map_from_db( $dtt->ID() );
        }/**/
        /** @var EE_Event $new_event */
        $new_event = EEM_Event::instance()->refresh_entity_map_from_db($this->_event->ID());
        $new_event->set_timezone('America/Vancouver');
        $evt_dtts = $new_event->datetimes_ordered();
        //now let's do comparisons.
        foreach ($evt_dtts as $edtt) {
            if(!$edtt instanceof EE_Datetime) {
                continue;
            }
            $formats = $formats_for_compare[$edtt->ID()];
            $format = $formats[0] . ' ' . $formats[1];
            $this->assertEquals(
                $edtt->start_date_and_time($formats[0], $formats[1]),
                $this->_default_dates['DTT_start']->format($format),
                sprintf('DB DTT/Default DTT Start Date Format Checked: %s', $format)
            );
            $this->assertEquals(
                $edtt->end_date_and_time($formats[0], $formats[1]),
                $this->_default_dates['DTT_end']->format($format),
                sprintf('DB DTT/Default DTT End Date Format Checked: %s', $format)
            );
            $this->assertEquals(
                $edtt->start_date_and_time($formats[0], $formats[1]),
                $saved_dtts_for_tickets[$format]->start_date_and_time(),
                sprintf('DB DTT/Orig DTT Start Date Format Checked: %s', $format)
            );
            $this->assertEquals(
                $edtt->end_date_and_time($formats[0], $formats[1]),
                $saved_dtts_for_tickets[$format]->end_date_and_time(),
                sprintf('DB DTT/Orig DTT End Date Format Checked: %s', $format)
            );
            //get related ticket on this $edtt
            $evt_tkt = $edtt->get_first_related('Ticket');
            $this->assertEquals(
                $evt_tkt->start_date($formats[0], $formats[1]),
                $this->_default_dates['TKT_start']->format($format),
                sprintf('DB TKT/Default TKT Start Date Format Checked: %s', $format)
            );
            $this->assertEquals(
                $evt_tkt->end_date($formats[0], $formats[1]),
                $this->_default_dates['TKT_end']->format($format),
                sprintf('DB TKT/Default TKT End Date Format Checked: %s', $format)
            );
            $this->assertEquals(
                $evt_tkt->start_date($formats[0], $formats[1]),
                $saved_tkts[$format]->start_date($formats[0], $formats[1]),
                sprintf('DB TKT/Orig TKT Start Date Format Checked: %s', $format)
            );
            $this->assertEquals(
                $evt_tkt->end_date($formats[0], $formats[1]),
                $saved_tkts[$format]->end_date($formats[0], $formats[1]),
                sprintf('DB TKT/Orig TKT End Date Format Checked: %s', $format)
            );
        }
    }


}
//end class espresso_events_Pricing_Hooks_Test
// Location: tests/testcases/admin_pages/pricing/espresso_events_Pricing_Hooks_Test.php
