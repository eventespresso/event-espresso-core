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
require_once( EE_CLASSES . 'EE_Question_Group.class.php');
class EEM_Question_Group extends EEM_Soft_Delete_Base {
	const system_personal = 1;
	const system_address = 2;
  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This function is a singleton method used to instantiate the EEM_Attendee object
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

		$this->_tables = array(
			'Question_Group'=>new EE_Primary_Table('esp_question_group','QSG_ID')
		);
		$this->_fields = array(
			'Question_Group'=>array(
				'QSG_ID'=>new EE_Primary_Key_Int_Field('QSG_ID', __('Question Group ID','event_espresso')),
				'QSG_name'=>new EE_Plain_Text_Field('QSG_name', __('Question Group Name','event_espresso'), false, ''),
				'QSG_identifier'=>new EE_Plain_Text_Field('QSG_identifier', __('Text ID for question Group','event_espresso'), false, ''),
				'QSG_desc'=>new EE_Full_HTML_Field('QSG_desc', __('Description of Question Group','event_espresso'), true, ''),
				'QSG_order'=>new EE_Integer_Field('QSG_order', __('Order in which to show the question group','event_espresso'), true, 0),
				'QSG_show_group_name'=>new EE_Boolean_Field('QSG_show_group_name', __('Flag indicating whether to show the group\'s name on the registration page','event_espresso'), false, true),
				'QSG_show_group_desc'=>new EE_Boolean_Field('QSG_show_group_desc', __('Flag indicating whether to show the group\s description on the registration page','event_espresso'), false, false),
				'QSG_wp_user' => new EE_Integer_Field('QSG_wp_user', __('User who created this question group.', 'event_espresso'), FALSE, get_current_user_id() ),
				'QSG_system'=>new EE_Integer_Field('QSG_system', __('Indicate IF this is a system group and if it is what system group it corresponds to.','event_espresso'), false, 0),
				'QSG_deleted'=>new EE_Trashed_Flag_Field('QSG_deleted', __('Flag indicating this question group was deleted','event_espresso'), false, false)
			)
		);
		$this->_model_relations = array(
			'Question'=>new EE_HABTM_Relation('Question_Group_Question'),
			'Event'=>new EE_HABTM_Relation('Event_Question_Group'),
			'Event_Question_Group'=>new EE_Has_Many_Relation()
		);
		parent::__construct();
	}



	/**
	 * searches the db for the question group with the latest question order and returns that value.
	 * @access public
	 * @return int
	 */
	public function get_latest_question_group_order() {
		$columns_to_select = array(
			'max_order' => array("MAX(QSG_order)","%d")
			);
		$max = $this->_get_all_wpdb_results(array(), ARRAY_A, $columns_to_select );
		return $max[0]['max_order'];
	}


}
// End of file EEM_Question_Group.model.php
// Location: /includes/models/EEM_Question_Group.model.php
