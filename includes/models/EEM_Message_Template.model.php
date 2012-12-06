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
				'MTP_deleted' => '%d'
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
	public function get_all_message_templates($orderby = 'GRP_ID', $order = 'ASC') {

		// retrieve all prices
		if ($templates = $this->select_all($orderby, $order)) {
			return $this->_create_objects($templates);
		} else {
			return FALSE;
		}
	}

	/**
	 * 	get all message_templates from db where...
	 *
	 * 	@access	public
	 * 	@param	array	$where_cols_n_values
	 * 	@return	mixed	array on success, FALSE on fail
	 */
	public function get_all_message_templates_where( $where_cols_n_values = FALSE, $orderby = 'GRP_ID', $order = 'ASC' ) {

		if (!$where_cols_n_values) {
			return FALSE;
		}

		// retrieve all templates
		if ($templates = $this->select_all_where( $where_cols_n_values, $orderby, $order )) {
			return $this->_create_objects($templates);
		} else {
			return FALSE;
		}
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
		// retrieve a particular template group
		
		$where_cols_n_values = array('GRP_ID' => $GRP_ID);
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
	public function get_all_active_message_templates($orderby = 'GRP_ID', $order = 'ASC') {
		return $this->get_all_message_templates_where( array('MTP_deleted' => FALSE ), $orderby, $order );
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
	 * this returns ONLY the tempalte groups where ALL contexts are trashed and none of the group are non-trashed
	 * 
	 * @access public
	 * @return array message template groups.
	 * @return [type] [description]
	 */
	public function get_all_trashed_grouped_message_templates($orderby = 'GRP_ID', $order = 'ASC') {
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

		return ( empty($msg_tmps) ) ? FALSE : $msg_tmps;

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
	public function get_all_global_message_templates($orderby = 'GRP_ID', $order = 'ASC' ) {
		return $this->get_all_message_templates_where( array('MTP_is_global' => TRUE, 'MTP_deleted' => FALSE ), $orderby, $order );
	}

	/**
	 * get_all_event_message_templates 
	 * @access public
	 * @return array all message templates that are non-global and are event specific
	 */
	public function get_all_event_message_templates($orderby = 'GRP_ID', $order = 'ASC' ) {
		return $this->get_all_message_templates_where( array( 'MTP_is_global' => FALSE, 'MTP_deleted' => FALSE ), $orderby, $order );
	}

	/**
	 * get_all_message_templates_by_event
	 * @access public
	 * @param  int $EVT_ID specific event id
	 * @return array         message template objects that are attached to a specific event.
	 */
	public function get_all_message_templates_by_event($EVT_ID, $orderby = 'GRP_ID', $order = 'ASC') {
		return $this->get_all_message_templates_where( array( 'EVT_ID' => $EVT_ID, 'MTP_deleted' => FALSE ), $orderby, $order );
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
		$max_grp_id = $wpdb->get_var( $wpdb->prepare($query) );
		if ( empty($max_grp_id) || $max_grp_id === 0 )
			$max_grp_id = 0;
		$max_grp_id++;
		return $max_grp_id;
	}	

} //end class EEM_Message_Template.model