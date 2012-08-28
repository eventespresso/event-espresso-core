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
				'add_new_message_template'	=> array( 'func' => '_edit_message_template', 'args' => array( 'new_template' => TRUE )),
				'edit_message_template'	=> array( 'func' => '_edit_message_template', 'args' => array( 'new_template' => FALSE )),
				'insert_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => TRUE )),
				'update_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => FALSE )),
				'trash_message_template'	=> array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE )),
				'restore_message_template'	=> array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => FALSE )),
				'delete_message_template'	=> '_delete_message_template',
				'settings'	=> array( 'func' => '_activate_messagenger', 'args' => array( 'new_price' => TRUE )),
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
		
		if ( empty($message_templates) ) {
			$message_templates = new WP_Error( __('no_message_templates', 'event_espresso'), __('There are no message templates in the system.  Have you activated any messengers?', 'event_espresso') . espresso_get_error_code( __FILE__, __FUNCTION__, __LINE__) );
		}

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
		$msg_templates = array();

		/** todo: is this even needed?
		//require_once( EE_MSG_ADMIN . 'EE_Message_Template_List_Table.class.php' ); /**/
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

		if ( $message_templates = $MTP->get_all_global_message_templates($orderby, $order) ) {
			
			//bubble up error_object if present
			if ( is_wp_error($message_templates) ) {
				return $message_templates;
			}
			//todo: pretty sure this won't work as expected.  We're not handling the _view correctly.  Actually... under the new system there won't even BE a trashed view UNLESS the entire template group is trashed.
			$this->views['trashed']['count'] = 0;
			$this->views['in_use']['count'] = 0;
			foreach ( $message_templates as $template ) {
				$this->views['trashed']['count'] += $template->trash_count();
				$this->views['in_use']['count'] += $template->is_active_count();
				$msg_templates[] = $template;
			}
		}
		return $msg_templates;
	}

	/**
	 * _edit_message_template
	 * 
	 * @access protected
	 * @return void
	 */
	protected function _edit_message_template() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$GRP_ID = isset( $_REQUEST['id'] ) && !empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : FALSE;

		$EVT_ID = isset( $_REQUEST['evt_id'] ) && !empty( $_REQUEST['evt_id'] ) ? absint( $_REQUEST['evt_id'] ) : FALSE;

		$context = isst( $_REQUEST['context'] && !empty($_REQUEST['context'] ) ) ? strtolower($_REQUEST['context']) : FALSE;

		$title = __(ucwords( str_replace( '_', ' ', $this->_req_action ) ), 'event_espresso' );

		//let's get the message templates
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();

		if ( empty($GRP_ID) ) {
			$message_template = $MTP->get_new_template;
			$action = 'insert_message_template';
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		} else {
			$message_template = $MTP->get_message_template_by_ID($GRP_ID);
			$action = 'update_message_template';
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
			$title .= $message_template->messenger() . ' ' . $message_template->message_type . ' Template'; 
		}

		//todo: let's display the event name rather than ID. 
		$title .= $EVT_ID ? ' for EVT_ID: ' . $EVT_ID : '';

		$this->template_args['GRP_ID'] = $GRP_ID;
		$this->template_args['message_template'] = $message_template;
		$this->template_args['action'] = $action;
		$this->template_args['context'] = $context;
		$this->template_args['EVT_ID'] = $EVT_ID;
		$this->template_args['edit_message_template_form_url'] = $edit_message_template_form_url;
		$this->template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();

		//add nav tab for this page
		$this->nav_tabs['edit_message_template']['url'] = wp_nonce_url( add_query_arg( array( 'action' => $action, 'id' => $GRP_ID, 'context' => $context, 'evt_id' => $EVT_ID), EE_MSG_ADMIN_URL ), $action . '_nonce' );
		$this->nav_tabs['edit_message_template']['link_text'] = __('Message Template', 'event_espresso');
		$this->nav_tabs['edit_message_template']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['edit_message_template']['order'] = 15;

		//generate metabox
		$this->_add_admin_page_meta_box( $action, $title, __FUNCTION__, NULL );

		//final template wrapper
		$this->display_admin_page_with_sidebar();
	}

	/**
	 * utility for sanitizing new values coming in.
	 * Note: this is only used when updating a context.
	 * 
	 * @access protected
	 * @param int $index This helps us know which template field to select from the request array.
	 */
	protected function _set_message_template_column_values($index=null) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$set_column_values = array(
			'MTP_ID' => absint($_REQUEST['MTP_template_field'][$index]['MTP_ID']),
			'EVT_ID' => absint($_REQUEST['EVT_ID']),
			'GRP_ID' => absint($_REQUEST['GRP_ID']),
			'MTP_user_id' => absint($_REQUEST['MTP_user_id']),
			'MTP_messenger'	=> strtolower($_REQUEST['MTP_messenger']),
			'MTP_message_type' => strtolower($_REQUEST['MTP_message_type']),
			'MTP_template_field' => strtolower($_REQUEST['MTP_template_field'][$index]['name']),
			'MTP_context' => strtolower($_REQUEST['MTP_context']),
			'MTP_content' => strtolower($_REQUEST['MTP_template_field'][$index]['content']),
			'MTP_is_active' => absint($_REQUEST['MTP_is_active']),
			'MTP_is_global' => absint($_REQUEST['MTP_is_global']),
			'MTP_is_override' => absint($_REQUEST['MTP_is_override']),
			'MTP_deleted' => absint($_REQUEST['MTP_deleted'])
		);
		return $set_column_values;
	}

	protected function _insert_or_update_message_template($new = FALSE ) {
		
		do_action ( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$success = 0;
		//setup notices description	
		$messenger = !empty($_REQUEST['MTP_messenger']) ? ucwords(str_replace('_', ' ', $_REQUEST['MTP_messenger'] ) ) : false;
		$message_type = !empty($_REQUEST['MTP_message_type']) ? ucwords(str_replace('_', ' ', $_REQUEST['MTP_message_type'] ) ) : false;
		$context = !empty($_REQUEST['MTP_context']) ? ucwords(str_replace('_', ' ', $_REQUEST['MTP_context'] ) ) : false;

		$item_desc = $messenger ? $messenger . ' ' . $message_type . ' ' . $context . ' ' : '';
		$item_desc .= 'Message Template';
		$query_args = array();

		//if this is "new" then we need to generate the default contexts for the selected messenger/message_type for user to edit.
		if ( $new_price ) {
			if ( $edit_array = $this->_generate_new_templates($messenger, $message_type) ) {
				if ( is_wp_error ($edit_array) ) {
					$this->_handle_errors($edit_array);
				} else {
					$success = 1;
					$query_args = array(
						'id' => $edit_array['GRP_ID'],
						'evt_id' => $edit_array['EVT_ID'],
						'context' => $edit_array['MTP_context'],
						'action' => 'edit_message_template'
						);
				}
			}
			$action_desc = 'created';
		} else {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Type.model.php');
			$MTP = EEM_Message_Type::instance();
			
			//run update for each template field in displayed context
			for ( $i=0; $i < count($_REQUEST['MTP_template_field']); $i++ ) {
				$set_column_values = $this->_set_message_template_column_values($i);
				$where_cols_n_values = array( 'MTP_ID' => $_REQUEST['MTP_template_field'][$index]['MTP_ID']);
				if ( $updated = $MTP->update( $set_column_values, $where_cols_n_values ) ) {
					if ( is_wp_error($updated) ) {
						$this->_handle_errors($edit_array);
					} else {
						$success = 1;
					}
				}
				$action_desc = 'updated';
			}
		}
		
		$this->_redirect_after_admin_action( $success, $item_desc, $action_desc, $query_args );

	}

	/**
	 * _generate_new_templates
	 * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will automaticlaly create the defaults for the event.  The user would then be redirected to edit the default context for the event.
	 * @return array|error_object array of data required for the redirect to the correct edit page or error object if encountering problems.
	 */
	protected function _generate_new_templates($messenger, $message_type, $evt_id) {
		if ( empty($messenger) || empty($message_type) ) {
			return new WP_Error(__('empty_variable', 'event_espresso'), __('Missing required messenger or message_type', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}
		$messenger = ucwords(str_replace(' ', '_', $messenger) );

		//load messenger object so we know what to do.
		$messenger_class = 'EE_' . $messenger . '_messenger';
		if ( !class_exists($messenger_class) ) {
			return new WP_Error(__('no_class_exists', 'event_espresso'), sprintf(__('%s class could not be loaded or doesn\'t exist', 'event_espresso'), $messenger) . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		//k we can safely assume the class can be called.
		$msgr = call_user_func($messenger_class);
		$new_message_template_group = $msgr->create_new_templates($message_type, $evt_id);
		return $new_message_template_group;

	}

	protected function _trash_or_restore_message_template($trash = TRUE ) {
		//todo
	}

	protected function _delete_message_template() {
		//todo
	}

	private function _redirect_after_admin_action( $success = FALSE, $what = 'item', $action_desc = 'processed', $query_args = array() ) {
		//todo
	}

	/**
	 * _edit_message_template_fields_meta_box
	 * @access public
	 * @return void
	 */
	public function _edit_message_template_meta_box() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$template_path = $this->template_args['GRP_ID'] ?EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_edit_meta_box.template.php' : EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE);
	}


	/**
	 * 	_learn_more_about_message_templates_link
	*	@access protected
	*	@return string
	*/
	protected function _learn_more_about_message_templates_link() {
		return '<a class="hidden" style="margin:0 20px; cursor:pointer; font-size:12px;" >' . __('learn more about how message templates works', 'event_espresso') . '</a>';
	}
}