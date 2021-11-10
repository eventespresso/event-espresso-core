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
     * @since 4.9.80.p
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
	 */
	public function test_tickets_remaining() {
        $has_tickets_remaining = false;
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
                $this->assertEquals($tickets_expected, $tickets_remaining);
                $has_tickets_remaining = $tickets_remaining > 0;
			}
		}
        $this->assertFalse($has_tickets_remaining);
	}


    /**
     * dates initially each have one related ticket
     * ticket sold counts are twice their ordinal position
     *  ie:
     *      ticket 1 has 2 sold (1 x 2 = 2)
     *      ticket 3 has 6 sold (3 x 2 = 6)
     *
     * reserved counts are equal to their ordinal position
     * why? dunno... thought it might make it easy to calculate things dynamically
     *
     * @var   array
     * @since $VID:$
     */
    private $sold_reserved_counts_data = [
        'datetimes' => [
            'D1' => [
                'sold'      => 2,
                'reserved'  => 1,
                'relations' => ['T1'],
            ],
            'D2' => [
                'sold'      => 4,
                'reserved'  => 2,
                'relations' => ['T2'],
            ],
        ],
        'tickets'   => [
            'T1' => [
                'sold'     => 2,
                'reserved' => 1,
            ],
            'T2' => [
                'sold'     => 4,
                'reserved' => 2,
            ],
            'T3' => [
                'sold'     => 6,
                'reserved' => 3,
            ],
            'T4' => [
                'sold'     => 8,
                'reserved' => 4,
            ],
        ],
    ];


    /**
     * @return EE_Datetime[]
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function initializeDatetimes(): array
    {
        $datetimes = [];
        foreach ($this->sold_reserved_counts_data['datetimes'] as $datetime_name => $datetime_data) {
            /** @var EE_Datetime $datetime */
            $datetime = $this->new_model_obj_with_dependencies('Datetime');
            $datetime->save();
            // remove any tickets that got added automatically
            $unwanted_tickets = $datetime->tickets();
            foreach ($unwanted_tickets as $unwanted_ticket) {
                $unwanted_ticket->delete_permanently();
            }
            $datetime->set_name($datetime_name);
            $datetime->_remove_relations('Ticket');
            // reset sold and reserved counts
            $datetime->set('DTT_sold', 0);
            $datetime->set('DTT_reserved', 0);
            $datetime->save();
            $this->assertEquals(0, $datetime->sold());
            $this->assertEquals(0, $datetime->reserved());
            $datetimes[ $datetime_name ] = $datetime;
        }
        return $datetimes;
    }


    /**
     * @return EE_Ticket[]
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function initializeTickets(): array
    {
        $tickets = [];
        foreach ($this->sold_reserved_counts_data['tickets'] as $ticket_name => $ticket_data) {
            /** @var EE_Ticket $ticket */
            $ticket = $this->new_model_obj_with_dependencies('Ticket');
            $ticket->save();
            // remove any dates that got added automatically
            $unwanted_datetimes = $ticket->datetimes();
            foreach ($unwanted_datetimes as $unwanted_datetime) {
                $unwanted_datetime->delete_permanently();
            }
            $ticket->set_name($ticket_name);
            $ticket->_remove_relations('Datetime');
            // reset sold and reserved counts
            $ticket->set('TKT_sold', 0);
            $ticket->set('TKT_reserved', 0);
            $ticket->save();
            $this->assertEquals(0, $ticket->sold());
            $this->assertEquals(0, $ticket->reserved());
            // BUT NOW... we need to set the sold and reserved quantities we want to use for the tests
            $ticket->set('TKT_sold', $ticket_data['sold']);
            $ticket->set('TKT_reserved', $ticket_data['reserved']);
            $ticket->save();
            $this->assertEquals($ticket_data['sold'], $ticket->sold());
            $this->assertEquals($ticket_data['reserved'], $ticket->reserved());
            $tickets[ $ticket_name ] = $ticket;
        }
        return $tickets;
    }


    /**
     * @param EE_Datetime[] $datetimes
     * @param EE_Ticket[]   $tickets
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function setupSoldReservedCounts(array $datetimes, array $tickets)
    {
        foreach ($datetimes as $datetime_name => $datetime) {
            $datetime_sold      = $this->sold_reserved_counts_data['datetimes'][ $datetime_name ]['sold'] ?? null;
            $datetime_reserved  = $this->sold_reserved_counts_data['datetimes'][ $datetime_name ]['reserved'] ?? null;
            $datetime_relations = $this->sold_reserved_counts_data['datetimes'][ $datetime_name ]['relations'] ?? [];
            foreach ($datetime_relations as $ticket_to_add) {
                $datetime_ticket = $tickets[ $ticket_to_add ] ?? null;
                if ($datetime_ticket instanceof EE_Ticket) {
                    $datetime->_add_relation_to($datetime_ticket, 'Ticket');
                }
            }
            $this->assertEquals($datetime_sold, $datetime->sold());
            $this->assertEquals($datetime_reserved, $datetime->reserved());
        }
    }


    /**
     * @return array[]
     * @since   $VID:$
     */
    public function soldReservedCountsDataProvider(): array
    {
        return [
            [
                'test_name'        => 'Add T3 to D1',
                'add_relations'    => [
                    'D1' => ['T3'],
                ],
                'remove_relations' => [],
                'expected_results' => [
                    'D1' => [
                        'sold'     => 8,
                        'reserved' => 4,
                    ],
                ],
            ],
            [
                'test_name'        => 'Add T3 & T4 to D1',
                'add_relations'    => [
                    'D1' => ['T3', 'T4'],
                ],
                'remove_relations' => [],
                'expected_results' => [
                    // need trick... because of how I set up the initial test data,
                    // you can add up the ordinal values of the related tickets (T1=1, T2=2, etc)
                    // to quickly determine the expected sold and reserved counts
                    // ex: D1 should now have tickets 1, 3 & 4 added to it
                    // so 1 + 3 + 4 = 8
                    // therefore the reserved count = 8 and the sold count is twice that
                    'D1' => [
                        'sold'     => 16,
                        'reserved' => 8,
                    ],
                ],
            ],
            [
                'test_name'        => 'Add T3 & T4 to D1 & remove T1',
                'add_relations'    => [
                    'D1' => ['T3', 'T4'],
                ],
                'remove_relations' => [
                    'D1' => ['T1'],
                ],
                'expected_results' => [
                    // T3 + T4 = 3 + 4 = 7 = 14 sold & 7 reserved (T1 was removed)
                    'D1' => [
                        'sold'     => 14,
                        'reserved' => 7,
                    ],
                ],
            ],
            [
                'test_name'        => 'Add T3 to D1 & D2',
                'add_relations'    => [
                    'D1' => ['T3'],
                    'D2' => ['T3'],
                ],
                'remove_relations' => [],
                'expected_results' => [
                    // T1 + T3 = 1 + 3 = 4 = 8 sold & 4 reserved
                    'D1' => [
                        'sold'     => 8,
                        'reserved' => 4,
                    ],
                    // T2 + T3 = 2 + 3 = 5 = 10 sold & 5 reserved
                    'D2' => [
                        'sold'     => 10,
                        'reserved' => 5,
                    ],
                ],
            ],
            [
                'test_name'        => 'Add T3 & T4 to D1 & D2',
                'add_relations'    => [
                    'D1' => ['T3', 'T4'],
                    'D2' => ['T3', 'T4'],
                ],
                'remove_relations' => [],
                'expected_results' => [
                    // T1 + T3 + T4 = 1 + 3 + 4 = 8 = 16 sold & 8 reserved
                    'D1' => [
                        'sold'     => 16,
                        'reserved' => 8,
                    ],
                    // T2 + T3 + T4 = 2 + 3 + 4 = 9 = 18 sold & 9 reserved
                    'D2' => [
                        'sold'     => 18,
                        'reserved' => 9,
                    ],
                ],
            ],
            [
                'test_name'        => 'Add ALL tickets to ALL datetimes',
                'add_relations'    => [
                    'D1' => [ 'T2', 'T3', 'T4'],
                    'D2' => ['T1', 'T3', 'T4'],
                ],
                'remove_relations' => [],
                'expected_results' => [
                    // T1 + T2 + T3 + T4 = 1 + 2 + 3 + 4 = 10 = 20 sold & 10 reserved
                    'D1' => [
                        'sold'     => 20,
                        'reserved' => 10,
                    ],
                    // T1 + T2 + T3 + T4 = 1 + 2 + 3 + 4 = 10 = 20 sold & 10 reserved
                    'D2' => [
                        'sold'     => 20,
                        'reserved' => 10,
                    ],
                ],
            ],
        ];
    }


    /**
     * @dataProvider soldReservedCountsDataProvider
     * @group        soldReservedCounts
     * @since        $VID:$
     */
    public function testSoldReservedCountsAfterTicketRelationsChange(
        string $test_name,
        array  $add_relations,
        array  $remove_relations,
        array  $expected_results
    ) {
        $datetimes = $this->initializeDatetimes();
        $tickets   = $this->initializeTickets();
        $this->setupSoldReservedCounts($datetimes, $tickets);
        // new relations to add
        foreach ($add_relations as $datetime_name => $tickets_to_add) {
            $datetime = $datetimes[ $datetime_name ] ?? null;
            $this->assertInstanceOf('EE_Datetime', $datetime);
            foreach ($tickets_to_add as $ticket_to_add) {
                $ticket = $tickets[ $ticket_to_add ] ?? null;
                $this->assertInstanceOf('EE_Ticket', $ticket);
                $datetime->_add_relation_to($ticket, 'Ticket');
            }
        }
        // relations to remove
        foreach ($remove_relations as $datetime_name => $tickets_to_remove) {
            $datetime = $datetimes[ $datetime_name ] ?? null;
            $this->assertInstanceOf('EE_Datetime', $datetime);
            foreach ($tickets_to_remove as $ticket_to_remove) {
                $ticket = $tickets[ $ticket_to_remove ] ?? null;
                $this->assertInstanceOf('EE_Ticket', $ticket);
                $datetime->_remove_relation_to($ticket, 'Ticket');
            }
        }
        // check the results
        foreach ($expected_results as $datetime_name => $expected_result) {
            $datetime = $datetimes[ $datetime_name ] ?? null;
            $this->assertInstanceOf('EE_Datetime', $datetime);
            $this->assertEquals(
                $expected_result['sold'],
                $datetime->sold(),
                "expected datetime sold results for the '{$test_name}' test were {$datetime->sold()} not {$expected_result['sold']}"
            );
            $this->assertEquals(
                $expected_result['reserved'],
                $datetime->reserved(),
                "expected datetime reserved results for the '{$test_name}' test were {$datetime->reserved()} not {$expected_result['reserved']}"
            );
        }
    }
}

// End of file EE_Datetime_Test.php
// Location: tests/testcases/core/db_classes/EE_Datetime_Test.php
