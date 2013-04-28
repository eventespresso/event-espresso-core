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
 * Question Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Soft_Delete_Base.model.php' );

class EEM_Question extends EEM_Soft_Delete_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Question instance
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
	 * lists all the question types which should be allowed. Ideally, this will be extensible.
	 * @access private
	 * @var array of strings 
	 */
	private $_allowed_question_types;
	/**
	 * Returns the list of allowed question types, which are normally: 'TEXT','TEXTAREA','SINGLE','DROPDOWN','MULTIPLE','DATE'
	 * but they can be extended
	 * @return string[]
	 */
	public function allowed_question_types(){
		return $this->_allowed_question_types;
	}
	protected function __construct(){
		$this->singular_item = __('Question','event_espresso');
		$this->plural_item = __('Questions','event_espresso');
		$this->_allowed_question_types=apply_filters('filter_hook_espresso_allowed_question_types',array('TEXT','TEXTAREA','SINGLE','DROPDOWN','MULTIPLE','DATE'));
//		$this->_fields_settings=array(
//				'QST_ID'=>new EE_Model_Field( __('Question ID','event_espresso'), 'primary_key', false, null, null, null),
//				'QST_display_text'=>new EE_Model_Field( __('Question Text','event_espresso'), 'simplehtml', false, '', null, null),
//				'QST_admin_label'=>new EE_Model_Field( __('Admin Label','event_espresso'), 'simplehtml', false, '', null, null),
//				'QST_system_ID'=>new EE_Model_Field( __('System ID','event_espresso'), 'int', false, 0, null, null),
//				'QST_type'=>new EE_Model_Field( __('Question Type','event_espresso'), 'enum', false, 'TEXT', $this->allowed_question_types(), null),
//				'QST_required'=>new EE_Model_Field( __('Required','event_espresso'),'bool',false,false,null,null),
//				'QST_required_text'=>new EE_Model_Field( __('Required Text','event_espresso'), 'simplehtml', true,  __('This field is required','event_espresso'), null, null),
//				'QST_order'=>new EE_Model_Field( __('Order','event_espresso'), 'int', false, 0, null, null),
//				'QST_admin_only'=>new EE_Model_Field( __('For Admins Only','event_espresso'),'bool',false,false,null,null),
//				'QST_wp_user'=>new EE_Model_Field( __('WP User ID','event_espresso'), 'foreign_key', true, 1, null, 'WP_User'),
//				'QST_deleted'=>new EE_Model_Field( __('Deleted','event_espresso'),'deleted_flag',false,false,null,null)
//			);
//		$this->_related_models=array(
//				'Answers'=>new EE_Model_Relation('hasMany', 'Answer', 'QST_ID'),
//				'Question_Groups'=>new EE_Model_Relation('hasAndBelongsToMany', 'Question_Group', 'QSG_ID','question_group_question',
//						array(
//							'QGQ_ID'=>new EE_Model_Field('Question Group-Question ID', 'primary_key', false, null, null, null),
//							'QSG_ID'=>new EE_Model_Field('Foreign Key to Question Groups', 'foreign_key', false, null, null, 'Question_Group'),
//							'QST_ID'=>new EE_Model_Field('Foreign Key to Questions','foreign_key',false,null,null,'Question'))
//						),
//				'Question_Options'=>new EE_Model_Relation('hasMany', 'Question_Option', 'QST_ID', null, null)
//			);
		$this->_tables = array(
			'Question'=>new EE_Primary_Table('esp_question','QST_ID')
		);
		$this->_fields = array(
			'Question'=>array(
				'QST_ID'=>new EE_Primary_Key_Int_Field('QST_ID', 'Question ID', false, 0),
				'QST_display_text'=>new EE_Full_HTML_Field('QST_display_text', 'Text for displaying Question', true, ''),
				'QST_admin_label'=>new EE_Simple_HTML_Field('QST_admin_label', 'Label given to question for admin', true, ''),
				'QST_system_ID'=>new EE_Integer_Field('QST_system_ID', 'Internal string ID for question', true, 0),
				'QST_type'=>new EE_Enum_Field('QST_type', 'type of Question', false, 'TEXT',$this->_allowed_question_types),
				'QST_required'=>new EE_Boolean_Field('QST_required', 'Flag indicating if question is required', false, false),
				'QST_required_text'=>new EE_Simple_HTML_Field('QST_required_text', 'Text to display is user doesnt answer question', true, ''),
				'QST_order'=>new EE_Integer_Field('QST_order', 'Question Order', false, 0),
				'QST_admin_only'=>new EE_Boolean_Field('QST_admin_only', 'Flag indicating whether question is only for admin', false, false),
				'QST_wp_user'=>new EE_Integer_Field('QST_wp_user', 'Wp User ID who created question', false, 1),
				'QST_deleted'=>new EE_Trashed_Flag_Field('QST_deleted', 'Flag Indicating question was deleted', false, false)
			)
		);
		$this->_model_relations = array(
			'Question_Group'=>new EE_HABTM_Relation('Question_Group_Question'),
			'Answer'=>new EE_Has_Many_Relation()
		);
		
		parent::__construct();
	}
	
	
	//function get_system_questions





}
// End of file EEM_Question.model.php
// Location: /includes/models/EEM_Question.model.php