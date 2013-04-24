<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Registration Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );


class EEM_Registration extends EEM_Base {

  	// private instance of the Registration object
	private static $_instance = NULL;

	private static $_reg_status;

	/**
	 * The value of REG_count for a primary registrant
	 */
	const PRIMARY_REGISTRANT_COUNT = 1;

	
	
	/**
	 * Status ID (STS_ID on esp_status table) to indicate a pending registration
	 */
	const status_id_pending = 'RPN';
	
	
	/**
	 * Status ID (STS_ID on esp_status table) to indicate a cancelled registration
	 */
	const status_id_cancelled = 'RCN';
	
	
	/**
	 * Status ID (STS_ID on esp_status table) to indicate an approved registration
	 */
	const status_id_approved = 'RAP';
	
	
	/**
	 * Status ID (STS_ID on esp_status table) to indicate an unapproved registration
	 */
	const status_id_not_approved = 'RNA';
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access protected
	 *		@return void
	 */
	protected function __construct() {
		$this->singular_item = __('Registration','event_espresso');
		$this->plural_item = __('Registrations','event_espresso');
		$this->_get_registration_status_array();
//		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Registration.class.php');
		$this->_allowed_statuses=apply_filters('filter_hook_espresso__EEM_Registration__allowed_statuses', self::$_reg_status );
//		$this->_fields_settings=array(
//			'REG_ID'=>new EE_Model_Field('Registration ID','primary_key',false),
//			'EVT_ID'=>new EE_Model_Field('Event ID','foreign_key',false,null,null,'Event'),
//			'ATT_ID'=>new EE_Model_Field('Attendee ID', 'foreign_key', false,null,null,'Attendee'),
//			'TXN_ID'=>new EE_Model_Field('Transaction ID', 'foreign_key', false, null, null, 'Transaction'),
//			'DTT_ID'=>new EE_Model_Field('Datetime ID','foreign_key',false,null,null,'Datetime'),
//			'PRC_ID'=>new EE_model_Field('Price ID','foreign_key',false,null,null,'Price'),
//			'STS_ID'=>new EE_Model_Field('Status ID', 'foreign_text_key', false, 'RNA', $this->_allowed_statuses, 'Status'),
//			'REG_date'=>new EE_Model_Field('Registration Date','int',false,0),
//			'REG_final_price'=>new EE_Model_Field('Final Price', 'float', false, 0),
//			'REG_session'=>new EE_Model_Field('Session of Original Registration','plaintext',false),
//			'REG_code'=>new EE_Model_Field('Unique Registration Code', 'plaintext', true, ''),
//			'REG_url_link'=>new EE_Model_Field('URL Link of Registration','plaintext',true,''),
//			'REG_count'=>new EE_Model_Field('Flag indicating whether Registration is Unique','int',false,1),
//			'REG_group_size'=>new EE_Model_Field('Flag indicating whether is part of a group registration', 'int', false, 1),
//			'REG_att_is_going'=>new EE_Model_Field('Flag indicating if Person is going', 'bool', false, true),
//			'REG_att_checked_in'=>new EE_Model_Field('Flag indicating whether attendee has checked in','bool',false,false)				
//			);
//		$this->_related_models=array(
//								//'Event'=>new EE_Model_Relation('belongsTo', 'Event', 'EVT_ID'),//no such classes or model yet created
//								'Attendee'=>new EE_Model_Relation('belongsTo', 'Attendee', 'ATT_ID'),
//								'Transaction'=>new EE_Model_Relation('belongsTo', 'Transaction', 'TXN_ID'),
//								'Datetime'=>new EE_Model_Relation('belongsTo', 'Datetime', 'DTT_ID'),
//								'Price'=>new EE_Model_Relation('belongsTo', 'Price', 'PRC_ID'),
//								'Status'=>new EE_Model_Relation('belongsTo', 'Status','STS_ID'),
//								'Answers'=>new EE_Model_Relation('hasMany','Answer','REG_ID'));
		$this->_tables = array(
			'Registration'=>new EE_Primary_Table('esp_registration','REG_ID')
		);
		$this->_fields = array(
			'Registration'=>array(
				'REG_ID'=>new EE_Primary_Key_Int_Field('REG_ID', 'Registration ID', false, 0),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', 'Even tID', false, 0, 'Event'),
				'ATT_ID'=>new EE_Foreign_Key_Int_Field('ATT_ID', 'Attendee ID', false, 0, 'Attendee'),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', 'Transaction ID', false, 0, 'Transaction'),
				'DTT_ID'=>new EE_Foreign_Key_Int_Field('DTT_ID', 'Datetime ID', false, 0, 'Datetime'),
				'PRC_ID'=>new EE_Foreign_Key_Int_Field('PRC_ID', 'Price ID', false, 0, 'Price'),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', 'Status ID', false, EEM_Registration::status_id_not_approved, 'Status'),
				'REG_date'=>new EE_Datetime_Field('REG_date', 'Time registration occured', false, current_time('timestamp')),
				'REG_final_price'=>new EE_Money_Field('REG_final_price', 'Final Price of registration', false, 0),
				'REG_session'=>new EE_Plain_Text_Field('REG_session', 'Session ID of registration', false, ''),
				'REG_code'=>new EE_Plain_Text_Field('REG_code', 'Unique Code for this registration', false, ''),
				'REG_url_link'=>new EE_Plain_Text_Field('REG_url_link', 'String to be used in URL for identifying registration', false, ''),
				'REG_count'=>new EE_Integer_Field('REG_count', 'Count of this registration in the group registraion ', ture, 1),
				'REG_group_size'=>new EE_Integer_Field('REG_group_size', 'Number of registrations on this group', false, 1),
				'REG_att_is_going'=>new EE_Boolean_Field('REG_att_is_going', 'Flag indicating the registrant plans on attending', false, false),
				'REG_att_checked_in'=>new EE_Boolean_Field('REG_att_checked_in', 'Flag indicating the registrant has checked in', false, false),
			)
		);
		$this->_model_relations = array(
			'Event'=>new EE_Belongs_To_Relation(),
			'Attendee'=>new EE_Belongs_To_Relation(),
			'Transaction'=>new EE_Belongs_To_Relation(),
			'Datetime'=>new EE_Belongs_To_Relation(),
			'Price'=>new EE_Belongs_To_Relation(),
			'Status'=>new EE_Belongs_To_Relation()
		);
		
		parent::__construct();
	}

	/**
	 *		This funtion is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@return EEM_Registration instance
	 */
	public static function instance(){

		// check if instance of Espresso_model already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self();
		}
		// Espresso_model object
		return self::$_instance;
	}








	/**
	 * 		get list of registration statuses
	*		@access private
	*		@return void
	*/
	private function _get_registration_status_array() {

		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "registration"';
		$results = $wpdb->get_results( $SQL );

		self::$_reg_status = array();
		foreach ( $results as $status ) {
			self::$_reg_status[ $status->STS_ID ] = $status->STS_code;
		}
	}




	/**
	*		retreive ALL registrations from db
	*
	* 		@access		public
	* 		@param		array		$where_cols_n_values
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_all_registrations( $where_cols_n_values = array() ) {

		$orderby = 'REG_date';
		// retreive all transactions
		if ( ! empty ( $where_cols_n_values )) {
			$registrations = $this->select_all_where ( $where_cols_n_values );
		} else {
			$registrations = $this->select_all ( $orderby );
		}

		if ( $registrations ) {
			return $this->_create_objects( $registrations );
		} else {
			return FALSE;
		}
	}



	/**
	 * this retrieves all the registrations for a particular event
	 * @param  int $EVT_ID the event id of the event we're retrieving registrations for
	 * @return array         array of registration objects
	 */
	public function get_all_registrations_for_event( $EVT_ID ) {
		$EVT_ID = (int) $EVT_ID;
		$where_cols_n_values = array( 'EVT_ID' => $EVT_ID );
		return $this->get_all_registrations( $where_cols_n_values );
	}




	/**
	*		retreive a single registration from db
	*
	* 		@access		public
	* 		@param		array		$where_cols_n_values
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_registration( $where_cols_n_values = array() ) {
		// retreive a particular registration
		if ( $registration = $this->select_row_where ( $where_cols_n_values )) {
			$reg_array = $this->_create_objects( array( $registration ));
			return array_shift($reg_array);
		} else {
			return FALSE;
		}
	}




	/**
	*		retreive a single registration from db by the ID
	*
	* 		@access		public
	* 		@param		array		$REG_ID
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_registration_by_ID( $REG_ID = FALSE ) {
		if ( ! $REG_ID ) {
			return FALSE;
		}
		
		// retreive a particular registration
		if ( $registration = $this->select_row_where ( array( 'REG_ID' => $REG_ID ))) {
			$reg_array = $this->_create_objects( array( $registration ));
			return array_shift($reg_array);
		} else {
			return FALSE;
		}
	}






	/**
	*		retreive ALL registrations for a particular Attendee from db
	* 		@access		public
	* 		@param		int		$ATT_ID
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_all_registrations_for_attendee( $ATT_ID = FALSE ) {

		if ( ! $ATT_ID ) {
			return FALSE;
		}
		if ( $registrations = $this->get_all_registrations( array( 'ATT_ID' => $ATT_ID ))) {
			return $registrations;
		} else {
			return FALSE;
		}
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
		return $this->get_one(array('REG_url_link'=>$REG_url_link));
	}




	/**
	*		retreive ALL registrations for a specific transaction from db
	* 
	* 		@access		public
	* 		@param		$TXN_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_all_registrations_for_transaction( $TXN_ID = FALSE ) {
	
		if ( ! $TXN_ID ) {
			return FALSE;
		}
		// retreive all registrations	
		if ( $registrations = $this->select_all_where ( array( 'TXN_ID' => $TXN_ID ), 'REG_ID' )) {
			return $this->_create_objects( $registrations );
		} else {
			return FALSE;
		}
		
	}




	/**
	*		retreive registration for a specific transaction attendee from db
	* 
	* 		@access		public
	* 		@param		$TXN_ID
	* 		@param		$ATT_ID
	* 		@param		$att_nmbr 	in case the ATT_ID is the same for multiple registrations (same details used) then the attendee number is required
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_registration_for_transaction_attendee( $TXN_ID = FALSE, $ATT_ID = FALSE, $att_nmbr = FALSE ) {

		if ( ! $TXN_ID && ! $ATT_ID && ! $att_nmbr ) {
			return FALSE;
		}
		// retreive all registrations
		if ( $registrations = $this->select_all_where ( array( 'TXN_ID' => $TXN_ID, 'ATT_ID' => $ATT_ID ), 'REG_ID' )) {
			$registrations = $this->_create_objects( $registrations );
			// need to reduce $att_nmbr which starts at 1 to match array keys that start at 0
			$att_nmbr--;
			// just grab 1 element from array starting at $att_nmbr
			$registration = array_slice( $registrations, $att_nmbr, 1 );
			//printr( $registration );
			return isset( $registration[0] ) ? $registration[0] : $registration;
		} else {
			return FALSE;
		}

	}






	/**
	*		Search for an existing registration record in the DB using SQL LIKE clause - so go ahead - get wildcards !
	* 		@access		public
	* 		@param		string		$REG_code
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function find_existing_registrations_LIKE( $REG_code = FALSE ) {

		// no search params means registration object already exists
		if ( ! $REG_code ) {
			$REG_code = $this->_REG_code;
		}

		global $wpdb;
		// we're using LIKE with wildcards so that partial REG_codes can be used
		$SQL = 'SELECT * FROM ' . $this->table_name . ' WHERE REG_code LIKE "'.$REG_code.'" ORDER BY TXN_ID';

		if ( $registrations = $wpdb->get_results( $SQL )) {
			// if there's more than one, then we'll just grab the last one
			if ( is_array( $registrations )) {
				$registrations = array_pop( $registrations );
			}
			$registration = $this->_create_objects( array( $registrations ));
			return array_shift( $registration );

		} else {
			return FALSE;
		}

	}






	/**
	*		check whether a registration is checked in
	* 		@access		public
	* 		@param		string		$REG_ID
	*		@return 		mixed		boolean on success, NULL on fail
	*/
	public function is_registration_checked_in( $REG_ID = FALSE ) {

		// no $REG_ID !?!? get outta here!!!
		if ( ! $REG_ID ) {
			return NULL;
		}

		global $wpdb;
		$SQL = 'SELECT REG_att_checked_in FROM ' . $this->table_name . ' WHERE REG_ID = %d';
		if ( $checked_in = $wpdb->get_row( $wpdb->prepare( $SQL, $REG_ID ))) {
			return $checked_in;
		} else {
			return NULL;
		}
	}






	/**
	*		check in a registration
	* 		@access		public
	* 		@param		string			$REG_ID
	* 		@param		boolean		$check_IO
	*		@return 		mixed			boolean on success, NULL on fail
	*/
	public function registration_check_in_check_out( $REG_ID = FALSE, $check_IO = NULL ) {

		// no $REG_ID or $check_IO !?!? get outta here!!!
		if ( ! $REG_ID || $check_IO == NULL ) {
			return NULL;
		}

		global $wpdb;

		$set_column_values = array( 'REG_att_checked_in' => $check_IO );
		$where_cols_n_values = array( 'REG_ID' => $REG_ID );


		if ( $checked = $this->update ( $set_column_values, $where_cols_n_values )) {
			return $checked;
		} else {
			return NULL;
		}
	}






	/**
	*		return all registration data for the Admin Registration Overview including attendee, and ticket info
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_registrations_for_overview() {

		global $wpdb;
		$SQL = 'SELECT evt.event_name, reg.*, att.*, dtt.*';
		$SQL .= ' FROM ' . EVENTS_DETAIL_TABLE . ' evt ';
		$SQL .= ' LEFT JOIN ' . $this->table_name .'reg ON reg.EVT_ID = evt.id';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_attendee att ON att.ATT_ID = reg.ATT_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'wp_esp_datetime dtt ON dtt.id = reg.EVT_ID';
		$SQL .= ' ORDER BY REG_date';

		if ( $registrations = $wpdb->get_results( $SQL )) {
			return $registrations;
		} else {
			return FALSE;
		}

	}






	/**
	*		return a list of attendees for a specific locale for the Registration Overview Admin page
	* 		@access		public
	*/
	public function get_registrations_for_admin_page( $EVT_ID = FALSE, $CAT_ID = FALSE, $reg_status = FALSE, $month_range = FALSE, $today_a = FALSE, $this_month_a = FALSE, $start_date = FALSE, $end_date = FALSE, $orderby = 'REG_date', $order = 'DESC', $limit = NULL, $count = FALSE ) {

		global $wpdb;

		//Dates
		$curdate = date('Y-m-d', current_time('timestamp'));
		$this_year_r = date('Y', current_time('timestamp'));
		$this_month_r = date('m', current_time('timestamp'));
		$days_this_month = date( 't', current_time('timestamp') );
		$time_start = ' 00:00:00';
		$time_end = ' 23:59:59';

		$sql_clause = ' WHERE ';
		$SQL = '(';

		// get list of attendees for regional managers locale
		if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_group_admin') {

			$locales = get_user_meta(espresso_member_data('id'), "espresso_group", true);

			if ( $locales != '' ) {
				$locales = unserialize($locales);

				$locales = implode(",", $locales);
			} else {
				$locales = FALSE;
			}

			$SQL .= $count ? "SELECT COUNT(reg.ATT_ID)" : "SELECT att.*, reg.*, dtt.*, reg.STS_ID REG_status, CONCAT(ATT_fname, ' ', ATT_lname) as REG_att_name, evt.id event_id, evt.event_name, evt.require_pre_approval, txn.TXN_ID, txn.TXN_timestamp, txn.TXN_total, txn.STS_ID AS txn_status, txn.TXN_details, txn.TXN_tax_data, txn.TXN_paid, PRC_amount, PRC_name";
			$SQL .= ' FROM ' . $wpdb->prefix . 'esp_attendee att';
			$SQL .= ' JOIN ' . $this->table_name . ' reg ON reg.ATT_ID = att.ATT_ID';
			$SQL .= ' LEFT JOIN ' . EVENTS_DETAIL_TABLE . ' evt ON evt.id = reg.EVT_ID ';
			$SQL .= ' LEFT JOIN ' . $wpdb->prefix . 'esp_transaction txn ON txn.TXN_ID = reg.TXN_ID';
			$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_price prc ON prc.PRC_ID = reg.PRC_ID';
			$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_datetime dtt ON dtt.DTT_ID = reg.DTT_ID';

			if ( $CAT_ID ) {
				$SQL .= ' JOIN ' . EVENTS_CATEGORY_REL_TABLE . ' ect ON ect.event_id = evt.id ';
				$SQL .= ' JOIN ' . EVENTS_CATEGORY_TABLE . ' cat ON  cat.id = ect.cat_id ';
			}

			if ( $locales ) {
				$SQL .= ' JOIN ' . EVENTS_VENUE_REL_TABLE . ' evn ON evn.event_id = evt.id ';
				$SQL .= ' JOIN ' . EVENTS_LOCALE_REL_TABLE . ' loc ON  loc.venue_id = evn.venue_id ';
			}

			$sql_clause = ' WHERE ';

			if ( $CAT_ID ) {
				$SQL .= $sql_clause .' cat.id = "' . $CAT_ID . '"" ';
				$sql_clause = ' AND ';
			}

			if ( $reg_status ) {
				$SQL .= $sql_clause .' reg.STS_ID = "' . $reg_status   . '"';
				$sql_clause = ' AND ';
			}


			if ( $month_range ) {
				$pieces = explode('-', $month_range, 3);
				$year_r = $pieces[0];
				$month_r = $pieces[1];

				$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . strtotime( $month_r . ' 01 ' . $year_r . ' ' . $time_start ) . '" ';
				$SQL .= 'AND "' . strtotime( $month_r . ' ' . date( 't', strtotime( $year_r . ' ' . $month_r )) . ' ' . $year_r . ' ' . $time_end )  . '"';
				$sql_clause = ' AND ';
			}

			if ( $EVT_ID ) {
				$SQL .= $sql_clause .' reg.EVT_ID = "' . $EVT_ID  . '"';
				$sql_clause = ' AND ';
			}


			if ( $today_a ) {
				$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . strtotime($curdate . $time_start) . '" AND "' . strtotime($curdate . $time_end)  . '"';
				$sql_clause = ' AND ';
			}

			if ( $this_month_a ) {
				$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . strtotime( $this_month_r . ' 01 ' . $this_year_r . ' ' . $time_start ) . '" ';
				$SQL .= 'AND "' . strtotime( $this_month_r . ' ' . $days_this_month . ' ' . $this_year_r . ' ' . $time_end )  . '"';
				$sql_clause = ' AND ';
			}

			if ( $locales ) {
				$SQL .= $sql_clause . ' locale_id IN (' . $locales . ') ';
			}

			$SQL .= ' AND evt.event_status != "D" ';
			$SQL .= ') UNION (';

			// end if (function_exists('espresso_member_data')

		}

		$SQL .= $count ? "SELECT COUNT(reg.ATT_ID)" : "SELECT att.*, reg.*, dtt.*, reg.STS_ID REG_status, evt.id event_id, evt.event_name, CONCAT(ATT_fname, ' ', ATT_lname) as REG_att_name, evt.require_pre_approval, txn.TXN_ID, TXN_timestamp, TXN_total, txn.STS_ID AS txn_status, TXN_details, TXN_tax_data, txn.TXN_paid, PRC_amount, PRC_name";
		$SQL .= ' FROM ' . $wpdb->prefix . 'esp_attendee att';
		$SQL .= ' LEFT JOIN ' . $this->table_name . ' reg ON reg.ATT_ID = att.ATT_ID';
		$SQL .= ' LEFT JOIN ' . EVENTS_DETAIL_TABLE . ' evt ON evt.id = reg.EVT_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_transaction txn ON txn.TXN_ID = reg.TXN_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_price prc ON prc.PRC_ID = reg.PRC_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_datetime dtt ON dtt.DTT_ID = reg.DTT_ID';

		if ( $CAT_ID ) {
			$SQL .= ' JOIN ' . EVENTS_CATEGORY_REL_TABLE . ' ect ON ect.event_id = evt.id';
			$SQL .= ' JOIN ' . EVENTS_CATEGORY_TABLE . ' cat ON  cat.id = ect.cat_id';
		}

		$sql_clause = ' WHERE ';

		if ( $CAT_ID ) {
			$SQL .= $sql_clause .'cat.id = "' . $CAT_ID . '"';
			$sql_clause = ' AND ';
		}

		if ( $reg_status ) {
			$SQL .= $sql_clause .'reg.STS_ID = "' . $reg_status  . '"';
			$sql_clause = ' AND ';
		}

		if ( $EVT_ID ) {
			$SQL .= $sql_clause .' reg.EVT_ID = "' . $EVT_ID  . '"';
			$sql_clause = ' AND ';
		}

		if ( $month_range ) {
			$pieces = explode('-', $month_range, 3);
			$year_r = $pieces[0];
			$month_r = $pieces[1];

			$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . strtotime( $month_r . ' 01 ' . $year_r . ' ' . $time_start ) . '" ';
			$SQL .= 'AND "' . strtotime( $month_r . ' ' . date( 't', strtotime( $year_r . ' ' . $month_r )) . ' ' . $year_r . ' ' . $time_end )  . '"';
			$sql_clause = ' AND ';
		}

		if ( $today_a ) {
			$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . strtotime($curdate . $time_start) . '" AND "' . strtotime($curdate . $time_end)  . '"';
			$sql_clause = ' AND ';
		}

		if ( $this_month_a ) {
			$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . strtotime( $this_year_r . '-' . $this_month_r . '-01' . $time_start ) . '" AND "' . strtotime( $this_year_r . '-' . $this_month_r . '-' . $days_this_month . $time_end )  . '"';
			$sql_clause = ' AND ';
		}

		if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
			$SQL .= $sql_clause . ' evt.wp_user = "' . espresso_member_data('id')  . '"';
			$sql_clause = ' AND ';
		}

		$SQL .= ' AND evt.event_status != "D" ';



		//let's setup orderby
		switch ( $orderby ) {
			
			case 'REG_ID':
				$orderby = 'reg.REG_ID ';
				break;
				
			case 'STS_ID':
				$orderby = 'reg.REG_status ';
				break;
				
			case 'ATT_lname':
				$orderby = 'att.ATT_lname ';
				break;
				
			case 'event_name':
				$orderby = 'evt.event_name ';
				break;
				
			case 'DTT_EVT_start':
				$orderby = 'dtt.DTT_EVT_start ';
				break;
				
			default: //'REG_date'
				$orderby = 'reg.REG_date ';
		}

		//let's setup limit
		$limit = !empty($limit) ? 'LIMIT ' . implode(',', $limit) : '';
		$SQL .= $count ? ')' : ") ORDER BY $orderby $order $limit";

		$registrations = $count ? $wpdb->get_var( $SQL ) : $wpdb->get_results( $SQL );

		return $registrations;
	}





	/**
	*		return specific registration data for the Registration Admin page
	* 		@access		public
	*/
	public function get_registration_for_admin_page( $REG_ID = FALSE ) {

		if ( ! $REG_ID ) {
			return FALSE;
		}

		global $wpdb;

		$SQL = 'SELECT att.*, reg.*, evt.*, txn.*, prc.*, dtt.*, reg.STS_ID REG_status, txn.STS_ID txn_status';
		$SQL .= ' FROM ' . $wpdb->prefix . 'esp_attendee att';
		$SQL .= ' RIGHT JOIN ' . $this->table_name . ' reg ON reg.ATT_ID = att.ATT_ID';
		$SQL .= ' LEFT JOIN ' . EVENTS_DETAIL_TABLE . ' evt ON evt.id = reg.EVT_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_transaction txn ON txn.TXN_ID = reg.TXN_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_price prc ON prc.PRC_ID = reg.PRC_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_datetime dtt ON dtt.DTT_ID = reg.DTT_ID';
		$SQL .= ' WHERE reg.REG_ID = %d';

		$attendee = $wpdb->get_row( $wpdb->prepare( $SQL, $REG_ID ));
		//printr( $attendee, 'attendee' ); die();
		
		return $attendee;
	}





	/**
	*		get the number of registrations per day  for the Registration Admin page Reports Tab
	* 		@access		public
	*/
	public function get_registrations_per_day_report( $period = '-1 month' ) {

		global $wpdb;
		$date_mod = strtotime( $period );

		$SQL = "SELECT DATE(FROM_UNIXTIME(reg.REG_date)) AS 'regDate', COUNT(REG_ID) AS total";
		$SQL .= ' FROM ' . $this->table_name . ' reg';
		$SQL .= ' WHERE REG_date >= %d';
		$SQL .= ' GROUP BY `regDate`';
		$SQL .= ' ORDER BY REG_date DESC';
		
		return $wpdb->get_results( $wpdb->prepare( $SQL, $date_mod ));

	}





	/**
	*		get the number of registrations per event  for the Registration Admin page Reports Tab
	* 		@access		public
	*/
	public function get_registrations_per_event_report( $period = '-1 month' ) {

		global $wpdb;
		$date_mod = strtotime( $period );

		$SQL = "SELECT event_name, reg_limit, COUNT(REG_ID) AS total";
		$SQL .= ' FROM ' . $this->table_name . ' reg';
		$SQL .= ' LEFT JOIN ' . EVENTS_DETAIL_TABLE . ' evt ON evt.id = reg.EVT_ID';
		$SQL .= ' JOIN ' . $wpdb->prefix . 'esp_datetime dtt ON dtt.DTT_ID = reg.DTT_ID';
		$SQL .= ' WHERE REG_date >= %d';
		$SQL .= ' AND DTT_is_primary = 1';
		$SQL .= ' GROUP BY event_name';
		$SQL .= ' ORDER BY event_name';  // DTT_EVT_start
		$SQL .= ' LIMIT 0, 24';
		
		return $wpdb->get_results( $wpdb->prepare( $SQL, $date_mod ));

	}


	/**
	 * Returns the EE_Registration of the primary attendee on the transaction id provided
	 * @param int $TXN_ID
	 * @return EE_Registration
	 */
	public function get_primary_registration_for_transaction_ID( $TXN_ID = FALSE){
		if( ! $TXN_ID ){
			return false;
		}
		return $this->get_one(array('TXN_ID'=>$TXN_ID,'REG_count'=>  EEM_Registration::PRIMARY_REGISTRANT_COUNT));
	}

	/**
	*		get all registrations for a specific transaction, possibly excluding one (ie: get all OTHER registrations except this one )
	* 
	* 		@access		public
	* 		@param		int 			$TXN_ID
	* 		@param		int 			$REG_ID
	* 		@return		array
	*/
	public function get_registrations_for_transaction( $TXN_ID = FALSE, $REG_ID = FALSE ) {

		if ( ! $TXN_ID ) {
			return FALSE;
		}

		global $wpdb;

		$SQL = 'SELECT att.*, reg.*';
		$SQL .= ' FROM ' . $wpdb->prefix . 'esp_attendee att';
		$SQL .= ' RIGHT JOIN ' . $this->table_name . ' reg ON reg.ATT_ID = att.ATT_ID';
		$SQL .= ' WHERE reg.TXN_ID = %d';
		
		if ( $REG_ID ) {
			$SQL .= ' AND reg.REG_ID != %d';
			$attendees = $wpdb->get_row( $wpdb->prepare( $SQL, $TXN_ID, $REG_ID ));
		} else {
			$attendees = $wpdb->get_row( $wpdb->prepare( $SQL, $TXN_ID ));
		}
		
		if ( ! is_array( $attendees )) {
			$attendees = array( $attendees );
		}
		//printr( $attendee, 'attendee' ); die();		
		return $attendees;
		
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
		
		if ( ! $EVT_ID ) {
			$user_msg = __('An error occurred. The event registration count could not be calculated because an event ID was not received.', 'event_espresso');
			EE_Error::add_error( $user_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		global $wpdb, $org_options;
		
		$SQL = 'SELECT COUNT(reg.EVT_ID) FROM ' . $this->table_name . ' reg';
		$SQL .= $for_incomplete_payments ? ' JOIN ' . $wpdb->prefix . 'esp_transaction txn ON txn.TXN_ID = reg.TXN_ID' : '';
		$SQL .= ' WHERE reg.EVT_ID=%d AND ( reg.STS_ID="RAP"';
		$SQL .= $org_options['pending_counts_reg_limit'] ? ' OR reg.STS_ID="RPN")' : ')';		
		$SQL .= $for_incomplete_payments ? ' AND txn.STS_ID <> "TCM"' : '';

		$reg_count = $wpdb->get_var( $wpdb->prepare( $SQL, $EVT_ID ));
		
		if ( $reg_count !== FALSE ) {
			return $reg_count;
		} else {
			$user_msg = __('An error occurred. The event registration count could not be calculated because of a database error.', 'event_espresso');
			EE_Error::add_error( $user_msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}		
			
	}






	/**
	 *		This function inserts table data
	 *
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL INSERT
	 *		@return array
	 */
	public function insert ($set_column_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_insert( $this->table_name, $this->table_data_types, $set_column_values );
	}










	/**
	 *		This function updates table data
	 *
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL SET clause
	 *		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 *		@return array
	 */
	public function update ($set_column_values, $where_cols_n_values) {
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );
	}



}
// End of file EEM_Registration.model.php
// Location: /includes/models/EEM_Registration.model.php