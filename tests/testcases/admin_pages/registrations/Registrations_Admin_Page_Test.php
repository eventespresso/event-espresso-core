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


    /**
     * @var string
     */
    protected $original_timezone_string;



    public function setUp()
    {
        parent::setUp();
        $this->original_timezone_string = get_option('timezone_string');
        //set timezone of site to 'America/Vancouver' for tests.
        update_option('timezone_string', 'America/Vancover');
        $this->delayedAdminPageMocks('registrations');
        //need to set a user with registration privileges for default queries in the admin.
        $user = $this->factory->user->create_and_get();
        $user->add_role('administrator');
        wp_set_current_user( $user->ID );
    }


    public function tearDown()
    {
        //restore timezone to original setting
        update_option('timezone_string', $this->original_timezone_string);
        parent::tearDown();
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
     * This is a utility method for this test suite to generate a url to use with the _GOTO method for testing
     * functionality.
     * @param array $extra_query_params
     */
    protected function _get_reg_admin_url( $extra_query_params = array() ) {
        return add_query_arg(
            array_merge(
                array( 'page' => 'espresso_registrations' ),
                $extra_query_params
            ),
            admin_url()
        );
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
        $event = $this->factory->event->create(array('EVT_wp_user' => get_current_user_id()));
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
        $this->go_to(
            $this->_get_reg_admin_url(array('status'=>'today'))
        );
        $this->_load_requirements();
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
        $this->go_to(
            $this->_get_reg_admin_url(array('status'=>'month'))
        );
        $this->_load_requirements();
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
        $this->go_to(
            $this->_get_reg_admin_url(array('month_range' => $prev_month->format('F Y')))
        );
        $this->_load_requirements();
        $this->_admin_page->get_registrations();
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



    public function test_add_event_id_to_where_conditions()
    {
        $this->go_to(
            $this->_get_reg_admin_url(array('event_id' => 42))
        );
        $this->_load_requirements();
        $where = $this->_admin_page->add_event_id_to_where_conditions($this->_admin_page->get_request_data());
        $this->assertCount(1, $where);
        $this->assertArrayHasKey('EVT_ID', $where);
        $this->assertEquals(42, $where['EVT_ID']);
    }



    public function test_add_category_id_to_where_conditions()
    {
        $this->go_to(
            $this->_get_reg_admin_url(array('EVT_CAT' => 42))
        );
        $this->_load_requirements();
        $where = $this->_admin_page->add_category_id_to_where_conditions($this->_admin_page->get_request_data());
        $this->assertCount(1, $where);
        $this->assertArrayHasKey('Event.Term_Taxonomy.term_id', $where);
        $this->assertEquals(42,$where['Event.Term_Taxonomy.term_id']);
    }


    public function test_add_datetime_id_to_where_conditions()
    {
        $this->go_to(
            $this->_get_reg_admin_url(array('datetime_id' => 42))
        );
        $this->_load_requirements();
        $where = $this->_admin_page->add_datetime_id_to_where_conditions($this->_admin_page->get_request_data());
        $this->assertCount(1, $where);
        $this->assertArrayHasKey('Ticket.Datetime.DTT_ID', $where);
        $this->assertEquals(42, $where['Ticket.Datetime.DTT_ID']);
    }

    public function test_add_registration_status_to_where_conditions_no_status_not_trash_view()
    {
        $this->_load_requirements();
        $where = $this->_admin_page->add_registration_status_to_where_conditions($this->_admin_page->get_request_data());
        $this->assertCount(1, $where);
        $this->assertArrayHasKey('STS_ID', $where);
        $this->assertTrue(is_array($where['STS_ID']));
        $this->assertArrayContains('!=', $where['STS_ID']);
        $this->assertArrayContains(EEM_Registration::status_id_incomplete, $where['STS_ID']);
    }



    public function test_add_registration_status_to_where_conditions_no_status_trash_view(){
        $this->_load_requirements();
        $req = $this->_admin_page->get_request_data();
        $req['status'] = 'trash';
        $where = $this->_admin_page->add_registration_status_to_where_conditions($req);
        $this->assertEquals(array( 'REG_deleted' => true ), $where);
    }


    public function test_add_registration_status_to_where_conditions_with_status_and_incomplete_view()
    {
        $this->go_to(
            $this->_get_reg_admin_url(array('_reg_status'=>EEM_Registration::status_id_approved))
        );
        $this->_load_requirements();
        $req = $this->_admin_page->get_request_data();
        $req['status'] = 'incomplete';
        $where = $this->_admin_page->add_registration_status_to_where_conditions($req);
        $this->assertCount(1, $where);
        $this->assertArrayHasKey('STS_ID',$where);
        $this->assertEquals(EEM_Registration::status_id_approved, $where['STS_ID']);
    }


    public function test_add_registration_status_to_where_conditions_no_status_and_incomplete_view()
    {
        $this->_load_requirements();
        $req = $this->_admin_page->get_request_data();
        $req['status'] = 'incomplete';
        $where = $this->_admin_page->add_registration_status_to_where_conditions($req);
        $this->assertCount(1, $where);
        $this->assertArrayHasKey('STS_ID',$where);
        $this->assertEquals(EEM_Registration::status_id_incomplete, $where['STS_ID']);
    }


    public function test_add_registration_status_to_where_conditions_with_status()
    {
        $this->go_to(
            $this->_get_reg_admin_url(array('_reg_status'=>EEM_Registration::status_id_approved))
        );
        $this->_load_requirements();
        $where = $this->_admin_page->add_registration_status_to_where_conditions($this->_admin_page->get_request_data());
        $this->assertCount(1, $where);
        $this->assertArrayHasKey('STS_ID',$where);
        $this->assertEquals(EEM_Registration::status_id_approved,$where['STS_ID']);
    }



    public function test_add_date_to_where_conditions_for_this_month()
    {
        $this->_load_requirements();
        $current_year_and_month = date('Y-m', current_time('timestamp'));
        $days_this_month = date('t', current_time('timestamp'));
        $expected_start_date = date_create_from_format( 'Y-m-d H:i:s', $current_year_and_month . '-01 00:00:00' );
        $expected_end_date = date_create_from_format( 'Y-m-d H:i:s', $current_year_and_month . '-' . $days_this_month . ' 23:59:59' );
        $req = $this->_admin_page->get_request_data();
        $req['status'] = 'month';
        $where = $this->_admin_page->add_date_to_where_conditions($req);
        $this->assertCount(1,$where);
        $this->assertArrayHasKey('REG_date',$where);
        $this->assertCount(2,$where['REG_date']);
        $this->assertContains('BETWEEN',$where['REG_date']);
        $this->assertInstanceOf('Datetime',$where['REG_date'][1][0]);
        $this->assertInstanceOf('Datetime',$where['REG_date'][1][1]);
        $actual_start_date = $where['REG_date'][1][0];
        $actual_end_date = $where['REG_date'][1][1];
        $this->assertEquals($expected_start_date->format('Y-m-d H:i'), $actual_start_date->format('Y-m-d H:i'));
        $this->assertEquals($expected_end_date->format('Y-m-d H:i'), $actual_end_date->format('Y-m-d H:i'));
    }



    public function test_add_search_to_where_conditions()
    {
        $this->go_to(
            $this->_get_reg_admin_url(array('s'=>'gogogo'))
        );
        $this->_load_requirements();
        $where = $this->_admin_page->add_search_to_where_conditions($this->_admin_page->get_request_data());
        $this->assertCount(1,$where);
        $this->assertArrayHasKey('OR*search_conditions',$where);
        $this->assertArrayHasKey('Event.EVT_name',$where['OR*search_conditions']);
        $this->assertTrue(is_array($where['OR*search_conditions']['Event.EVT_name']));
        $this->assertEquals('%gogogo%',$where['OR*search_conditions']['Event.EVT_name'][1]);
    }


    public function test_get_orderby_for_registrations_query_none_specified()
    {
        $this->_load_requirements();
        $orderby = $this->_admin_page->get_orderby_for_registrations_query();
        $this->assertCount(1,$orderby);
        $this->assertArrayHasKey('order_by',$orderby);
        $this->assertTrue(is_array($orderby['order_by']));
        $this->assertArrayHasKey('REG_date',$orderby['order_by']);
        $this->assertEquals('DESC',$orderby['order_by']['REG_date']);
    }



    public function test_get_orderby_for_registrations_query_specified_orderby_and_order()
    {
        $this->go_to(
            $this->_get_reg_admin_url(array('orderby'=>'_Reg_status','order'=>'ASC'))
        );
        $this->_load_requirements();
        $orderby = $this->_admin_page->get_orderby_for_registrations_query();
        $this->assertCount(1,$orderby);
        $this->assertArrayHasKey('order_by',$orderby);
        $this->assertTrue(is_array($orderby['order_by']));
        $this->assertArrayHasKey('STS_ID',$orderby['order_by']);
        $this->assertEquals('ASC',$orderby['order_by']['STS_ID']);
    }
}
//end Registrations_Admin_Page_Test
// Location: /tests/testcases/admin_pages/registrations/Registrations_Admin_Page_Test.php
