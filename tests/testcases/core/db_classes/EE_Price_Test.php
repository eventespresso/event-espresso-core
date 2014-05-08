<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Price_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Price_Test extends EE_UnitTestCase{
	function test_desc(){
		$p = EE_Price::new_instance(array('PRC_desc'=>'let hte wookie win'));
		$this->assertEquals('let hte wookie win',$p->desc());
	}
}

// End of file EE_Price_Test.php