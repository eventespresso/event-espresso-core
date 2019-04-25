<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Datetime_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Datetime_Test extends EE_UnitTestCase{

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
	function test_increase_sold(){
	    $original_sold_count = 5;
	    $original_reserved_count = 10;
		$d = EE_Datetime::new_instance(
		    [
		        'DTT_sold' => $original_sold_count,
                'DTT_reserved' => $original_reserved_count
            ]
        );
		$this->assertEquals($d->get('DTT_sold'), $original_sold_count);
        $this->assertEquals($d->get('DTT_reserved'), $original_reserved_count);
		$d->increaseSold();
		$this->assertEquals($d->get('DTT_sold'), $original_sold_count + 1);
        $this->assertEquals($d->get('DTT_reserved'), $original_reserved_count - 1);
		$d->increaseSold(2, false);
		$this->assertEquals($d->get('DTT_sold'), $original_sold_count + 3);
        $this->assertEquals($d->get('DTT_reserved'), $original_reserved_count - 1);
	}
	function test_decrease_sold(){
		$d = EE_Datetime::new_instance(array('DTT_sold'=>5));
		$d->decreaseSold();
		$this->assertEquals(4,$d->get('DTT_sold'));
		$d->decreaseSold(2);
		$this->assertEquals(2,$d->get('DTT_sold'));
	}
	/**
	 * because at one point EE_Datetime overrode ID() from its parent
	 * (not really for any good reason at the time of writing)
	 */
	function test_id(){
		$d = EE_Datetime::new_instance();
		$id = $d->save();
		$this->assertEquals($id,$d->ID());
	}
	function test_start(){
		$start_time = new DateTime("now");
		$d = EE_Datetime::new_instance(array('DTT_EVT_start'=>$start_time->format('U')));
		$this->assertEquals($start_time->format('U'),$d->start());
	}
	function test_end(){
		$end_time =new DateTime("now");
		$d = EE_Datetime::new_instance(array('DTT_EVT_end'=>$end_time->format('U')));
		$this->assertEquals($end_time->format('U'),$d->end());
	}
	function test_reg_limit(){
		$d = EE_Datetime::new_instance(array('DTT_reg_limit'=>10));
		$this->assertEquals(10,$d->get('DTT_reg_limit'));
	}
	function test_sold(){
		$d = EE_Datetime::new_instance(array('DTT_sold'=>10));
		$this->assertEquals(10,$d->sold());
	}
	function test_sold_out(){
		$d = EE_Datetime::new_instance(array('DTT_reg_limit'=>10));
		$this->assertFalse($d->sold_out());
		$d->set_sold(10);
		$this->assertTrue($d->sold_out());
		$d->set('DTT_reg_limit',EE_INF);
		$this->assertFalse($d->sold_out());
	}
	function test_spaces_remaining(){
		$d = EE_Datetime::new_instance(array('DTT_reg_limit'=>20,'DTT_sold'=>5));
		$this->assertEquals(15,$d->spaces_remaining());
	}
	function test_is_upcoming(){
		$d = EE_Datetime::new_instance(array('DTT_EVT_start'=>time() + 1000 ));
		$this->assertTrue($d->is_upcoming());
		$d->set('DTT_EVT_start',time() - 1000 );
		$this->assertFalse($d->is_upcoming());
	}
	function test_is_active(){
		$d = EE_Datetime::new_instance(array('DTT_EVT_start'=>time() - 1000, 'DTT_EVT_end'=>time() + 1000));
		$this->assertTrue($d->is_active());
		$d->set('DTT_EVT_start',time() + 500);
		$this->assertFalse($d->is_active());
	}
	function test_is_expired(){
		$d = EE_Datetime::new_instance(array('DTT_EVT_end'=>time() - 1000));
		$this->assertTrue($d->is_expired());
		$d->set('DTT_EVT_end',time() + 1000);
		$this->assertFalse($d->is_expired());
	}
	function test_get_dtt_display_name(){
		//test using actual dates because now could result in different results depending on what time of day it is
		$base_date = date_create_from_format( 'Y-m-d H:i:s', '2015-01-01 00:00:00' );
		$testing_date = clone $base_date;

		//setup datetime with different months for start and end dates.
		$testing_date->add( new DateInterval( 'P1M' ) );
		$d = EE_Datetime::new_instance(array('DTT_name'=>'monkey time', 'DTT_EVT_start'=>$base_date->format('U'), 'DTT_EVT_end'=>$testing_date->format('U')));
		$d->set_date_format( 'Y-m-d' );
		$d->set_time_format( 'h:i a' );
		$this->assertEquals( $base_date->format('M j\, Y g:i a') . ' - ' . $testing_date->format('M j\, Y g:i a'),$d->get_dtt_display_name());
		$this->assertEquals('monkey time',$d->get_dtt_display_name(true));

		//setup datetime with start date and end date with same month but different days.
		$testing_date->sub( new DateInterval( 'P15D' ) );
		$d = EE_Datetime::new_instance(array('DTT_name'=>'monkey time', 'DTT_EVT_start'=>$base_date->format('U'), 'DTT_EVT_end'=>$testing_date->format('U')));
		$d->set_date_format( 'Y-m-d' );
		$d->set_time_format( 'h:i a' );
		$this->assertEquals( $base_date->format( 'M j\, g:i a') . ' - ' . $testing_date->format( 'M j\, g:i a Y' ), $d->get_dtt_display_name() );

		//setup datetime with start date and end date the same day but different times.
		$testing_date = clone $base_date;
		$testing_date->add( new DateInterval( 'PT1H' ) );
		$d = EE_Datetime::new_instance(array('DTT_name'=>'monkey time', 'DTT_EVT_start'=>$base_date->format('U'), 'DTT_EVT_end'=>$testing_date->format('U')));
		$d->set_date_format( 'Y-m-d' );
		$d->set_time_format( 'h:i a' );
		$this->assertEquals( $base_date->format( 'F j\, Y' ) . ' @ ' . $base_date->format( 'g:i a') . ' - ' . $testing_date->format( 'g:i a' ), $d->get_dtt_display_name() );
	}




	/**
	 * This tests the ticket_types_available_for_purchase method.
	 * @since 4.6.0
     * @group testDate
	 */
	public function test_ticket_types_available_for_purchase() {
		//setup some dates we'll use for testing with.
		$timezone = new DateTimeZone( 'America/Toronto' );
        $now_for_test = new DateTime( 'now', $timezone );
        // set time explicitly
        $now_for_test->setTime(14, 00);
        $upcoming_start_date = clone $now_for_test;
        $past_start_date = clone $now_for_test;
        $upcoming_end_date = clone $now_for_test;
        $upcoming_start_date->add(new DateInterval('P1D'));
		$past_start_date->sub(new DateInterval('P2D'));
		$upcoming_end_date->add(new DateInterval('P2D'));
		$current = clone $now_for_test;
		$formats = array( 'Y-d-m',  'h:i a' );
		$full_format = implode( ' ', $formats );

		//create some tickets
		$tickets = array(
			'expired_ticket' => array( 'TKT_start_date' => $past_start_date->format($full_format), 'TKT_end_date' => $past_start_date->format($full_format), 'timezone' => 'America/Toronto', 'formats' =>$formats ),
			'upcoming_ticket' => array( 'TKT_start_date' => $past_start_date->format( $full_format ), 'TKT_end_date' => $upcoming_start_date->format( $full_format ), 'timezone' => 'America/Toronto', 'formats' => $formats )
			);

		$datetimes = array(
			'expired_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $past_start_date->format( $full_format ), 'DTT_EVT_end' => $past_start_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'upcoming_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_end_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' => $formats ) ),
			'active_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $current->format( $full_format ), 'DTT_EVT_end' => $upcoming_end_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'sold_out_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_start_date->format( $full_format), 'DTT_reg_limit' => 10, 'DTT_sold' => 10,  'timezone' => 'America/Toronto', 'formats' =>  $formats ) )
			);

		//assign tickets to all datetimes
		foreach ( $datetimes as $datetime ) {
			foreach( $tickets as $ticket_args ) {
				$tkt = $this->factory->ticket->create ( $ticket_args );
				$datetime->_add_relation_to( $tkt, 'Ticket' );
				$datetime->save();
			}
		}

		//okay NOW we have some objects for testing with.

		//test expired_datetime
		$this->assertEmpty( $datetimes['expired_datetime']->ticket_types_available_for_purchase() );

		//test upcoming datetime
		$tickets = $datetimes['upcoming_datetime']->ticket_types_available_for_purchase();
		$this->assertEquals( 1, count( $tickets ) );
		$this->assertInstanceOf( 'EE_Ticket', reset( $tickets ) );

		//test active datetime
		$tickets = $datetimes['active_datetime']->ticket_types_available_for_purchase();
		$this->assertEquals( 1, count( $tickets ) );
		$this->assertInstanceOf( 'EE_Ticket', reset( $tickets ) );

		//test sold out datetime
		$this->assertEmpty( $datetimes['sold_out_datetime']->ticket_types_available_for_purchase() );
	}



	/**
	 * @since 4.6.x
	 */
	public function test_time_range() {
		//setup a datetime for testing
		$start_date = new DateTime( 'now' );
		$end_date = new DateTime( 'now + 3 hours' );
		$datetime = $this->factory->datetime->create(
			array(
				'DTT_EVT_start' => $start_date->format( 'Y-m-d H:i:s' ),
				'DTT_EVT_end' => $end_date->format( 'Y-m-d H:i:s' ),
				'timezone' => 'UTC', 'formats' => array( 'Y-m-d', 'H:i:s' )
			)
		);

		//assert we have a datetime
		$this->assertInstanceOf( 'EE_Datetime', $datetime );

		//verify that the expected time format is generated.
		$this->assertEquals( $start_date->format( 'H:i:s' ) . ' - ' . $end_date->format( 'H:i:s' ), $datetime->time_range() );
	}



	/**
	 * @group 8861
     * @doesNotPerformAssertions
	 */
	public function test_tickets_remaining() {
        $this->loadTestScenarios();
        $scenarios = $this->scenarios->get_scenarios_by_type( 'datetime' );
		foreach ( $scenarios as $scenario ) {
			/* @type EE_Datetime $datetime */
			$datetime = $scenario->get_scenario_object();
			$datetime_id_to_tickets_map = $scenario->get_expected( 'datetime_id_to_tickets_map' );
			if ( isset( $datetime_id_to_tickets_map[ $datetime->ID() ] ) ) {
				$tickets_remaining = $datetime->tickets_remaining();
				//echo "\n tickets_remaining: " . $tickets_remaining;
				$tickets_expected = $datetime_id_to_tickets_map[ $datetime->ID() ];
				//echo "\n tickets_expected: " . $tickets_expected;
				$this->assertEquals( $tickets_expected, $tickets_remaining );
			}
		}
	}


}

// End of file EE_Datetime_Test.php
// Location: tests/testcases/core/db_classes/EE_Datetime_Test.php
