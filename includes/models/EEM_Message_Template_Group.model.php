<?php if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		@link http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing * *
 * @link		http://www.eventespresso.com
 * @version		4.1
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Message_Template_Group
 *
 * 
 *
 * @package		Event Espresso
 * @subpackage	includes/models/EEM_Message_Template_Group.model.php
 * @author		Darren Ethier
 *
 *
 */
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
class EEM_Message_Template_Group extends EEM_Soft_Delete_Base {

	// private instance of the EEM_Message_Template_Group object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Message_Template_Group object
	 *
	 *		@access public
	 *		@return EEM_Question instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Message_Template_Group already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Message_Template_Group object
		return self::$_instance;
	}



	protected function __construct() {
		$this->singular_item = __('Message Template Group', 'event_espresso');
		$this->plural_item = __('Message Template Groups', 'event_espresso');
		$this->_tables = array(
			'Message_Template_Group' => new EE_Primary_Table('esp_message_template_group', 'GRP_ID')
			);
		$this->_fields = array(
			'Message_Template_Group' => array(
				'GRP_ID' => new EE_Primary_Key_Int_Field('GRP_ID', __('Message Template Group ID', 'event_espresso'), FALSE, 0), 
				'EVT_ID'=> new EE_Foreign_Key_Int_Field('EVT_ID',__('Event ID', 'event_espresso'),FALSE,0, 'Event' ),
				'MTP_user_id'=> new EE_Integer_Field('MTP_user_id', __('User who created this template', 'event_espresso'), FALSE, 1 ),
				'MTP_messenger'=>new EE_Plain_Text_Field('MTP_messenger', __('Messenger Used for Template', 'event_espresso'), FALSE, 'email' ),
				'MTP_message_type'=>new EE_Plain_Text_Field('MTP_message_type', __('Message Type', 'event_espresso'),false,'registration'),
				'MTP_is_global'=>new EE_Boolean_Field('MTP_is_global', __('Flag indicating if Template Group is Global', 'event_espresso'), false, true),
				'MTP_is_override'=>new EE_Boolean_Field('MTP_is_override', __('Flag indicating if Template Group overrides any other Templates for the messenger/messagetype combination', 'event_espresso'), false, false),
				'MTP_deleted'=>new EE_Trashed_Flag_Field('MTP_deleted', __('Flag indicating whether this has been trashed', 'event_espresso'), false, false),
				'MTP_is_active'=>new EE_Boolean_Field('MTP_is_active', __('Flag indicating whether template group is active', 'event_espresso'), false, true)
				)
			);
		$this->_model_relations = array(
			'Message_Template' => new EE_Has_Many_Relation(),
			'Event' => new EE_Belongs_To_Relation()
			);

		parent::__construct();
	}



	/**
	 * get_all_trashed_message_templates_by_event
	 * @access public
	 * @param int $EVT_ID specific event id
	 * @return array   message template objects that are attached to a specific event.
	 */
	public function get_all_trashed_message_templates_by_event($EVT_ID, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE) {
		$query_params = array( array('EVT_ID' => $EVT_ID), 'orderby' => array($orderby, $order), 'limit' => $limit );
		return $count ? $this->count_deleted( $query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted( $query_params );
	}




	/**
	 * get_all_active_message_templates_by_messenger
	 * @access  public
	 * @return  array all active (non trashed, active) message template group objects for the given messenger
	 */
	public function get_all_active_message_templates_by_messenger($messenger, $orderby = 'GRP_ID', $order = 'ASC') {	
		$query_params = array(array('MTP_messenger' => $messenger, 'MTP_is_active' => true), 'orderby' => array($orderby, $order ) );
		return $this->get_all($query_params);
	}


} //end EEM_Message_Template_Group model.