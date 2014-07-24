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
require_once ( EE_MODELS . 'EEM_Base.model.php' );
require_once ( EE_CLASSES . 'EE_State.class.php' );

class EEM_State extends EEM_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;
  	// array of all states
	private static $_all_states = FALSE;
  	// array of all active states
	private static $_active_states = FALSE;



	/**
	 *		This function is a singleton method used to instantiate the EEM_State object
	 *
	 *		@access public
	 *		@return EEM_State instance
	 */
	public static function instance() {
		// check if instance of EEM_State already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self();
		}
		// EEM_State object
		return self::$_instance;
	}

	/**
	 * resets the model and returns it
	 * @return EEM_State
	 */
	public static function reset(){
		self::$_instance = NULL;
		return self::instance();
	}

	protected function __construct(){
		$this->singular_item = __('State/Province','event_espresso');
		$this->plural_item = __('States/Provinces','event_espresso');

		$this->_tables = array(
			'State'=> new EE_Primary_Table('esp_state', 'STA_ID')
		);

		$this->_fields = array(
			'State'=>array(
				'STA_ID'=> new EE_Primary_Key_Int_Field('STA_ID', __('State ID','event_espresso')),
				'CNT_ISO'=> new EE_Foreign_Key_String_Field('CNT_ISO', __('Country ISO Code','event_espresso'), false, NULL, 'Country'),
				'STA_abbrev' => new EE_Plain_Text_Field('STA_abbrev', __('State Abbreviation','event_espresso'), false, ''),
				'STA_name' => new EE_Plain_Text_Field('STA_name', __('State Name','event_espresso'), false, ''),
				'STA_active'=> new EE_Boolean_Field('STA_active', __("State Active Flag", "event_espresso"), false, false)
				));
		$this->_model_relations = array(
			'Attendee'=>new EE_Has_Many_Relation(),
			'Country' => new EE_Belongs_To_Relation(),
			'Venue'=>new EE_Has_Many_Relation(),
		);
		parent::__construct();
	}




	/**
	*	reset_cached_states
	*
	* 	@access		private
	*	@return 		void
	*/
	public function reset_cached_states() {
		EEM_State::$_active_states = array();
		EEM_State::$_all_states = array();
	}




	/**
	*		_get_states
	*
	* 		@access		private
	*		@return 		void
	*/
	public function get_all_states() {
		if ( ! self::$_all_states ) {
			self::$_all_states = $this->get_all( array( 'order_by'=>array( 'STA_name'=>'ASC' ), 'limit'=> array( 0, 99999 )));
		}
		return self::$_all_states;
	}

	/**
	*		_get_states
	*
	* 		@access		private
	*		@return 		void
	*/
	public function get_all_active_states() {
		if ( ! self::$_active_states ) {
			self::$_active_states =  $this->get_all( array( array( 'STA_active' => TRUE ), 'order_by'=>array( 'STA_name'=>'ASC' ), 'limit'=>array( 0, 99999 )));
		}
		return self::$_active_states;
	}



	/**
	 * 	get_all_states_of_active_countries
	 * @return array
	 */
	public function get_all_states_of_active_countries(){
		if ( $states = $this->get_all( array( array( 'Country.CNT_active' => TRUE, 'STA_active' => TRUE ),  'order_by' => array( 'Country.CNT_name' => 'ASC', 'STA_name' => 'ASC' )))) {
			return $states;
		}
		return FALSE;
	}



	/**
	 * 	get_all_states_of_active_countries
	 * @return array
	 */
	public function get_all_active_states_for_these_countries( $countries ){
		if ( ! $countries ) {
			return FALSE;
		}
		if ( $states = $this->get_all( array(  array( 'Country.CNT_ISO' => array( 'IN', array_keys( $countries )), 'STA_active' => TRUE ),  'order_by' => array( 'Country.CNT_name' => 'ASC', 'STA_name' => 'ASC' )))) {
			return $states;
		}
		return FALSE;
	}



	/**
	 * 	get_all_states_of_active_countries
	 * @return array
	 */
	public function get_all_states_for_these_countries( $countries ){
		if ( ! $countries ) {
			return FALSE;
		}
		if ( $states = $this->get_all( array( array( 'Country.CNT_ISO' => array( 'IN', array_keys( $countries ))),  'order_by' => array( 'Country.CNT_name' => 'ASC', 'STA_name' => 'ASC' )))) {
			return $states;
		}
		return FALSE;
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

		// retrieve a particular transaction
		$where_cols_n_values = array( array( 'STA_ID' => $STA_ID ));
		if ( $answer = $this->delete ( $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}



}
// End of file EEM_State.model.php
// Location: /includes/models/EEM_State.model.php
