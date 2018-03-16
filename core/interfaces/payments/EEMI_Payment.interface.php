<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEMI_Payment
 * interface representing a model (for querying to get EEI_Payment objects).
 * It's probably best if its a singleton to save on resources but still allow it
 * to have some state
 */
interface EEMI_Payment
{

    /**
     * returns a string for the approved status
     */
    public function approved_status();



    /**
     * returns a string for the pending status
     */
    public function pending_status();



    /**
     * returns a string for the cancelled status
     */
    public function cancelled_status();



    /**
     * returns a string for the failed status
     */
    public function failed_status();



    /**
     * returns a string for the declined status
     */
    public function declined_status();



    /**
     * Function that returns an instance of this class.
     *
     * @return EEMI_Payment
     */
    public static function instance();



    /**
     * Gets a payment by the transaction ID or cheque number
     *
     * @param int $txn_id
     * @return EEI_Payment
     */
    public function get_payment_by_txn_id_chq_nmbr($txn_id);
}

// End of file EEMI_Payment.interface.php
// Location: EventEspresso\core\libraries\payment_methods/EEMI_Payment.interface.php