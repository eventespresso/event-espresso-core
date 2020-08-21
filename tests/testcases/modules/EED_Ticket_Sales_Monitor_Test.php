<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EED_Ticket_Sales_Monitor_Test
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 */

class EED_Ticket_Sales_Monitor_Test extends EE_UnitTestCase
{

    public function setUp()
    {
        parent::setUp();
        require_once(EE_TESTS_DIR . 'mocks/modules/EED_Ticket_Sales_Monitor_Mock.php');
    }


    /**
     * creates line items that would be generated when a cart is created and tickets are added
     *
     * @param int  $ticket_count
     * @param bool $expired
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws \PHPUnit\Framework\Exception
     */
    protected function setup_cart_and_get_ticket_line_item($ticket_count = 1, $expired = false)
    {
        $total_line_item = EEH_Line_Item::create_total_line_item();
        $total_line_item->set('TXN_ID', 0);
        $this->assertEquals(0, $total_line_item->total());
        $ticket = $this->new_ticket();
        $ticket_line_item = EEH_Line_Item::add_ticket_purchase($total_line_item, $ticket, $ticket_count);
        $this->assertInstanceOf('EE_Line_Item', $ticket_line_item);
        $this->assertEquals($ticket_count, $ticket_line_item->quantity());
        $timestamp = time();
        if ($expired) {
            $timestamp -= DAY_IN_SECONDS;
            $this->fake_expired_cart($total_line_item, $timestamp);
        }
        $saved = $total_line_item->save_this_and_descendants_to_txn();
        // total, pretax, tax total, tax, event, ticket, price
        $this->assertEquals(7, $saved);
        $this->assertDateWithinOneMinute(
            date('Y-m-d h:i a', $timestamp),
            date('Y-m-d h:i a', $total_line_item->timestamp(true)),
            'Y-m-d h:i a'
        );
        return $ticket_line_item;
    }


    /**
     * sets timestamp for line item and descendants to past date
     *
     * @param EE_Line_Item $line_item
     * @param int          $timestamp
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function fake_expired_cart(EE_Line_Item $line_item, $timestamp = 0)
    {
        $line_item->set('LIN_timestamp', $timestamp);
        $children = $line_item->children();
        foreach ($children as $child_line_item) {
            if ($child_line_item instanceof EE_Line_Item) {
                $this->fake_expired_cart($child_line_item, $timestamp);
            }
        }
    }


    /**
     * @param int $ticket_count
     * @param int $line_item_count
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws \PHPUnit\Framework\Exception
     */
    protected function confirm_ticket_line_item_counts($ticket_count = 1, $line_item_count = 1)
    {
        $ticket_line_items = EEM_Line_Item::instance()->get_all(array(array('OBJ_type' => 'Ticket')));
        $this->assertCount(
            $line_item_count,
            $ticket_line_items,
            sprintf(
                'Line item count was %1$d when it should have been %2$d',
                count($ticket_line_items),
                $line_item_count
            )
        );
        $qty = 0;
        foreach ($ticket_line_items as $ticket_line_item) {
            /** @var EE_Line_Item $ticket_line_item */
            $this->assertInstanceOf('EE_Line_Item', $ticket_line_item);
            $qty += $ticket_line_item->quantity();
        }
        $this->assertEquals(
            $ticket_count,
            $qty,
            sprintf(
                'Ticket count was %1$d when it should have been %2$d',
                $qty,
                $ticket_count
            )
        );
    }


    /**
     * generates all objects for each test and verifies all initial counts are correct
     *
     * @param array $cart_details
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws \PHPUnit\Framework\Exception
     */
    protected function setup_and_validate_tickets_for_carts(array $cart_details)
    {
        $cart_count = 0;
        $total_ticket_count = 0;
        foreach ($cart_details as $cart => $details) {
            $cart_count++;
            $total_ticket_count += $details['ticket_count'];
            // simulate a couple of tickets that were added to the cart in the past
            $ticket_line_item = $this->setup_cart_and_get_ticket_line_item(
                $details['ticket_count'],
                $details['expired']
            );
            // get ticket from line item
            $ticket = $ticket_line_item->ticket();
            $this->assertInstanceOf('EE_Ticket', $ticket);
            // confirm number of line items && tickets
            $this->confirm_ticket_line_item_counts($total_ticket_count, $cart_count);
            // this will increment ticket reserved count
            EED_Ticket_Sales_Monitor::validate_ticket_sale($details['ticket_count'], $ticket);
            $this->assertEquals(
                $details['ticket_count'],
                $ticket->reserved(),
                sprintf(
                    'The reserved ticket count for the %1$s ticket was %2$d when it should have been %3$d',
                    $cart,
                    $ticket->reserved(),
                    $details['ticket_count']
                )
            );
            // if cart is expired, the reserved count should get releases and end up as zero
            $cart_details[$cart]['final_reserved_count'] = ! $details['expired'] ? $details['ticket_count'] : 0;
            $cart_details[$cart]['ticket'] = $ticket;
        }
        return $cart_details;
    }


    /**
     * Confirms that each ticket's reserved count matches what is expected
     *
     * @param array $cart_details
     * @throws EE_Error
     */
    protected function process_cart_results(array $cart_details)
    {
        foreach ($cart_details as $cart => $details) {
            if ($details['ticket'] instanceof EE_Ticket) {
                $this->assertEquals(
                    $details['final_reserved_count'],
                    $details['ticket']->reserved(),
                    sprintf(
                        'The final reserved ticket count for the %1$s ticket after expired tickets were released, was %2$d when it should have been %3$d.',
                        $cart,
                        $details['ticket']->reserved(),
                        $details['final_reserved_count']
                    )
                );
            }
        }
    }


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test_release_tickets_with_expired_carts()
    {
        $cart_results = $this->setup_and_validate_tickets_for_carts(
            array(
                'expired cart' => array(
                    'ticket_count' => 2,
                    'expired' => true,
                ),
                'valid cart' => array(
                    'ticket_count' => 2,
                    'expired' => false,
                ),
            )
        );
        EED_Ticket_Sales_Monitor::release_tickets_for_expired_carts();
        $this->process_cart_results($cart_results);
    }


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test_release_tickets_for_multiple_valid_carts()
    {
        $cart_results = $this->setup_and_validate_tickets_for_carts(
            array(
                'first cart' => array(
                    'ticket_count' => 4,
                    'expired'      => false,
                ),
                'second cart'   => array(
                    'ticket_count' => 2,
                    'expired'      => false,
                ),
            )
        );
        EED_Ticket_Sales_Monitor::release_tickets_for_expired_carts();
        $this->process_cart_results($cart_results);
    }


    /**
     * Validates EED_Ticket_Sales_Monitor::validate_ticket_sale properly detects when a sale is ok.
     * @since 4.9.80.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @group current
     */
    public function testValidateTicketSaleTruePositive()
    {
        $e = $this->new_model_obj_with_dependencies(
            'Event',
            [
                'status' => EEM_Event::post_status_publish
            ]
        );
        $d1 = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reserved' => 0,
                'DTT_sold' => 0
            ));
        $d2 = $this->new_model_obj_with_dependencies(
        'Datetime',
        array(
            'EVT_ID' => $e->ID(),
            'DTT_reserved' => 0,
            'DTT_sold' => 0
        ));
        $t = $this->new_model_obj_with_dependencies(
            'Ticket',
            [
                'TKT_qty' => 1,
                'TKT_reserved' => 0,
                'TKT_sold' => 0,
                'TKT_max' => 1,
                'TKT_min' => 0
            ]
        );
        $d1->_add_relation_to($t, 'Ticket');
        $d2->_add_relation_to($t, 'Ticket');
        $ticket_reserved = EED_Ticket_Sales_Monitor::validate_ticket_sale(1, $t);
        $this->assertEquals(1, $ticket_reserved);
        $d1->refresh_from_db();
        $d2->refresh_from_db();
        $t->refresh_from_db();
        $this->assertEquals(1, $d1->reserved());
        $this->assertEquals(1, $d2->reserved());
        $this->assertEquals(1, $t->reserved());
    }


    /**
     * Validates EED_Ticket_Sales_Monitor::validate_ticket_sale properly detects when a sale shouldn't occur.
     * @since 4.9.80.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @group current
     */
    public function testValidateTicketSaleTrueNegative()
    {
        $e = $this->new_model_obj_with_dependencies(
            'Event',
            [
                'status' => EEM_Event::post_status_publish
            ]
        );
        $d1 = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reserved' => 1,
                'DTT_sold' => 0
            ));
        $d2 = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reserved' => 0,
                'DTT_sold' => 0
            ));
        $t = $this->new_model_obj_with_dependencies(
            'Ticket',
            [
                'TKT_qty' => 1,
                // this next line is important: that one ticket is reserved!
                'TKT_reserved' => 1,
                'TKT_sold' => 0,
                'TKT_max' => 1,
                'TKT_min' => 0
            ]
        );
        $d1->_add_relation_to($t, 'Ticket');
        $d2->_add_relation_to($t, 'Ticket');
        $ticket_reserved = EED_Ticket_Sales_Monitor::validate_ticket_sale(1, $t);
        $this->assertEquals(0, $ticket_reserved);
        $d1->refresh_from_db();
        $d2->refresh_from_db();
        $t->refresh_from_db();
        // Validate the reserved counts were unchanged.
        $this->assertEquals(1, $d1->reserved());
        $this->assertEquals(0, $d2->reserved());
        $this->assertEquals(1, $t->reserved());
    }

    /**
     * Simulates two simultaneous requests arriving to validate ticket sales.
     * Normally, this runs into a concurrency problem because we first READ to verify the ticket sale is ok, and afterwards update.
     * A problematic request is one where the DB is updated between when we read and update the DB because we will update the
     * DB based on stale data.
     * @since 4.9.80.p
     * @group current
     */
    public function testValidateTicketSaleConcurrentRequestTicketLimitReached()
    {
        $e = $this->new_model_obj_with_dependencies(
            'Event',
            [
                'status' => EEM_Event::post_status_publish
            ]
        );
        $d1 = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reserved' => 0,
                'DTT_sold' => 0
            ));
        $d2 = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reserved' => 0,
                'DTT_sold' => 0
            ));
        $t = $this->new_model_obj_with_dependencies(
            'Ticket',
            [
                'TKT_qty' => 1,
                'TKT_reserved' => 0,
                'TKT_sold' => 0,
                'TKT_max' => 1,
                'TKT_min' => 0
            ]
        );
        $d1->_add_relation_to($t, 'Ticket');
        $d2->_add_relation_to($t, 'Ticket');

        // Setup an action to simulate a simultaneous request that will swoop in during the ticket validation
        // (after we read from the DB but before writing to it) and add a ticket reservation.
        add_action(
            'AHEE__EE_Ticket__increase_reserved__begin',
            function($ticket, $quantity, $source) use ($t) {
                EEM_Ticket::instance()->update(
                    [
                        'TKT_reserved' => 1,
                    ],
                    [
                        [
                            'TKT_ID' => $t->ID()
                        ]
                    ]
                );
            },
            10,
            3
        );
        $ticket_reserved = EED_Ticket_Sales_Monitor::validate_ticket_sale(1, $t);
        // Now we should NOT reserve the ticket (alternatively we could at least keep the DB accurate
        // about how many tickets were oversold.)
        $this->assertEquals(0, $ticket_reserved);
        $d1->refresh_from_db();
        $d2->refresh_from_db();
        $t->refresh_from_db();
        // Validate the reserved counts were unchanged.
        $this->assertEquals(0, $d1->reserved());
        $this->assertEquals(0, $d2->reserved());
        $this->assertEquals(1, $t->reserved());
    }

    /**
     * Simulates two simultaneous requests arriving to validate ticket sales.
     * Normally, this runs into a concurrency problem because we first READ to verify the ticket sale is ok, and afterwards update.
     * A problematic request is one where the DB is updated between when we read and update the DB because we will update the
     * DB based on stale data.
     * @since 4.9.80.p
     * @group current
     */
    public function testValidateTicketSaleConcurrentRequestDatetimeLimitReached()
    {
        $e = $this->new_model_obj_with_dependencies(
            'Event',
            [
                'status' => EEM_Event::post_status_publish
            ]
        );
        $d1 = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reserved' => 0,
                'DTT_sold' => 0,
            ));
        $d2 = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reserved' => 1,
                'DTT_sold' => 1,
                // Note this datetime only has one more space!
                'DTT_reg_limit' => 3,
            ));
        $t = $this->new_model_obj_with_dependencies(
            'Ticket',
            [
                'TKT_qty' => EE_INF,
                'TKT_reserved' => 0,
                'TKT_sold' => 0,
                'TKT_max' => EE_INF,
                'TKT_min' => 0
            ]
        );
        $d1->_add_relation_to($t, 'Ticket');
        $d2->_add_relation_to($t, 'Ticket');

        // Setup an action to simulate a simultaneous request that will swoop in during the ticket validation
        // (after we read from the DB but before writing to it) and add a datetime reservation.
        add_action(
            'AHEE__EE_Ticket__increase_reserved__begin',
            function($ticket, $quantity, $source) use ($d2) {
                EEM_Datetime::instance()->update(
                    [
                        'DTT_reserved' => 2,
                    ],
                    [
                        [
                            'DTT_ID' => $d2->ID()
                        ]
                    ]
                );
            },
            10,
            3
        );
        $ticket_reserved = EED_Ticket_Sales_Monitor::validate_ticket_sale(1, $t);
        // Now we should NOT reserve the ticket (alternatively we could at least keep the DB accurate
        // about how many tickets were oversold.)
        $this->assertEquals(0, $ticket_reserved);
        $d1->refresh_from_db();
        $d2->refresh_from_db();
        $t->refresh_from_db();
        // Validate the reserved counts were unchanged.
        $this->assertEquals(0, $d1->reserved());
        $this->assertEquals(2, $d2->reserved());
        $this->assertEquals(0, $t->reserved());
    }

    /**
     * @since 4.10.4.p
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     */
    public function testResetReservationCounts()
    {
        $this->assertEquals(0, EEM_Transaction::instance()->count());
        // need some transactions
        $old_transactions_count = 10;
        for($i=0; $i<$old_transactions_count; $i++){
            $transaction = $this->new_typical_transaction(
                [
                    'tkt_qty' => 5,
                    'reg_status' => EEM_Registration::status_id_pending_payment,
                    'setup_reg' => true,
                    'timestamp' => current_time('timestamp') - WEEK_IN_SECONDS * 2
                ]
            );
        }
        $new_transaction_count = 1;
        // And let's make a new transaction, just to verify its reservations don't get released
        $new_transaction = $this->new_typical_transaction(
            [
                'tkt_qty' => 5,
                'reg_status' => EEM_Registration::status_id_pending_payment,
                'setup_reg' => true,
            ]
        );
        $this->assertEquals($old_transactions_count + $new_transaction_count, EEM_Transaction::instance()->count());
        $a_ticket = $transaction->primary_registration()->ticket();
        $this->assertEquals(1, $a_ticket->reserved());
        $tickets_released = EED_Ticket_Sales_Monitor::reset_reservation_counts();
        // We should report that all the old transactions' tickets were released...
        $this->assertEquals($old_transactions_count, $tickets_released);
        // And that their reserved count goes back down to 0.
        $this->assertEquals(0, $a_ticket->reserved());
        // But, the new transactions' ticket should still be reserved.
        $this->assertEquals(1, $new_transaction->primary_registration()->ticket()->reserved());
    }

    /**
     * Try to release reservations for the ticket, but there is a valid reservation for it.
     * @since 4.10.4.p
     * @throws DomainException
     * @throws EE_Error
     * @throws UnexpectedEntityException
     */
    public function testReleaseReservationForTicketsAllValid()
    {
        EEM_Ticket::instance()->delete_permanently(
            [
                [
                    'TKT_ID' => ['>',0]
                ]
            ],
            false
        );
        $this->assertEquals(0, EEM_Ticket::instance()->count());
        $t1 = $this->factory->ticket_chained->create(
            [
                'TKT_name' => 'ticket reservations all valid',
                'TKT_qty' => 10,
                'TKT_reserved' => 5
            ]
        );
        $t2 = $this->factory->ticket_chained->create(
            [
                'TKT_name' => 'ticket SOME reservation still valid',
                'TKT_qty' => 10,
                'TKT_reserved' => 5
            ]
        );
        $t3 = $this->factory->ticket_chained->create(
            [
                'TKT_name' => 'ticket NO reservations are still valid',
                'TKT_qty' => 10,
                'TKT_reserved' => 5
            ]
        );
        $this->assertEquals(3, EEM_Ticket::instance()->count());
        $li1 = $this->new_model_obj_with_dependencies(
            'Line_Item',
            [
                'OBJ_type' => 'Ticket',
                'OBJ_ID' => $t1->ID(),
                'LIN_quantity' => 5 // ie, all the ticket's reservations are valid.
            ]
        );
        $li2 = $this->new_model_obj_with_dependencies(
            'Line_Item',
            [
                'OBJ_type' => 'Ticket',
                'OBJ_ID' => $t2->ID(),
                'LIN_quantity' => 3 // ie, three of this ticket's reservations are valid. The other two are not.
            ]
        );
        // No valid reservations for ticket 3, so no ticket line items for it will be provided
        $this->assertEquals(3, EEM_Ticket::instance()->count());
        $num_released = EED_Ticket_Sales_Monitor_Mock::release_reservations_for_tickets(
            [$t1, $t2, $t3],
            [$li1, $li2],
            'test'
        );
        // two tickets for t2 and 5 tickets for t3 should have had tickets released.
        $this->assertEquals(7, $num_released);
        // t1's reserved count should be unaffected
        $this->assertEquals(
            5,
            $t1->reserved()
        );
        // t2's reserved count should be reduced
        $this->assertEquals(
            3,
            $t2->reserved()
        );
        // None of t3's reserved count were valid (because we provided no line items indicating they were valid).
        // So all its reservations should have been released.
        $this->assertEquals(
            0,
            $t3->reserved()
        );
    }

}
// End of file EED_Ticket_Sales_Monitor_Test.php
// Location: /tests/testcases/modules/EED_Ticket_Sales_Monitor_Test.php
