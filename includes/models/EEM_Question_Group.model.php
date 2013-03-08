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
		$this->_fields_settings=array(
					'QSG_ID'=>new EE_Model_Field('Question Group ID', 'primary_key', false, null, null, null),
					'QSG_name'=>new EE_Model_Field('Question Gruop Name', 'plaintext', false, '', null, null),
					'QSG_identifier'=>new EE_Model_Field('Question Group identifier', 'plaintext', false, '', null, null),
					'QSG_desc'=>new EE_Model_Field('Question Group Description', 'simplehtml', false, '', null, null),
					'QSG_order'=>new EE_Model_Field('Question Order','int',false,0,null,null),
					'QSG_show_group_name'=>new EE_Model_Field('Show Question Group Name?', 'bool', false, true, null, null),
					'QSG_show_group_desc'=>new EE_Model_Field('Show Question Group Description?', 'bool', false, true, null, null),
					'QSG_system_ID'=>new EE_Model_Field('Is an internal-system Question Group', 'bool', false, false, null, null),
					'QSG_deleted'=>new EE_Model_Field('Is Question Group deleted?', 'deleted_flag', false, false, null, null)
				);
		$this->_related_models=array(
				'Questions'=>new EE_Model_Relation('hasAndBelongsToMany', 'Question', 'QST_ID','question_group_question',
						array(
							'QGQ_ID'=>new EE_Model_Field('Question Group-Question ID', 'primary_key', false, null, null, null),
							'QSG_ID'=>new EE_Model_Field('Foreign Key to Question Groups', 'foreign_key', false, null, null, 'Question_Group'),
							'QST_ID'=>new EE_Model_Field('Foreign Key to Questions','foreign_key',false,null,null,'Question')
						)
					)
				);
		
		parent::__construct();
	}
}
// End of file EEM_Question.model.php
// Location: /includes/models/EEM_Question.model.php