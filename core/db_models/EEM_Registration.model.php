<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once ( EE_CLASSES . 'EE_Registration.class.php' );
/**
 *
 * Registration Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Mike Nelson, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEM_Registration extends EEM_Soft_Delete_Base {

  	// private instance of the Registration object
	protected static $_instance = NULL;

	/**
	 * Keys are the status IDs for registrations (eg, RAP, RCN, etc), and the values
	 * are status codes (eg, approved, cancelled, etc)
	 * @var array
	 */
	private static $_reg_status;

	/**
	 * The value of REG_count for a primary registrant
	 */
	const PRIMARY_REGISTRANT_COUNT = 1;

	/**
	 * Status ID (STS_ID on esp_status table) to indicate an INCOMPLETE registration.
	 * Initial status for registrations when they are first created
	 * Payments are NOT allowed.
	 * Automatically toggled to whatever the default Event registration status is upon completion of the attendee information reg step
	 * NO space reserved.
	 * Registration is NOT active
	 */
	const status_id_incomplete = 'RIC';

	/**
	 * Status ID (STS_ID on esp_status table) to indicate an UNAPPROVED registration.
	 * Payments are NOT allowed.
	 * Event Admin must manually toggle STS_ID for it to change
	 * No space reserved.
	 * Registration is active
	 */
	const status_id_not_approved = 'RNA';

	/**
	 * Status ID (STS_ID on esp_status table) to indicate registration is PENDING_PAYMENT .
	 * Payments are allowed.
	 * STS_ID will automatically be toggled to RAP if payment is made in full by the attendee
	 * No space reserved.
	 * Registration is active
	 */
	const status_id_pending_payment = 'RPP';

	/**
	 * Status ID (STS_ID on esp_status table) to indicate an APPROVED registration.
	 * the TXN may or may not be completed ( paid in full )
	 * Payments are allowed.
	 * A space IS reserved.
	 * Registration is active
	 */
	const status_id_approved = 'RAP';

	/**
	 * Status ID (STS_ID on esp_status table) to indicate a registration was CANCELLED by the attendee.
	 * Payments are NOT allowed.
	 * NO space reserved.
	 * Registration is NOT active
	 */
	const status_id_cancelled = 'RCN';

	/**
	 * Status ID (STS_ID on esp_status table) to indicate a registration was DECLINED by the Event Admin
	 * Payments are NOT allowed.
	 * No space reserved.
	 * Registration is NOT active
	 */
	const status_id_declined = 'RDC';



	/**
	 *    private constructor to prevent direct creation
	 *
	 * @Constructor
	 * @access protected
	 * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).
	 *    Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * @return \EEM_Registration
	 */
	protected function __construct( $timezone ) {
		$this->singular_item = __('Registration','event_espresso');
		$this->plural_item = __('Registrations','event_espresso');

		$this->_tables = array(
			'Registration'=>new EE_Primary_Table('esp_registration','REG_ID')
		);
		$this->_fields = array(
			'Registration'=>array(
				'REG_ID'=>new EE_Primary_Key_Int_Field('REG_ID', __('Registration ID','event_espresso')),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Even tID','event_espresso'), false, 0, 'Event'),
				'ATT_ID'=>new EE_Foreign_Key_Int_Field('ATT_ID', __('Attendee ID','event_espresso'), false, 0, 'Attendee'),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso'), false, 0, 'Transaction'),
				'TKT_ID'=>new EE_Foreign_Key_Int_Field('TKT_ID', __('Ticket ID','event_espresso'), false, 0, 'Ticket'),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('Status ID','event_espresso'), false, EEM_Registration::status_id_incomplete, 'Status'),
				'REG_date'=>new EE_Datetime_Field('REG_date', __('Time registration occurred','event_espresso'), false, current_time('timestamp'), $timezone ),
				'REG_final_price'=>new EE_Money_Field('REG_final_price', __('Final Price of registration after all ticket/price modifications','event_espresso'), false, 0),
				'REG_paid'=>new EE_Money_Field('REG_paid', __('Amount paid to date towards registration','event_espresso'), false, 0),
				'REG_session'=>new EE_Plain_Text_Field('REG_session', __('Session ID of registration','event_espresso'), false, ''),
				'REG_code'=>new EE_Plain_Text_Field('REG_code', __('Unique Code for this registration','event_espresso'), false, ''),
				'REG_url_link'=>new EE_Plain_Text_Field('REG_url_link', __('String to be used in URL for identifying registration','event_espresso'), false, ''),
				'REG_count'=>new EE_Integer_Field('REG_count', __('Count of this registration in the group registration ','event_espresso'), true, 1),
				'REG_group_size'=>new EE_Integer_Field('REG_group_size', __('Number of registrations on this group','event_espresso'), false, 1),
				'REG_att_is_going'=>new EE_Boolean_Field('REG_att_is_going', __('Flag indicating the registrant plans on attending','event_espresso'), false, false),
				'REG_deleted' => new EE_Trashed_Flag_Field('REG_deleted', __('Flag indicating if registration has been archived or not.', 'event_espresso'), false, false )
			)
		);
		$this->_model_relations = array(
			'Event'=>new EE_Belongs_To_Relation(),
			'Attendee'=>new EE_Belongs_To_Relation(),
			'Transaction'=>new EE_Belongs_To_Relation(),
			'Ticket'=>new EE_Belongs_To_Relation(),
			'Status'=>new EE_Belongs_To_Relation(),
			'Answer'=>new EE_Has_Many_Relation(),
			'Checkin'=>new EE_Has_Many_Relation(),
			'Payment'=>new EE_HABTM_Relation( 'Registration_Payment' ),
		);
		$this->_model_chain_to_wp_user = 'Event';

		parent::__construct( $timezone );
	}



	/**
	 * 	reg_statuses_that_allow_payment
	 * 	a filterable list of registration statuses that allow a registrant to make a payment
	 *
	 *	@access public
	 *	@return array
	 */
	public static function reg_statuses_that_allow_payment() {
		return apply_filters(
			'FHEE__EEM_Registration__reg_statuses_that_allow_payment',
			array(
				EEM_Registration::status_id_approved,
				EEM_Registration::status_id_pending_payment,
			)
		);
	}



	/**
	 * 		get list of registration statuses
	 *
	 *
	 *		@access public
	 *		@param array $exclude The status ids to exclude from the returned results
	 *		@param bool  $translated If true will return the values as singular localized strings
	 *		@return array
	 */
	public static function reg_status_array( $exclude = array(), $translated = FALSE ) {
		EEM_Registration::instance()->_get_registration_status_array( $exclude );
		return $translated ? EEM_Status::instance()->localized_status( self::$_reg_status, FALSE, 'sentence') : self::$_reg_status;
	}



	/**
	 * 	get list of registration statuses
	 * @access private
	 * @param array $exclude
	 * @return array
	 */
	private function _get_registration_status_array( $exclude = array() ) {
		//in the very rare circumstance that we are deleting a model's table's data
		//and the table hasn't actually been created, this could have an error
		/** @type WPDB $wpdb */
		global $wpdb;
		EE_Registry::instance()->load_helper( 'Activation' );
		if( EEH_Activation::table_exists( $wpdb->prefix . 'esp_status' ) ){
			$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "registration"';
			$results = $wpdb->get_results( $SQL );
			self::$_reg_status = array();
			foreach ( $results as $status ) {
				if ( ! in_array( $status->STS_ID, $exclude )) {
					self::$_reg_status[ $status->STS_ID ] = $status->STS_code;
				}
			}
		}

	}




	/**
	 * This returns a wpdb->results array of all registration date month and years matching the incoming query params and grouped by month and year.
	 * @param  array  $where_params Array of query_params as described in the comments for EEM_Base::get_all()
	 * @return wpdb results array
	 */
	public function get_reg_months_and_years( $where_params ) {
		$query_params[0] = $where_params;
		$query_params['group_by'] = array('reg_year', 'reg_month');
		$query_params['order_by'] = array( 'REG_date' => 'DESC' );
		$columns_to_select = array(
			'reg_year' => array('YEAR(REG_date)', '%s'),
			'reg_month' => array('MONTHNAME(REG_date)', '%s')
			);
		return $this->_get_all_wpdb_results( $query_params, OBJECT, $columns_to_select );
	}




	/**
	*		retrieve ALL registrations for a particular Attendee from db
	* 		@access		public
	* 		@param		int		$ATT_ID
	*		@return 	EE_Registration[]
	*/
	public function get_all_registrations_for_attendee( $ATT_ID = 0 ) {
		if ( ! $ATT_ID ) {
			return FALSE;
		}
		return $this->get_all( array( array( 'ATT_ID' => $ATT_ID )));
	}



	/**
	 * Gets a registration given their REG_url_link. Yes, this should usually
	 * be passed via a GET parameter.
	 * @param string $REG_url_link
	 * @return EE_Registration
	 */
	public function get_registration_for_reg_url_link($REG_url_link){
		if(!$REG_url_link){
			return false;
		}
		return $this->get_one(array(array('REG_url_link'=>$REG_url_link)));
	}




	/**
	*		retrieve registration for a specific transaction attendee from db
	*
	* 		@access		public
	* 		@param	int	$TXN_ID
	* 		@param    int		$ATT_ID
	* 		@param    int		$att_nmbr 	in case the ATT_ID is the same for multiple registrations (same details used) then the attendee number is required
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_registration_for_transaction_attendee( $TXN_ID = 0, $ATT_ID = 0, $att_nmbr = 0 ) {
		return $this->get_one(array(
			array(
				'TXN_ID'=>$TXN_ID,
				'ATT_ID'=>$ATT_ID
			),
			'limit'=>array( min( ( $att_nmbr-1 ), 0 ), 1 )
		));
	}


	/**
	*		get the number of registrations per day  for the Registration Admin page Reports Tab.
	 *		(doesn't utilize models because it's a fairly specialized query)
	* 		@access		public
	 *		@param $period string which can be passed to php's strtotime function (eg "-1 month")
	 *		@return stdClass[] with properties regDate and total
	*/
	public function get_registrations_per_day_report( $period = '-1 month' ) {
		$sql_date = date("Y-m-d H:i:s", strtotime($period));

		//don't include incomplete regs by default
		$where = array('REG_date'=>array('>=',$sql_date), 'STS_ID' => array( '!=', EEM_Registration::status_id_incomplete ) );

		if ( ! EE_Registry::instance()->CAP->current_user_can( 'ee_read_others_registrations', 'reg_per_day_report' ) ) {
			$where['Event.EVT_wp_user'] = get_current_user_id();
		}

		$results = $this->_get_all_wpdb_results(
				array(
					$where,
					'group_by'=>'regDate',
					'order_by'=>array('REG_date'=>'DESC')
				),
				OBJECT,
				array(
					'regDate'=>array('DATE(Registration.REG_date)','%s'),
					'total'=>array('count(REG_ID)','%d')
				));
		return $results;
	}





	/**
	*		get the number of registrations per event  for the Registration Admin page Reports Tab
	* 		@access		public
	 * @param $period string which can be passed to php's strtotime function (eg "-1 month")
	 *		@return stdClass[] each with properties event_name, reg_limit, and total
	*/
	public function get_registrations_per_event_report( $period = '-1 month' ) {
		$date_sql = date("Y-m-d H:i:s", strtotime($period));

		//do not include incomplete registrations by default

		$where = array( 'REG_date'=>array('>=',$date_sql ), 'STS_ID' => array( '!=', EEM_Registration::status_id_incomplete ) );
		if ( ! EE_Registry::instance()->CAP->current_user_can( 'ee_read_others_registrations', 'reg_per_event_report' ) ) {
			$where['Event.EVT_wp_user'] = get_current_user_id();
		}
		$results = $this->_get_all_wpdb_results(array(
			$where,
			'group_by'=>'Event.EVT_name',
			'order_by'=>'Event.EVT_name',
			'limit'=>array(0,24)),
			OBJECT,
			array(
				'event_name'=>array('Event_CPT.post_title','%s'),
				'total'=>array('COUNT(REG_ID)','%s')
			)
		);

		return $results;

	}


	/**
	 * Returns the EE_Registration of the primary attendee on the transaction id provided
	 * @param int $TXN_ID
	 * @return EE_Registration
	 */
	public function get_primary_registration_for_transaction_ID( $TXN_ID = 0){
		if( ! $TXN_ID ){
			return false;
		}
		return $this->get_one(array(array('TXN_ID'=>$TXN_ID,'REG_count'=>  EEM_Registration::PRIMARY_REGISTRANT_COUNT)));
	}


	/**
	 *		get_event_registration_count
	 *
	 *		@access public
	 *		@param int $EVT_ID
	 *		@param boolean $for_incomplete_payments
	 *		@return int
	 */
	public function get_event_registration_count ( $EVT_ID, $for_incomplete_payments = FALSE ) {
		// we only count approved registrations towards registration limits
		$query_params = array( array( 'EVT_ID' => $EVT_ID, 'STS_ID' => self::status_id_approved ) );
		if( $for_incomplete_payments ){
			$query_params[0]['Transaction.STS_ID']=array('!=',  EEM_Transaction::complete_status_code);
		}

		return $this->count($query_params);
	}

	/**
	 * Deletes all registrations with no transactions. Note that this needs to be very efficient
	 * and so it uses wpdb directly
	 * @global WPDB $wpdb
	 * @return int number deleted
	 */
	public function delete_registrations_with_no_transaction() {
		/** @type WPDB $wpdb */
		global $wpdb;
		return $wpdb->query(
				'DELETE r FROM ' . $this->table() . ' r LEFT JOIN ' . EEM_Transaction::instance()->table() . ' t ON r.TXN_ID = t.TXN_ID WHERE t.TXN_ID IS NULL' );
	}



}
// End of file EEM_Registration.model.php
// Location: /includes/models/EEM_Registration.model.php
