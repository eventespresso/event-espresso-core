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
 * Attendee Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );

class EEM_Attendee extends EEM_Base {

  	// private instance of the Attendee object
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
		$this->table_name = $wpdb->prefix . 'esp_attendee';
		// array representation of the attendee table and the data types for each field 
		$this->table_data_types = array (	
			'ATT_ID' 					=> '%d',
			'ATT_fname' 			=> '%s',
			'ATT_lname' 			=> '%s',
			'ATT_address'			=> '%s',
			'ATT_address2'		=> '%s',
			'ATT_city'					=> '%s',
			'STA_ID'					=> '%d',
			'CNT_ISO'				=> '%s',
			'ATT_zip'					=> '%s',
			'ATT_email'				=> '%s',
			'ATT_phone'			=> '%s',
			'ATT_social'				=> '%s',
			'ATT_comments'		=> '%s',
			'ATT_notes'				=> '%s',
			'ATT_deleted'			=> '%d'
		);
		// load Attendee object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Attendee.class.php');
	
		// uncomment these for example code samples of how to use them
		//			self::how_to_use_insert();
		//			self::how_to_use_update();
	}

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Attendee instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}




	/**
	*		cycle though array of attendees and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$attendees		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	private function _create_objects( $attendees = FALSE ) {

		if ( ! $attendees ) {
			return FALSE;
		} 		

		foreach ( $attendees as $attendee ) {
				$array_of_objects[ $attendee->ATT_ID ] = new EE_Attendee(
						$attendee->ATT_fname,
						$attendee->ATT_lname,
						$attendee->ATT_address,
						$attendee->ATT_address2,
						$attendee->ATT_city,
						$attendee->STA_ID,
						$attendee->CNT_ISO,
						$attendee->ATT_zip,
						$attendee->ATT_email,
						$attendee->ATT_phone,
						$attendee->ATT_social,
						$attendee->ATT_comments,
						$attendee->ATT_notes,
						$attendee->ATT_deleted,
						$attendee->ATT_ID
				 	);
		}	
		return $array_of_objects;	

	}




	/**
	*		retreive  ALL attendees from db
	* 
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_all_attendees( $orderby = 'ATT_lname', $sort = 'ASC', $limit = FALSE, $output = 'OBJECT_K' ) {
	
		// retreive all attendees	
		if ( $attendees = $this->select_all ( $orderby, $sort, $limit )) {
			return $this->_create_objects( $attendees );
		} else {
			return FALSE;
		}
		
	}




	




	/**
	*		retreive  a single attendee from db via their ID
	* 
	* 		@access		public
	* 		@param		$ATT_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_attendee_by_ID( $ATT_ID = FALSE ) {

		if ( ! $ATT_ID ) {
			return FALSE;
		}
		// retreive a particular transaction
		$where_cols_n_values = array( 'ATT_ID' => $ATT_ID );
		if ( $attendee = $this->select_row_where ( $where_cols_n_values )) {
			$attendee_array = $this->_create_objects( array( $attendee ));
			return array_shift( $attendee_array );
		} else {
			return FALSE;
		}

	}




	/**
	*		retreive  a single attendee from db via their ID
	* 
	* 		@access		public
	* 		@param		$ATT_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_attendee( $where_cols_n_values = FALSE ) {

		if ( ! $where_cols_n_values ) {
			return FALSE;
		}

		if ( $attendee = $this->select_row_where ( $where_cols_n_values )) {
			$attendee_array = $this->_create_objects( array( $attendee ));
			return array_shift( $attendee_array );
		} else {
			return FALSE;
		}

	}






	/**
	*		Search for an existing Attendee record in the DB
	* 		@access		public
	*/	
	public function find_existing_attendee( $where_cols_n_values = FALSE ) {

		// no search params means attendee object already exists
		if ( ! $where_cols_n_values ) {
			// search by combo of first and last names plus the email address
			$where_cols_n_values = array( 'ATT_fname' => $this->_ATT_fname, 'ATT_lname' => $this->_ATT_lname, 'ATT_email' => $this->_ATT_email );  	 
		}
		
		if ( $attendee = $this->get_attendee( $where_cols_n_values )) {
			return $attendee;
		} else {
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
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );	
	}




	/**
	*		delete  a single attendee from db via their ID
	* 
	* 		@access		public
	* 		@param		$ATT_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function delete_attendee_by_ID( $ATT_ID = FALSE ) {

		if ( ! $ATT_ID ) {
			return FALSE;
		}
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php');
		$REG_MDL = EEM_Registration::instance();
		//check if the attendee is associated with any registrations
		if ( $registrations = $REG_MDL->get_all_registrations_for_attendee( $ATT_ID )) {
			$msg = __( 'The Attendee could not be deleted because there are existing Registrations associated with this Attendee.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		} 
				
		// retreive a particular transaction
		$where_cols_n_values = array( 'ATT_ID' => $ATT_ID );
		if ( $attendee = $this->delete ( $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}




}
// End of file EEM_Attendee.model.php
// Location: /ee-mvc/models/EEM_Attendee.model.php