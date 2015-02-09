<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Ticket_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Ticket_Test extends EE_UnitTestCase{
	function test_is_on_sale(){
		$t = EE_Ticket::new_instance(array(
			'TKT_start_date'=>current_time('timestamp')-100,
			'TKT_end_date'=>current_time('timestamp')+200,
		));
		$this->assertTrue($t->is_on_sale());
		$t->set('TKT_start_date',current_time('timestamp')+100 );
		$this->assertFalse($t->is_on_sale());
	}
	function test_is_pending(){
		$t = EE_Ticket::new_instance(array(
			'TKT_start_date'=>current_time('timestamp')+100,
			'TKT_end_date'=>current_time('timestamp')+200,
		));
		$this->assertTrue($t->is_pending());
		$t->set('TKT_start_date',current_time('timestamp')-100 );
		$this->assertFalse($t->is_pending());
	}
	function test_is_expired(){
		$t = EE_Ticket::new_instance(array(
			'TKT_start_date'=>current_time('timestamp') - 200,
			'TKT_end_date'=>current_time('timestamp') -100,
		));
		$this->assertTrue($t->is_expired());
		$t->set('TKT_end_date',current_time('timestamp')+100 );
		$this->assertFalse($t->is_expired());
	}
	function test_available(){
		$t = EE_Ticket::new_instance(array(
			'TKT_start_date'=>current_time('timestamp'),
			'TKT_end_date'=>current_time('timestamp'),
			'TKT_qty'=>10,
			'TKT_sold'=>0
		));
		$this->assertTrue($t->available());
		$t->set('TKT_sold', 10);
		$this->assertFalse($t->available());
	}
	
	function test_remaining(){
		$t = EE_Ticket::new_instance(array(
			'TKT_start_date'=>current_time('timestamp'),
			'TKT_end_date'=>current_time('timestamp'),
			'TKT_qty'=>10,
			'TKT_sold'=>0
		));
		$t->save();
		$d = EE_Datetime::new_instance();
		$d->save();
		$t->_add_relation_to($d, 'Datetime');
		$this->assertEquals(10,$t->remaining());
		$t->set('TKT_sold',5);
		$this->assertEquals(5,$t->remaining());
	}
	function test_ticket_status(){
		$t = EE_Ticket::new_instance(array(
			'TKT_start_date'=>current_time('timestamp') - 100,
			'TKT_end_date'=>current_time('timestamp') + 100,
			'TKT_qty'=>10,
			'TKT_sold'=>0,
			'TKT_deleted'=>TRUE
		));
		$t->save();
		$d = EE_Datetime::new_instance();
		$d->save();
		$t->_add_relation_to($d, 'Datetime');
		
		$this->assertEquals(EE_Ticket::archived,$t->ticket_status());
		$t->set('TKT_deleted',FALSE);
		$this->assertEquals(EE_Ticket::onsale,$t->ticket_status());
		$t->set('TKT_sold',10);
		$this->assertEquals(EE_Ticket::sold_out,$t->ticket_status());
		$t->set('TKT_sold',0);
		$d->set_reg_limit(10);
		$d->save();
		$t->set('TKT_start_date',current_time('timestamp')+50);
		$this->assertEquals(EE_Ticket::pending,$t->ticket_status());
		$t->set('TKT_start_date',current_time('timestamp') - 100);
		$t->set('TKT_end_date',current_time('timestamp') - 50);
		$this->assertEquals(EE_Ticket::expired,$t->ticket_status());
	}
	function test_increase_and_decrease_sold(){
		$t = EE_Ticket::new_instance(array(
			'TKT_start_date'=>current_time('timestamp') - 100,
			'TKT_end_date'=>current_time('timestamp') + 100,
			'TKT_qty'=>10,
			'TKT_sold'=>0,
		));
		$this->assertEquals(0,$t->sold());
		$t->increase_sold();
		$this->assertEquals(1,$t->sold());
		$t->increase_sold(2);
		$this->assertEquals(3,$t->sold());
		//now try decreasing
		$t->decrease_sold();
		$this->assertEquals(2,$t->sold());
		$t->decrease_sold(2);
		$this->assertEquals(0,$t->sold());
	}
}

// End of file EE_Ticket_Test.php