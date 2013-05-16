<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0.B
 *
 * ------------------------------------------------------------------------
 *
 * State Model
 *
 * @package			Event Espresso
 * @subpackage	includes/models/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_TempBase.model.php' );

class EEM_State extends EEM_TempBase {

  	// private instance of the Attendee object
	private static $_instance = NULL;

  	// array of all states
	public static $all_states = FALSE;

  	// array of all active states
	public static $active_states = FALSE;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_State object
	 *
	 *		@access public
	 *		@return EEM_State instance
	 */	
	public static function instance() {	
		// check if instance of EEM_State already exists
		if ( self::$_instance === NULL ) {
			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
			var_dump( self::$_instance );
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_State object
		return self::$_instance;
	}

	protected function __construct(){
		$this->singlular_item = __('State','event_espresso');
		$this->plural_item = __('States','event_espresso');
		//STA_ID 	CNT_ISO 	STA_abbrev 	STA_name 	STA_active
		$this->_fields_settings=array(
				'STA_ID'			=>new EE_Model_Field( 'State ID', 'primary_key', FALSE ),
				'CNT_ISO'		=>new EE_Model_Field( 'Country ISO Code', 'foreign_text_key', FALSE, 1, NULL, 'Country' ),
				'STA_abbrev'	=>new EE_Model_Field( 'State Abbreviation', 'plaintext', FALSE ),
				'STA_name'	=>new EE_Model_Field( 'State Name', 'plaintext', FALSE ),
				'STA_active'	=>new EE_Model_Field( 'State Active Flag', 'plaintext', FALSE )
			);
		$this->_related_models=array(
				'Country'=>new EE_Model_Relation( 'belongsTo', 'Country', 'CNT_ISO' )
			);
		
		parent::__construct();
		if ( ! self::$all_states ) {
			$this->_set_states();
		}
		
	}


	/**
	*		_get_states
	* 
	* 		@access		private
	*		@return 		void
	*/	
	private function _set_states() {		
		self::$all_states = $this->get_all();
		printr( self::$all_states, 'self::$all_states  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		self::$active_states = $this->get_all_where( array( 'STA_active' => 1 ));
	}




	/**
	*		delete  a single state from db via their ID
	* 
	* 		@access		public
	* 		@param		$STA_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function delete_by_ID( $STA_ID = FALSE ) {

		if ( ! $STA_ID ) {
			return FALSE;
		}
				
		// retreive a particular transaction
		$where_cols_n_values = array( 'STA_ID' => $STA_ID );
		if ( $answer = $this->delete ( $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}
	




}
// End of file EEM_State.model.php
// Location: /includes/models/EEM_State.model.php
