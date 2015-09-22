<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * Registrations_Admin_Page_Test
 * This class contains all tests for the decaf version of the Registrations Admin Page.
 *
 * @package		Event Espresso
 * @subpackage	tests
 * @author		Darren Ethier
 * @since 4.6
 * @group decaf
 *
 */
class Registrations_Admin_Page_Test extends EE_UnitTestCase {


	/**
	 * This holds the Registrations_Admin_Page_Mock class
	 *
	 * @var Registrations_Admin_Page_Mock
	 */
	protected $_admin_page;




	public function setUp() {
		parent::setUp();
		$this->delayedAdminPageMocks( 'registrations' );
	}


	/**
	 * loader for setting the $_admin_page_property
	 *
	 * @param string $timezone Timezone string to initialize the times in.
	 * @since 4.6
	 */
	protected function _load_requirements( $timezone = 'America/Vancouver' ) {
		$this->_admin_page = new Registrations_Admin_Page_Mock();
	}




	/**
	 * @since 4.6.x
	 *
	 * -- testing today queries
	 * -- testing this month queries
	 * -- testing month range queries.
	 */
	public function test_get_registrations() {
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
		$now = new DateTime( 'now', new DateTimeZone( 'America/Vancouver' ) );
		$prev_month = $this->_get_date_one_month_ago( $now );
		$next_month = $this->_get_date_one_month_from_now( $now );
		//echo "\n\n now : " . $now->format( 'M j, Y g:i a' );
		//echo "\n prev: " . $prev_month->format( 'M j, Y g:i a' );
		//echo "\n next: " . $next_month->format( 'M j, Y g:i a' );
		//let's setup some registrations to test.
		$registrations = $this->factory->registration->create_many( 4 );
		$this->assertEquals( 4, count( $registrations ) );
		//create an event and add to the registrations
		$event = $this->factory->event->create( array( 'EVT_wp_user' => 0 ) );
		if ( $event instanceof EE_Event ) {
			foreach ( $registrations as $registration ) {
				if ( $registration instanceof EE_Registration ) {
					$registration->set( 'STS_ID', EEM_Registration::status_id_pending_payment );
					$registration->save();
					$event->_add_relation_to( $registration, 'Registration' );
					$event->save();
				}
			}
		}
		// let's modify the first registration so it happened one months ago,
		$first_registration = reset( $registrations );
		$first_registration->set( 'REG_date', $prev_month->format('U') );
		$first_registration->save();
		// modify the last registration so it happens next month.
		$last_registration = end( $registrations );
		$last_registration->set( 'REG_date', $next_month-> format( 'U' ) );
		$last_registration->save();
		//foreach ( $registrations as $registration ) {
		//	if ( $registration instanceof EE_Registration ) {
		//		echo "\n registration date: " . $registration->date();
		//	}
		//}
		//let's test queries for today
		$_REQUEST['status'] = 'today';
		$this->assertEquals( 2, count( $this->_admin_page->get_registrations() ) );
		//test queries for this month
		$_REQUEST['status'] = 'month';
		$this->assertEquals( 2, count( $this->_admin_page->get_registrations() ) );
		// test queries for month range using last month
		unset( $_REQUEST['status'] );
		$_REQUEST['month_range'] = $prev_month->format('F Y');
		//echo "\n month_range: " . $_REQUEST[ 'month_range' ];
		$this->assertEquals( 1, count( $this->_admin_page->get_registrations() ) );
	}



	/**
	 * @since 4.8.10.rc.10
	 * @group integration
	 */
	public function test__set_registration_status_from_request_for_single_registration() {
		//first setup a registration
		$testing_registration = $this->factory->registration->create( array( 'STS_ID' => EEM_Registration::status_id_pending_payment ) );
		$_REQUEST['_REG_ID'] = $testing_registration->ID();
		$this->_load_requirements();
		$success = $this->_admin_page->set_registration_status_from_request( EEM_Registration::status_id_not_approved );
		$this->assertArrayHasKey( 'success', $success );
		$this->assertTrue( $success['success'] );
		$this->assertArrayHasKey( 'REG_ID', $success );
		$this->assertArrayContains( $testing_registration->ID(), $success['REG_ID'] );

		//verify registration got changed to not approved.
		$actual_registration = EEM_Registration::reset()->instance()->get_one_by_ID( $testing_registration->ID() );
		$this->assertEquals( EEM_Registration::status_id_not_approved, $actual_registration->status_ID() );
	}


	/**
	 * @since 4.8.10.rc.10
	 * @group integration
	 */
	public function test__set_registration_status_from_request_for_multiple_registrations() {
		//basically the same as the prior test except here we're testing multiple registrations.
		$registration_a = $this->factory->registration->create( array( 'STS_ID' => EEM_Registration::status_id_cancelled ) );
		$registration_b = $this->factory->registration->create( array( 'STS_ID' => EEM_Registration::status_id_pending_payment ) );
		$registration_c = $this->factory->registration->create( array( 'STS_ID' => EEM_Registration::status_id_not_approved ) );

		$expected_ids = array( $registration_a->ID(), $registration_b->ID(), $registration_c->ID() );
		$_REQUEST['_REG_ID'] = $expected_ids;
		$this->_load_requirements();
		$success = $this->_admin_page->set_registration_status_from_request( EEM_Registration::status_id_not_approved );
		$this->assertArrayHasKey( 'success', $success );
		$this->assertTrue( $success['success'] );
		$this->assertArrayHasKey( 'REG_ID', $success );
		$this->assertCount( 3, $success['REG_ID'] );
		$this->assertEquals( $expected_ids, $success['REG_ID'] );

		//verify registrations got chagned to approved (or stayed there).
		$registrations = EEM_Registration::reset()->instance()->get_all( array( array( 'STS_ID' => EEM_Registration::status_id_not_approved ) ) );
		$this->assertEquals( 3, count( $registrations ) );
		$this->assertEquals( $expected_ids, array_keys( $registrations ) );

	}


}
//end Registrations_Admin_Page_Test
// Location: /tests/testcases/admin_pages/registrations/Registrations_Admin_Page_Test.php
