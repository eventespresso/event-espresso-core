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
		$this->delayedAdminPageMocks();
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
		$this->_load_requirements();

		//baseline dates
		$now = new DateTime( 'now' );
		$nowEST = new DateTime( 'now', new DateTimeZone( 'America/Toronto' ) );

		//let's setup some registrations to test.
		$registrations = $this->factory->registration->create_many( 4 );

		$this->assertEquals( 4, count( $registrations ) );

		//create an event and add to the registrations
		$event = $this->factory->event->create( array( 'EVT_wp_user' => 0 ) );
		foreach ( $registrations as $registration ) {
			$registration->set( 'STS_ID', EEM_Registration::status_id_pending_payment );
			$registration->save();
			$event->_add_relation_to( $registration, 'Registration' );
			$event->save();
		}

		//let's modify the first registration so it happened two months ago.  Note, the reason why I am doing this
		//instead of one month is because if today's date is March 31st, March 30th, or March 29th.  There is
		//wierd PHP behaviour where subtracting one month will result in a date remaining in March.
		//@see http://php.net/manual/en/datetime.sub.php#example-2469
		$first_registration = reset( $registrations );
		$first_registration->set( 'REG_date', $now->sub( new DateInterval('P31D') )->format('U') );
		$first_registration->save();

		//modify the last registration so it happens next month.
		$last_registration = end( $registrations );
		$last_registration->set( 'REG_date', $now->add( new DateInterval('P62D') )-> format( 'U' ) );
		$last_registration->save();

		//let's test queries for today
		$_REQUEST['status'] = 'today';
		$this->assertEquals(2, count( $this->_admin_page->get_registrations() ) );

		//test queries for this month
		$_REQUEST['status'] = 'month';
		$this->assertEquals(2, count( $this->_admin_page->get_registrations() ) );

		//test queries for month range
		unset( $_REQUEST['status'] );
		$_REQUEST['month_range'] = $now->sub( new DateInterval('P1M') )->format('F') . ' ' . $now->format('Y');
		$this->assertEquals(2, count( $this->_admin_page->get_registrations() ) );
	}


} //end Registrations_Admin_Page_Test
