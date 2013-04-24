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
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );

class EEM_Answer extends EEM_Base {

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
		$this->_tables = array(
			'Answer'=> new EE_Primary_Table('esp_answer', 'ANS_ID')
		);
		$this->_fields = array(
			'Answer'=>array(
				'ANS_ID'=> new EE_Primary_Key_Int_Field('ANS_ID', 'Answer ID', false, 0),
				'REG_ID'=>new EE_Foreign_Key_Int_Field('REG_ID', 'Registration ID', false, 0, 'Registration'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', 'Quesetion ID', false, 0, 'Question'),
				'ANS_value'=>new EE_Simple_HTML_Field('ANS_value', 'Answer Value', false, '')
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Belongs_To_Relation(),
			'Question'=>new EE_Belongs_To_Relation()
		);
		
		parent::__construct();
	}
}
// End of file EEM_Answer.model.php
// Location: /includes/models/EEM_Answer.model.php
