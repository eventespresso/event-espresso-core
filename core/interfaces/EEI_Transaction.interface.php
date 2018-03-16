<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEI_Transaction
 */
interface EEI_Transaction extends EEI_Base
{

    /**
     * @return EEI_Payment
     */
    public function last_payment();



    /**
     * Gets the total that should eb paid for this transaction
     *
     * @return float
     */
    public function total();



    /**
     * Get the line item that represents the total for the transaction
     *
     * @return EEI_Line_Item
     */
    public function total_line_item();



    /**
     * Gets the primary registration for this transaction
     *
     * @return EEI_Registration
     */
    public function primary_registration();



    /**
     * Returns the balance due on the transaction
     *
     * @return float
     */
    public function remaining();



    /**
     *        get Total Amount Paid to Date
     *
     * @access        public
     * @return float
     */
    public function paid();



    /**
     * Retrieves all the pending payments on this transaction
     *
     * @return EEI_Payment[]
     */
    public function pending_payments();



}
// End of file EEI_Transaction.interface.php
// Location: core/interfaces/EEI_Transaction.interface.php