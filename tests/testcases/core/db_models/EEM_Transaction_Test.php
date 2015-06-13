<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Transaction_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_Transaction_Test extends EE_UnitTestCase{
	/**
	 * @group 7965
	 */
	function test_delete_junk_transactions(){
		$old_txn_count = EEM_Transaction::instance()->count();
		$pretend_bot_creations = 9;
		$pretend_real_recent_txns = 3;
		$pretend_real_good_txns = 5;
		$this->factory->transaction->create_many( $pretend_bot_creations, array( 'TXN_timestamp' => time() - HOUR_IN_SECONDS * 2 , 'STS_ID' => EEM_Transaction::failed_status_code ) );
		$this->factory->transaction->create_many( $pretend_real_recent_txns, array( 'TXN_timestamp' => time() - EE_Registry::instance()->SSN->lifespan() + MINUTE_IN_SECONDS , 'STS_ID' => EEM_Transaction::failed_status_code ) );
		$this->factory->transaction->create_many( $pretend_real_good_txns, array( 'STS_ID' => EEM_Transaction::abandoned_status_code ) );
		$num_deleted = EEM_Transaction::instance()->delete_junk_transactions();
		$this->assertEquals( $pretend_bot_creations, $num_deleted );


	}
}

// End of file EEM_Transaction_Test.php