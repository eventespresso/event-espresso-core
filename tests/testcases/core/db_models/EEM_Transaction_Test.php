<?php

/**
 * All tests for the EEM_Transaction class.
 *
 * @author        Mike Nelson
 * @since         4.6.x
 * @package       Event Espresso
 * @subpackage    tests
 * @group         core/db_models
 */
class EEM_Transaction_Test extends EE_UnitTestCase
{


    /**
     * @group 7965
     * @group 8853
     */
    public function test_delete_junk_transactions()
    {
        $pretend_bot_creations    = 9;
        $pretend_real_recent_txns = 3;
        $pretend_real_good_txns   = 5;
        require_once EE_TESTS_DIR . 'mocks/core/EE_Session_Mock.core.php';
        $this->factory->transaction->create_many(
            $pretend_bot_creations,
            array('TXN_timestamp' => time() - WEEK_IN_SECONDS * 2, 'STS_ID' => EEM_Transaction::failed_status_code)
        );
        $this->factory->transaction->create_many(
            $pretend_real_recent_txns,
            array(
                'TXN_timestamp' => time() - EE_Session_Mock::instance()->lifespan() + MINUTE_IN_SECONDS,
                'STS_ID'        => EEM_Transaction::failed_status_code,
            )
        );
        $this->factory->transaction->create_many(
            $pretend_real_good_txns,
            array('STS_ID' => EEM_Transaction::abandoned_status_code)
        );
        $failed_transaction_with_real_payment = $this->factory->transaction->create(
            array(
                'TXN_timestamp' => time() - WEEK_IN_SECONDS * 2,
                'STS_ID' => EEM_Transaction::failed_status_code
            )
        );
        $transaction_count = EEM_Transaction::instance()->count();

        $this->assertEquals(
            $pretend_bot_creations + $pretend_real_recent_txns + $pretend_real_good_txns + 1,
            $transaction_count
        );
        $failed_transaction_count = EEM_Transaction::instance()->count(
            array(
                array('STS_ID' => EEM_Transaction::failed_status_code)
            )
        );
        $this->assertEquals(
            $pretend_bot_creations + $pretend_real_recent_txns + 1,
            $failed_transaction_count
        );
        $this->factory->payment->create(array('TXN_ID' => $failed_transaction_with_real_payment->ID()));
        $num_deleted = EEM_Transaction::instance()->delete_junk_transactions();
        $this->assertEquals($pretend_bot_creations, $num_deleted);
    }


}
