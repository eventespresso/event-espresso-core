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
 * EE Message Template Model
 *
 * 
 *
 * @package		Event Espresso
 * @subpackage	includes/models/EEM_Message_Template.modle.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );

class EEM_Message_Template extends EEM_Base {
	//private instance of the EEM_Message_Template object
	private static $_instance = NULL;

	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 * 		@access public
	 * 		@return EEM_Price instance
	 */
	public static function instance() {

		// check if instance of EEM_Price already exists
		if (self::$_instance === NULL) {
			// instantiate Price_model
			self::$_instance = new self();
		}
		// EEM_Price object
		return self::$_instance;
	}

	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access private
	 * 		@return void
	 */
	private function __construct() {
		global $wpdb;
		// set table name
		$this->table_name = $wpdb->prefix . 'esp_message_template';
		// set item names
		$this->singlular_item = 'Message Template';
		$this->plual_item = 'Message Templates';		
		// array representation of the price table and the data types for each field
		$this->table_data_types = array(
				'MTP_ID' => '%d',
				'EVT_ID' => '%d',
				'GRP_ID' => '%d',
				'MTP_user_id' => '%d',
				'MTP_messenger'	=> '%s',
				'MTP_message_type' => '%s',
				'MTP_template_field' => '%s',
				'MTP_context' => '%s',
				'MTP_content' => '%s',
				'MTP_is_global' => '%d',
				'MTP_is_override' => '%d',
				'MTP_deleted' => '%d',
				'MTP_is_active' => '%d'
		);


		// load Message Template object class file
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Message_Template.class.php');
	}

	/**
	 * 		cycle though array of message_templates and create objects out of each item.  
	 *
	 * 	@access	private
	 * 	@param	array $prices
	 * 	@return mixed array on success, FALSE on fail
	 */
	private function _create_objects($templates = FALSE) {

		//init $a_temp value
		$a_temp = array();

		if (!$templates) {
			return FALSE;
		}

		if (is_object($templates)) {
			$templates = array($templates);
		}

		//first we have to assemble the grouped array of templates.
		foreach ($templates as $template) {
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
	}

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
		
		//we have to make sure we're only returning "ACTIVE" templates unless the $active has explicitly been set to false.  If active has been set to 'all' then we DON'T set the active parameter.
		$where_cols_n_values = !$active ? array( 'MTP_is_active' => 0 ) : array( 'MTP_is_active' => 1);
		$where_cols_n_values = $active == 'all' ? '' : $where_cols_n_values;
		

		if ($templates = $this->select_all_where($where_cols_n_values, $orderby, $order)) {
			$r_templates = $this->_create_objects($templates);
		} else {
			return FALSE;
		}

		//now let's select the data to return
		if ( empty( $limit) || !is_array($limit) )
			return $count ? count($r_templates) : $r_templates;

		$r_templates = array_slice( $r_templates, $limit[0], $limit[1]);
		return $count ? count($r_templates) : $r_templates;
	}

	/**
	 * 	get all message_templates from db where...
	 *
	 * 	@access	public
	 * 	@param	array	$where_cols_n_values
	 * 	@return	mixed	array on success, FALSE on fail
	 */
	public function get_all_message_templates_where( $where_cols_n_values = FALSE, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE ) {
		$active = array();
		
		if (!$where_cols_n_values) {
			return FALSE;
		}

		//if the active reference IS not set then we're assuming we only want active templates
		if ( !isset( $where_cols_n_values['MTP_is_active'] ) ) {
			$active = array( 'MTP_is_active' => 1 );
		}

		//however if the active reference IS set and it == 'all' then we don't send ANY filter on active
		if ( isset( $where_cols_n_values['MTP_is_active'] ) && $where_cols_n_values['MTP_is_active'] == 'all' ) {
			$active = array();
		}

		$where_cols_n_values = array_merge( $active, $where_cols_n_values );

		// retrieve all templates
		if ($templates = $this->select_all_where( $where_cols_n_values, $orderby, $order )) {
			$r_templates = $this->_create_objects($templates);
		} else {
			return FALSE;
		}
		
		//now let's select the data to return
		if ( empty( $limit) || !is_array($limit) )
			return $count ? count($r_templates) : $r_templates;

		$r_templates = array_slice( $r_templates, $limit[0], $limit[1]);
		return $count ? count($r_templates) : $r_templates;
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
		if ($template = $this->select_all_where($where_cols_n_values)) {
			$tmplt = $this->_create_objects( $template );
			return $tmplt[$GRP_ID];
		} else {
			return FALSE;
		}
	}

	/**
	 * 	retrieve a single template group from db via it's column values
	 *  What we'll do is get the grp_id for the templates matching the search.  Then we'll do another query to pull in all the templates within the group that matches the query. (note this might not work as expected in the cases where there are templates in other groups that share the same values in the search.  Only the first matching group will be returned).
	 * 	@access		public
	 * 	@param		array	$where_cols_n_values
	 * 	@return 	mixed	array on success, FALSE on fail
	 */
	public function get_message_template( $where_cols_n_values = FALSE ) {

		if (!$where_cols_n_values) {
			return FALSE;
		}

		//need to make sure we only return ACTIVE templates BUT only if the 'MTP_is_active' reference isn't already in the where array.
		if ( !isset( $where_cols_n_values['MTP_is_active'] ) ) {
			$active = array( 'MTP_is_active' => 1 );
			$where_cols_n_values = array_merge( $active, $where_cols_n_values );
		}

		//get group_id
		$group_id = $this->get_message_template_grp_ID( $where_cols_n_values );

		$new_where = array('GRP_ID' => $group_id);

		if ( $template = $this->select_all_where($new_where) ) {
			return $this->_create_objects( $template );
		} else {
			return FALSE;
		}
	}

	/**
	 * Has one purpose.  Return the grp_id for the template matching the where values.
	 * @param  array $where_cols_n_values 
	 * @return mixed int on success, false on fail
	 */
	public function get_message_template_grp_ID ( $where_cols_n_values = FALSE ) {
		if ( !$where_cols_n_values) {
			return FALSE;
		}

		//need to make sure we only return ACTIVE templates BUT only if the 'MTP_is_active' reference isn't already in the where array.
		if ( !isset( $where_cols_n_values['MTP_is_active'] ) ) {
			$active = array( 'MTP_is_active' => 1 );
			$where_cols_n_values = array_merge( $active, $where_cols_n_values );
		}

		global $wpdb;
		return $this->select_value_where($this->table_name, $this->table_data_types, 'GRP_ID', $where_cols_n_values );
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
		return $this->get_all_message_templates_where( array('MTP_deleted' => FALSE ), $orderby, $order, $limit, $count );
	}

	/**
	 * get_all_active_message_templates_by_messenger
	 * @access  public
	 * @return  array all active (non trashed, active) message template objects for the given messenger
	 */
	public function get_all_active_message_templates_by_messenger($messenger, $orderby = 'GRP_ID', $order = 'ASC') {
		return $this->get_all_message_templates_where(array('MTP_deleted' => FALSE, 'MTP_messenger' => $messenger), $orderby, $order );
	}

	/**
	 * get_all_trashed_message_templates
	 * @access public
	 * @return array all message template objects that are trashed.
	 */
	public function get_all_trashed_message_templates($orderby = 'GRP_ID', $order = 'ASC') {
		return $this->get_all_message_templates_where( array('MTP_deleted' => TRUE ), $orderby, $order );
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
		
		//first let's get all the templates
		$message_templates = $this->get_all_message_templates($orderby, $order);

		//now let's loop through the templates and assemble an array that has NO active contexts.
		if ( $message_templates ) {
			foreach ( $message_templates as $template_group ) {
				if ( $template_group->is_trashed_count() > 0 )
				$msg_tmps[] = $template_group;
			}
		}

		//now let's select the data to return
		if ( empty( $limit) || !is_array($limit) )
			return $count ? count($msg_tmps) : $msg_tmps;

		$r_templates = array_slice( $msg_tmps, $limit[0], $limit[1]);
		return $count ? count($msg_tmps) : $msg_tmps;

	}

	/**
	 * get_all_non_trashed_message_templates
	 * @access public
	 * @return array message template objects that aren't trashed (could be active or non-active)
	 */
	public function get_all_non_trashed_message_templates($orderby = 'GRP_ID', $order = 'ASC') {
		return $this->get_all_message_templates_where( array('MTP_deleted' => FALSE ), $orderby, $order );
	}

	/**
	 * get_all_global_message_templates 
	 * @access public
	 * @return array all message templates that are global (i.e. non-event)
	 */
	public function get_all_global_message_templates($orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE ) {
		return $this->get_all_message_templates_where( array('MTP_is_global' => TRUE, 'MTP_deleted' => FALSE ), $orderby, $order, $limit, $count );
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
			'MTP_deleted' => FALSE,
			'MTP_messenger' => $messenger,
			'MTP_message_type' => $message_type,
			'MTP_is_global' => TRUE
			);

		if ( !$active ) {
			$_where['MTP_is_active'] = FALSE;
		}

		
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
			'MTP_deleted' => FALSE,
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
		return $this->get_all_message_templates_where( array( 'MTP_is_global' => FALSE, 'MTP_deleted' => FALSE ), $orderby, $order, $limit, $count );
	}

	/**
	 * get_all_message_templates_by_event
	 * @access public
	 * @param  int $EVT_ID specific event id
	 * @return array         message template objects that are attached to a specific event.
	 */
	public function get_all_message_templates_by_event($EVT_ID, $orderby = 'GRP_ID', $order = 'ASC', $limit=NULL, $count = FALSE) {
		return $this->get_all_message_templates_where( array( 'EVT_ID' => $EVT_ID, 'MTP_deleted' => FALSE ), $orderby, $order, $limit, $count );
	}

	/**
	 * get_all_trashed_message_templates_by_event
	 * @access public
	 * @param int $EVT_ID specific event id
	 * @return array   message template objects that are attached to a specific event.
	 */
	public function get_all_trashed_message_templates_by_event($EVT_ID, $orderby = 'GRP_ID', $order = 'ASC', $limit = NULL, $count = FALSE) {
		return $this->get_all_message_templates_where( array( 'EVT_ID' => $EVT_ID, 'MTP_deleted' => TRUE ), $orderby, $order, NULL, FALSE);
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
		if ( $this->delete(array('GRP_ID' => $GRP_ID))) {
			return TRUE;
		}		
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
		return $this->_insert($this->table_name, $this->table_data_types, $set_column_values);
	}

	/**
	 * 	This function updates table data
	 *
	 * 	@access public
	 * 	@param array $set_column_values - array of column names and values for the SQL SET clause
	 * 	@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 * 	@return array
	 */
	public function update($set_column_values, $where_cols_n_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update($this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values);
	}

	
	/**
	 * generates a unique group id for any new templates being added.
	 * we need to do this because we already have an auto_incrementing column (MTP_ID).
	 * @return int unique grp_id
	 */
	public function generate_grp_id() {
		global $wpdb;
		//first let's find out whether there is already a max value
		$query = "SELECT MAX(GRP_ID) FROM " . $this->table_name . ";";
		$max_grp_id = $wpdb->get_var( $query );
		if ( empty($max_grp_id) || $max_grp_id === 0 )
			$max_grp_id = 0;
		$max_grp_id++;
		return $max_grp_id;
	}



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