<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * EE_Ticket_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */

/**
 * @group core/db_classes
 */
class EE_Ticket_Test extends EE_UnitTestCase
{
    public function test_is_on_sale()
    {
        $t = EE_Ticket::new_instance(array(
            'TKT_start_date' => time() - 100,
            'TKT_end_date'   => time() + 200,
        ));
        $this->assertTrue($t->is_on_sale());
        $t->set('TKT_start_date', time() + 100);
        $this->assertFalse($t->is_on_sale());
    }

    public function test_is_pending()
    {
        $t = EE_Ticket::new_instance(array(
            'TKT_start_date' => time() + 100,
            'TKT_end_date'   => time() + 200,
        ));
        $this->assertTrue($t->is_pending());
        $t->set('TKT_start_date', time() - 100);
        $this->assertFalse($t->is_pending());
    }

    public function test_is_expired()
    {
        $t = EE_Ticket::new_instance(array(
            'TKT_start_date' => time() - 200,
            'TKT_end_date'   => time() - 100,
        ));
        $this->assertTrue($t->is_expired());
        $t->set('TKT_end_date', time() + 100);
        $this->assertFalse($t->is_expired());
    }

    public function test_available()
    {
        $t = EE_Ticket::new_instance(array(
            'TKT_start_date' => time(),
            'TKT_end_date'   => time(),
            'TKT_qty'        => 10,
            'TKT_sold'       => 0,
        ));
        $this->assertTrue($t->available());
        $t->set('TKT_sold', 10);
        $t->save();
        $this->assertFalse($t->available());
    }

    public function test_remaining()
    {
        $t = EE_Ticket::new_instance(array(
            'TKT_start_date' => time(),
            'TKT_end_date'   => time(),
            'TKT_qty'        => 10,
            'TKT_sold'       => 0,
        ));
        $t->save();
        $d = EE_Datetime::new_instance();
        $d->save();
        $t->_add_relation_to($d, 'Datetime');
        $this->assertEquals(10, $t->remaining());
        // simulate 5 ticket sales
        $this->simulate_x_number_ticket_sales($t, 5);
        $this->assertEquals(5, $t->remaining());
    }


    public function test_ticket_status()
    {
        $t = EE_Ticket::new_instance(array(
            'TKT_start_date' => time() - 100,
            'TKT_end_date'   => time() + 100,
            'TKT_qty'        => 10,
            'TKT_sold'       => 0,
            'TKT_deleted'    => true,
        ));
        $t->save();
        $d = EE_Datetime::new_instance();
        $d->save();
        $t->_add_relation_to($d, 'Datetime');

        $this->assertEquals(EE_Ticket::archived, $t->ticket_status());
        $t->set('TKT_deleted', false);
        $this->assertEquals(EE_Ticket::onsale, $t->ticket_status());
        // simulate 10 ticket sales
        $this->simulate_x_number_ticket_sales($t, 10);
        $this->assertEquals(EE_Ticket::sold_out, $t->ticket_status());
        $this->reverse_x_number_ticket_sales($t, 10);
        $d->set_reg_limit(10);
        $d->save();
        $t->set('TKT_start_date', time() + 50);
        $this->assertEquals(EE_Ticket::pending, $t->ticket_status());
        $t->set('TKT_start_date', time() - 100);
        $t->set('TKT_end_date', time() - 50);
        $this->assertEquals(EE_Ticket::expired, $t->ticket_status());
    }

    public function test_increase_and_decrease_sold()
    {
        $t = EE_Ticket::new_instance(array(
            'TKT_start_date' => time() - 100,
            'TKT_end_date'   => time() + 100,
            'TKT_qty'        => 10,
            'TKT_sold'       => 0,
        ));
        $this->assertEquals(0, $t->sold());
        $t->increaseSold();
        $this->assertEquals(1, $t->sold());
        $t->increaseSold(2);
        $this->assertEquals(3, $t->sold());
        //now try decreasing
        $t->decreaseSold();
        $this->assertEquals(2, $t->sold());
        $t->decreaseSold(2);
        $this->assertEquals(0, $t->sold());
    }


    /**
     * @group 10283
     * @expectedException \EventEspresso\core\exceptions\UnexpectedEntityException
     */
    public function test_get_related_event_exception()
    {
        //create a ticket (it won't have any datetime).
        /** @var EE_Ticket $ticket */
        $ticket = $this->factory->ticket->create();
        //the following should throw the exception
        $ticket->get_related_event();
    }
}

// End of file EE_Ticket_Test.php
// Location: tests/testcases/core/db_classes/EE_Ticket_Test.php
