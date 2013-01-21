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
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_TempBase.model.php' );

class EEM_Answer extends EEM_TempBase {
	protected $_fieldsSettings;
	//nicename, type, nullable, options(class, enumvalues,
  	// private instance of the Attendee object
	private static $_instance = NULL;

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

	protected function __construct(){
		$this->_fieldsSettings=array('ANS_ID'=>new EE_ModelField('Answer ID', 'primary_key', false),
									'REG_ID'=>new EE_ModelField('Registration ID', 'foreign_key', false,0,null,'Registration'),
									'QST_ID'=>new EE_ModelField('Question ID', 'foreign_key', false,0,null,'Question'),
									'ANS_value'=>new EE_ModelField('Answer Value/Text', 'simplehtml', false,''));
		parent::__construct();
	}



	




	/**
	*		retreive  ALL attendees from db
	* 
	* 		@access		public
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function get_all_answers( $orderby = 'REG_ID', $sort = 'ASC' ) {
	
		// retreive all attendees	
		if ( $answers = $this->select_all ( $orderby, $sort )) {
			return $this->_create_objects( $answers );
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