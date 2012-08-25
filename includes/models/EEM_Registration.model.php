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




	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
	private function __construct() {
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_registration';
		// set item names
		$this->singlular_item = 'Registration';
		$this->plual_item = 'Registrations';		
		// array representation of the transaction table and the data types for each field
		// REG_ID 	EVT_ID 	ATT_ID 	TXN_ID 	DTT_ID 	PRC_ID 	STS_ID 	REG_date 	REG_session 	REG_code 	REG_is_primary 	REG_is_group_reg 	REG_att_is_going 	REG_att_checked_in
		$this->table_data_types = array (
			'REG_ID' 						=> '%d',
			'EVT_ID' 						=> '%d',
			'ATT_ID' 						=> '%d',
			'TXN_ID' 						=> '%d',
			'DTT_ID' 						=> '%d',
			'PRC_ID' 						=> '%d',
			'STS_ID' 						=> '%s',
			'REG_date' 					=> '%d',
			'REG_final_price' 		=> '%d',
			'REG_session' 				=> '%s',
			'REG_code'					=> '%s',
			'REG_url_link'				=> '%s',
			'REG_is_primary' 		=> '%d',
			'REG_is_group_reg' 	=> '%d',
			'REG_att_is_going' 		=> '%d',
			'REG_att_checked_in' => '%d',
		);
		// uncomment these for example code samples of how to use them
		//			$this->how_to_use_insert();
		//			$this->how_to_use_update();
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
	*		cycle though array of transactions and create objects out of each item
	*
	* 		@access		private
	* 		@param		array		$transactions
	*		@return 		mixed		array on success, FALSE on fail
	*/
	private function _create_objects( $registrations = FALSE ) {

		if ( ! $registrations ) {
			return FALSE;
		}

		foreach ( $registrations as $reg ) {
				$array_of_objects[ $reg->REG_ID ] = new EE_Registration(
						$reg->EVT_ID,
						$reg->ATT_ID,
						$reg->TXN_ID,
						$reg->DTT_ID,
						$reg->PRC_ID,
						$reg->STS_ID,
						$reg->REG_date,
						$reg->REG_final_price,
						$reg->REG_session,
						$reg->REG_code,
						$reg->REG_url_link,
						$reg->REG_is_primary,
						$reg->REG_is_group_reg,
						$reg->REG_att_is_going,
						$reg->REG_att_checked_in,
						$reg->REG_ID
				 	);

		}
		return $array_of_objects;

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
	public function get_registrations_for_admin_page( $EVT_ID = FALSE, $CAT_ID = FALSE, $reg_status = FALSE, $month_range = FALSE, $today_a = FALSE, $this_month_a = FALSE, $start_date = FALSE, $end_date = FALSE ) {

		global $wpdb;

		//Dates
		$curdate = date('Y-m-d');
		$this_year_r = date('Y');
		$this_month_r = date('m');
		$days_this_month = date( 't' );
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

			$SQL .= 'SELECT att.*, reg.*, dtt.*, reg.STS_ID REG_status, evt.id event_id, evt.event_name, evt.require_pre_approval, txn.TXN_ID, TXN_timestamp, TXN_total, txn.STS_ID TXN_status, TXN_details, TXN_tax_data, PRC_amount, PRC_name';
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
				$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . $curdate . $time_start . '" AND "' . $curdate . $time_end  . '"';
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

		$SQL .= 'SELECT att.*, reg.*, dtt.*, reg.STS_ID REG_status, evt.id event_id, evt.event_name, evt.require_pre_approval, txn.TXN_ID, TXN_timestamp, TXN_total, txn.STS_ID txn_status, TXN_details, TXN_tax_data, PRC_amount, PRC_name';
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
			$SQL .= $sql_clause .' reg.REG_date BETWEEN "' . $curdate . $time_start . '" AND "' . $curdate . $time_end  . '"';
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
		$SQL .= ') ORDER BY reg.REG_date DESC, reg.EVT_ID ASC';

		$registrations = $wpdb->get_results( $SQL );

// echo '<h4>last_query : ' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
// printr( $registrations, '$registrations' );
// die();

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