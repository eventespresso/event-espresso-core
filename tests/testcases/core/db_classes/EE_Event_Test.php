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
}

// End of file EE_Event_Test.php