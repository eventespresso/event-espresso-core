<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
require_once(EE_MODELS . 'EEM_Base.model.php');

/**
 *
 * Transaction Model
 *
 * @package            Event Espresso
 * @subpackage         includes/models/
 * @author             Brent Christensen
 *
 */
class EEM_Transaction extends EEM_Base
{

    // private instance of the Transaction object
    protected static $_instance;

    /**
     * Status ID(STS_ID on esp_status table) to indicate the transaction is complete,
     * but payment is pending. This is the state for transactions where payment is promised
     * from an offline gateway.
     */
    //	const open_status_code = 'TPN';

    /**
     * Status ID(STS_ID on esp_status table) to indicate the transaction failed,
     * either due to a technical reason (server or computer crash during registration),
     *  or some other reason that prevent the collection of any useful contact information from any of the registrants
     */
    const failed_status_code = 'TFL';

    /**
     * Status ID(STS_ID on esp_status table) to indicate the transaction was abandoned,
     * either due to a technical reason (server or computer crash during registration),
     * or due to an abandoned cart after registrant chose not to complete the registration process
     * HOWEVER...
     * an abandoned TXN differs from a failed TXN in that it was able to capture contact information for at least one
     * registrant
     */
    const abandoned_status_code = 'TAB';

    /**
     * Status ID(STS_ID on esp_status table) to indicate an incomplete transaction,
     * meaning that monies are still owing: TXN_paid < TXN_total
     */
    const incomplete_status_code = 'TIN';

    /**
     * Status ID (STS_ID on esp_status table) to indicate a complete transaction.
     * meaning that NO monies are owing: TXN_paid == TXN_total
     */
    const complete_status_code = 'TCM';

    /**
     *  Status ID(STS_ID on esp_status table) to indicate the transaction is overpaid.
     *  This is the same as complete, but site admins actually owe clients the moneys!  TXN_paid > TXN_total
     */
    const overpaid_status_code = 'TOP';


    /**
     *    private constructor to prevent direct creation
     *
     * @Constructor
     * @access protected
     *
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any
     *                         incoming timezone data that gets saved). Note this just sends the timezone info to the
     *                         date time model field objects.  Default is NULL (and will be assumed using the set
     *                         timezone in the 'timezone_string' wp option)
     *
     * @return EEM_Transaction
     * @throws \EE_Error
     */
    protected function __construct($timezone)
    {
        $this->singular_item = __('Transaction', 'event_espresso');
        $this->plural_item   = __('Transactions', 'event_espresso');

        $this->_tables                 = array(
            'TransactionTable' => new EE_Primary_Table('esp_transaction', 'TXN_ID')
        );
        $this->_fields                 = array(
            'TransactionTable' => array(
                'TXN_ID'           => new EE_Primary_Key_Int_Field('TXN_ID', __('Transaction ID', 'event_espresso')),
                'TXN_timestamp'    => new EE_Datetime_Field('TXN_timestamp',
                    __('date when transaction was created', 'event_espresso'), false, EE_Datetime_Field::now,
                    $timezone),
                'TXN_total'        => new EE_Money_Field('TXN_total',
                    __('Total value of Transaction', 'event_espresso'), false, 0),
                'TXN_paid'         => new EE_Money_Field('TXN_paid',
                    __('Amount paid towards transaction to date', 'event_espresso'), false, 0),
                'STS_ID'           => new EE_Foreign_Key_String_Field('STS_ID', __('Status ID', 'event_espresso'),
                    false, EEM_Transaction::failed_status_code, 'Status'),
                'TXN_session_data' => new EE_Serialized_Text_Field('TXN_session_data',
                    __('Serialized session data', 'event_espresso'), true, ''),
                'TXN_hash_salt'    => new EE_Plain_Text_Field('TXN_hash_salt',
                    __('Transaction Hash Salt', 'event_espresso'), true, ''),
                'PMD_ID'           => new EE_Foreign_Key_Int_Field('PMD_ID',
                    __("Last Used Payment Method", 'event_espresso'), true, null, 'Payment_Method'),
                'TXN_reg_steps'    => new EE_Serialized_Text_Field('TXN_reg_steps',
                    __('Registration Steps', 'event_espresso'), false, array()),
            )
        );
        $this->_model_relations        = array(
            'Registration'   => new EE_Has_Many_Relation(),
            'Payment'        => new EE_Has_Many_Relation(),
            'Status'         => new EE_Belongs_To_Relation(),
            'Line_Item'      => new EE_Has_Many_Relation(false),
            //you can delete a transaction without needing to delete its line items
            'Payment_Method' => new EE_Belongs_To_Relation(),
            'Message'        => new EE_Has_Many_Relation()
        );
        $this->_model_chain_to_wp_user = 'Registration.Event';
        parent::__construct($timezone);

    }


    /**
     *    txn_status_array
     * get list of transaction statuses
     *
     * @access public
     * @return array
     */
    public static function txn_status_array()
    {
        return apply_filters(
            'FHEE__EEM_Transaction__txn_status_array',
            array(
                EEM_Transaction::overpaid_status_code,
                EEM_Transaction::complete_status_code,
                EEM_Transaction::incomplete_status_code,
                EEM_Transaction::abandoned_status_code,
                EEM_Transaction::failed_status_code,
            )
        );
    }

    /**
     *        get the revenue per day  for the Transaction Admin page Reports Tab
     *
     * @access        public
     *
     * @param string $period
     *
     * @return \stdClass[]
     */
    public function get_revenue_per_day_report($period = '-1 month')
    {
        $sql_date = $this->convert_datetime_for_query('TXN_timestamp', date('Y-m-d H:i:s', strtotime($period)),
            'Y-m-d H:i:s', 'UTC');

        $query_interval = EEH_DTT_Helper::get_sql_query_interval_for_offset($this->get_timezone(), 'TXN_timestamp');

        return $this->_get_all_wpdb_results(
            array(
                array(
                    'TXN_timestamp' => array('>=', $sql_date)
                ),
                'group_by' => 'txnDate',
                'order_by' => array('TXN_timestamp' => 'ASC')
            ),
            OBJECT,
            array(
                'txnDate' => array('DATE(' . $query_interval . ')', '%s'),
                'revenue' => array('SUM(TransactionTable.TXN_paid)', '%d')
            )
        );
    }


    /**
     *        get the revenue per event  for the Transaction Admin page Reports Tab
     *
     * @access        public
     *
     * @param string $period
     *
     * @throws \EE_Error
     * @return mixed
     */
    public function get_revenue_per_event_report($period = '-1 month')
    {
        global $wpdb;
        $transaction_table       = $wpdb->prefix . 'esp_transaction';
        $registration_table      = $wpdb->prefix . 'esp_registration';
        $event_table             = $wpdb->posts;
        $payment_table           = $wpdb->prefix . 'esp_payment';
        $sql_date                = date('Y-m-d H:i:s', strtotime($period));
        $approved_payment_status = EEM_Payment::status_id_approved;
        $extra_event_on_join     = '';
        //exclude events not authored by user if permissions in effect
        if ( ! EE_Registry::instance()->CAP->current_user_can('ee_read_others_registrations', 'reg_per_event_report')) {
            $extra_event_on_join = ' AND Event.post_author = ' . get_current_user_id();
        }

        return $wpdb->get_results(
            "SELECT
			Transaction_Event.event_name AS event_name,
			SUM(Transaction_Event.paid) AS revenue
			FROM
				(
					SELECT
						DISTINCT Payment.TXN_ID,
						Event.post_title AS event_name,
						Payment.PAY_amount AS paid
					FROM $transaction_table AS TransactionTable
						JOIN $registration_table AS Registration
							ON Registration.TXN_ID = TransactionTable.TXN_ID
						JOIN $payment_table AS Payment
							ON Payment.TXN_ID = Registration.TXN_ID
							AND Payment.PAY_timestamp > '$sql_date'
							AND Payment.STS_ID = '$approved_payment_status'
						JOIN $event_table AS Event ON Registration.EVT_ID = Event.ID
							$extra_event_on_join
				) AS Transaction_Event
			GROUP BY event_name",
            OBJECT
        );
    }


    /**
     * Gets the current transaction given the reg_url_link, or assumes the reg_url_link is in the
     * $_REQUEST global variable. Either way, tries to find the current transaction (through
     * the registration pointed to by reg_url_link), if not returns null
     *
     * @param string $reg_url_link
     *
     * @return EE_Transaction
     */
    public function get_transaction_from_reg_url_link($reg_url_link = '')
    {
        return $this->get_one(array(
            array(
                'Registration.REG_url_link' => ! empty($reg_url_link) ? $reg_url_link : EE_Registry::instance()->REQ->get('e_reg_url_link',
                    '')
            )
        ));
    }


    /**
     * Updates the provided EE_Transaction with all the applicable payments
     * (or fetch the EE_Transaction from its ID)
     *
     * @deprecated
     *
     * @param EE_Transaction|int $transaction_obj_or_id
     * @param boolean            $save_txn whether or not to save the transaction during this function call
     *
     * @return boolean
     * @throws \EE_Error
     */
    public function update_based_on_payments($transaction_obj_or_id, $save_txn = true)
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            sprintf(__('This method is deprecated. Please use "%s" instead', 'event_espresso'),
                'EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()'),
            '4.6.0'
        );
        /** @type EE_Transaction_Processor $transaction_processor */
        $transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');

        return $transaction_processor->update_transaction_and_registrations_after_checkout_or_payment(
            $this->ensure_is_obj($transaction_obj_or_id)
        );
    }

    /**
     * Deletes "junk" transactions that were probably added by bots. There might be TONS
     * of these, so we are very careful to NOT select (which the models do even when deleting),
     * and so we only use wpdb directly and only do minimal joins.
     * Transactions are considered "junk" if they're failed for longer than a week.
     * Also, there is an extra check for payments related to the transaction, because if a transaction has a payment on
     * it, it's probably not junk (regardless of what status it has).
     * The downside to this approach is that is addons are listening for object deletions
     * on EEM_Base::delete() they won't be notified of this.  However, there is an action that plugins can hook into
     * to catch these types of deletions.
     *
     * @global WPDB $wpdb
     * @return mixed
     */
    public function delete_junk_transactions()
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        $deleted             = false;
        $time_to_leave_alone = apply_filters(
            'FHEE__EEM_Transaction__delete_junk_transactions__time_to_leave_alone'
            , WEEK_IN_SECONDS
        );


        /**
         * This allows code to filter the query arguments used for retrieving the transaction IDs to delete.
         * Useful for plugins that want to exclude transactions matching certain query parameters.
         * The query parameters should be in the format accepted by the EEM_Base model queries.
         */
        $ids_query = apply_filters(
            'FHEE__EEM_Transaction__delete_junk_transactions__initial_query_args',
            array(
                0 => array(
                    'STS_ID'        => EEM_Transaction::failed_status_code,
                    'Payment.PAY_ID' => array( 'IS NULL' ),
                    'TXN_timestamp' => array('<', time() - $time_to_leave_alone)
                )
            ),
            $time_to_leave_alone
        );


        /**
         * This filter is for when code needs to filter the list of transaction ids that represent transactions
         * about to be deleted based on some other criteria that isn't easily done via the query args filter.
         */
        $txn_ids = apply_filters(
            'FHEE__EEM_Transaction__delete_junk_transactions__transaction_ids_to_delete',
            EEM_Transaction::instance()->get_col($ids_query, 'TXN_ID'),
            $time_to_leave_alone
        );
        //now that we have the ids to delete
        if (! empty($txn_ids) && is_array($txn_ids)) {
            // first, make sure these TXN's are removed the "ee_locked_transactions" array
            EEM_Transaction::unset_locked_transactions($txn_ids);
            // let's get deletin'...
            // Why no wpdb->prepare?  Because the data is trusted.
            // We got the ids from the original query to get them FROM
            // the db (which is sanitized) so no need to prepare them again.
            $query   = '
				DELETE
				FROM ' . $this->table() . '
				WHERE
					TXN_ID IN ( ' . implode(",", $txn_ids) . ')';
            $deleted = $wpdb->query($query);
        }
        if ($deleted) {
            /**
             * Allows code to do something after the transactions have been deleted.
             */
            do_action('AHEE__EEM_Transaction__delete_junk_transactions__successful_deletion', $txn_ids);
        }

        return $deleted;
    }


    /**
     * @param array $transaction_IDs
     *
     * @return bool
     */
    public static function unset_locked_transactions(array $transaction_IDs)
    {
        $locked_transactions = get_option('ee_locked_transactions', array());
        $update              = false;
        foreach ($transaction_IDs as $TXN_ID) {
            if (isset($locked_transactions[$TXN_ID])) {
                unset($locked_transactions[$TXN_ID]);
                $update = true;
            }
        }
        if ($update) {
            update_option('ee_locked_transactions', $locked_transactions);
        }

        return $update;
    }



    /**
     * returns an array of EE_Transaction objects whose timestamp is less than
     * the current time minus the session lifespan, which defaults to 60 minutes
     *
     * @return EE_Base_Class[]|EE_Transaction[]
     * @throws \EE_Error
     */
    public function get_transactions_in_progress()
    {
        return $this->get_all(
            array(
                array(
                    'TXN_timestamp' => array(
                        '>',
                        time() - EE_Registry::instance()->SSN->lifespan()
                    ),
                    'STS_ID' => array(
                        '!=',
                        EEM_Transaction::complete_status_code
                    ),
                )
            )
        );
    }


}
// End of file EEM_Transaction.model.php
// Location: /includes/models/EEM_Transaction.model.php
