<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Line_Item_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Line_Item_Test extends EE_UnitTestCase{
	function test_generate_code(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$l = EE_Line_Item::new_instance(array('OBJ_type'=>'Transaction','OBJ_ID'=>$t->ID()));
		$this->assertNotNull($l->generate_code());
	}
}

// End of file EE_Line_Item_Test.php