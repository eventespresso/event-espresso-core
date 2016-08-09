<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Extend_Messages_Admin_Page
 *
 * This is the Messages Caffeinated admin page.  //for now this is fairly bare, most functionality is contained in the parent class, however, it is likely that at some point in the future this will change so having this extended class will be handy.  We also need this if we're going to have an extended "hooks" file.
 *
 *
 * @package		Extend_Messages_Admin_Page
 * @subpackage	caffeinated/admin/extend/messages/Extend_Messages_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Messages_Admin_Page extends Messages_Admin_Page {



	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		if ( !defined( 'EE_MSG_CAF_ASSETS_PATH' ) ) {
			define( 'EE_MSG_CAF_ASSETS_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'messages/assets/' );
			define( 'EE_MSG_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/assets/' );
			define( 'EE_MSG_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'messages/templates/' );
			define( 'EE_MSG_CAF_TEMPLATE_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/templates/' );
		}
	}

	protected function _extend_page_config() {
		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'messages';
		$this->_page_routes['custom_mtps'] = array(
			'func' => '_ee_custom_messages_overview_list_table',
			'capability' => 'ee_read_messages' );
		$this->_page_config['custom_mtps'] = array(
				'nav' => array(
					'label' => __('Custom Message Templates', 'event_espresso'),
					'order' => 30
					),
				'list_table' => 'Custom_Messages_Template_List_Table',
				'help_tabs' => array(
					'message_overview_message_types_help_tab' => array(
						'title' => __('Message Types', 'event_espresso'),
						'filename' => 'messages_overview_types'
					),
					'messages_overview_messengers_help_tab' => array(
						'title' => __('Messengers', 'event_espresso'),
						'filename' => 'messages_overview_messengers',
					),
					'messages_overview_other_help_tab' => array(
						'title' => __('Messages Other', 'event_espresso'),
						'filename' => 'messages_overview_other',
					),
				),
				'help_tour' => array(),
				'require_nonce' => FALSE
				);

		add_action( 'current_screen', array( $this, 'dynamic_screen_hooks' ), 10 );
	}




	/**
	 * Callback for current_screen action
	 * This is used for any filters and/or actions that require the dynamic screen hook_prefix to be correct.
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	public function dynamic_screen_hooks() {
		global $admin_page_hooks;

		if ( !empty( $admin_page_hooks['espresso_events'] ) ) {
			//we're on a EE specific page... good stuff!
			$hook_prefix = $admin_page_hooks['espresso_events'];
			$filter_ref = $hook_prefix . '_page_' . $this->page_slug;
			add_filter( 'FHEE_manage_' . $filter_ref . '_columns', array( $this, 'add_custom_mtps_columns' ), 10, 2 );
			add_action( 'AHEE__EE_Admin_List_Table__column_actions__' . $filter_ref, array( $this, 'custom_mtp_create_button_column'), 10, 2 );
		}
	}



	/**
	 * This is the callback for the FHEE__manage_event-espresso_page_espresso_messages_columns to register the caffeinated columns for the global message templates list table.
	 *
	 * @since 4.3.2
	 *
	 * @param array  $columns   Original defined list of columns
	 * @param string $screen_id The unique screen id for the page.
	 */
	public function add_custom_mtps_columns( $columns, $screen_id ) {
		if ( $screen_id !== 'espresso_messages_global_mtps' ) {
			return $columns;
		}

		$columns['actions'] = '';
		return $columns;
	}




	/**
	 * Callback for FHEE__EE_Admin_List_Table__column_actions__event-espresso_page_espresso_messages action that allows for adding the content for the registered "action" column.
	 *
	 * @since 4.3.2
	 *
	 * @param EE_Base_Class
	 * @param string $screen_id Unique screen id for the page
	 *
	 * @return string html content for the page.
	 */
	public function custom_mtp_create_button_column( $item, $screen_id ) {
		if ( $screen_id !== 'espresso_messages_global_mtps' || ! EE_Registry::instance()->CAP->current_user_can( 'ee_edit_messages', 'espresso_messages_add_new_message_template' ) ) {
			return '';
		}

		//first we consider whether this template has override set.  If it does then that means no custom templates can be created from this template as a base.  So let's just skip the button creation.
		if ( $item->get('MTP_is_override' ) )
			return '';


		$create_args = array(
			'GRP_ID' => $item->ID(),
			'messenger' => $item->messenger(),
			'message_type' => $item->message_type(),
			'action' => 'add_new_message_template'
			);
		$create_link = EE_Admin_Page::add_query_args_and_nonce( $create_args, EE_MSG_ADMIN_URL );
		echo sprintf( '<a href="%s" class="button button-small">%s</a>', $create_link, __('Create Custom', 'event_espresso') );
	}





	protected function _add_screen_options_custom_mtps() {
		$page_title = $this->_admin_page_title;
		$this->_admin_page_title = __('Custom Message Templates', 'event_espresso');
		$this->_per_page_screen_option();
		$this->_admin_page_title = $page_title;
	}



	/**
	 * set views array for Custom Templates list table
	 *
	 * @access public
	 * @return void
	 */
	public function _set_list_table_views_custom_mtps() {
		$this->_views = array(
			'in_use' => array(
				'slug' => 'in_use',
				'label' => __('In Use', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			)
		);
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_messages', 'espresso_messages_trash_message_template' ) ) {
			$this->_views['trashed'] = array(
				'slug' => 'trashed',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'restore_message_template' => __('Restore From Trash', 'event_espresso'),
					'delete_message_template' => __('Delete Permanently', 'event_espresso')
				)
			);
		}
	}



	protected function _ee_custom_messages_overview_list_table() {
		$this->_admin_page_title = __('Custom Message Templates', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}

} //end class Messages_Admin_Page
