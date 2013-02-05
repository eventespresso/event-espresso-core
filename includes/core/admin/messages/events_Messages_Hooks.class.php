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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * events_Messages_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		events_Messages_Hooks
 * @subpackage	includes/core/admin/messages/events_Messages_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class events_Messages_Hooks extends EE_Admin_Hooks {

	public function __construct() {
		parent::__construct();
	}



	protected function _set_hooks_properties() {
		
		$this->_name = 'messages';
		$this->_ajax_func = array(
			'switch_template' => 'switch_template'
			);
		$this->_metaboxes = array(
			0 => array(
				'page_route' => 'edit_event',
				'func' => 'messages_metabox',
				'label' => __('Notifications', 'event_espresso'),
				'priority' => 'core'
				)
			);
		$this->_scripts = array(
			'edit_event' => 'events_msgs_admin'
			);

		//register scripts
		wp_register_script('events_msgs_admin', EE_MSG_ASSETS_URL . 'events_messages_admin.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE);
	}



	public function messages_metabox($event, $callback_args) {

		//let's get the active messengers (b/c messenger objects have the active message templates)
		$EEM_controller = new EE_Messages;
		$active_messengers = $EEM_controller->get_active_messengers();
		$tabs = array();

		//empty messengers?
		//Note message types will always have at least one available because every messenger has a default message type associated with it (payment) if no other message types are selected.
		if ( empty( $active_messengers ) ) {
			$msg_activate_url = wp_nonce_url( add_query_arg( array('action' => 'activate', 'activate_view' => 'messengers'), 
				EE_MSG_ADMIN_URL ), 'activate_nonce' );
			$error_msg = sprintf( __('There are no active messengers. So no notifications will NOT go out for <strong>any</strong> events.  You will want to %sActivate a Messenger%s.', 'event_espresso'), '<a href="' . $msg_activate_url . '">', '</a>');
			$error_content = '<div class="error"><p>' . $error_msg . '</p></div>';
			$internal_content = '<div id="messages-error"><p>' . $error_msg . '</p></div>'; 
			echo $error_content;
			echo $internal_content;
			return;
		}
		

		//get content for active messengers
		foreach ( $active_messengers as $name => $messenger ) {
			$event_id = isset($this->_req_data['EVT_ID']) ? $this->_req_data['EVT_ID'] : NULL;
			$tabs[$name] = $messenger->get_messenger_admin_page_content('events', 'edit', array('event' => $event_id) );
		}


		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Tabbed_Content.helper.php';
		//we want this to be tabbed content so let's use the EE_Tabbed_Content::display helper.
		$tabbed_content = EE_Tabbed_Content::display($tabs);
		if ( is_wp_error($tabbed_content) ) {
			$tabbed_content = $tabbed_content->get_error_message();
		}
		
		echo $tabbed_content;
	}


	/**
	 * This takes the incoming ajax request to switch an events template from whatever it is currently using to global.  If the request is to switch to a custom event template that hasn't been created yet, then we need to walk through the process of setting up the custom event template.
	 *
	 * @access public
	 * @return string either an html string will be returned or a success message
	 */
	public function switch_template() {

		//let's route according to the sent page route
		var_dump('in_here');
		exit();
	}
}