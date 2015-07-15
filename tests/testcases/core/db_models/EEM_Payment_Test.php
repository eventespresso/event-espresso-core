<?php
/**
 * Contains test class for /core/db_models/EEM_Payment.model.php
 *
 * @since  		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEM_Payment class.
 *
 * @since 		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group core/db_models
 */
class EEM_Payment_Test extends EE_UnitTestCase {


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
	 * This sets up some payments in the db for testing with.
	 * @since 4.6.0
	 * @param \DateTime $now
	 * @param \DateTimeZone $timezone
	 */
	public function _setup_payments( DateTime $now = null, DateTimeZone $timezone = null  ) {
		// setup DateTimeZone
		$timezone = $timezone instanceof DateTimeZone ? $timezone : new DateTimeZone( 'America/Toronto' );
		// and base DateTime for now
		$now = $now instanceof DateTime ? $now : date_create_from_format( 'Y-m-d H:i:s', Date( 'Y-m-d' ) . '13:00:00', $timezone );
		//setup some dates we'll use for testing with.
		$two_days_ago = new DateTime( "now -2days", $timezone );
		$one_hour_from_now = new DateTime( "now +1hour", $timezone );
		$two_days_from_now = new DateTime( "now +2days", $timezone );
		$formats = array( 'Y-d-m',  'h:i a' );
		$full_format = implode( ' ', $formats );

		// let's setup the args for our payments in an array, then we can just loop through to grab them and set things up.
		$payment_args = array(
			array( 'PAY_timestamp' => $two_days_ago->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'PAY_timestamp' => $one_hour_from_now->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'PAY_timestamp' => $now->sub( new DateInterval( "PT2H" ) )->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'PAY_timestamp' => $two_days_from_now->format( $full_format) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'PAY_timestamp' => $two_days_ago->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
		);

		foreach( $payment_args as $payment_arg ) {
			$this->factory->payment->create( $payment_arg );
		}

		$this->assertEquals( 5, EEM_Payment::instance()->count() );
	}



	/**
	 * @since 4.6.0
	 */
	public function test_get_payments_between_dates() {
		$timezone = new DateTimeZone( 'America/Toronto' );
		// let's create a DateTime object with a set time so that our tests don't fail when run and different times
		// we'll use the year, month, and day from "now" but set the time to 1pm
		$now = date_create_from_format( 'Y-m-d H:i:s', Date( 'Y-m-d' ) . '13:00:00', $timezone );
		$this->_setup_payments( $now, $timezone );

		//test defaults
		$this->assertEquals( 2, count( EEM_Payment::instance()->get_payments_made_between_dates() ) );

		//test including a date from past date for start date.
		$this->assertEquals( 4, count( EEM_Payment::instance()->get_payments_made_between_dates( $now->sub( new DateInterval( 'P2D' ) )->format( 'd/m/Y'), '', 'd/m/Y', 'America/Toronto' ) ) );

		//test including a date from past date for end date.
		$this->assertEquals( 4, count( EEM_Payment::instance()->get_payments_made_between_dates( '', $now->format( 'd/m/Y'), 'd/m/Y', 'America/Toronto' ) ) );

		//test including a date from upcoming date for start date
		$this->assertEquals( 3, count( EEM_Payment::instance()->get_payments_made_between_dates( $now->add( new DateInterval( 'P4D' ) )->format( 'd/m/Y'), '',  'd/m/Y', 'America/Toronto' ) ) );

		//test including a date from upcoming date for end date
		$this->assertEquals( 3, count( EEM_Payment::instance()->get_payments_made_between_dates( '', $now->format( 'd/m/Y'), 'd/m/Y', 'America/Toronto' ) ) );

		//test exception
		$this->setExpectedException( 'EE_Error' );
		EEM_Payment::instance()->get_payments_made_between_dates( 'trigger_exception' );
	}


} //end class EEM_Payment
