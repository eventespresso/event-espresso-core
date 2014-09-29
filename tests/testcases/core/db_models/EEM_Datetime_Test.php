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


	public function tearDown(){
		//restore the timezone string to the default
		update_option( 'timezone_string', '' );
		return parent::tearDown();
	}

	/**
	 * Tests the get_datetimes_for_event_ordered_by_DTT_order method.
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/6744 for bug being tested below.
	 * @since 4.5.0
	 * @group 6744
	 */
	public function test_get_datetimes_for_event_ordered_by_DTT_order__different_timezone() {
		echo "\r\n\r\ntest_get_datetimes_for_event_ordered_by_DTT_order__different_timezone";
		//make sure WordPress Timezone is set
		update_option( 'timezone_string', 'America/Vancouver' );


		//create an event and datetime
		$event = $this->factory->event->create();

		//for test we want something today.
		$start_date = (int) current_time('timestamp');
		$end_date = (int) current_time('timestamp') + (60*60*2);
		$dtt = $dtt = $this->factory->datetime->create( array( 'DTT_EVT_start' => $start_date, 'DTT_EVT_end' => $end_date ) );
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
		//we SHOULD also have the datetime returned because the end TIME is two hours from now.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt->ID() );
	}

	/**
	 * Tests the get_datetimes_for_event_ordered_by_DTT_order method.
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/6744 for bug being tested below.
	 * @since 4.5.0
	 * @group 6744
	 */
	public function test_get_datetimes_for_event_ordered_by_DTT_order__default_timezone() {
echo "\r\n\r\ntest_get_datetimes_for_event_ordered_by_DTT_order__default_timezone";
		//make sure WordPress Timezone is set
//		update_option( 'timezone_string', 'America/Toronto' );
		$this->assertEquals( '', get_option( 'timezone_string' ) );

		//create an event and datetime
		$event = $this->factory->event->create();

		//for test we want something today.
		$start_date = (int) current_time('timestamp');
		$end_date = (int) current_time('timestamp') + (60*60*2);
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
		//we SHOULD also have the datetime returned because the end TIME is two hours from now.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt->ID() );
	}


}
