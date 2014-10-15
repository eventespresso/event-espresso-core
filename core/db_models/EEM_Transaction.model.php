<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once ( EE_MODELS . 'EEM_Base.model.php' );
/**
 *
 * Transaction Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen
 *
 */
class EEM_Transaction extends EEM_Base {

  	// private instance of the Transaction object
	private static $_instance = NULL;

	/**
	 * Status ID(STS_ID on esp_status table) to indicate the transaction is complete,
	 * but payment is pending. This is the state for transactions where payment is promised
	 * from an offline gateway.
	 */
//	const open_status_code = 'TPN';

	/**
	 * Status ID(STS_ID on esp_status table) to indicate the transaction failed, either due to a technical reason (server or computer crash during registration),
	 *  or due to an abandoned cart after registrant was forwarded to an off-site gateway ie: got to PayPal, then bailed
	 */
	const failed_status_code = 'TFL';

	/**
	 * STatus ID(STS_ID on esp_status table) to indicate an incomplete transaction  TXN_paid < TXN_total
	 */
	const incomplete_status_code = 'TIN';

	/**
	 * Status ID (STS_ID on esp_status table) to indicate a complete transaction. TXN_paid == TXN_total
	 */
	const complete_status_code = 'TCM';

	/**
	 *  Status ID(STS_ID on esp_status table) to indicate the transaction is overpaid.  TXN_paid > TXN_total
	 *  This is the same as complete, but site admins actually owe clients the moneys!
	 */
	const overpaid_status_code = 'TOP';





	/**
	 *	private constructor to prevent direct creation
	 *
	 *	@Constructor
	 *	@access protected
	 *	@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).
	 * 		Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *	@return EEM_Transaction
	 */
	protected function __construct( $timezone ) {
		$this->singular_item = __('Transaction','event_espresso');
		$this->plural_item = __('Transactions','event_espresso');

		$this->_tables = array(
			'Transaction'=>new EE_Primary_Table('esp_transaction','TXN_ID')
		);
		$this->_fields = array(
			'Transaction'=>array(
				'TXN_ID'=>new EE_Primary_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso')),
				'TXN_timestamp'=>new EE_Datetime_Field('TXN_timestamp', __('date when transaction was created','event_espresso'), false, current_time('timestamp'), $timezone ),
				'TXN_total'=>new EE_Money_Field('TXN_total', __('Total value of Transaction','event_espresso'), false, 0),
				'TXN_paid'=>new EE_Money_Field('TXN_paid', __('Amount paid towards transaction to date','event_espresso'), false, 0),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('Status ID','event_espresso'), false, EEM_Transaction::failed_status_code, 'Status'),
				'TXN_session_data'=>new EE_Serialized_Text_Field('TXN_session_data', __('Serialized session data','event_espresso'), true, ''),
				'TXN_hash_salt'=>new EE_Plain_Text_Field('TXN_hash_salt', __('Transaction Hash Salt','event_espresso'), true, ''),
				'PMD_ID'=>new EE_Foreign_Key_Int_Field('PMD_ID', __("Last Used Payment Method", 'event_espresso'), true, NULL, 'Payment_Method'),
				'TXN_reg_steps' => new EE_Serialized_Text_Field( 'TXN_reg_steps', __( 'Registration Steps', 'event_espresso' ), FALSE, array() ),
			)
		);
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Payment'=>new EE_Has_Many_Relation(),
			'Status'=>new EE_Belongs_To_Relation(),
			'Line_Item'=>new EE_Has_Many_Relation(false),//you can delete a transaction without needing to delete its line items
			'Payment_Method'=>new EE_Belongs_To_Relation(),
		);
		parent::__construct( $timezone );

	}




	/**
	 *		This function is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return EEM_Transaction instance
	 */
	public static function instance( $timezone = '' ){

		// check if instance of Espresso_model already exists
		if ( ! self::$_instance instanceof EEM_Transaction ) {
			// instantiate Espresso_model
			self::$_instance = new self( $timezone );
		}

		//we might have a timezone set, let set_timezone decide what to do with it
		self::$_instance->set_timezone( $timezone );

		// Espresso_model object
		return self::$_instance;
	}



	/**
	 * resets the model and returns it
	 *
	 * @param string $timezone
	 * @return EEM_Transaction
	 */
	public static function reset( $timezone = '' ){
		self::$_instance = NULL;
		return self::instance( $timezone );
	}



	/**
	 *        get the revenue per day  for the Transaction Admin page Reports Tab
	 *
	 * @access        public
	 * @param string $period
	 * @return \stdClass[]
	 */
	public function get_revenue_per_day_report( $period = '-1 month' ) {

		$sql_date = date("Y-m-d H:i:s", strtotime($period) );
		$results = $this->_get_all_wpdb_results(
			array(
				array(
					'TXN_timestamp' => array('>=', $sql_date)),
					'group_by' => 'txnDate',
					'order_by' => array('TXN_timestamp' => 'DESC' )
					),
				OBJECT,
				array(
					'txnDate' => array('DATE(Transaction.TXN_timestamp)','%s'),
					'revenue' => array('SUM(Transaction.TXN_paid)', '%d')
					));
		return $results;
	}



	/**
	 *        get the revenue per event  for the Transaction Admin page Reports Tab
	 *
	 * @access        public
	 * @param string $period
	 * @throws \EE_Error
	 * @return mixed
	 */
	public function get_revenue_per_event_report( $period = 'month' ) {
		global $wpdb;
		$date_mod = strtotime( '-1 ' . $period );

		$SQL = 'SELECT post_name as event_name, SUM(TXN_paid) AS revenue';
		$SQL .= ' FROM ' . $this->_get_main_table()->get_table_name() . ' txn';
		$SQL .= ' LEFT JOIN ' . $wpdb->prefix . 'esp_registration reg ON reg.TXN_ID = txn.TXN_ID';
		$SQL .= ' LEFT JOIN ' . $wpdb->posts . ' evt ON evt.ID = reg.EVT_ID';
		$SQL .= ' WHERE REG_count = 1';
		$SQL .= ' AND REG_date >= %d';
		$SQL .= ' GROUP BY event_name';
		$SQL .= ' ORDER BY event_name';
		$SQL .= ' LIMIT 0, 24';

		return $this->_do_wpdb_query( 'get_results', array(  $wpdb->prepare( $SQL, $date_mod ) ) );

	}






	/**
	 * Gets the current transaction given the reg_url_link, or assumes the reg_url_link is in the
	 * $_REQUEST global variable. Either way, tries to find the current transaction (through
	 * the registration pointed to by reg_url_link), if not returns null
	 * @param string $reg_url_link
	 * @return EE_Transaction
	 */
	public function get_transaction_from_reg_url_link( $reg_url_link = '' ){
		return $this->get_one( array(
			array(
				'Registration.REG_url_link' => ! empty( $reg_url_link ) ? $reg_url_link : EE_Registry::instance()->REQ->get( 'e_reg_url_link', '' )
			)
		));
	}







	/**
	 * Updates the provided EE_Transaction with all the applicable payments
	 * (or fetch the EE_Transaction from its ID)
	 *
	 * @deprecated
	 * @param EE_Transaction | int $transaction_obj_or_id
	 * @param boolean $save_txn whether or not to save the transaction during this function call
	 * @return boolean
	 */
	public function update_based_on_payments( $transaction_obj_or_id, $save_txn = TRUE ){
		EE_Error::doing_it_wrong(
			__CLASS__ . '::' . __FUNCTION__,
			sprintf( __( 'This method is deprecated. Please use "%s" instead', 'event_espresso' ), 'EE_Transaction_Processor::update_transaction_and_registrations_after_checkout_or_payment()' ),
			'4.6.0'
		);
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		return  $transaction_processor->update_transaction_and_registrations_after_checkout_or_payment( $this->ensure_is_obj( $transaction_obj_or_id ));
	}





}
// End of file EEM_Transaction.model.php
// Location: /includes/models/EEM_Transaction.model.php
