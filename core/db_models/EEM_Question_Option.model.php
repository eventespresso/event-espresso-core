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
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Question Group Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once( EE_CLASSES . 'EE_Question_Option.class.php');


class EEM_Question_Option extends EEM_Soft_Delete_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This function is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Question_Option instance
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
		$this->singular_item = __('Question Option','event_espresso');
		$this->plural_item = __('Question Options','event_espresso');

		$this->_tables = array(
			'Question_Option'=>new EE_Primary_Table('esp_question_option','QSG_ID')
		);
		$this->_fields = array(
			'Question_Option'=>array(
					'QSO_ID'=>new EE_Primary_Key_Int_Field('QSO_ID', __('Question Option ID','event_espresso')),
					'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Question ID','event_espresso'), false, 0, 'Question'),
					'QSO_value'=>new EE_Plain_Text_Field('QSO_value',  __("Question Option Value", "event_espresso"),false,''),
					'QSO_desc'=>new EE_Full_HTML_Field('QSO_desc', __('Question Option Description','event_espresso'), false, ''),
					'QSO_order' => new EE_Integer_Field('QSO_order', __('Question Option Order', 'event_espresso' ), false, 0 ),
					'QSO_deleted'=>new EE_Trashed_Flag_Field('QSO_deleted', __('Flag indicating Option was trashed','event_espresso'), false, false)
				)
		);
		$this->_model_relations = array(
			'Question'=>new EE_Belongs_To_Relation()
		);

		parent::__construct();
	}




}
// End of file EEM_Question_Option.model.php
// Location: /includes/models/EEM_Question_Option.model.php