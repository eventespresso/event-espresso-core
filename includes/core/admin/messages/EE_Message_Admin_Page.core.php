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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Message_Admin_Page class
 *
 * for Admin setup of the message pages
 *
 * @package		Event Espresso
 * @subpackage	includes/core/message/EE_Message_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Message_Admin_Page extends Admin_Page {

	private $_session;

	/**
	 * constructor
	 * @constructor 
	 * @access public
	 * @return void
	 */
	public function __construct( $_is_UI_request ) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION, '' );

		$this->page_slug = EE_MSG_PG_SLUG;
		$this->default_nav_tab_name = 'message templates';
		$this->_is_UI_request = $_is_UI_request;

		parent::__construct();

		//add ajax calls here
		if ( $this->_AJAX ) {
		}

		if ( $this->_is_UI_request ) {
			add_action( 'admin_init', array( &$this, '_set_bulk_actions' ) );
			//we're actually going to leave the default tabs which are going to be "message types", "settings" and "reports" (for reporting the messages that have gone out).
		}
	}

	/**
	 * 		define_page_vars
	*		@access private
	*		@return void
	*/
	protected function define_page_vars() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$this->admin_base_url = EE_MSG_ADMIN_URL;
		$this->admin_page_title = __( 'Messages', 'event_espresso' );
	}

	/**
	 * 		an array for storing key => value pairs of request actions and their corresponding methods
	*		@access private
	*		@return void
	*/
	protected function set_page_routes() {			

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$this->_page_routes = array(
				// prices
				'default'	=> '_ee_messages_overview_list_table',
				'add_new_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => TRUE )),
				'edit_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => FALSE )),
				'trash_message_template'	=> array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE )),
				'restore_message_template'	=> array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => FALSE )),
				'delete_message_template'	=> '_delete_event_price',
				'settings'	=> array( 'func' => '_activate_message_type', 'args' => array( 'new_price' => TRUE )),
				'reports' => '_messages_reports'
		);
	}

	/**
	 * _set_bulk_actions
	 * @access public
	 * @return void
	 */
	public function _set_bulk_actions() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		// lists of bulk actions
		$messages_bulk_actions = array( 'trash_message_template', 'restore_message_template', 'delete_message_template' );
		
		if ( $this->_req_action == 'default' ) {
//			echo '<h1>1 !!!</h1>';
			$this->_views['in_use']['bulk_action'] = array( 'trash_message_template' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_message_template' => 'Restore From Trash', 'delete_message_template' => 'Delete Permanently' );
		} else if ( in_array( $this->_req_action, $messages_bulk_actions )) {
//			echo '<h1>3 !!!</h1>';
			// POST request
			if ( ! empty( $_POST )) {
				// reset requested nonce value - name = 'bulk-' . $this->_args['plural']  ( with spaces removed from $this->_args['plural'] )
				$this->_req_nonce = 'bulk-message-templates';				
			}
			// set bulk actions
			$this->_views['in_use']['bulk_action'] = array( 'trash_message_template' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_message_template' => 'Restore From Trash', 'delete_message_template' => 'Delete Permanently' );
		} 
	}

	/**
	 * generates HTML for main EE Messages Admin page
	 * @access protected
	 * @return void
	 * @todo I expect that this will modify somewhat but uncertain if it will occur in the extended WP_List_tables or not.
	 */
	protected function _ee_messages_overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//generate URL for Add New Price link
		$add_new_message_template_url = wp_nonce_url( add_query_arg( array( 'action' => 'add_new_message_template' ), EE_MSG_ADMIN_URL ), 'add_new_message_template_nonce' );
		// add link to title
		$this->admin_page_title .= ' <a href="' . $add_new_message_template_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Message Template', 'event_espresso') . '</a>';
		$this->admin_page_title .= $this->_learn_more_about_message_templates_link();
		
		$message_templates = $this->_get_message_templates();

		//$message_templates COULD be an error object. IF it is then we want to handle/display the error
		if ( is_wp_error($message_templates) ) {
			$this->_handle_errors($message_templates);
			$message_templates = array();
		}

		$this->template_args['table_rows'] = count( $message_templates );
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->template_args['table_rows'] );

		$this->template_args['view_RLs'] = $this->get_list_table_view_RLs();
		$this->template_args['list_table'] = new EE_Messages_List_Table( $message_templates, $this->_view, $this->_views, $entries_per_page_dropdown );

		// link back to here
		$this->template_args['ee_msg_overview_url'] = add_query_arg( array( 'noheader' => 'true' ), EE_MSG_ADMIN_URL );
		$this->template_args['status'] = $this->_view;
		// path to template
		$template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_admin_overview.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->display_admin_page_with_sidebar();
	}

	/**
	 * _get_message_templates
	 * This gets all the message templates for listing on the overview list.
	 * @access protected
	 * @return array|WP_Error object
	 */
	protected function _get_message_templates() {
		global $espresso_wp_user;
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$message_templates = array();

		require_once( EE_MSG_ADMIN . 'EE_Message_Template_List_Table.class.php' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();
		
		$_GET['orderby'] = empty($_GET['orderby']) ? '' : $_GET['orderby'];

		switch ( $_GET['orderby'] ) {
			case 'messenger' :
				$orderby = 'MTP_messenger';
				break;
			case 'message_type' :
				$orderby = 'MTP_message_type';
				break;
			case 'user_id' :
				$orderby = 'MTP_user_id';
				break;
			default:
				$orderby = 'GRP_ID';
				break; 
		}

		$order = ( isset( $_GET['order'] ) && ! empty( $_GET['order'] ) ) ? $_GET['order'] : 'ASC';

		if ( $message_templates = $MTP->get_all_global_message_templates() ) {
			//todo: left off here	
		}

	}

	/**
	 * 	_learn_more_about_message_templates_link
	*	@access protected
	*	@return string
	*/
	protected function _learn_more_about_message_templates_link() {
		return '<a class="hidden" style="margin:0 20px; cursor:pointer; font-size:12px;" >' . __('learn more about how message templates works', 'event_espresso') . '</a>';
	}

	/**
	 * _handle_errors
	 * This will take an incoming error object and add it to the espresso_notices array.
	 * @param  object $error_obj a WP_Error object
	 * @access protected
	 * @return void
	 * @todo IF this works well, we could use this in the Admin_Page parent class to handle errors and switch things over to using WP_Errors.
	 */
	protected function _handle_errors($error_obj) {
		global $espresso_notices;
		
		if ( is_wp_error($error_obj) ) {
			$espresso_notices['errors'][] = $error_obj->get_error_msg;
		}
	}
}