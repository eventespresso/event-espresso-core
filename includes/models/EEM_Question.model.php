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
		$this->_allowed_question_types=apply_filters('filter_hook_espresso_allowed_question_types',array('TEXT','TEXTAREA','SINGLE','DROPDOWN','MULTIPLE','DATE'));
		$this->_fields_settings=array(
				'QST_ID'=>new EE_Model_Field('Question ID', 'primary_key', false, null, null, null),
				'QST_display_text'=>new EE_Model_Field('Question Text', 'simplehtml', false, '', null, null),
				'QST_admin_label'=>new EE_Model_Field('Admin Label', 'simplehtml', false, '', null, null),
				'QST_system_ID'=>new EE_Model_Field('System ID', 'int', false, 0, null, null),
				'QST_type'=>new EE_Model_Field('Question Type', 'enum', false, 'TEXT', $this->allowed_question_types(), null),
				'QST_required'=>new EE_Model_Field('Required','bool',false,false,null,null),
				'QST_required_text'=>new EE_Model_Field('Required Text', 'simplehtml', true, 'This field is required', null, null),
				'QST_order'=>new EE_Model_Field('Order', 'int', false, 0, null, null),
				'QST_admin_only'=>new EE_Model_Field('For Admins Only','bool',false,false,null,null),
				'QST_wp_user'=>new EE_Model_Field('WP User ID', 'foreign_key', true, 1, null, 'WP_User'),
				'QST_deleted'=>new EE_Model_Field('Deleted','deleted_flag',false,false,null,null)
			);
		$this->_related_models=array(
				'Answers'=>new EE_Model_Relation('hasMany', 'Answer', 'QST_ID'),
				'Question_Groups'=>new EE_Model_Relation('hasAndBelongsToMany', 'Question_Group', 'QSG_ID','question_group_question',
						array(
							'QGQ_ID'=>new EE_Model_Field('Question Group-Question ID', 'primary_key', false, null, null, null),
							'QSG_ID'=>new EE_Model_Field('Foreign Key to Question Groups', 'foreign_key', false, null, null, 'Question_Group'),
							'QST_ID'=>new EE_Model_Field('Foreign Key to Questions','foreign_key',false,null,null,'Question'))
						),
				'Question_Options'=>new EE_Model_Relation('hasMany', 'Question_Option', 'QST_ID', null, null)
			);
		
		parent::__construct();
	}
	





}
// End of file EEM_Question.model.php
// Location: /includes/models/EEM_Question.model.php