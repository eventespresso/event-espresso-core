<?php
/**
 * Contains test class for /core/db_models/EEM_Transaction.model.php
 *
 * @since  		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEM_Transaction class.
 *
 * @since 		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group core/db_models
 */
class EEM_Transaction_Test extends EE_UnitTestCase {


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
	 * This sets up some transactions in the db for testing with.
	 * @since 4.6.0
	 */
	public function _setup_transactions() {
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
		$transaction_args = array(
			array( 'TXN_timestamp' => $past_start_date->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'TXN_timestamp' => $future_end_date->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'TXN_timestamp' => $current->sub( new DateInterval( "PT2H") )->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'TXN_timestamp' => $current->add( new DateInterval( "P1M" ) )->format( $full_format) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			array( 'TXN_timestamp' => $past_start_date->format( $full_format ) , 'timezone' => 'America/Toronto', 'formats' => $formats ),
			);


		foreach( $transaction_args as $transaction_arg ) {
			$this->factory->transaction->create( $transaction_arg );
		}

		$this->assertEquals( 5, EEM_Transaction::instance()->count() );
	}



	/**
	 * @since 4.6.0
	 */
	public function test_get_revenue_per_day_report() {
		$this->_setup_transactions();

		$txns_per_day = EEM_Transaction::instance()->get_revenue_per_day_report();

		//first assert count of results
		$this->assertEquals( 3, count( $txns_per_day ) );

		//next there should be a total = 1 for each result
		foreach ( $txns_per_day as $transaction ) {
			$this->assertEquals( 0, $transaction->revenue );
		}
	}


} //end class EEM_Transaction
