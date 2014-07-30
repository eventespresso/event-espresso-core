<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Registry_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Registry_Test extends EE_UnitTestCase{
	/**
	 * checks that when we reset a model, that it does so properly and
	 * also returns the NEW model
	 */
	public function test_reset_model(){
		$model_a = EE_Registry::instance()->load_model('Event');
		$model_a2 = EE_Registry::instance()->load_model('Event');
		$model_a3 = EEM_Event::instance();
		$this->assertEquals($model_a, $model_a2);
		$this->assertEquals($model_a2, $model_a3);
		$model_b1 = EEM_Event::reset();
		$this->assertNotSame( $model_a, $model_b1);
		$model_b2 = EE_Registry::instance()->reset_model('Event');
		$this->assertNotEquals( $model_a, $model_b2);
	}
}

// End of file EE_Registry_Test.php