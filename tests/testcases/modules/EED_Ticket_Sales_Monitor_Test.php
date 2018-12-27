<?php
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

    /**
     * creates line items that would be generated when a cart is created and tickets are added
     *
     * @param int  $ticket_count
     * @param bool $expired
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
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
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
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
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
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
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
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
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
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
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
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


}
// End of file EED_Ticket_Sales_Monitor_Test.php
// Location: /tests/testcases/modules/EED_Ticket_Sales_Monitor_Test.php
