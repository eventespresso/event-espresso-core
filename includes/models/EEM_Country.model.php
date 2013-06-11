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
 * Country Model
 *
 * @package			Event Espresso
 * @subpackage	includes/models/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_TempBase.model.php' );

class EEM_Country extends EEM_TempBase {

  	// private instance of the Attendee object
	private static $_instance = NULL;
  	// array of all countries
	private static $_all_countries = FALSE;
  	// array of all active countries
	private static $_active_countries = FALSE;



	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Country object
	 *
	 *		@access public
	 *		@return EEM_Country instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Country already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Country object
		return self::$_instance;
	}

	protected function __construct(){
		$this->singlular_item = __('Country','event_espresso');
		$this->plural_item = __('Countries','event_espresso');
		// CNT_ISO 	CNT_ISO3 	RGN_ID 	CNT_name 	CNT_cur_code 	CNT_cur_single 	CNT_cur_plural 	CNT_cur_sign 	CNT_cur_sign_b4 	CNT_cur_dec 	CNT_tel_code 	CNT_is_EU 	CNT_active
		$this->_fields_settings=array(
				'CNT_ISO'					=>new EE_Model_Field( 'Country ISO Code', 'primary_text_key', FALSE ),
				'CNT_ISO3'				=>new EE_Model_Field( 'Country ISO3 Code', 'plaintext', FALSE ),
				'RGN_ID'					=>new EE_Model_Field( 'Region ID', 'foreign_key', TRUE, NULL, NULL, 'Region' ),
				'CNT_name'				=>new EE_Model_Field( 'Country Name', 'plaintext', FALSE ),
				'CNT_cur_code'			=>new EE_Model_Field( 'Currency Code', 'plaintext', FALSE ),
				'CNT_cur_single'		=>new EE_Model_Field( 'Currency Name Singular', 'plaintext', FALSE ),
				'CNT_cur_plural'		=>new EE_Model_Field( 'Currency Name Plural', 'plaintext', FALSE ),
				'CNT_cur_sign'			=>new EE_Model_Field( 'Currency Sign', 'plaintext', FALSE ),
				'CNT_cur_sign_b4'	=>new EE_Model_Field( 'Currency Sign Before Number', 'plaintext', FALSE ),
				'CNT_cur_dec_plc'		=>new EE_Model_Field( 'Currency Decimal Places', 'plaintext', FALSE ),
				'CNT_cur_dec_mrk'	=>new EE_Model_Field( 'Currency Decimal Mark', 'plaintext', FALSE ),
				'CNT_cur_thsnds'		=>new EE_Model_Field( 'Currency Thousands Separator', 'plaintext', FALSE ),
				'CNT_tel_code'			=>new EE_Model_Field( 'Country Telephone Code', 'plaintext', FALSE ),
				'CNT_is_EU'				=>new EE_Model_Field( 'Country is Member of EU', 'plaintext', FALSE ),
				'CNT_active'				=>new EE_Model_Field( 'Activate Country', 'bool', FALSE )
			);
		$this->_related_models=array(
				'Region'=>new EE_Model_Relation('belongsTo', 'Region', 'RGN_ID')
			);
		
		parent::__construct();
	}


	/**
	*		_get_countries
	* 
	* 		@access		private
	*		@return 		void
	*/	
	public function get_all_countries() {
		if ( ! self::$_all_countries ) {
			self::$_all_countries = self::instance()->get_all( NULL, 'ASC', array( 0,99999 ));
		}
		return self::$_all_countries;
	}

	/**
	*		_get_countries
	* 
	* 		@access		private
	*		@return 		void
	*/	
	public function get_all_active_countries() {
		if ( ! self::$_active_countries ) {
			self::$_active_countries =  self::instance()->get_all_where( array( 'CNT_active' => 1 ), NULL, 'ASC', '=', array( 0,99999 ));
		}
		return self::$_active_countries;
	}


	/**
	*		delete  a single answer from db via their ID
	* 
	* 		@access		public
	* 		@param		$CNT_ISO		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function delete_by_ID( $CNT_ISO = FALSE ) {

		if ( ! $CNT_ISO ) {
			return FALSE;
		}
				
		// retreive a particular transaction
		$where_cols_n_values = array( 'CNT_ISO' => $CNT_ISO );
		if ( $answer = $this->delete ( $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}
	




}
// End of file EEM_Country.model.php
// Location: /includes/models/EEM_Country.model.php
