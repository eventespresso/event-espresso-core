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
			'DTT_EVT_start'=>time()-10,
			'DTT_EVT_end'=>time() - 5));
		$d_exp->save();
		$d_del = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>time()-5,
			'DTT_EVT_end'=>time()+5,
			'DTT_deleted'=>true));
		$d_del->save();
		$d_ok= EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>time() - 1,
			'DTT_EVT_end'=>time() + 5));
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
			'DTT_EVT_start'=>time()-100,
			'DTT_EVT_end'=>time() + 50));
		$d_now->save();
		$d_exp = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>time()-10,
			'DTT_EVT_end'=>time() - 5));
		$d_exp->save();
		$d_upcoming = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>time()+10,
			'DTT_EVT_end'=>time() + 15));
		$d_upcoming->save();

		$this->assertEquals(EE_Datetime::active,$e->get_active_status( TRUE ));
		$e->_remove_relation_to($d_now, 'Datetime');
		$this->assertEquals(EE_Datetime::upcoming,$e->get_active_status( TRUE ));
		$e->_remove_relation_to($d_upcoming, 'Datetime');
		$this->assertEquals(EE_Datetime::expired,$e->get_active_status( TRUE ));
	}
	function test_get_number_of_tickets_sold(){
		$e = EE_Event::new_instance();
		$e->save();
		$d_now = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>time()-100,
			'DTT_EVT_end'=>time() - 50,
			'DTT_sold'=>5));
		$d_now->save();
		$d_exp = EE_Datetime::new_instance(array(
			'EVT_ID'=>$e->ID(),
			'DTT_EVT_start'=>time()-10,
			'DTT_EVT_end'=>time() - 5,
			'DTT_sold'=>15));
		$d_exp->save();
		$this->assertEquals(20,$e->get_number_of_tickets_sold());
		$e->_remove_relation_to($d_now, 'Datetime');
		$this->assertEquals(15,$e->get_number_of_tickets_sold());
	}


	/**
	 * @since 4.8.0
	 */
	function test_total_available_spaces() {
		//grab test scenarios.
		$scenarios = $this->scenarios->get_scenarios_by_type( 'event' );
		foreach ( $scenarios as $scenario ) {
			if ( $scenario->get_expected( 'total_available_spaces') ) {
				$this->assertEquals( $scenario->get_expected( 'total_available_spaces' ), $scenario->get_scenario_object()->total_available_spaces(), 'Testing ' . $scenario->name );
			}
		}
	}

}

// End of file EE_Event_Test.php
