<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
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
	 * espresso_events_Messages_Hooks_Extend constructor.
	 *
	 * @param \EE_Admin_Page $admin_page
	 */
	public function __construct( EE_Admin_Page $admin_page ) {
		/**
		 * Add cap restriction ... metaboxes should not show if user does not have the ability to edit_custom_messages
		 */
		if (
			! EE_Registry::instance()->CAP->current_user_can( 'ee_edit_messages', 'messages_events_editor_metabox' )
		) {
			return;
		}
		add_filter(
			'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks',
			array( $this, 'caf_updates' ),
			10
		);
		parent::__construct( $admin_page );
	}



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
				'page_route' => array('edit','create_new'),
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
				'events_msg_admin' => array('edit', 'create_new'),
				'events_msg_admin_css' => array('edit', 'create_new')
			)
		);
	}


	public function caf_updates( $update_callbacks ) {
		$update_callbacks[] = array( $this, 'attach_evt_message_templates' );
		return $update_callbacks;
	}




	/**
	 * Handles attaching Message Templates to the Event on save.
	 *
	 * @param  EE_Event $event 	EE event object
	 * @param  array    $data   The request data from the form
	 * @return bool     		success or fail
	 */
	public function attach_evt_message_templates( $event, $data ) {
		//first we remove all existing relations on the Event for message types.
		$event->_remove_relations('Message_Template_Group');
		//now let's just loop through the selected templates and add relations!
		if ( isset( $data[ 'event_message_templates_relation' ] ) ) {
			foreach ( $data[ 'event_message_templates_relation' ] as $grp_ID ) {
				$event->_add_relation_to( $grp_ID, 'Message_Template_Group' );
			}
		}
		//now save
		return $event->save();
	}



	/**
	 * @param $event
	 * @param $callback_args
	 * @return string
	 * @throws \EE_Error
	 */
	public function messages_metabox( $event, $callback_args ) {
		//let's get the active messengers (b/c messenger objects have the active message templates)
		//convert 'evt_id' to 'EVT_ID'
		$this->_req_data['EVT_ID'] = isset( $this->_req_data['EVT_ID'] ) ? $this->_req_data['EVT_ID'] : NULL;
		$this->_req_data['EVT_ID'] = isset( $this->_req_data['post'] ) && empty( $this->_req_data['EVT_ID'] )
			? $this->_req_data['post']
			: $this->_req_data['EVT_ID'];

		$this->_req_data['EVT_ID'] = empty($this->_req_data['EVT_ID'] ) && isset($this->_req_data['evt_id'] )
			? $this->_req_data['evt_id']
			: $this->_req_data['EVT_ID'];
		/** @type EE_Message_Resource_Manager $message_resource_manager */
		$message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$active_messengers = $message_resource_manager->active_messengers();
		$tabs = array();

		//empty messengers?
		//Note message types will always have at least one available because every messenger has a default message type associated with it (payment) if no other message types are selected.
		if ( empty( $active_messengers ) ) {
			$msg_activate_url = EE_Admin_Page::add_query_args_and_nonce(
				array('action' => 'settings'),
				EE_MSG_ADMIN_URL
			);
			$error_msg = sprintf(
				__('There are no active messengers. So no notifications will go out for %1$sany%2$s events.  You will want to %3$sActivate a Messenger%4$s.', 'event_espresso'),
				'<strong>',
				'</strong>',
				'<a href="' . $msg_activate_url . '">',
				'</a>'
			);
			$error_content = '<div class="error"><p>' . $error_msg . '</p></div>';
			$internal_content = '<div id="messages-error"><p>' . $error_msg . '</p></div>';

			echo $error_content;
			echo $internal_content;
			return '';
		}

		$event_id = isset($this->_req_data['EVT_ID']) ? $this->_req_data['EVT_ID'] : NULL;
		//get content for active messengers
		foreach ( $active_messengers as $name => $messenger ) {
			//first check if there are any active message types for this messenger.
			$active_mts = $message_resource_manager->get_active_message_types_for_messenger( $name );
			if ( empty( $active_mts ) ) {
				continue;
			}

			$tab_content = $messenger->get_messenger_admin_page_content(
				'events',
				'edit',
				array( 'event' => $event_id )
			);

			if ( ! empty( $tab_content ) ) {
				$tabs[$name] = $tab_content;
			}
		}


		//we want this to be tabbed content so let's use the EEH_Tabbed_Content::display helper.
		$tabbed_content = EEH_Tabbed_Content::display($tabs);
		if ( $tabbed_content instanceof WP_Error ) {
			$tabbed_content = $tabbed_content->get_error_message();
		}

		$notices = '
	<div id="espresso-ajax-loading" class="ajax-loader-grey">
		<span class="ee-spinner ee-spin"></span><span class="hidden">' . __('loading...', 'event_espresso') . '</span>
	</div>
	<div class="ee-notices"></div>';

		if ( defined('DOING_AJAX' ) ) {
			return $tabbed_content;
		}

		do_action( 'AHEE__espresso_events_Messages_Hooks_Extend__messages_metabox__before_content' );
		echo $notices . '<div class="messages-tabs-content">' . $tabbed_content . '</div>';
		do_action( 'AHEE__espresso_events_Messages_Hooks_Extend__messages_metabox__after_content' );

	}


	/**
	 * Ajax callback for ee_msgs_create_new_custom ajax request.
	 * Takes incoming GRP_ID and name and description values from ajax request
	 * to create a new custom template based off of the incoming GRP_ID.
	 *
	 * @access public
	 * @return string either an html string will be returned or a success message
	 */
	public function create_new_custom() {

		if ( ! EE_Registry::instance()->CAP->current_user_can( 'ee_edit_messages', 'create_new_custom_ajax' ) ) {
			wp_die( __('You don\'t have privileges to do this action', 'event_espresso' ) );
		}

		//let's clean up the _POST global a bit for downstream usage of name and description.
		$_POST['templateName'] = !empty( $this->_req_data['custom_template_args']['MTP_name'] )
			? $this->_req_data['custom_template_args']['MTP_name']
			: '';
		$_POST['templateDescription'] = !empty( $this->_req_data['custom_template_args']['MTP_description'] )
			? $this->_req_data['custom_template_args']['MTP_description']
			: '';


		// set EE_Admin_Page object (see method details in EE_Admin_Hooks parent
		$this->_set_page_object();

		// is this a template switch if so EE_Admin_Page child needs this object
		$this->_page_object->set_hook_object( $this );

		$this->_page_object->add_message_template(
			$this->_req_data['messageType'],
			$this->_req_data['messenger'],
			$this->_req_data['group_ID']
		);
	}


	public function create_new_admin_footer() {
		$this->edit_admin_footer();
	}



	/**
	 * This is the dynamic method for this class
	 * that will end up hooking into the 'admin_footer' hook on the 'edit_event' route in the events page.
	 *
	 * @return string (admin_footer contents)
	 */
	public function edit_admin_footer() {
		EEH_Template::display_template(
			EE_CORE_CAF_ADMIN_EXTEND . 'messages/templates/create_custom_template_form.template.php'
		);
	}

} //end class espresso_events_Messages_Hooks_Extend
