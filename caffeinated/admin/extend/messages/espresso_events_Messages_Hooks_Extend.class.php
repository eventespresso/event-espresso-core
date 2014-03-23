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
 * espresso_events_Messages_Hooks_Extend
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 *
 * @package		espresso_events_Messages_Hooks_Extend
 * @subpackage	caffeinated/admin/extend/messages/espresso_events_Messages_Hooks_Extend.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Messages_Hooks_Extend extends espresso_events_Messages_Hooks {

	/**
	 * extending the properties set in espresso_events_Messages_Hooks
	 *
	 * @access protected
	 * @return void
	 */
	protected function _extend_properties() {
		define( 'EE_MSGS_EXTEND_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/assets/' );
		$this->_ajax_func = array(
			'ee_msgs_create_new_custom' => 'create_new_custom'
			);
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array('edit','create_event'),
				'func' => 'messages_metabox',
				'label' => __('Notifications', 'event_espresso'),
				'priority' => 'high'
				)
			);

		//see explanation for layout in EE_Admin_Hooks
		$this->_scripts_styles = array(
			'registers' => array(
				'events_msg_admin' => array(
					'url' => EE_MSGS_EXTEND_ASSETS_URL . 'events_messages_admin.js',
					'depends' => array('ee-dialog', 'ee-parse-uri', 'ee-serialize-full-array')
					),
				'events_msg_admin_css' => array(
					'url' => EE_MSGS_EXTEND_ASSETS_URL . 'ee_msg_events_admin.css',
					'type' => 'css'
					)
				),
			'enqueues' => array(
				'events_msg_admin' => array('edit'),
				'events_msg_admin_css' => array('edit')
				)
			); /**/
	}


	public function messages_metabox($event, $callback_args) {

		//let's get the active messengers (b/c messenger objects have the active message templates)
		//convert 'evt_id' to 'EVT_ID'
		$this->_req_data['EVT_ID'] = isset( $this->_req_data['EVT_ID'] ) ? $this->_req_data['EVT_ID'] : NULL;
		$this->_req_data['EVT_ID'] = isset( $this->_req_data['post'] ) && empty( $this->_req_data['EVT_ID'] ) ? $this->_req_data['post'] : $this->_req_data['EVT_ID'];

		$this->_req_data['EVT_ID'] = empty($this->_req_data['EVT_ID'] ) && isset($this->_req_data['evt_id'] ) ? $this->_req_data['evt_id'] : $this->_req_data['EVT_ID'];

		//set flag for whether we are adding or editing an event.
		$add_event = empty($this->_req_data['EVT_ID']) ? TRUE : FALSE;

		if ( !$add_event ) {

			$EEM_controller = new EE_messages;
			$active_messengers = $EEM_controller->get_active_messengers();
			$tabs = array();

			//empty messengers?
			//Note message types will always have at least one available because every messenger has a default message type associated with it (payment) if no other message types are selected.
			if ( empty( $active_messengers ) ) {
				$msg_activate_url = EE_Admin_Page::add_query_args_and_nonce( array('action' => 'activate', 'activate_view' => 'messengers'), EE_MSG_ADMIN_URL );
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


			EE_Registry::instance()->load_helper( 'Tabbed_Content' );
			//we want this to be tabbed content so let's use the EEH_Tabbed_Content::display helper.
			$tabbed_content = EEH_Tabbed_Content::display($tabs);
			if ( is_wp_error($tabbed_content) ) {
				$tabbed_content = $tabbed_content->get_error_message();
			}
		} else {
			$tabbed_content = '<p>' . __( 'You will see notifications options after you add the initial details for your event and save it', 'event_espresso' ) . '</p>';
		}

		$notices = '<div id="espresso-ajax-loading" class="ajax-loader-grey">
				<span class="ee-spinner ee-spin"></span><span class="hidden">' . __('loading...', 'event_espresso') . '</span>
			</div><div class="ee-notices"></div>';

		if ( defined('DOING_AJAX' ) )
			return $tabbed_content;

		echo $notices . '<div class="messages-tabs-content">' . $tabbed_content . '</div>';

	}


	/**
	 * Ajax callback for ee_msgs_create_new_custom ajax request.
	 * Takes incoming GRP_ID and name and description values from ajax request to create a new custom template based off of the incoming GRP_ID.
	 *
	 * @access public
	 * @return string either an html string will be returned or a success message
	 */
	public function create_new_custom() {

		//let's clean up the _POST global a bit for downstream usage of name and description.
		$_POST['templateName'] = !empty( $this->_req_data['custom_template_args']['MTP_name'] ) ? $this->_req_data['custom_template_args']['MTP_name'] : '';
		$_POST['templateDescription'] = !empty( $this->_req_data['custom_template_args']['MTP_description'] ) ? $this->_req_data['custom_template_args']['MTP_description'] : '';

		//below is old content that possible will be ignored?

		//set EE_Admin_Page object (see method details in EE_Admin_Hooks parent
		$this->_set_page_object();

		//is this a template switch if so EE_Admin_Page child needs this object
		$this->_page_object->set_hook_object( $this );

		$this->_page_object->add_message_template( $this->_req_data['messageType'], $this->_req_data['messenger'], $this->_req_data['group_ID'] );
	}



	/**
	 * This is the dynamic method for this class that will end up hooking into the 'admin_footer' hook on the 'edit_event' route in the events page.
	 * @return string (admin_footer contents)
	 */
	public function edit_admin_footer() {
		$template_path = EE_CORE_CAF_ADMIN_EXTEND . 'messages/templates/create_custom_template_form.template.php';
		EEH_Template::display_template($template_path, array());
	}

} //end class espresso_events_Messages_Hooks_Extend
