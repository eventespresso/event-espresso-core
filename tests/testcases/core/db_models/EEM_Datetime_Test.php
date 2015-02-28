<?php
/**
 * Contains test class for /core/db_models/EEM_Datetime.model.php
 *
 * @since  		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEM_Datetime class.
 *
 * @since 		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EEM_Datetime_Test extends EE_UnitTestCase {

	public function setUp() {
		//set timezone string.  NOTE, this is purposely a high positive timezone string because it works better for testing expiry times.
		update_option( 'timezone_string', 'Australia/Sydney' );
		parent::setUp();
	}


	public function tearDown(){
		//restore the timezone string to the default
		update_option( 'timezone_string', '' );
		parent::tearDown();
	}




	/**
	 * Tests the get_datetimes_for_event_ordered_by_DTT_order method.
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/6744 for bug being tested below.
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/6909 for bug related to non expired
	 *      	  events being considered expired.
	 * @since 4.5.0
	 * @group 6744
	 * @group 6909
	 */
	public function test_get_datetimes_for_event_ordered_by_DTT_order__different_timezone() {

		//create an event and datetime
		$event = $this->factory->event->create( array( 'EVT_timezone_string' =>  'Australia/Sydney' ) );

		//for test we want a datetime begining one hour before now and ending now (-1min), and a datetime starting now and ending one hour from now.
		$dtt1_start = (int) current_time('timestamp') - 60*60*24;
		$dtt1_end = (int) current_time('timestamp') - 60*60;
		$dtt2_start = $dtt1_start + 60*60;
		$dtt2_end = $dtt1_end + 60*60*24;


		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1_start, 'DTT_EVT_end' => $dtt1_end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2_start, 'DTT_EVT_end' => $dtt2_end ) );

		//verify
		$this->assertInstanceOf( 'EE_Event', $event );
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );

		//attach dtt to event and save
		$event->_add_relation_to( $dtt1, 'Datetime' );
		$event->_add_relation_to( $dtt2, 'Datetime' );
		$event->save();

		//now let's run the method we're checking.
		//first NO expiry flag.
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_DTT_order( $event->ID() );

		//we should have all the datetimes returned
		$dtt_checked = reset( $datetimes_on_event );

		$this->assertEquals( 2, count( $datetimes_on_event ) );
		$this->assertInstanceOf( 'EE_Datetime', $dtt_checked );
		$this->assertEquals( $dtt_checked->ID(), $dtt1->ID() );

		//now let's run the method excluding expired dtts
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_DTT_order( $event->ID(), false );
		$second_dtt_chk = reset( $datetimes_on_event );

		//only one datetime should be returned
		$this->assertEquals( 1, count( $datetimes_on_event ) );

		//we should have the SECOND datetime returned because its the non-expired one.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt2->ID() );
	}




	/**
	 * Test for get_datetimes_for_event_ordered_by_start_time method
	 *
	 * @since 4.5.0
	 *
	 */
	public function test_get_datetimes_for_event_ordered_by_start_time() {
		//create an event we'll use
		$event = $this->factory->event->create();

		//let's create three datetimes ( one that started one hour ago and ended now(-1min), one that starts now and ends one hour from now, and one that starts one hour from now and ends two hours from now)
		$dtt1start = (int) current_time( 'timestamp' ) - 60*60;
		$dtt1end = (int) current_time( 'timestamp' ) - 60;

		$dtt2start = $dtt1start + 60*60;
		$dtt2end = $dtt1end + 60*60;
		$dtt3start = $dtt2start + 60*60;
		$dtt3end = $dtt2end + 60*60;

		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1start, 'DTT_EVT_end' => $dtt1end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2start, 'DTT_EVT_end' => $dtt2end ) );
		$dtt3 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt3start, 'DTT_EVT_end' => $dtt3end ) );

		//verify
		$this->assertInstanceOf( 'EE_Event', $event );
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt3 );

		//add dtts to event
		$event->_add_relation_to( $dtt1, 'Datetime' );
		$event->_add_relation_to( $dtt2, 'Datetime' );
		$event->_add_relation_to( $dtt3, 'Datetime' );
		$event->save();

		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_start_time( $event->ID() );

		//now let's verify that there are two datetimes returned
		$this->assertEquals( 3, count( $datetimes_on_event) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC );
		$first_dtt = reset( $datetimes_on_event );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );

		//k now let's do the same thing as above but this time we DONT' return expired dtts.
		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_start_time( $event->ID(), false );

		//now let's verify that there are two datetimes returned (because the dtts should NOT have expired!)
		$this->assertEquals( 2, count( $datetimes_on_event) );

		//verify the first datetime = dtt2 (because orderby is supposed to be DTT_EVT_start => ASC ) AND the datetimes have NOT expired.;
		$first_dtt = reset( $datetimes_on_event );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt2->ID() );
	}





	/**
	 * Test the get_datetimes_for_ticket_ordered_by_start_time() method
	 * @since 4.5.0
	 */
	public function test_get_datetimes_for_ticket_ordered_by_start_time() {
		//now create a TICKET we'll use.
		$ticket = $this->factory->ticket->create();

		//let's create three datetimes ( one that started one hour ago and ended now (-1min), one that starts now and ends one hour from now, and one that starts one hour from now and ends two hours from now)
		$dtt1start = (int) current_time( 'timestamp' ) - 60*60;
		$dtt1end = (int) current_time( 'timestamp' ) - 60;

		$dtt2start = $dtt1start + 60*60;
		$dtt2end = $dtt1end + 60*60;
		$dtt3start = $dtt2start + 60*60;
		$dtt3end = $dtt2end + 60*60;

		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1start, 'DTT_EVT_end' => $dtt1end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2start, 'DTT_EVT_end' => $dtt2end ) );
		$dtt3 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt3start, 'DTT_EVT_end' => $dtt3end ) );

		//verify
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt3 );
		$this->assertInstanceOf( 'EE_Ticket', $ticket );

		//add dtts to ticket
		$ticket->_add_relation_to( $dtt1, 'Datetime' );
		$ticket->_add_relation_to( $dtt2, 'Datetime' );
		$ticket->_add_relation_to( $dtt3, 'Datetime' );
		$ticket->save();


		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_start_time( $ticket->ID() );

		//now let's verify that there are three datetimes returned
		$this->assertEquals( 3, count( $datetimes_on_ticket) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC );
		$first_dtt = reset( $datetimes_on_ticket );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );

		//k now let's do the same thing as above but this time we DONT' return expired dtts.
		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_start_time( $ticket->ID(), false );

		//now let's verify that there are two datetimes returned (because only 2 of the dtts should NOT have expired!)
		$this->assertEquals( 2, count( $datetimes_on_ticket) );

		//verify the first datetime = dtt2 (because orderby is supposed to be DTT_EVT_start => ASC ) AND the second datetime is the first one that has NOT expired.;
		$first_dtt = reset( $datetimes_on_ticket );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt2->ID() );
	}




	/**
	 * Test the get_datetimes_for_ticket_ordered_by_DTT_order() method
	 * @since 4.5.0
	 */
	public function test_get_datetimes_for_ticket_ordered_by_DTT_order() {
		//create an event and datetime
		$ticket = $this->factory->ticket->create();

		//for test we want a datetime begining one hour before now and ending now (-1min), and a datetime starting now and ending one hour from now.
		$dtt1_start = (int) current_time('timestamp') - 60*60;
		$dtt1_end = (int) current_time('timestamp') - 60;
		$dtt2_start = $dtt1_start + 60*60;
		$dtt2_end = $dtt1_end + 60*60;


		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1_start, 'DTT_EVT_end' => $dtt1_end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2_start, 'DTT_EVT_end' => $dtt2_end ) );

		//verify
		$this->assertInstanceOf( 'EE_Ticket', $ticket );
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );

		//attach dtt to ticket and save
		$ticket->_add_relation_to( $dtt1, 'Datetime' );
		$ticket->_add_relation_to( $dtt2, 'Datetime' );
		$ticket->save();

		//now let's run the method we're checking.
		//first NO expiry flag.
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_DTT_order( $ticket->ID() );

		//we should have the datetime returned
		$dtt_checked = reset( $datetimes_on_ticket );

		//check count, it should be two datetimes because expiry ignored.
		$this->assertEquals( 2, count( $datetimes_on_ticket ) );

		//shoudl be first datetime because expiry ignored.
		$this->assertInstanceOf( 'EE_Datetime', $dtt_checked );
		$this->assertEquals( $dtt_checked->ID(), $dtt1->ID() );

		//now let's run the method excluding expired dtts
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_DTT_order( $ticket->ID(), false );
		$second_dtt_chk = reset( $datetimes_on_ticket );

		//count should be one because expiry considered.
		$this->assertEquals( 1, count( $datetimes_on_ticket ) );

		//first datetime returned should be dtt2 because dtt1 is expired.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt2->ID() );
	}




	/**
	 * @since 4.6.x
	 */
	public function test_create_new_blank_datetime() {
		//if timezone is empty string then the setUp didn't work correctly.  For the purpose of this test
		//we want a high positive timezone, so let's force that if necessary
		if ( get_option( 'timezone_string' ) != 'Australia/Sydney' ) {
			update_option( 'timezone_string', 'Australia/Sydney' );
			EEM_Datetime::reset();
			EEM_Datetime::instance();
		}

		EE_Registry::instance()->load_helper('DTT_Helper');
		//make sure now is in the timezone we want to test with.
		$now =  new Datetime( "now +30 days", new DateTimeZone( EEH_DTT_Helper::get_timezone() ) );
		$now->setTime( '8', '0', '0' );
		$now->setTimeZone( new DateTimeZone( 'America/Toronto' ) );

		//get the default datetime
		$default_date = EEM_Datetime::instance()->create_new_blank_datetime();
		$default_date = reset( $default_date );

		//assert instance
		$this->assertInstanceOf( 'EE_Datetime', $default_date );

		//set its timezone to match our expected timezone
		$default_date->set_timezone( 'America/Toronto' );
		$actual = $default_date->get_raw_date( 'DTT_EVT_start');

		$this->assertInstanceOf( 'DateTime', $actual );

		//assert that we have the correct values on the date... we'll do each part separately to verify.
		$this->assertEquals( $now->format('Y'), $actual->format('Y' ) );
		$this->assertEquals( $now->format('m'), $actual->format( 'm' ) );
		$this->assertEquals( $now->format('d'), $actual->format( 'd' ) );
		$this->assertEquals( $now->format('H'), $actual->format( 'H' ) );
		$this->assertEquals( $now->format('i'), $actual->format('i' ) );
	}

}
