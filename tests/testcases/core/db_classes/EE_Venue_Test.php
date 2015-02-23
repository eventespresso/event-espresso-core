<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Venue_Test
 *
 * @package		Event Espresso
 * @subpackage  	tests
 * @author		Darren Ethier
 * @since 4.6
 */
/**
 * @group core/db_classes
 */
class EE_Venue_Test extends EE_UnitTestCase{




	/**
	 * Test the events() method
	 * @since 4.6
	 */
	public function test_events() {
		//setup some dates we'll use for testing with.
		$timezone = new DateTimeZone( 'America/Toronto' );
		$upcoming_start_date = new DateTime( "now +2days", $timezone );
		$past_start_date = new DateTime( "now -2days", $timezone );
		$current_end_date = new DateTime( "now +2hours", $timezone );
		$current = new DateTime( "now", $timezone );
		$formats = array( 'Y-m-d',  'H:i:s' );
		$full_format = implode( ' ', $formats );

		//setup some datetimes for event testing.
		$datetimes = array(
			'expired_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $past_start_date->format( $full_format ), 'DTT_EVT_end' => $past_start_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'upcoming_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_start_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' => $formats ) ),
			'active_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $current->format( $full_format ), 'DTT_EVT_end' => $current_end_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'sold_out_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_start_date->format( $full_format), 'DTT_reg_limit' => 10, 'DTT_sold' => 10,  'timezone' => 'America/Toronto', 'formats' =>  $formats ) )
			);


		$venues = array();
		//assign events to the datetimes and then the events to a venue.
		foreach ( $datetimes as $type => $datetime ) {
			$event = $this->factory->event->create();
			$event->set_timezone( 'America/Toronto' );
			$event->set('status', 'publish');
			$event->_add_relation_to( $datetime, 'Datetime' );
			$event->save();
			$venues[$type] = $this->factory->venue->create();
			$venues[$type]->_add_relation_to($event, 'Event');
			$venues[$type]->save();
		}

		//test expired event upcoming false, and upcoming true
		$vnus = $venues['expired_datetime']->events();
		$this->assertEquals( 1, count($vnus) );
		$this->assertInstanceOf( 'EE_Event', reset($vnus) );
		$this->assertEmpty( $venues['expired_datetime']->events(array(), true ) );

		//test upcoming event with upcoming true, and upcoming false.
		$vnus = $venues['upcoming_datetime']->events();
		$this->assertEquals( 1, count($vnus) );
		$this->assertInstanceOf( 'EE_Event', reset($vnus) );
		$vnus = $venues['upcoming_datetime']->events(array(), true);
		$this->assertEquals( 1, count( $vnus ) );
		$this->assertInstanceOf( 'EE_Event', reset($vnus) );

		//test active_event with upcoming variations
		$vnus = $venues['active_datetime']->events();
		$this->assertEquals( 1, count($vnus) );
		$this->assertInstanceOf( 'EE_Event', reset($vnus) );
		$this->assertEmpty( $venues['active_datetime']->events( array(), true ) );
	}



}// end class EE_Venue_Test
