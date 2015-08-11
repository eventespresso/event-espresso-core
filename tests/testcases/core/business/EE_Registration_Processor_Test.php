<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Registration_Processor_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Registration_Processor_Test extends EE_UnitTestCase{
	/**
	 * @group 8193
	 */
	function test_fix_reg_final_price_rounding_issue() {
		$txn = $this->new_model_obj_with_dependencies( 'Transaction' , array( 'TXN_total' => 2.99));
		$regs = array();
		for( $i=0; $i<3; $i++ ) {
			$regs[] = $this->new_model_obj_with_dependencies( 'Registration', array( 'REG_final_price' => 1, 'TXN_ID' => $txn->ID() ) );
		}
		//ok so there's a 1 cent difference. The REG_final_price_sum should be 1 cent more than the transaction total
		$reg_final_price_sum = EEM_Registration::instance()->sum( array( array( 'TXN_ID' => $txn->ID() ) ), 'REG_final_price' );
		$this->assertEquals( $txn->total() + 0.01, $reg_final_price_sum );

		$reg_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		$success = $reg_processor->fix_reg_final_price_rounding_issue( $txn );
		$this->assertTrue( $success );
		$new_reg_final_price_sum = EEM_Registration::instance()->sum( array( array( 'TXN_ID' => $txn->ID() ) ), 'REG_final_price' );
		$this->assertEquals( $txn->total(), $new_reg_final_price_sum );
		//specifically, the first reg should now be $0.99, but the others should still be $1 each
		$this->assertEquals( .99, $regs[0]->final_price() );
		$this->assertEquals( 1, $regs[1]->final_price() );
		$this->assertEquals( 1, $regs[2]->final_price() );
	}
}

// End of file EE_Registration_Processor_Test.php