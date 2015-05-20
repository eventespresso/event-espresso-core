<?php
/**
 * Contains test class for /core/db_models/EEM_Registration.model.php
 *
 * @since  		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEM_Registration class.
 *
 * @since 		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group core/db_models
 */
class EEM_Registration_Test extends EE_UnitTestCase {


	public function setUp() {
		//set timezone string.  NOTE, this is purposely a high positive timezone string because it works better for testing expiry times.
		update_option( 'timezone_string', 'Australia/Sydney' );
		parent::setUp();
	}


	public function tearDown() {
		//restore the timezone string to the default
		update_option( 'timezone_string', '' );
		parent::tearDown();
	}



	/**
	 * This sets up some registrations in the db for testing with.
	 * @since 4.6.0
	 */
	public function _setup_registrations() {
		//setup some dates we'll use for testing with.
		$timezone = new DateTimeZone( 'America/Toronto' );
		$future_today_date = new DateTime( "now +2hours", $timezone );
		$past_start_date = new DateTime( "now -2months", $timezone );
		$future_end_date = new DateTime( "now +2months", $timezone );
		$current = new DateTime( "now", $timezone );
		$formats = array( 'Y-d-m',  'h:i a' );
		$full_format = implode( ' ', $formats );

		//let's setup the args for our payments in an array, then we can just loop through to grab
		//them and set things up.
		$registration_args = array(
			array( 'REG_date' => $past_start_date->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'REG_date' => $future_end_date->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'REG_date' => $current->sub( new DateInterval( "PT2H") )->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'REG_date' => $current->add( new DateInterval( "P1M" ) )->format( $full_format) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'REG_date' => $past_start_date->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			);

		//need to create an event to add all these registrations to because of the capability checks
		$events = $this->factory->event->create_many( 4,  array( 'EVT_wp_user' => 0 ) );

		foreach ( $events as $event ) {
			foreach( $registration_args as $registration_arg ) {
				$reg = $this->factory->registration->create( $registration_arg );
				//set registrations to pending so we can test
				$reg->set_status( EEM_Registration::status_id_pending_payment );
				$reg->_add_relation_to( $event, 'Event' );
				$reg->save();
			}
		}

		$this->assertEquals( 20, EEM_Registration::instance()->count() );
	}



	/**
	 * @since 4.6.0
	 */
	public function test_get_registrations_per_day_report() {
		$this->_setup_registrations();

		$regs_per_day = EEM_Registration::instance()->get_registrations_per_day_report();

		//first assert count of results
		$this->assertEquals( 3, count( $regs_per_day ) );

		//next there should be a total = 1 for each result
		foreach ( $regs_per_day as $registration ) {
			$this->assertEquals( 4, $registration->total );
		}
	}




	public function test_get_registrations_per_event_report() {
		$this->_setup_registrations();
		$regs_per_event = EEM_Registration::instance()->get_registrations_per_event_report();

		//first assert total count of results
		$this->assertEquals( 4, count( $regs_per_event ) );

		//next there should be a total = 1 for each result
		foreach ( $regs_per_event as $registration ) {
			$this->assertEquals( 3, $registration->total );
		}
	}


} //end class EEM_Registration
