<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Payment_Processor_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group payment_methods
 */
class EE_Payment_Processor_Test extends EE_UnitTestCase{

	public function test_process_payment_onsite(){
		require_once( EE_TESTS_DIR . DS . 'mocks' . DS . 'payment_methods' . DS . 'Mock_Onsite' . DS . 'EE_PMT_Mock_Onsite.pm.php' );
		$pm = $this->new_model_obj_with_dependencies('Payment_Method', array('PMD_type' => 'Mock_Onsite' ) );
	}
}

// End of file EE_Payment_Processor_Test.php