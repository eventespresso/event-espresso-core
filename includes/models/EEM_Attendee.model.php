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

class EEM_Attendee extends EEM_Soft_Delete_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;
	
	/**
	 * QST_ID and QST_system_IDs that relate to attendee attributes.
	 */
	const fname_question_id=1;
	const lname_question_id=2;
	const email_question_id=3;
	const address_question_id=4;
	const address2_question_id=5;
	const city_question_id=6;
	const state_question_id=7;
	const country_question_id=8;
	const zip_question_id=9;
	const phone_question_id=10;




	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
	private function __construct() {	
		// load Attendee object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Attendee.class.php');
		$this->_fields_settings=array('ATT_ID'=>new EE_Model_Field('Attendee ID', 'primary_key', false),
									'ATT_fname'=>new EE_Model_Field('First Name', 'plaintext', false),
									'ATT_lname'=>new EE_Model_Field('Last Name','plaintext',false),
									'ATT_address'=>new EE_Model_Field('Address1','plaintext',true),
									'ATT_address2'=>new EE_Model_Field('Address2','plaintext',true),
									'ATT_city'=>new EE_Model_Field('City','plaintext',true),
									'STA_ID'=>new EE_Model_Field('State ID','foreign_key',true,0,null,'State'),
									'CNT_ISO'=>new EE_Model_Field('Country Code','foreign_key',true,0,null,'Country'),
									'ATT_zip'=>new EE_Model_Field('Zip/Postal Code', 'plaintext', true, ''),
									'ATT_email'=>new EE_Model_Field('Email', 'plaintext', false, ''),
									'ATT_phone'=>new EE_Model_Field('Phone', 'plaintext', true),
									'ATT_social'=>new EE_Model_Field('Social Media Details','serializedtext',true),
									'ATT_comments'=>new EE_Model_Field('Comments','simplehtml',true),
									'ATT_notes'=>new EE_Model_Field('Notes', 'simplehtml', true),
									'ATT_deleted'=>new EE_Model_Field('Deleted flag', 'deleted_flag', false,0),
			);
		$this->_related_models=array(
								'Registrations'=>new EE_Model_Relation('belongsTo', 'Registration', 'ATT_ID'));
		parent::__construct();
		
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
	protected function _create_objects( $attendees = FALSE ) {

		$array_of_objects=array();

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
		if ( $attendees = $this->select_all ( $orderby, $sort, $limit, $output )) {
			return $output != 'COUNT' ? $this->_create_objects( $attendees ) : $attendees;
		} else {
			return FALSE;
		}
		
	}





	/**
	 * retrieve all "in use" attendees (i.e. non trashed)
	 * @param  string  $orderby field to orderby
	 * @param  string  $sort    field to sortby
	 * @param  mixed $limit   if FALSE no limit other wise limit an array with offset and limit.
	 * @param  string  $output  WP data type to return OR 'COUNT' to return count.
	 * @return mixed           FALSE if no data, count or array of attendee objects.
	 */
	public function get_all_inuse_attendees( $orderby = 'ATT_lname', $sort = 'ASC', $limit = FALSE, $output = 'OBJECT_K' ) {
		
		$where = array(
			'ATT_deleted' => 0
			);

		// retreive all attendees	
		if ( $attendees = $this->select_all_where( $where, $orderby, $sort, '=', $limit, $output )) {

			return $output != 'COUNT' ? $this->_create_objects( $attendees ) : $attendees;
		} else {
			return FALSE;
		}
		
	}






	/**
	 * retrieve all "trashed" attendees
	 * @param  boolean $count whether to return the count or not
	 * @return mixed         array (attendee objects) or int (count)  or bool (FALSE on fail)
	 */
	public function get_all_trashed_attendees( $orderby, $sort, $limit, $count = FALSE ) {

		$where = array(
			'ATT_deleted' => 1
			);

		$attendees = $count ? $this->select_all_where(  $where, $orderby, $sort, '=', $limit, 'COUNT') : $this->select_all_where( $where, $orderby, $sort, '=', $limit );

		if ( empty($attendees) || $attendees === FALSE || is_wp_error($attendees) )
			return FALSE;

		return $count ? $attendees : $this->_create_objects( $attendees );

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