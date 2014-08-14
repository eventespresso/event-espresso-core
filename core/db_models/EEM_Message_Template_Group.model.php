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
	 *		This function is a singleton method used to instantiate the EEM_Message_Template_Group object
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
				'GRP_ID' => new EE_Primary_Key_Int_Field('GRP_ID', __('Message Template Group ID', 'event_espresso')),
				'MTP_name' => new EE_Plain_Text_Field( 'MTP_name', __('The name of the temlpate group', 'event_espresso'), FALSE, '' ),
				'MTP_description' => new EE_Simple_HTML_Field( 'MTP_description', __('A brief description about this template.', 'event_espresso' ), FALSE, '' ),
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
			'Event' => new EE_HABTM_Relation('Event_Message_Template')
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
		$query_params = array( array('Event.EVT_ID' => $EVT_ID), 'order_by' => array($orderby => $order), 'limit' => $limit );
		return $count ? $this->count_deleted( $query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted( $query_params );
	}



	/**
	 * get_all_message_templates_by_messenger
	 *
	 * @access public
	 * @return array all (including trashed or inactive) message template group objects for the given messenger
	 */
	public function get_all_message_templates_by_messenger($messenger, $orderby = 'GRP_ID', $order = 'ASC' ) {
		return $this->get_all_deleted_and_undeleted( array( array('MTP_messenger' => $messenger), 'order_by' => array($orderby => $order) ) );
	}



	/**
	 * This simply adds on any messenger/message type filters that may be present in the $_POST global
	 * @param  array  $_where any existing where conditions to append these to.
	 * @return array          original where conditions or original with additional filters.
	 */
	protected function _maybe_mtp_filters( $_where = array() ) {
		//account for messenger or message type filters
		if ( isset($_REQUEST['ee_messenger_filter_by'] ) && $_REQUEST['ee_messenger_filter_by'] != 'none_selected' ) {
			$_where['MTP_messenger'] =  $_REQUEST['ee_messenger_filter_by'] ;
		}

		if ( isset( $_REQUEST['ee_message_type_filter_by']) && $_REQUEST['ee_message_type_filter_by'] != 'none_selected' ) {
			$_where['MTP_message_type'] = $_REQUEST['ee_message_type_filter_by'];
		}

		return $_where;
	}



	/**
	 * get_all_active_message_templates groups
	 * @access public
	 * @return array  all active (non_trashed, active) message template objects
	 */
	public function get_all_active_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE, $global = TRUE ) {
		$_where = $global ? array('MTP_is_global' => TRUE ) : array('MTP_is_global' => FALSE );
		$_where['MTP_is_active'] = TRUE;
		$_where = $this->_maybe_mtp_filters($_where);

		$query_params = array( $_where, 'order_by' => array($orderby => $order), 'limit' => $limit );

		return $count ? $this->count($query_params, 'GRP_ID', TRUE ) : $this->get_all($query_params);
	}




	/**
	 * 	retrieve ALL message_template groups from db regardless of wht
	 *
	 * 	@access	public
	 * 	@return	mixed array on success, FALSE on fail
	 */
	public function get_all_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE) {

		$_where = $this->_maybe_mtp_filters();

		$query_params = array( $_where, 'order_by' => array($orderby => $order), 'limit' => $limit );

		$r_templates = $count ? $this->count_deleted_and_undeleted($query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted_and_undeleted( $query_params );

		return $r_templates;
	}




	/**
	 * This gets all the custom templates attached to a specific event
	 * @param  int      $EVT_ID       	event id
	 * @param  array  $query_params same as EEM_Base::get_all()
	 * @return  EE_Message_Template_Group[]
	 */
	public function get_all_custom_templates_by_event( $EVT_ID, $query_params = array() ) {
		$_where = array( 'Event.EVT_ID' => $EVT_ID );
		return $this->get_all( array( $_where ) );
	}




	/**
	 * get_all_trashed_grouped_message_templates
	 * this returns ONLY the template groups where ALL contexts are trashed and none of the group are non-trashed
	 *
	 * @access public
	 * @return EE_Message_Template_Group[] message template groups.
	 */
	public function get_all_trashed_grouped_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE, $global = TRUE) {
		$_where = $global ? array('MTP_is_global' => TRUE ) : array('MTP_is_global' => FALSE );
		$_where['MTP_is_active'] = TRUE;
		$_where = $this->_maybe_mtp_filters($_where);

		$query_params = array( $_where, 'order_by' => array($orderby => $order), 'limit' => $limit );

		return $count ? $this->count_deleted($query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted( $query_params );
	}




	/**
	 * this returns the message template group(s) for a given event, messenger, and message template
	 * @param  string  $messenger
	 * @param  string  $message_type
	 * @param  string  $orderby      pointless at this point but still included
	 * @param  string  $order
	 * @param  mixed (array|null) $limit array($offset, $num)
	 * @param  bool   $count        true = just return count, false = objects
	 * @param  bool   $active  		ignore "active" or not. (default only return active)
	 * @return mixed (int|EE_Message_Template_Group[])                depending on $count.
	 */
	public function get_event_message_templates_by_m_and_mt_and_evt( $messenger, $message_type, $evt_id, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE, $active = TRUE ) {

		$_where = array(
			'MTP_messenger' => $messenger,
			'MTP_message_type' => $message_type,
			'Event.EVT_ID' => $evt_id,
			'MTP_is_global' => TRUE,
			'MTP_is_active' => $active
			);

		$query_params = array( $_where, 'order_by' => array($orderby=>$order), 'limit' => $limit );

		return $count ? $this->count($query_params, 'GRP_ID', TRUE ) : $this->get_all( $query_params );
	}




	/**
	 * get all GLOBAL message template groups for the given messenger and message type
	 * @param  string $messenger    slug for messenger
	 * @param  string $message_type slug for message type
	 * @param  string $orderby      what column to orderby
	 * @param  string $order        ASC or DESC
	 * @param  mixed (array|null) $limit array($offset, $num)
	 * @param  bool   $count        true = just return count, false = objects
	 * @param  bool   $active  		ignore "active" or not. (default only return active) - 'all' means return both inactive AND inactive.
	 * @return ARRAY               message template objects that are global (i.e. non-event)
	 */
	public function get_global_message_template_by_m_and_mt($messenger, $message_type, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE, $active = TRUE ) {
		$_where = array(
			'MTP_messenger' => $messenger,
			'MTP_message_type' => $message_type,
			'MTP_is_global' => TRUE,
			);

		if ( $active != 'all' ) {
			$_where['MTP_is_active'] = $active;
		}

		$query_params = array( $_where, 'order_by' => array( $orderby => $order ), 'limit' => $limit );

		return $count ? $this->count( $query_params, 'GRP_ID', TRUE ) : $this->get_all( $query_params );
	}




	/**
	 * get all custom message template groups for the given messenger and message type
	 * @param  string $messenger    messenger
	 * @param  string $message_type messagetype
	 * @param  array  $query_params same as EEM_Base->get_all()
	 * @return EE_Message_Template_Group[]
	 */
	public function get_custom_message_template_by_m_and_mt( $messenger, $message_type, $query_params = array() ) {
		$_where = array(
			'MTP_is_global' => FALSE,
			'MTP_messenger' => $messenger,
			'MTP_message_type' => $message_type
			);

		return $this->get_all( array( $_where ) );
	}




	/**
	 * This sends things to the validator for the given messenger and message type.
	 *
	 *
	 * @param  array $fields the incoming fields to check.  Note this array is in the formatted fields from the form fields setup.  So we need to reformat this into an array of expected field refs by the validator.  Note also that this is not only the fields for the Message Template Group but ALSO for Message Template.
	 * @param string $context The context the fields were obtained from.
	 * @param string $messenger The messenger we are validating
	 * @param string $message_type The message type we are validating.
	 * @return mixed (bool|array)         If the fields all check out then we return true otherwise error messages are returned (indexed by field name);
	 */
	public function validate($fields, $context, $messenger, $message_type) {

		$assembled_fields = array();

		//let's loop through all the fields and set them up in the right format
		foreach ( $fields as $index => $value ) {
			//first let's figure out if the value['content'] in the current index is an array.  If it is then this is special fields that are used in parsing special shortcodes (i.e. 'attendee_list').
			if ( is_array($value['content']) ) {
				$assembled_fields[$value['name']] = $value['content']['main'];
				//loop through the content and get the other fields.
				foreach ( $value['content'] as $name => $val ) {
					if ( $name == 'main' ) continue;
					$assembled_fields[$name] = $val;
				}
				continue;
			}

			//okay if we're here then this is just a straight field=>$value arrangement
			$assembled_fields[$value['name']] = $value['content'];
		}

		//now we've got the assembled_fields.  We need to setup the string for the appropriate validator class and call that.
		$m_ref = ucwords( str_replace('_',' ', $messenger ) );
		$m_ref = str_replace( ' ', '_', $m_ref );
		$mt_ref = ucwords( str_replace('_', ' ', $message_type ) );
		$mt_ref = str_replace( ' ', '_', $mt_ref );

		$classname = 'EE_Messages_' . $m_ref . '_' . $mt_ref . '_Validator';

		if ( !class_exists( $classname ) ) {
			$msg[] = __( 'The Validator class was unable to load', 'event_espresso');
			$msg[] = sprintf( __('The class name compiled was %s. Please check and make sure the spelling and case is correct for the class name and that there is an autoloader in place for this class', 'event_espresso'), $classname );
			throw new EE_Error( implode( '||', $msg ) );
		}

		$a = new ReflectionClass( $classname );
		$_VLD = $a->newInstance( $assembled_fields, $context );
		$result = $_VLD->validate();
		return $result;
	}



} //end EEM_Message_Template_Group model.
