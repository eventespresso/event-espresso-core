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
		define( 'EE_MSG_CAF_ASSETS_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'messages/assets/' );
		define( 'EE_MSG_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/assets/' );
		define( 'EE_MSG_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'messages/templates/' );
		define( 'EE_MSG_CAF_TEMPLATE_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/templates/' );
	}

	protected function _extend_page_config() {
		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'messages';
		$this->_page_routes['custom_mtps'] = '_ee_custom_messages_overview_list_table';
		$this->_page_config['custom_mtps'] = array(
				'nav' => array(
					'label' => __('Custom Message Templates', 'event_espresso'),
					'order' => 15
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
			),
			'all' => array(
				'slug' => 'all',
				'label' => __('View All Message Templates', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			),
			'trashed' => array(
				'slug' => 'trashed',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'restore_message_template' => __('Restore From Trash', 'event_espresso'),
					'delete_message_template' => __('Delete Permanently', 'event_espresso')
				)
			)
		);
	}



	protected function _ee_custom_messages_overview_list_table() {
		$this->_admin_page_title = __('Custom Message Templates', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}

} //end class Messages_Admin_Page
