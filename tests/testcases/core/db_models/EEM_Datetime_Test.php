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
		$event = $this->factory->event->create();

		//for test we want something today.
		$start_date = (int) current_time('timestamp');
		$end_date = (int) current_time('timestamp') + (60*60);


		$dtt = $this->factory->datetime->create( array( 'DTT_EVT_start' => $start_date, 'DTT_EVT_end' => $end_date ) );

		//verify
		$this->assertInstanceOf( 'EE_Event', $event );
		$this->assertInstanceOf( 'EE_Datetime', $dtt );

		//attach dtt to event and save
		$event->_add_relation_to( $dtt, 'Datetime' );
		$event->save();

		//now let's run the method we're checking.
		//first NO expiry flag.
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_DTT_order( $event->ID() );

		//we should have the datetime returned
		$dtt_checked = reset( $datetimes_on_event );
		$this->assertInstanceOf( 'EE_Datetime', $dtt_checked );
		$this->assertEquals( $dtt_checked->ID(), $dtt->ID() );

		//now let's run the method excluding expired dtts
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_DTT_order( $event->ID(), false );
		$second_dtt_chk = reset( $datetimes_on_event );

		//we SHOULD also have the datetime returned because the end TIME is one hour from now.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt->ID() );
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

		//let's create two datetimes
		$dtt1start = (int) current_time( 'timestamp' );
		$dtt1end = (int) current_time( 'timestamp' ) + 60*60;

		$dtt2start = $dtt1start + 60*60;
		$dtt2end = $dtt1end + 60*60;

		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1start, 'DTT_EVT_end' => $dtt1end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2start, 'DTT_EVT_end' => $dtt2end ) );

		//verify
		$this->assertInstanceOf( 'EE_Event', $event );
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );

		//add dtts to event
		$event->_add_relation_to( $dtt1, 'Datetime' );
		$event->_add_relation_to( $dtt2, 'Datetime' );
		$event->save();

		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_start_time( $event->ID() );

		//now let's verify that there are two datetimes returned
		$this->assertEquals( 2, count( $datetimes_on_event) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC );
		$first_dtt = reset( $datetimes_on_event );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );

		//k now let's do the same thing as above but this time we DONT' return expired dtts.
		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_start_time( $event->ID(), false );

		//now let's verify that there are two datetimes returned (because the dtts should NOT have expired!)
		$this->assertEquals( 2, count( $datetimes_on_event) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC ) AND the datetimes have NOT expired.;
		$first_dtt = reset( $datetimes_on_event );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );
	}





	/**
	 * Test the get_datetimes_for_ticket_ordered_by_start_time() method
	 * @since 4.5.0
	 */
	public function test_get_datetimes_for_ticket_ordered_by_start_time() {
		//now create a TICKET we'll use.
		$ticket = $this->factory->ticket->create();

		//let's create two datetimes
		$dtt1start = (int) current_time( 'timestamp' );
		$dtt1end = (int) current_time( 'timestamp' ) + 60*60;

		$dtt2start = $dtt1start + 60*60;
		$dtt2end = $dtt1end + 60*60;

		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1start, 'DTT_EVT_end' => $dtt1end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2start, 'DTT_EVT_end' => $dtt2end ) );

		//verify
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );
		$this->assertInstanceOf( 'EE_Ticket', $ticket );

		//add dtts to ticket
		$ticket->_add_relation_to( $dtt1, 'Datetime' );
		$ticket->_add_relation_to( $dtt2, 'Datetime' );
		$ticket->save();


		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_start_time( $ticket->ID() );

		//now let's verify that there are two datetimes returned
		$this->assertEquals( 2, count( $datetimes_on_ticket) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC );
		$first_dtt = reset( $datetimes_on_ticket );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );

		//k now let's do the same thing as above but this time we DONT' return expired dtts.
		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_start_time( $ticket->ID(), false );

		//now let's verify that there are two datetimes returned (because the dtts should NOT have expired!)
		$this->assertEquals( 2, count( $datetimes_on_ticket) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC ) AND the datetimes have NOT expired.;
		$first_dtt = reset( $datetimes_on_ticket );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );
	}




	/**
	 * Test the get_datetimes_for_ticket_ordered_by_DTT_order() method
	 * @since 4.5.0
	 */
	public function test_get_datetimes_for_ticket_ordered_by_DTT_order() {
		//create an event and datetime
		$ticket = $this->factory->ticket->create();

		//for test we want something today.
		$start_date = (int) current_time('timestamp');
		$end_date = (int) current_time('timestamp') + (60*60);


		$dtt = $this->factory->datetime->create( array( 'DTT_EVT_start' => $start_date, 'DTT_EVT_end' => $end_date ) );

		//verify
		$this->assertInstanceOf( 'EE_Ticket', $ticket );
		$this->assertInstanceOf( 'EE_Datetime', $dtt );

		//attach dtt to ticket and save
		$ticket->_add_relation_to( $dtt, 'Datetime' );
		$ticket->save();

		//now let's run the method we're checking.
		//first NO expiry flag.
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_DTT_order( $ticket->ID() );

		//we should have the datetime returned
		$dtt_checked = reset( $datetimes_on_ticket );
		$this->assertInstanceOf( 'EE_Datetime', $dtt_checked );
		$this->assertEquals( $dtt_checked->ID(), $dtt->ID() );

		//now let's run the method excluding expired dtts
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_DTT_order( $ticket->ID(), false );
		$second_dtt_chk = reset( $datetimes_on_ticket );

		//we SHOULD also have the datetime returned because the end TIME is one hour from now.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt->ID() );
	}

}
