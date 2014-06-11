<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Transaction_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core
 * @group core/db_classes
 */
class EE_Transaction_Test extends EE_UnitTestCase{

	public function test_payment_method(){
		$t = $this->new_model_obj_with_dependencies('Transaction');
		$this->assertNotEquals(0,$t->payment_method_ID());

		$pm = $t->payment_method();
		$this->assertInstanceOf('EE_Payment_Method', $pm);

		//now if there is no explicit payment mehtod on the transaction, use the first payment
		$t->set('PMD_ID',0);
		$p = $this->new_model_obj_with_dependencies( 'Payment' );
		$t->_add_relation_to( $p, 'Payment' );
		$pm = $t->payment_method();
		$this->assertInstanceOf('EE_Payment_Method', $pm);

	}
}

// End of file EE_Transaction_Test.php