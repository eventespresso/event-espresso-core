<?php

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * Registrations_Admin_Page_Test
 * This class contains all tests for the decaf version of the Registrations Admin Page.
 *
 * @package        Event Espresso
 * @subpackage     tests
 * @author         Darren Ethier
 * @since          4.6
 * @group          decaf
 */
class Registrations_Admin_Page_Test extends EE_UnitTestCase
{


    /**
     * This holds the Registrations_Admin_Page_Mock class
     *
     * @var Registrations_Admin_Page_Mock
     */
    protected $_admin_page;


    public function setUp()
    {
        parent::setUp();
        $this->delayedAdminPageMocks('registrations');
        //need to set a user with registration privileges for default queries in the admin.
        $user = $this->factory->user->create_and_get();
        $user->add_role('administrator');
        wp_set_current_user( $user->ID );
    }


    /**
     * loader for setting the $_admin_page_property
     *
     * @since 4.6
     */
    protected function _load_requirements()
    {
        $this->_admin_page = new Registrations_Admin_Page_Mock();
    }


    /**
     * @since 4.6.x
     * -- testing today queries
     * -- testing this month queries
     * -- testing month range queries.
     * @throws \EE_Error
     */
    public function test_get_registrations()
    {
        // to view how dates are added or subtracted, uncomment the following
        /*foreach( array( '01', '15', '31' ) as $day ) {
            echo "\n\n\n ADD DATES";
            $date = "2015-01-{$day}";
            $now = DateTime::createFromFormat( 'Y-m-d', $date );
            echo "\n\n starting : " . $now->format( 'M d, Y' );
            for ( $x = 1; $x <= 12; $x++ ) {
                echo "\n\n now : " . $now->format( 'M d, Y' );
                $prev_month = $this->_get_date_one_month_ago( $now );
                echo "\n prev: " . $prev_month->format( 'M d, Y' );
                $next_month = $this->_get_date_one_month_from_now( $now );
                echo "\n next: " . $next_month->format( 'M d, Y' );
                $year = (int)$now->format( 'Y' );
                $month = (int)$now->format( 'n' );
                $month++;
                $days_in_month = (int)$next_month->format( 't' );
                $now_day = $day > $days_in_month ? $days_in_month : $day;
                $now = DateTime::createFromFormat( 'Y-m-d', "{$year}-{$month}-{$now_day}" );

            }
            echo "\n\n\n SUBTRACT DATES";
            $now = DateTime::createFromFormat( 'Y-m-d', $date );
            echo "\n\n starting : " . $now->format( 'M d, Y' );
            for ( $x = 12; $x > 0; $x-- ) {
                echo "\n\n now : " . $now->format( 'M d, Y' );
                $prev_month = $this->_get_date_one_month_ago( $now );
                echo "\n prev: " . $prev_month->format( 'M d, Y' );
                $next_month = $this->_get_date_one_month_from_now( $now );
                echo "\n next: " . $next_month->format( 'M d, Y' );
                $year = (int)$now->format( 'Y' );
                $month = (int)$now->format( 'n' );
                $month++;
                $days_in_month = (int)$next_month->format( 't' );
                $now_day = $day > $days_in_month ? $days_in_month : $day;
                $now = DateTime::createFromFormat( 'Y-m-d', "{$year}-{$month}-{$now_day}" );
            }
        }*/

        $this->_load_requirements();
        // baseline DateTime objects
        $now        = new DateTime('now', new DateTimeZone('America/Vancouver'));
        $prev_month = $this->_get_date_one_month_ago($now);
        $next_month = $this->_get_date_one_month_from_now($now);
        // echo "\n\n now : " . $now->format( 'M j, Y g:i a' );
        // echo "\n prev: " . $prev_month->format( 'M j, Y g:i a' );
        // echo "\n next: " . $next_month->format( 'M j, Y g:i a' );
        //let's setup some registrations to test.
        // first create a txn
        /** @var EE_Transaction $transaction */
        $transaction   = $this->factory->transaction->create();
        $registrations = $this->factory->registration->create_many(4, array('TXN_ID' => $transaction->ID()));
        $this->assertCount(
            4,
            $registrations,
            'there should be 4 registrations in total, not ' . count($registrations)
            . "\nHere are the registrations: " . $this->reg_debug($registrations, true)
        );
        //create an event and add to the registrations
        $event = $this->factory->event->create(array('EVT_wp_user' => 0));
        if ($event instanceof EE_Event) {
            foreach ($registrations as $registration) {
                if ($registration instanceof EE_Registration) {
                    $registration->_add_relation_to($transaction, 'Transaction');
                    $registration->_add_relation_to($event, 'Event');
                    $registration->set('STS_ID', EEM_Registration::status_id_pending_payment);
                    $registration->save();
                }
            }
        }
        // let's modify the first registration so it happened one months ago,
        $first_registration = reset($registrations);
        $first_registration->set('REG_date', $prev_month->format('U'));
        $first_registration->save();
        // modify the last registration so it happens next month.
        $last_registration = end($registrations);
        $last_registration->set('REG_date', $next_month->format('U'));
        $last_registration->save();
        // $this->reg_debug( $registrations );
        //let's test queries for today
        $_GET['status'] = 'today';
        $registrations  = $this->_admin_page->get_registrations();
        // echo "\n\n " . __LINE__ . ") " . __METHOD__ . "() STATUS: " . $_GET['status'];
        // $this->reg_debug( $registrations );
        $this->assertCount(
            2,
            $registrations,
            'there should be 2 registrations for today, not ' . count($registrations)
            . "\nHere are the registrations: " . $this->reg_debug($registrations, true)
        );
        //test queries for this month
        $_GET['status'] = 'month';
        $registrations  = $this->_admin_page->get_registrations();
        // echo "\n\n " . __LINE__ . ") " . __METHOD__ . "() STATUS: " . $_GET['status'];
        // $this->reg_debug( $registrations );
        $this->assertCount(
            2,
            $registrations,
            'there should be 2 registrations for this month, not ' . count($registrations)
            . "\nHere are the registrations: " . $this->reg_debug($registrations, true)
        );
        // test queries for month range using last month
        unset($_GET['status']);
        $_GET['month_range'] = $prev_month->format('F Y');
        $registrations       = $this->_admin_page->get_registrations();
        // echo "\n\n " . __LINE__ . ") " . __METHOD__ . "() MONTH_RANGE: " . $_GET[ 'month_range' ];
        // $this->reg_debug( $registrations );
        $this->assertCount(
            1,
            $registrations,
            'there should be 1 registration for ' . $_GET['month_range'] . ', not ' . count($registrations)
            . "\nHere are the registrations: " . $this->reg_debug($registrations, true)
        );
    }


    /**
     * @param EE_Registration[] $registrations
     * @param bool              $return
     * @return string
     */
    public function reg_debug($registrations, $return = false)
    {
        $result = "\n\n " . __LINE__ . ") " . __METHOD__ . "()";
        $result .= "\n registration count: " . count($registrations);
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                $result .= "\n registration date: " . $registration->date();
            }
        }
        if ($return) {
            return $result;
        }
        echo $result;
        return '';
    }


    /**
     * @since 4.8.10.rc.10
     * @group integration
     * @throws \EE_Error
     */
    public function test__set_registration_status_from_request_for_single_registration()
    {
        //first setup a registration
        /** @var EE_Registration $testing_registration */
        $testing_registration = $this->factory->registration->create(array('STS_ID' => EEM_Registration::status_id_pending_payment));
        // and a txn
        $testing_registration->_add_relation_to($this->factory->transaction->create(), 'Transaction');
        $_REQUEST['_REG_ID'] = $testing_registration->ID();
        $this->_load_requirements();
        $success = $this->_admin_page->set_registration_status_from_request(EEM_Registration::status_id_not_approved);
        $this->assertArrayHasKey('success', $success);
        $this->assertTrue($success['success']);
        $this->assertArrayHasKey('REG_ID', $success);
        $this->assertArrayContains($testing_registration->ID(), $success['REG_ID']);

        //verify registration got changed to not approved.
        /** @var EE_Registration $actual_registration */
        $actual_registration = EEM_Registration::reset()->instance()->get_one_by_ID($testing_registration->ID());
        $this->assertEquals(EEM_Registration::status_id_not_approved, $actual_registration->status_ID());
    }


    /**
     * @since 4.8.10.rc.10
     * @group integration
     * @throws \EE_Error
     */
    public function test__set_registration_status_from_request_for_multiple_registrations()
    {
        /** @var EE_Transaction $txn */
        $txn = $this->factory->transaction->create();
        /** @var EE_Line_Item $tli */
        $tli = EEH_Line_Item::create_total_line_item($txn);
        $tli->save();
        /** @var EE_Ticket $tkt */
        $tkt = $this->factory->ticket_chained->create();
        EEH_Line_Item::add_ticket_purchase($tli, $tkt);
        //basically the same as the prior test except here we're testing multiple registrations.
        /** @var EE_Registration $registration_a */
        $registration_a = $this->factory->registration->create(
            array(
                'STS_ID' => EEM_Registration::status_id_cancelled,
                'TXN_ID' => $txn->ID(),
                'TKT_ID' => $tkt->ID(),
            )
        );
        $registration_a->save();
        /** @var EE_Registration $registration_b */
        $registration_b = $this->factory->registration->create(
            array(
                'STS_ID' => EEM_Registration::status_id_pending_payment,
                'TXN_ID' => $txn->ID(),
                'TKT_ID' => $tkt->ID(),
            )
        );
        $registration_b->save();
        /** @var EE_Registration $registration_c */
        $registration_c = $this->factory->registration->create(
            array(
                'STS_ID' => EEM_Registration::status_id_not_approved,
                'TXN_ID' => $txn->ID(),
                'TKT_ID' => $tkt->ID(),
            )
        );
        $registration_c->save();

        $expected_ids        = array($registration_a->ID(), $registration_b->ID(), $registration_c->ID());
        $_REQUEST['_REG_ID'] = $expected_ids;
        $this->_load_requirements();
        $success = $this->_admin_page->set_registration_status_from_request(EEM_Registration::status_id_not_approved);
        $this->assertArrayHasKey('success', $success);
        $this->assertTrue($success['success']);
        $this->assertArrayHasKey('REG_ID', $success);
        $this->assertCount(3, $success['REG_ID']);
        $this->assertEquals($expected_ids, $success['REG_ID']);

        //verify registrations got changed to approved (or stayed there).
        $registrations = EEM_Registration::reset()->instance()->get_all(array(array('STS_ID' => EEM_Registration::status_id_not_approved)));
        $this->assertCount(3, $registrations);
        $this->assertEquals($expected_ids, array_keys($registrations));
    }


}
//end Registrations_Admin_Page_Test
// Location: /tests/testcases/admin_pages/registrations/Registrations_Admin_Page_Test.php
