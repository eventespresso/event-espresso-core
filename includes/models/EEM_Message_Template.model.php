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
 * @version		3.2
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Message_Template
 *
 * 
 *
 * @package		Event Espresso
 * @subpackage	includes/models/EEM_Message_Template.model.php
 * @author		Darren Ethier
 *
 * //DARREN IS WORKING ON//
 *
 * //todo - what we want to do is try to do the primary/secondary table thing here because it looks like it already sets up the joins!!!
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Soft_Delete_Base.model.php' );

class EEM_Message_Template extends EEM_Soft_Delete_Base {
	//private instance of the EEM_Message_Template object
	private static $_instance = NULL;

	/**
	 * 		This function is a singleton method used to instantiate the EEM_Message_Template object
	 *
	 * 		@access public
	 * 		@return EEM_Message_Template instance
	 */
	public static function instance() {

		// check if instance of EEM_Message_Template already exists
		if (self::$_instance === NULL) {
			// instantiate Message Template Model
			self::$_instance = new self();
		}
		// EEM_Price object
		return self::$_instance;
	}
	
	





	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@return void
	 */
	protected function __construct() {
		$this->singlular_item = __('Message Template','event_espresso');
		$this->plural_item = __('Message Templates','event_espresso');		
		
		$this->_tables = array(
			'Message_Template_Group'=> new EE_Primary_Table('esp_message_template_group', 'GRP_ID' ),
			'Message_Template' => new EE_Secondary_Table('esp_message_template', 'MTP_ID', 'GRP_ID' )
		);
		$this->_fields = array(
			'Message_Template'=> array(
				'MTP_ID'=> new EE_Primary_Key_Int_Field('MTP_ID', __('Message Template ID', 'event_espresso'), FALSE, 0),
				'GRP_ID' => new EE_Foreign_Key_Int_Field('GRP_ID', __('Message Template Group ID', 'event_espresso'), FALSE, 0, 'Message_Template_Group' ),
				'MTP_template_field'=>new EE_Plain_Text_Field('MTP_template_field', __('Field Name for this Template', 'event_espresso'), false, 'default' ),
				'MTP_context'=>new EE_Plain_Text_Field('MTP_context', __('Message Type Context for this field', 'event_espresso'),false,'admin' ),
				'MTP_content'=>new EE_Serialized_Text_Field('MTP_content', __('The field content for the template', 'event_espresso'), false, ''),
				),
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
		$this->_model_relations = array();
		parent::__construct();
	}

	/**
	 * 		cycle though array of message_templates and create objects out of each item.  This overrides the _create_objects for EEM_Base
	 *
	 * 	@access	protected
	 * 	@param	array $prices
	 * 	@return mixed array on success, FALSE on fail
	 */
	protected function _create_objects($templates = FALSE) {

		//init $a_temp value
		$a_temp = array();

		if (!$templates) {
			return FALSE;
		}

		if (is_object($templates)) {
			$templates = array($templates);
		}

		//first we have to assemble the grouped array of templates.
		foreach ( $templates as $template ) {
			$template_keys = array_map(create_function('$item', '$item = str_replace("Message_Template.", "", $item); $item = str_replace("Message_Template_Group.","",$item); return $item;'), array_keys($template) );
			$template_values = array_values( $template );
			$template = array_combine( $template_keys, $template_values );
			$template = (object) $template;

			//below will be items common to all templates in a template group.  Templates are grouped by messenger AND message type.  So all templates within a group will have the same messenger and message type and user_id and event_id (and of course group_id);
			$a_temp[$template->GRP_ID]['GRP_ID'] = $template->GRP_ID;
			$a_temp[$template->GRP_ID]['MTP_messenger'] = $template->MTP_messenger;
			$a_temp[$template->GRP_ID]['MTP_message_type'] = $template->MTP_message_type;
			$a_temp[$template->GRP_ID]['MTP_user_id'] = $template->MTP_user_id;
			$a_temp[$template->GRP_ID]['EVT_ID'] = $template->EVT_ID;
			$a_temp[$template->GRP_ID]['MTP_is_global'] = $template->MTP_is_global;
			$a_temp[$template->GRP_ID]['MTP_is_active'] = $template->MTP_is_active;
			
			//within the template group templates are grouped by contexts.  below are items common to template types within a context (i.e. "is_active").  We also have an array of template_ids attached to a context to make it easier to update all the templates in this context with the new values.
			$a_temp[$template->GRP_ID]['templates'][$template->MTP_context]['MTP_is_global'] = $template->MTP_is_global;
			$a_temp[$template->GRP_ID]['templates'][$template->MTP_context]['MTP_is_override'] = $template->MTP_is_override;
			$a_temp[$template->GRP_ID]['templates'][$template->MTP_context]['MTP_deleted'] = $template->MTP_deleted;

			//now also within the template group->context groups we have the various template_types and the actual template as represented below.
			$a_temp[$template->GRP_ID]['templates'][$template->MTP_context][$template->MTP_template_field]['MTP_ID'] = $template->MTP_ID;
			$a_temp[$template->GRP_ID]['templates'][$template->MTP_context][$template->MTP_template_field]['content'] = maybe_unserialize($template->MTP_content);
		}

		//now let's setup the template objects
		foreach ( $a_temp as $group_id => $template_group ) {
			$array_of_objects[$group_id] = new EE_Message_Template($template_group);
		}
		return $array_of_objects;
	}/**/

	/**
	 * 	instantiate a new message_template object with blank/empty properties
	 *
	 * 	@access	public
	 * 	@return	mixed array on success, FALSE on fail
	 * 	@todo this would be a good place to put in defaults?
	 */
	public function get_new_template() { 
		$template = array();
		return new EE_Message_Template( $template );
	}

	/**
	 * 	retrieve ALL message_templates from db
	 *
	 * 	@access	public
	 * 	@return	mixed array on success, FALSE on fail
	 */
	public function get_all_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE, $active = TRUE ) {

		// retrieve all templates
		// we have to use limit and count later because we're not getting by rows.  So we have to retrieve all templates first.
		
		$query_params = $this->_mt_query_params( array(), $orderby, $order, $limit, $count, $active );

		$r_templates = $count ? $this->count_deleted_and_undeleted($query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted_and_undeleted( $query_params );
		
		return $r_templates;
	}


	/**
	 * This method just takes incoming args and spits out the query_params neede for all message template queries.
	 * @return array query_params
	 */
	protected function _mt_query_params( $query_params = array(),  $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE, $active = TRUE ) {
		//we have to make sure we're only returning "ACTIVE" templates unless the $active has explicitly been set to false.  If active has been set to 'all' then we DON'T set the active parameter.
		$query_params = !$active || empty( $active ) ? array_merge( $query_params, array( 'MTP_is_active' => 0 ) ) : array_merge( $query_params, array( 'MTP_is_active' => 1 ) );

		if ( $active == 'all' )
			unset( $query_params['MTP_is_active'] );

		//let's check if there are any filters in here
		$filters = array();
		if ( isset( $_REQUEST['ee_messenger_filter_by'] ) )
			$filters['MTP_messenger'] = $_REQUEST['ee_messenger_filter_by'];
		if ( isset( $_REQUEST['ee_message_type_filter_by'] ) )
			$filters['MTP_message_type'] = $_REQUEST['ee_message_type_filter_by'];

		//merge any extra parameters
		$query_params = array_merge($filters, $query_params);

		//now we need to make sure $query_params (which are up until now the $where_cols_n_values ) are added to an array.
		$query_params = !empty($query_params) ? array( $query_params ) : array();

		//set up the on_join_limit for multi_table paging.
		$query_params = !empty( $limit ) && !$count ? array_merge( $query_params, array('on_join_limit' => array('Message_Template_Group', $limit ) ) ) : $query_params;
		
		//orderby
		$query_params = array_merge( $query_params, array('order_by' => array($orderby => $order ) ) );
		return $query_params;
	}

	/**
	 * 	get all message_templates from db where...
	 *
	 * 	@access	public
	 * 	@param	array	$query_params
	 * 	@return	mixed	array on success, FALSE on fail
	 */
	public function get_all_message_templates_where( $query_params = FALSE, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE ) {
		$active = array();
		
		if (!$query_params) {
			return FALSE;
		}

		$query_params = $this->_mt_query_params( $query_params, $orderby, $order, $limit, $count, $active );

		$r_templates = $count ? $this->count_deleted_and_undeleted($query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted_and_undeleted( $query_params );

		return $r_templates;
		
		return FALSE;
	}

	/**
	 * 	retrieve a single template group from db via it's GRP_ID.
	 * 	Remember that although each template type is saved in it's own row in the database.  Each "template" is actually a collection of sub-templates (grouped by context and with different template_types);
	 *
	 * 	@access	public
	 * 	@param	int 	$GRP_ID
	 * 	@return	mixed	array on success, FALSE on fail
	 */
	public function get_message_template_by_ID($GRP_ID = FALSE) {

		if (!$GRP_ID) {
			return FALSE;
		}
		// retrieve a particular template group (but only if active);
		
		$where_cols_n_values = array('GRP_ID' => $GRP_ID, 'MTP_is_active' => 1);
		if ($tmplt = $this->get_all($where_cols_n_values)) {
			return $tmplt[$GRP_ID];
		} else {
			return FALSE;
		}
	}

	

	/**
	 * get_all_message_templates_by_messenger
	 * 
	 * @access public
	 * @return array all (including trashed or inactive) message tempalte objects for the given messenger
	 */
	public function get_all_message_templates_by_messenger($messenger, $orderby = 'GRP_ID', $order = 'ASC' ) {
		return $this->get_all_message_templates_where(array('MTP_messenger' => $messenger), $orderby, $order );
	}

	/**
	 * get_all_active_message_templates
	 * @access public
	 * @return array  all active (non_trashed, active) message template objects
	 */
	public function get_all_active_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE ) {
		$query_params = $this->_mt_query_params( array(), $orderby, $order, $limit, $count );
		return $count ? $this->count($query_params, 'GRP_ID', TRUE ) : $this->get_all($query_params);
	}

	/**
	 * get_all_active_message_templates_by_messenger
	 * @access  public
	 * @return  array all active (non trashed, active) message template objects for the given messenger
	 */
	public function get_all_active_message_templates_by_messenger($messenger, $orderby = 'GRP_ID', $order = 'ASC') {	
		$query_params = $this->_mt_query_params( array('MTP_messenger' => $messenger), $orderby, $order );
		return $this->get_all($query_params);
	}

	/**
	 * get_all_trashed_message_templates
	 * @access public
	 * @return array all message template objects that are trashed.
	 */
	public function get_all_trashed_message_templates($orderby = 'GRP_ID', $order = 'ASC') {
		return $this->get_all_deleted(array('orderby' => array( $orderby => $order ) ) );
		//return $this->get_all_message_templates_where( array('MTP_deleted' => TRUE ), $orderby, $order );
	}

	/**
	 * get_all_trashed_grouped_message_templates
	 * this returns ONLY the template groups where ALL contexts are trashed and none of the group are non-trashed
	 * 
	 * @access public
	 * @return array message template groups.
	 * @return [type] [description]
	 */
	public function get_all_trashed_grouped_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE) {
		$msg_tmps = array();

		$query_params = $this->_mt_query_params( array(), $orderby, $order, $limit, $count );
		
		$msg_tmps = $count ? $this->count_deleted($query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted( $query_params );

		return $msg_tmps;

	}





	/**
	 * get_all_non_trashed_message_templates
	 * @access public
	 * @return array message template objects that aren't trashed (could be active or non-active)
	 */
	public function get_all_non_trashed_message_templates($orderby = 'GRP_ID', $order = 'ASC') {
		return $this->get_all( array('orderby' => array($orderby => $order) ) );
	}

	/**
	 * get_all_global_message_templates 
	 * @access public
	 * @return array all message templates that are global (i.e. non-event)
	 */
	public function get_all_global_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE ) {
		$query_params = $this->_mt_query_params( array('MTP_is_global' => TRUE), $orderby, $order, $limit, $count );
		return $count ? $this->count( $query_params, 'GRP_ID', TRUE ) : $this->get_all($query_params);
	}

	/**
	 * get all GLOBAL message templates for the given messenger and message type
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
			'MTP_is_active' => $active
			);

		return $this->get_all_message_templates_where($_where, $orderby, $order, $limit, $count );
	}




	/**
	 * this returns the message templates for a given event, messenger, and message template
	 * @param  string  $messenger    
	 * @param  string  $message_type 
	 * @param  string  $orderby      pointless at this point but still included
	 * @param  string  $order        
	 * @param  mixed (array|null) $limit array($offset, $num)
	 * @param  bool   $count        true = just return count, false = objects
	 * @param  bool   $active  		ignore "active" or not. (default only return active)
	 * @return mixed (int|array)                depending on $count.
	 */
	public function get_event_message_templates_by_m_and_mt_and_evt( $messenger, $message_type, $evt_id, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE, $active = TRUE ) {

		$_where = array(
			'MTP_messenger' => $messenger,
			'MTP_message_type' => $message_type,
			'EVT_ID' => $evt_id,
			'MTP_is_global' => TRUE
			);

		if ( !$active ) {
			$_where['MTP_is_active'] = FALSE;
		}

		return $this->get_all_message_templates_where( $_where, $orderby, $order, $limit, $count );
	}

	/**
	 * get_all_event_message_templates 
	 * @access public
	 * @return array all message templates that are non-global and are event specific
	 */
	public function get_all_event_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE ) {
		return $this->get_all_message_templates_where( array( 'MTP_is_global' => FALSE ), $orderby, $order, $limit, $count );
	}

	/**
	 * get_all_message_templates_by_event
	 * @access public
	 * @param  int $EVT_ID specific event id
	 * @return array         message template objects that are attached to a specific event.
	 */
	public function get_all_message_templates_by_event($EVT_ID, $orderby = 'GRP_ID', $order = 'ASC', $limit=NULL, $count = FALSE) {
		return $this->get_all_message_templates_where( array( 'EVT_ID' => $EVT_ID ), $orderby, $order, $limit, $count );
	}

	/**
	 * get_all_trashed_message_templates_by_event
	 * @access public
	 * @param int $EVT_ID specific event id
	 * @return array   message template objects that are attached to a specific event.
	 */
	public function get_all_trashed_message_templates_by_event($EVT_ID, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE) {
		$query_params = $this->_mt_query_params( array('EVT_ID' => $EVT_ID), $orderby, $order, $limit, $count );
		return $count ? $this->count_deleted( $query_params, 'GRP_ID', TRUE ) : $this->get_all_deleted( $query_params );
	}

	/**
	 * 	delete template by GRP_ID
	 * 	Remember that a message template is actually a GROUP of templates for a given messenger and message_type combination.  Individual templates within a group cannot be deleted. (However a context group could be marked inactive). 
	 *
	 * 	@access		public
	 * 	@param 		int 		$GRP_ID - group ID
	 * 	@return 	boolean		false on fail
	 */
	public function delete_by_id($GRP_ID) {
		if ( ! $GRP_ID || ! is_int( $GRP_ID )) {
			return FALSE;
		}
		if ( $this->delete_permanently_by_ID($GRP_ID) ) {
			return TRUE;
		}		
	}/**/




	public function trash_mtp_by_id( $GRP_ID ) {
		$id = (int) $GRP_ID;
		return $this->delete_by_ID( $id );
	}



	public function restore_mtp_by_id( $GRP_ID ) {
		$id = (int) $GRP_ID;
		return $this->restore_by_ID( $GRP_ID );
	}



	public function trash_mtp( $query_params ) {
		return $this->delete( $query_params );
	}



	public function restore_mtp ( $query_params ) {
		return $this->restore( $query_params );
	}


	/**
	 * 	This function inserts table data
	 *
	 * 	@access public
	 *  @param array $set_column_values - array of column names and values for the SQL INSERT
	 * 	@return array
	 */
	public function insert($set_column_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$insert_id = array_key_exists( 'GRP_ID', $set_column_values ) ? $this->_insert_into_specific_table( $this->_tables['Message_Template'], $set_column_values, $set_column_values['GRP_ID'] ) : $this->_insert_into_specific_table( $this->_tables['Message_Template_Group'], $set_column_values );
		return $insert_id;
	}

	/**
	 * 	This function updates table data
	 *
	 * 	@access public
	 * 	@param array $set_column_values - array of column names and values for the SQL SET clause
	 * 	@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 * 	@return array
	 */
	/*public function update($set_column_values, $where_cols_n_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update($this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values);
	}/**/

	


	/**
	 * This sends things to the validator for the given messenger and message type.
	 *
	 * 
	 * @param  array $fields the incoming fields to check.  Note this array is in the formatted fields from the form fields setup.  So we need to reformat this into an array of expected field refs by the validator.
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
				foreach ( $value['content'] as $name => $value ) {
					if ( $name == 'main' ) continue;
					$assembled_fields[$name] = $value;
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

	

} //end class EEM_Message_Template.model