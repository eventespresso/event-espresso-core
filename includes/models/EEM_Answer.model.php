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
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_TempBase.model.php' );

class EEM_Answer extends EEM_TempBase {

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
		$this->singlular_item = __('Answer','event_espresso');
		$this->plural_item = __('Answers','event_espresso');
		$this->_fields_settings=array(
				'ANS_ID'=>new EE_Model_Field('Answer ID', 'primary_key', false),
				'REG_ID'=>new EE_Model_Field('Registration ID', 'foreign_key', false,0,null,'Registration'),
				'QST_ID'=>new EE_Model_Field('Question ID', 'foreign_key', false,0,null,'Question'),
				'ANS_value'=>new EE_Model_Field('Answer Value/Text', 'simplehtml', false,'')
			);
		$this->_related_models=array(
				'Registration'=>new EE_Model_Relation('belongsTo', 'Registration', 'REG_ID'),
				'Question'=>new EE_Model_Relation('belongsTo', 'Question', 'QST_ID')
			);
		
		parent::__construct();
	}


	/**
	*		delete  a single answer from db via their ID
	* 
	* 		@access		public
	* 		@param		$ANS_ID		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	public function delete_by_ID( $ANS_ID = FALSE ) {

		if ( ! $ANS_ID ) {
			return FALSE;
		}
				
		// retreive a particular transaction
		$where_cols_n_values = array( 'ANS_ID' => $ANS_ID );
		if ( $answer = $this->delete ( $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}

	}
	




}
// End of file EEM_Answer.model.php
// Location: /includes/models/EEM_Answer.model.php
