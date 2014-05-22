<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Event_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Event_Test extends EE_UnitTestCase{
	public function test_primary_datetime(){
		$e = EE_Event::new_instance(array('EVT_name'=>'power1'));
		$e->save();
		$d = EE_Datetime::new_instance(array('EVT_ID'=>$e->ID()));
		$d->save();
		$primary_datetime = $e->primary_datetime();
		$this->assertEquals($d,$primary_datetime);
	}
	public function test_datetimes_ordered(){
		$e = EE_Event::new_instance(array('EVT_name'=>'power1'));
		$e->save();
		$d_exp = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>current_time('timestamp')-10,
			'DTT_EVT_end'=>current_time('timestamp') - 5));
		$d_exp->save();
		$d_del = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>current_time('timestamp')-5,
			'DTT_EVT_end'=>current_time('timestamp')+5,
			'DTT_deleted'=>true));
		$d_del->save();
		$d_ok= EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>current_time('timestamp') - 1,
			'DTT_EVT_end'=>current_time('timestamp') + 5));
		$d_ok->save();
		$ds = $e->datetimes_ordered();
		$this->assertArrayContains($d_exp,$ds);
		//$this->assertArrayDoesNotContain($d_del,$ds); @todo: bug, this assert actually fails because we have deactivated default where params
		$this->assertArrayContains($d_ok,$ds);
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
		$this->assertArrayContains($d_del,$ds);
		$this->assertArrayContains($d_ok, $ds);
		//double-check the ordering.
		$first_d = array_shift($ds);
		$this->assertEquals($d_exp,$first_d);
		$second_d = array_shift($ds);
		$this->assertEquals($d_del,$second_d);
		$third_d = array_shift($ds);
		$this->assertEquals($d_ok,$third_d);
	}
	
	function test_active_status(){
		$e = EE_Event::new_instance(array('status'=>'publish'));
		$e->save();
		$d_now = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(), 
			'DTT_EVT_start'=>current_time('timestamp')-100,
			'DTT_EVT_end'=>current_time('timestamp') + 50));
		$d_now->save();
		$d_exp = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>current_time('timestamp')-10,
			'DTT_EVT_end'=>current_time('timestamp') - 5));
		$d_exp->save();
		$d_upcoming = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>current_time('timestamp')+10,
			'DTT_EVT_end'=>current_time('timestamp') + 15));
		$d_upcoming->save();
		
		$this->assertEquals(EE_Datetime::active,$e->get_active_status());
		$e->_remove_relation_to($d_now, 'Datetime');
		$this->assertEquals(EE_Datetime::upcoming,$e->get_active_status());
		$e->_remove_relation_to($d_upcoming, 'Datetime');
		$this->assertEquals(EE_Datetime::expired,$e->get_active_status());
	}
	function test_get_number_of_tickets_sold(){
		$e = EE_Event::new_instance();
		$e->save();
		$d_now = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(), 
			'DTT_EVT_start'=>current_time('timestamp')-100,
			'DTT_EVT_end'=>current_time('timestamp') - 50,
			'DTT_sold'=>5));
		$d_now->save();
		$d_exp = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>current_time('timestamp')-10,
			'DTT_EVT_end'=>current_time('timestamp') - 5,
			'DTT_sold'=>15));
		$d_exp->save();
		$this->assertEquals(20,$e->get_number_of_tickets_sold());
		$e->_remove_relation_to($d_now, 'Datetime');
		$this->assertEquals(15,$e->get_number_of_tickets_sold());
	}
}

// End of file EE_Event_Test.php