<?php
/**
 * Contains test class for /core/db_models/EEM_Event.model.php
 *
 * @since  		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEM_Event class.
 *
 * @since 		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group core/db_models
 */
class EEM_Event_Test extends EE_UnitTestCase {


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
	 * This just setsup some events in the db for running certain tests that query getting events back.
	 * @since 4.6.x
	 */
	protected function _setup_events() {
		//setup some dates we'll use for testing with.
		$timezone = new DateTimeZone( 'America/Toronto' );
		$upcoming_start_date = new DateTime( "now +2hours", $timezone );
		$past_start_date = new DateTime( "now -2days", $timezone );
		$current_end_date = new DateTime( "now +2days", $timezone );
		$current = new DateTime( "now", $timezone );
		$formats = array( 'Y-d-m',  'h:i a' );
		$full_format = implode( ' ', $formats );

		//setup some datetimes to attach to events.
		$datetimes = array(
			'expired_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $past_start_date->format( $full_format ), 'DTT_EVT_end' => $past_start_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'upcoming_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_start_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' => $formats ) ),
			'active_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $current->sub( new DateInterval( "PT2H") )->format( $full_format ), 'DTT_EVT_end' => $current_end_date->add( new DateInterval( "PT2H" ) )->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'sold_out_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_start_date->format( $full_format), 'DTT_reg_limit' => 10, 'DTT_sold' => 10,  'timezone' => 'America/Toronto', 'formats' =>  $formats ) )
			);

		//setup some events
		$events = $this->factory->event->create_many( '4' );

		//add datetimes to the events.
		$events[0]->_add_relation_to( $datetimes['expired_datetime'], 'Datetime' );
		$events[0]->save();
		$events[1]->_add_relation_to( $datetimes['upcoming_datetime'], 'Datetime' );
		$events[1]->save();
		$events[2]->_add_relation_to( $datetimes['active_datetime'], 'Datetime' );
		$events[2]->save();
		$events[3]->_add_relation_to( $datetimes['sold_out_datetime'], 'Datetime' );
		$events[3]->save();

		foreach( $events as $event ) {
			$event->set('status', 'publish');
			$event->save();
		}

		//gonna add one more event that is inactive for the inactive test (should be draft by default)
		$this->factory->event->create();
	}



	/**
	 * This tests getting active events.
	 * @since 4.6.x
	 */
	public function test_get_active_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 1, EEM_Event::instance()->get_active_events( array(), true ) );
	}


	public function test_get_upcoming_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 2, EEM_Event::instance()->get_upcoming_events( array(), true ) );
	}


	public function test_get_expired_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 2, EEM_Event::instance()->get_expired_events( array(), true ) );
	}

	public function test_get_inactive_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 2, EEM_Event::instance()->get_inactive_events( array(), true ) );
	}
}
