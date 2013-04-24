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
 * Question Group Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Soft_Delete_Base.model.php' );

class EEM_Question_Group extends EEM_Soft_Delete_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Question_Group instance
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
		$this->singular_item = __('Question Group','event_espresso');
		$this->plural_item = __('Question Groups','event_espresso');
//		$this->_fields_settings=array(
//					'QSG_ID'=>new EE_Model_Field('Question Group ID', 'primary_key', false, null, null, null),
//					'QSG_name'=>new EE_Model_Field('Question Gruop Name', 'plaintext', false, '', null, null),
//					'QSG_identifier'=>new EE_Model_Field('Question Group identifier', 'plaintext', false, '', null, null),
//					'QSG_desc'=>new EE_Model_Field('Question Group Description', 'simplehtml', false, '', null, null),
//					'QSG_order'=>new EE_Model_Field('Question Order','int',false,0,null,null),
//					'QSG_show_group_name'=>new EE_Model_Field('Show Question Group Name?', 'bool', false, true, null, null),
//					'QSG_show_group_desc'=>new EE_Model_Field('Show Question Group Description?', 'bool', false, true, null, null),
//					'QSG_system_ID'=>new EE_Model_Field('Is an internal-system Question Group', 'bool', false, false, null, null),
//					'QSG_deleted'=>new EE_Model_Field('Is Question Group deleted?', 'deleted_flag', false, false, null, null)
//				);
//		$this->_related_models=array(
//				'Questions'=>new EE_Model_Relation('hasAndBelongsToMany', 'Question', 'QST_ID','question_group_question',
//						array(
//							'QGQ_ID'=>new EE_Model_Field('Question Group-Question ID', 'primary_key', false, null, null, null),
//							'QSG_ID'=>new EE_Model_Field('Foreign Key to Question Groups', 'foreign_key', false, null, null, 'Question_Group'),
//							'QST_ID'=>new EE_Model_Field('Foreign Key to Questions','foreign_key',false,null,null,'Question')
//						)
//					)
//				);
		$this->_tables = array(
			'Question_Group'=>new EE_Primary_Table('esp_question_group','QSG_ID')
		);
		$this->_fields = array(
			'Question_Group'=>array(
				'QSG_ID'=>new EE_Primary_Key_Int_Field('QSG_ID', 'Question Group ID', false, 0),
				'QSG_name'=>new EE_Plain_Text_Field('QSG_name', 'Question Group Name', false, ''),
				'QSG_identifier'=>new EE_Plain_Text_Field('QSG_identifier', 'Text ID for question Group', false, ''),
				'QSG_desc'=>new EE_Full_HTML_Field('QSG_desc', 'Description of Question Group', true, ''),
				'QSG_order'=>new EE_Integer_Field('QSG_order', 'Order in which to show the question group', true, 0),
				'QSG_show_group_name'=>new EE_Boolean_Field('QSG_show_group_name', 'Flag indicating whether to show the group\'s name on the registration page', false, false),
				'QSG_show_group_desc'=>new EE_Boolean_Field('QSG_show_group_desc', 'Flag indicating whether to show the group\s description on the registration apge', false, false),
				'QSG_system_ID'=>new EE_Integer_Field('QSG_system_ID', 'Unique ID indicating the question group is essential', false, 0),
				'QSG_deleted'=>new EE_Trashed_Flag_Field('QSG_deleted', 'Flag indicating this question group was deleted', false, false)
			)
		);
		$this->_model_relations = array(
			'Question'=>new EE_Has_Many_Relation(),
			'Event'=>new EE_HABTM_Relation('Event_Question_Group'),
			'Event_Question_Group'=>new EE_Has_Many_Relation()
		);
		parent::__construct();
	}
}
// End of file EEM_Question.model.php
// Location: /includes/models/EEM_Question.model.php
