<?php

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');

/**
 *
 * EE_Event_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @group core/db_classes
 */
class EE_Event_Test extends EE_UnitTestCase
{

    public function test_primary_datetime()
    {
        $e = EE_Event::new_instance(array('EVT_name' => 'power1'));
        $e->save();
        $d = EE_Datetime::new_instance(array('EVT_ID' => $e->ID()));
        $d->save();
        $primary_datetime = $e->primary_datetime();
        $this->assertEquals($d, $primary_datetime);
    }



    public function test_datetimes_ordered()
    {
        $e = EE_Event::new_instance(array('EVT_name' => 'power1'));
        $e->save();
        $d_exp = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() - 10,
                'DTT_EVT_end'   => time() - 5,
            )
        );
        $d_exp->save();
        $d_del = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() - 5,
                'DTT_EVT_end'   => time() + 5,
                'DTT_deleted'   => true,
            )
        );
        $d_del->save();
        $d_ok = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() - 1,
                'DTT_EVT_end'   => time() + 5,
            )
        );
        $d_ok->save();
        $ds = $e->datetimes_ordered();
        $this->assertArrayContains($d_exp, $ds);
        //$this->assertArrayDoesNotContain($d_del,$ds); @todo: bug, this assert actually fails because we have deactivated default where params
        $this->assertArrayContains($d_ok, $ds);
        //do it so it hides expired
        $ds = $e->datetimes_ordered(false);
        $this->assertArrayDoesNotContain($d_exp, $ds);
//		$this->assertArrayDoesNotContain($d_del, $ds); @todo: bug, this assert actually fails because we have deactivated
        $this->assertArrayContains($d_ok, $ds);
        //do it so it hides expired but shows deleted
        $ds = $e->datetimes_ordered(false, true);
        $this->assertArrayDoesNotContain($d_exp, $ds);
        $this->assertArrayContains($d_del, $ds);
        $this->assertArrayContains($d_ok, $ds);
        //do it so it shows the deleted one
        $ds = $e->datetimes_ordered(true, true);
        $this->assertArrayContains($d_exp, $ds);
        $this->assertArrayContains($d_del, $ds);
        $this->assertArrayContains($d_ok, $ds);
        //double-check the ordering.
        $first_d = array_shift($ds);
        $this->assertEquals($d_exp, $first_d);
        $second_d = array_shift($ds);
        $this->assertEquals($d_del, $second_d);
        $third_d = array_shift($ds);
        $this->assertEquals($d_ok, $third_d);
    }



    public function test_active_status()
    {
        /** @type EE_Event $e */
        $e = EE_Event::new_instance(array('status' => 'publish'));
        $e->save();
        //echo "\n\n create Ticket";
        $t = EE_Ticket::new_instance(
            array(
                'TKT_start_date' => time() - 100,
                'TKT_end_date'   => time() + 50,
                'TKT_qty'        => 100,
                'TKT_sold'       => 0,
            )
        );
        $t->save();
        $d_now = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() - 100,
                'DTT_EVT_end'   => time() + 50,
            )
        );
        $d_now->_add_relation_to($t, 'Ticket');
        $d_now->save();
        $d_exp = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() - 10,
                'DTT_EVT_end'   => time() - 5,
            )
        );
        $d_exp->_add_relation_to($t, 'Ticket');
        $d_exp->save();
        $d_upcoming = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() + 10,
                'DTT_EVT_end'   => time() + 15,
            )
        );
        $d_upcoming->_add_relation_to($t, 'Ticket');
        $d_upcoming->save();
        // add tickets
        $ticket_1 = $this->new_model_obj_with_dependencies(
            'Ticket', array('TKT_qty' => '10', 'TKT_sold' => '5', 'TKT_reserved' => '0')
        );
        $d_now->_add_relation_to($ticket_1, 'Ticket');
        $ticket_2 = $this->new_model_obj_with_dependencies(
            'Ticket', array('TKT_qty' => '10', 'TKT_sold' => '5', 'TKT_reserved' => '0')
        );
        $d_exp->_add_relation_to($ticket_2, 'Ticket');
        $ticket_3 = $this->new_model_obj_with_dependencies(
            'Ticket', array('TKT_qty' => '10', 'TKT_sold' => '5', 'TKT_reserved' => '0')
        );
        $d_upcoming->_add_relation_to($ticket_3, 'Ticket');
        //test
        $this->assertEquals(EE_Datetime::active, $e->get_active_status(true));
        $e->_remove_relation_to($d_now, 'Datetime');
        $this->assertEquals(EE_Datetime::upcoming, $e->get_active_status(true));
        $e->_remove_relation_to($d_upcoming, 'Datetime');
        $this->assertEquals(EE_Datetime::expired, $e->get_active_status(true));
    }



    public function test_get_number_of_tickets_sold()
    {
        $e = EE_Event::new_instance();
        $e->save();
        $d_now = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() - 100,
                'DTT_EVT_end'   => time() - 50,
                'DTT_sold'      => 5,
            )
        );
        $d_now->save();
        $d_exp = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $e->ID(),
                'DTT_EVT_start' => time() - 10,
                'DTT_EVT_end'   => time() - 5,
                'DTT_sold'      => 15,
            )
        );
        $d_exp->save();
        $this->assertEquals(20, $e->get_number_of_tickets_sold());
        $e->_remove_relation_to($d_now, 'Datetime');
        $this->assertEquals(15, $e->get_number_of_tickets_sold());
    }



    /**
     * @since 4.8.0
     */
    public function test_total_available_spaces()
    {
        $this->loadTestScenarios();
        //grab test scenarios.
        $scenarios = $this->scenarios->get_scenarios_by_type('event');
        foreach ($scenarios as $scenario) {
            $expected = $scenario->get_expected('total_available_spaces');
            if ($expected) {
                /** @type EE_Event $event */
                $event = $scenario->get_scenario_object();
                $calculator = new EventEspresso\core\domain\services\event\EventSpacesCalculator($event);
                    $this->assertEquals(
                        $expected,
                        $event->total_available_spaces(),
                        'Testing ' . $scenario->name . ' for "total_available_spaces"'
                    );
                $this->assertEquals(
                    $expected,
                    $calculator->totalSpacesAvailable(),
                    'Testing ' . $scenario->name . ' for "totalSpacesAvailable"'
                );
            }
        }
    }



    /**
     * @since 4.8.0
     */
    public function test_spaces_remaining_for_sale()
    {
        $this->loadTestScenarios();
        //grab test scenarios
        $scenarios = $this->scenarios->get_scenarios_by_type('event');
        foreach ($scenarios as $scenario) {
            if ($scenario->skip()) {
                continue;
            }
            $expected = $scenario->get_expected('total_remaining_spaces');
            if ($expected !== false) {
                /** @type EE_Event $event */
                $event = $scenario->get_scenario_object();
                $calculator = new EventEspresso\core\domain\services\event\EventSpacesCalculator($event);
                    $this->assertEquals(
                        $expected,
                        $event->spaces_remaining_for_sale(),
                        'Testing ' . $scenario->name . ' for "total_remaining_spaces"'
                    );
                $this->assertEquals(
                    $expected,
                    $calculator->spacesRemaining(),
                    'Testing ' . $scenario->name . ' for "total_remaining_spaces"'
                );
            }
        }
    }



    /**
     * @since 4.8.0
     */
    public function test_spaces_remaining_for_sale_for_Event_Scenario_H()
    {
        $this->loadTestScenarios();
        //grab test scenario
        $scenario = $this->scenarios->get_scenario_by_name('Event Scenario H - Two Classes');
        // verify
        if (
            ! $scenario instanceof EE_Test_Scenario
            || (
                $scenario instanceof EE_Test_Scenario
                && $scenario->name !== 'Event Scenario H - Two Classes'
            )
        ) {
            return;
        }
        /** @type EE_Event $event */
        $event = $scenario->get_scenario_object();
        $calculator = new EventEspresso\core\domain\services\event\EventSpacesCalculator($event);
        $expected = $scenario->get_expected('total_remaining_spaces');
        if ($expected !== false) {
            $this->assertEquals(
                $expected,
                $event->spaces_remaining_for_sale(),
                'Testing ' . $scenario->name
            );
            $this->assertEquals(
                $expected,
                $calculator->spacesRemaining(),
                'Testing ' . $scenario->name . ' for "total_remaining_spaces"'
            );
        }
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after initial 6 ticket sales'
        );
        // now sell 2 more tickets
        $scenario->run_additional_logic(array('qty' => 2));
        $expected = $scenario->get_expected('total_remaining_spaces_4');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling an additional 2 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling an additional 2 tickets'
        );
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after an additional 2 ticket sales'
        );
        // now sell the last 4 tickets
        $scenario->run_additional_logic(array('qty' => 4));
        $expected = $scenario->get_expected('total_remaining_spaces_0');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling the last 4 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling the last 4 tickets'
        );
        $this->assertEquals(
            EE_Datetime::sold_out,
            $event->get_active_status(true),
            $scenario->name . ' active_status after selling the last 4 tickets'
        );
    }



    /**
     * @since 4.8.0
     */
    public function test_spaces_remaining_for_sale_for_Event_Scenario_I()
    {
        $this->loadTestScenarios();
        //grab test scenario
        $scenario = $this->scenarios->get_scenario_by_name('Event Scenario I - Four Tickets One Date');
        // verify
        if (
            ! $scenario instanceof EE_Test_Scenario
            || (
                $scenario instanceof EE_Test_Scenario
                && $scenario->name !== 'Event Scenario I - Four Tickets One Date'
            )
        ) {
            return;
        }
        /** @type EE_Event $event */
        $event = $scenario->get_scenario_object();
        $calculator = new EventEspresso\core\domain\services\event\EventSpacesCalculator($event);
        $expected = $scenario->get_expected('total_remaining_spaces');
        if ($expected !== false) {
            $this->assertEquals(
                $expected,
                $event->spaces_remaining_for_sale(),
                'Testing ' . $scenario->name
            );
            $this->assertEquals(
                $expected,
                $calculator->spacesRemaining(),
                'Testing ' . $scenario->name . ' for "total_remaining_spaces"'
            );
        }
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after initial setup'
        );
        // now sell first batch of tickets
        $scenario->run_additional_logic(array('tkt_id' => 1, 'qty' => 2));
        $scenario->run_additional_logic(array('tkt_id' => 2, 'qty' => 2));
        $expected = $scenario->get_expected('total_remaining_spaces_20');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling first 4 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling first 4 tickets'
        );
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after selling first 4 tickets'
        );
        // now sell second batch of tickets - THIS IS WHEN IT USED TO SELL OUT
        $scenario->run_additional_logic(array('tkt_id' => 1, 'qty' => 2));
        $scenario->run_additional_logic(array('tkt_id' => 3, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 4, 'qty' => 1));
        $expected = $scenario->get_expected('total_remaining_spaces_16');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling 8 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling 8 tickets'
        );
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after selling 8 tickets'
        );
        // now sell third batch of tickets
        $scenario->run_additional_logic(array('tkt_id' => 1, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 2, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 3, 'qty' => 2));
        $expected = $scenario->get_expected('total_remaining_spaces_12');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling 12 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling 12 tickets'
        );
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after selling 12 tickets'
        );
        // and a fourth batch of tickets
        $scenario->run_additional_logic(array('tkt_id' => 1, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 2, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 3, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 4, 'qty' => 1));
        $expected = $scenario->get_expected('total_remaining_spaces_8');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling 16 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling 16 tickets'
        );
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after selling 16 tickets'
        );
        // and a fifth
        $scenario->run_additional_logic(array('tkt_id' => 2, 'qty' => 2));
        $scenario->run_additional_logic(array('tkt_id' => 3, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 4, 'qty' => 1));
        $expected = $scenario->get_expected('total_remaining_spaces_4');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling 20 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling 20 tickets'
        );
        $this->assertEquals(
            EE_Datetime::upcoming,
            $event->get_active_status(true),
            $scenario->name . ' active_status after selling 20 tickets'
        );
        // last batch
        $scenario->run_additional_logic(array('tkt_id' => 3, 'qty' => 1));
        $scenario->run_additional_logic(array('tkt_id' => 4, 'qty' => 3));
        $expected = $scenario->get_expected('total_remaining_spaces_0');
        $this->assertEquals(
            $expected,
            $event->spaces_remaining_for_sale(),
            'Testing ' . $scenario->name . ' after selling all 24 tickets'
        );
        $this->assertEquals(
            $expected,
            $calculator->spacesRemaining(),
            'Testing ' . $scenario->name . ' for "total_remaining_spaces" after selling all 24 tickets'
        );
        $this->assertEquals(
            EE_Datetime::sold_out,
            $event->get_active_status(true),
            $scenario->name . ' active_status after selling all 24 tickets'
        );
    }


    /**
     * @group sold_out_status_check
     * @throws DomainException
     * @throws EE_Error
     * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
     */
    public function test_perform_sold_out_status_check()
    {
        $this->markTestSkipped('Temporarily skipped because of sporadic, unexplained fails. See https://events.codebasehq.com/projects/event-espresso/tickets/11394');
        $event = EE_Event::new_instance(
            array(
                'status' => 'publish'
            )
        );
        $event->save();
        $datetime = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $event->ID(),
                'DTT_EVT_start' => time() + WEEK_IN_SECONDS,
                'DTT_EVT_end'   => time() + WEEK_IN_SECONDS + DAY_IN_SECONDS,
                'DTT_reg_limit' => 4,
                'DTT_sold'      => 2,
            )
        );
        $datetime->save();
        $ticket_A = EE_Ticket::new_instance(
            array(
                'TKT_name' => 'Ticket A',
                'TKT_qty'  => 4,
                'TKT_sold' => 2,
            )
        );
        $ticket_A->save();
        $ticket_A->_add_relation_to($datetime, 'Datetime');
        $this->assertEquals('publish', $event->status());
        $this->assertEquals(EE_Datetime::upcoming, $event->get_active_status());
        $ticket_A->increase_sold(2);
        $this->assertEquals('publish', $event->status());
        $this->assertEquals(EE_Datetime::upcoming, $event->get_active_status(true));
        // now perform sold  out check
        $sold_out = $event->perform_sold_out_status_check();
        $this->assertTrue($sold_out);
        $this->assertEquals(EEM_Event::sold_out, $event->status());
        $this->assertEquals(EE_Datetime::sold_out, $event->get_active_status(true));
    }


    /**
     * @group sold_out_status_check
     * @throws DomainException
     * @throws EE_Error
     * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
     */
    public function test_perform_sold_out_status_check_with_expired_ticket()
    {
        $event = EE_Event::new_instance(
            array(
                'status' => 'publish'
            )
        );
        $event->save();
        $datetime = EE_Datetime::new_instance(
            array(
                'EVT_ID'        => $event->ID(),
                'DTT_EVT_start' => time() + WEEK_IN_SECONDS,
                'DTT_EVT_end'   => time() + WEEK_IN_SECONDS + DAY_IN_SECONDS,
                'DTT_reg_limit' => 4,
                'DTT_sold'      => 2,
            )
        );
        $datetime->save();
        // expired early bird ticket
        $ticket_A = EE_Ticket::new_instance(
            array(
                'TKT_name'       => 'Ticket A',
                'TKT_start_date' => time() - MONTH_IN_SECONDS,
                'TKT_end_date'   => time() - WEEK_IN_SECONDS,
                'TKT_qty'        => 4,
                'TKT_sold'       => 2,
            )
        );
        $ticket_A->save();
        $ticket_A->_add_relation_to($datetime, 'Datetime');
        // regular on sale ticket
        $ticket_B = EE_Ticket::new_instance(
            array(
                'TKT_name'       => 'Ticket B',
                'TKT_start_date' => time() - WEEK_IN_SECONDS,
                'TKT_end_date'   => time() + WEEK_IN_SECONDS,
                'TKT_qty'        => 4,
                'TKT_sold'       => 0,
            )
        );
        $ticket_B->save();
        $ticket_B->_add_relation_to($datetime, 'Datetime');
        $this->assertEquals('publish', $event->status());
        $this->assertEquals(EE_Datetime::upcoming, $event->get_active_status());
        $ticket_B->increase_sold(2);
        $this->assertEquals('publish', $event->status());
        $this->assertEquals(EE_Datetime::upcoming, $event->get_active_status(true));
        // now perform sold  out check
        $sold_out = $event->perform_sold_out_status_check();
        $this->assertTrue($sold_out);
        $this->assertEquals(EEM_Event::sold_out, $event->status());
        $this->assertEquals(EE_Datetime::sold_out, $event->get_active_status(true));
    }
}
// End of file EE_Event_Test.php
// Location: /tests/testcases/core/db_classes/EE_Event_Test.php
