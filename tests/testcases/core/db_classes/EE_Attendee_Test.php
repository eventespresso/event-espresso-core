<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Attendee_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Attendee_Test extends EE_UnitTestCase{
	
	public function test_events(){
		$a = EE_Attendee::new_instance();
		$a->save();
		$this->assertNotEquals($a->ID(),0);
		$e1 = EE_Event::new_instance(array('EVT_name'=>'1'));
		$e1->save();
		$this->assertNotEquals($e1->ID(),0);
		$e2 = EE_Event::new_instance(array('EVT_name'=>'2'));
		$e2->save();
		$this->assertNotEquals($e2->ID(),0);
		$e3 = EE_Event::new_instance(array('EVT_name'=>'3'));
		$e3->save();
		$this->assertNotEquals($e3->ID(),0);
		$r1 = EE_Registration::new_instance(array('EVT_ID'=>$e1->ID(),'ATT_ID'=>$a->ID()));
		$r1->save();
		$this->assertNotEquals($r1->ID(),0);
		$r2 = EE_Registration::new_instance(array('EVT_ID'=>$e2->ID(),'ATT_ID'=>$a->ID()));
		$r2->save();
		$this->assertNotEquals($r2->ID(),0);
		$events = $a->events();
		$this->assertArrayContains($e1,$events);
		$this->assertArrayContains($e2,$events);
		$this->assertArrayDoesNotContain($e3,$events);
	}
}

// End of file EE_Attendee_Test.php