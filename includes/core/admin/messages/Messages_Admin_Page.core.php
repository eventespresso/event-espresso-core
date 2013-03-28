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

class Messages_Admin_Page extends EE_Admin_Page {

	private $_active_messengers = array();
	private $_active_message_types = array();
	private $_active_messenger;
	private $_activate_state;
	private $_activate_meta_box_type;
	private $_current_message_meta_box;
	private $_current_message_meta_box_object;
	private $_context_switcher;
	private $_shortcodes = array();
	private $_message_template;
	private $_m_mt_settings = array();

	



	/**
	 * constructor
	 * @constructor 
	 * @access public
	 * @return void
	 */
	public function __construct( $routing = TRUE ) {
		parent::__construct($routing);
	}





	protected function _init_page_props() {
		global $espresso_wp_user;
		$this->page_slug = EE_MSG_PG_SLUG;
		$this->page_label = __('Messages System', 'event_espresso');

		$this->_activate_state = isset($this->_req_data['activate_state']) ? (array) $this->_req_data['activate_state'] : array();

		$this->_active_messenger = isset( $this->_req_data['messenger'] ) ? $this->_req_data['messenger'] : NULL;
	

		//we're also going to set the active messengers and active message types in here.
		$this->_active_messengers = get_option('ee_active_messengers');
		$this->_active_messengers = !empty($this->_active_messengers) ?  $this->_active_messengers : array();
		$this->_active_message_types = !empty($this->_active_messenger) && !empty($this->_active_messengers[$this->_active_messenger]) ? array_keys($this->_active_messengers[$this->_active_messenger]['settings'][$this->_active_messenger . '-message_types']) : array();
		

		//what about saving the objects in the active_messengers and active_message_types?
		$this->_load_active_messenger_objects();
		$this->_load_active_message_type_objects();
	}




	/**
	 * loads messenger objects into the $_active_messengers property (so we can access the needed methods)
	 *
	 * @access  private
	 * @return void 
	 */
	private function _load_active_messenger_objects() {
		foreach ( $this->_active_messengers as $messenger => $values ) {
			$ref = ucwords( str_replace( '_' , ' ', $messenger) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_messenger';

			if ( !class_exists($classname) )
				throw new EE_Error( sprintf( __('There is no messenger for the given classname (%s)', 'event_espresso'), $classname ) );

			$a = new ReflectionClass( $classname );
			$this->_active_messengers[$messenger]['obj'] = $a->newInstance();
		}
	}




	/**
	 * loads messenger objects into the $_active_messengers property (so we can access the needed methods)
	 *
	 * @access  private
	 * @return void 
	 */
	private function _load_active_message_type_objects() {
		if ( empty($this->_active_message_types) ) return;
		foreach ( $this->_active_message_types as $message_type ) {
			$ref = ucwords( str_replace( '_' , ' ', $message_type) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_message_type';

			if ( !class_exists($classname) )
				throw new EE_Error( sprintf( __('There is no message type for the given classname (%s)', 'event_espresso'), $classname ) );

			$a = new ReflectionClass( $classname );
			$this->_active_message_types[$message_type]['obj'] = $a->newInstance();
		}
	}



	protected function _ajax_hooks() {
		add_action('wp_ajax_activate_messenger', array($this, 'activate_messenger_toggle' ) );
		add_action('wp_ajax_activate_mt', array( $this, 'activate_mt_toggle') );
		add_action('wp_ajax_ee_msgs_save_settings', array( $this, 'save_settings') );
		add_action('wp_ajax_ee_msgs_update_mt_form', array( $this, 'update_mt_form' ) );
	}






	protected function _define_page_props() {
		$this->_admin_base_url = EE_MSG_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Message Template', 'event_espresso'),
				'edit' => __('Edit Message Template', 'event_espresso'),
				'delete' => __('Delete Message Template', 'event_espresso')
			)
		);
	}







	/**
	 * 		an array for storing key => value pairs of request actions and their corresponding methods
	*		@access protected
	*		@return void
	*/
	protected function _set_page_routes() {			

		$this->_page_routes = array(
				'default'=> '_ee_messages_overview_list_table',
				'add_new_message_template'	=> '_add_message_template',
				'edit_message_template'	=> '_edit_message_template',
				'preview_message' => '_preview_message',
				'insert_message_template' => array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => TRUE ), 'noheader' => TRUE ),
				'update_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => FALSE ), 'noheader' => TRUE ),
				'trash_message_template' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE, 'all' => TRUE ), 'noheader' => TRUE ),
				'trash_message_template_context' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE ), 'noheader' => TRUE ),
				'restore_message_template' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => FALSE, 'all' => TRUE ), 'noheader' => TRUE ),
				'restore_message_template_context' => array( 'func' => '_trash_or_restore_message_template' , 'args' => array('trash' => FALSE), 'noheader' => TRUE  ),
				'delete_message_template' => array( 'func' => '_delete_message_template', 'noheader' => TRUE ),
				'settings' => '_settings',
				'reports' => '_messages_reports'
		);
	}








	protected function _set_page_config() {

		//setting up the edit message template url for the nav tab
		$group_query_args = isset($this->_req_data['GRP_ID']) ? array('GRP_ID' => $this->_req_data['GRP_ID'] ) : array();
		$event_query_args = isset($this->_req_data['evt_id']) ? array('evt_id' => $this->_req_data['evt_id'] ) : array();
		$edit_query_args = array_merge( $group_query_args, $event_query_args );

		$default_msg_help_tabs = array(
			'about-messages' => array(
				'title' => __('About Messages', 'event_espresso'),
				'callback' => 'messages_help_tab'
				),
			'about-messengers' => array(
				'title' => __('About Messengers', 'event_espresso'),
				'callback' => 'messengers_help_tab',
			),
			'about-message-types' => array(
				'title' => __('About Message Types', 'event_espresso'),
				'callback' => 'message_types_help_tab'
			),
			'about-message-templates' => array(
				'title' => __('About Message Templates', 'event_espresso'),
				'callback' => 'message_templates_help_tab'
				)
		);

		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10 
					),
				'list_table' => 'Messages_Template_List_Table',
				'help_tabs' => array_merge( array(
						'about-overview' => array(
							'title' => __('About the Overview', 'event_espresso'),
							'callback' => 'messages_overview_help_tab'
							),
						), $default_msg_help_tabs
				)
			),
			'add_new_message_template' => array(
				'nav' => array(
					'label' => __('Add New Message Templates', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE 
					)
				),
			'edit_message_template' => array(
				'nav' => array(
					'label' => __('Edit Message Templates', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => !empty($edit_query_args) ? add_query_arg( $edit_query_args, $this->_current_page_view_url ) : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box', '_register_edit_meta_boxes'),
				'has_metaboxes' => TRUE,
				'help_tabs' => array_merge( array(
						'about-editor' => array(
							'title' => __('About Template Editor', 'event_espresso'),
							'callback' => 'messages_template_editor_help_tab'
							)
						), $default_msg_help_tabs
					)
				),
			'preview_message' => array(
				'nav' => array(
					'label' => __('Message Preview', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'help_tabs' => array_merge( array(
						'about-preview' => array(
							'title' => __('About Previews', 'event_espresso'),
							'callback' => 'messages_preview_help_tab'
							)
						), $default_msg_help_tabs
					)
				),
			'settings' => array(
				'nav' => array(
					'label' => __('Settings', 'event_espresso'),
					'order' => 20
					),
				'metaboxes' => array('_messages_settings_metaboxes'),
				'help_tabs' => array_merge( array(
						'about-settings' => array(
							'title' => __('About Message Settings', 'event_espresso'),
							'callback' => 'messages_settings_help_tab'
							)
						), $default_msg_help_tabs
					)
				),
			'reports' => array(
				'nav' => array(
					'label' => __('Reports', 'event_espresso'),
					'order' => 30
					)
				)
		);

	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}






	//none of the below group are currently used for Messages
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function messages_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_help_tab.template.php';
		espresso_display_template( $templatepath, array());
	}



	public function messengers_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messenger_help_tab.template.php';
		espresso_display_template( $templatepath, array());
	}


	public function message_types_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_message_type_help_tab.template.php';
		espresso_display_template( $templatepath, array());
	}


	public function messages_overview_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_overview_help_tab.template.php';
		espresso_display_template( $templatepath, array());
	}

	public function message_templates_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_message_templates_help_tab.template.php';
		espresso_display_template( $templatepath, array());
	}


	public function messages_template_editor_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_templates_editor_help_tab.template.php';
		$args['img1'] = '<img src="' . EE_MSG_ASSETS_URL . 'images/editor.png' . '" alt="' . __('Editor Title', 'event_espresso') . '" />';
		$args['img2'] = '<img src="' . EE_MSG_ASSETS_URL . 'images/switch-context.png' . '" alt="' . __('Context Switcher and Preview', 'event_espresso') . '" />';
		$args['img3'] = '<img class="left" src="' . EE_MSG_ASSETS_URL . 'images/form-fields.png' . '" alt="' . __('Message Template Form Fields', 'event_espresso') . '" />';
		$args['img4'] = '<img class="right" src="' . EE_MSG_ASSETS_URL . 'images/shortcodes-metabox.png' . '" alt="' . __('Shortcodes Metabox', 'event_espresso') . '" />';
		$args['img5'] = '<img class="right" src="' . EE_MSG_ASSETS_URL . 'images/publish-meta-box.png' . '" alt="' . __('Publish Metabox', 'event_espresso') . '" />';
		espresso_display_template( $templatepath, $args);
	}




	public function messages_settings_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_settings_help_tab.template.php';
		$args['img1'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-active.png' . '" alt="' . __('Active Email Tab', 'event_espresso') . '" />';
		$args['img2'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-inactive.png' . '" alt="' . __('Inactive Email Tab', 'event_espresso') . '" />';
		$args['img3'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'on-toggle.png' . '" alt="' . __('On Toggle Image', 'event_espresso') . '" />';
		$args['img4'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'off-toggle.png' . '" alt="' . __('Off Toggle Image', 'event_espresso') . '" />';
		espresso_display_template( $templatepath, $args);
	}




	public function messages_preview_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_preview_help_tab.template.php';
		espresso_display_template( $templatepath, array());
	}




	public function load_scripts_styles() {
		wp_register_style('espresso_ee_msg', EE_MSG_ASSETS_URL . 'ee_message_admin.css', EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_ee_msg');

		wp_register_script('ee-messages-settings', EE_MSG_ASSETS_URL . 'ee-messages-settings.js', array('jquery-ui-droppable', 'ee-serialize-full-array'), EVENT_ESPRESSO_VERSION, TRUE );
	}





	public function wp_editor_css( $mce_css ) {
		//if we're on the edit_message_template route
		if ( $this->_req_action == 'edit_message_template' && !empty( $this->_active_messenger ) ) {
			//we're going to REPLACE the existing mce css
			//we need to get the css file location from the active messenger
			$mce_css = $this->_active_messenger->get_inline_css_template(TRUE, 'wpeditor');
		}

		return $mce_css;
	}




	public function load_scripts_styles_edit_message_template() {
		wp_enqueue_script('ee_admin_js');
	}



	public function load_scripts_styles_preview_message() {
		if ( isset( $this->_req_data['messenger'] ) )
			$this->_active_messenger = $this->_active_messengers[$this->_req_data['messenger']]['obj'];
		wp_enqueue_style('espresso_preview_css', $this->_active_messenger->get_inline_css_template(TRUE, TRUE) );
	}



	public function load_scripts_styles_settings() {
		wp_register_style( 'ee-message-settings', EE_MSG_ASSETS_URL . 'ee_message_settings.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style( 'ee-text-links' );
		wp_enqueue_style( 'ee-message-settings' );

		wp_enqueue_script('ee-messages-settings');
	}



	/**
	 * set views array for List Table
	 * @access public
	 * @return array
	 */
	public function _set_list_table_views_default() {
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
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			),
			'global' => array(
				'slug' => 'global',
				'label' => __('Global', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			),
			'event' => array(
				'slug' => 'event',
				'label' => __('Events', 'event_espresso'),
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





	protected function _ee_messages_overview_list_table() {
		$this->display_admin_list_table_page_with_no_sidebar();
	}



	


	/**
	 * get_message_templates
	 * This gets all the message templates for listing on the overview list.
	 * 
	 * @access public
	 * @param int $perpage the amount of templates groups to show per page
	 * @param string $type the current _view we're getting templates for
	 * @param bool $count return count?
	 * @param bool $all disregard any paging info (get all data);
	 * @return array|WP_Error object
	 */
	public function get_message_templates( $perpage = 10, $type = 'in_use', $count = FALSE, $all = FALSE ) {
		global $espresso_wp_user;
		// start with an empty array
		$message_templates = array();

		/** todo: is this even needed?
		//require_once( EE_MSG_ADMIN . 'EE_Message_Template_List_Table.class.php' ); /**/
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();
		
		$this->_req_data['orderby'] = empty($this->_req_data['orderby']) ? '' : $this->_req_data['orderby'];

		switch ( $this->_req_data['orderby'] ) {
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

		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] ) ) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $perpage;

		$offset = ($current_page-1)*$per_page;
		$limit = $all ? NULL : array( $offset, $per_page );


		//options will match what is in the _views array property
		switch( $type ) {

			case 'in_use':
				$templates = $MTP->get_all_active_message_templates($orderby, $order, $limit, $count);
				break;

			case 'all':
				$templates = $MTP->get_all_message_templates($orderby, $order, $limit, $count);
				break;

			case 'global':
				$templates = $MTP->get_all_global_message_templates($orderby, $order, $limit, $count);
				break;

			case 'event':
				$templates = $MTP->get_all_event_message_templates($orderby, $order, $limit, $count);
				break;

			default:
				$templates = $MTP->get_all_trashed_grouped_message_templates($orderby, $order, $limit, $count);	

		}

		return $templates;
	}







	public function get_active_messengers() {
		return $this->_active_messengers;
	}




	public function get_active_message_types() {
		return $this->_active_message_types;
	}




	/**
	 * filters etc might need a list of installed message_types
	 * @return array an array of message type objects
	 */
	public function get_installed_message_types() {
		$installed_objects = $this->_get_installed_message_objects();
		$imts = $installed_objects['message_types'];
		$installed = array();

		foreach ( $imts as $message_type ) {
			$installed[$message_type->name]['obj'] = $message_type;
		}

		return $installed;
	}



	/**
	 * The purpose of this function is to return all installed message objects (messengers and message type regardless of whether they are ACTIVE or not)
	 * @return array array consisting of installed messenger objects and installed message type objects.
	 */
	private function _get_installed_message_objects() {
		//get all installed messengers and message_types
		$EE_MSG = new EE_messages();
		$installed_message_objects = $EE_MSG->get_installed();
		return $installed_message_objects;
	}


	/**
	 * _add_message_template
	 *
	 * For now this is ONLY used when creating custom event templates.
	 * 
	 * @access  protected
	 * @return void
	 */
	protected function _add_message_template() {
		
		//we need messenger and message type.  They should be coming from the event editor. If not here then return error
		if ( !isset( $this->_req_data['messenger'] ) || !isset( $this->_req_data['message_type'] ) )
			throw new EE_error('Sorry, but we can\'t create new templates because we\'re missing the messenger or message type', 'event_espresso');
		
		$EVT_ID = isset( $this->_req_data['evt_id'] ) && !empty( $this->_req_data['evt_id'] ) ? absint( $this->_req_data['evt_id'] ) : FALSE;

		//if we've got an empty EVT_ID then we need to get out
		if ( empty($EVT_ID ) ) {
			throw new EE_Error('Sorry, but we can\'t create a custom template for this event because no event id is given', 'event_espresso');
			//$events = $this->_get_active_events();
		}
		
		/** remove the below for now because its not needed **/
		/*
		$this->_template_args['EVT_ID'] = $EVT_ID ? $EVT_ID : FALSE;
		$this->_template_args['event_name'] = $EVT_ID ? $this->_event_name($EVT_ID) : FALSE;
		$this->_template_args['active_messengers'] = $this->_active_messengers;
		$this->_template_args['active_message_types'] = $this->_active_message_types;
		$this->_template_args['active_events'] = $events;
		$this->_template_args['action'] = 'insert_message_template';
		$this->_template_args['edit_message_template_form_url'] = add_query_arg( array( 'action' => 'insert_message_template', 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		$this->_template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();
		$this->_template_args['action_message'] = __('Before we generate the new templates we need to ask you what messenger and message type you want the templates for');

		$hidden_inputs['ee-msg-route'] = array(
				'name' => 'action',
				'input' => 'hidden',
				'type' => 'string',
				'value' => 'insert_message_template'
				);

		$hidden_inputs['ee-msg-evt-nonce'] = array(
			'name' => 'insert_message_template_nonce',
			'input' => 'hidden',
			'type' => 'string',
			'value' => wp_create_nonce( 'insert_message_template_nonce')
			);

		$this->_template_args['hidden_fields'] = $this->_generate_admin_form_fields( $hidden_inputs );


		//generate metabox	
		$this->_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';

	
		$this->_template_args['admin_page_content'] = espresso_display_template( $this->_template_path, $this->_template_args, TRUE );


		//final template wrapper
		$this->display_admin_page_with_sidebar();
		/**/


		//let's just make sure the tempalte gets generated!
		
		//we need to reassign some variables for what the insert is expecting
		$this->_req_data['MTP_messenger'] = $this->_req_data['messenger'];
		$this->_req_data['MTP_message_type'] = $this->_req_data['message_type'];
		$this->_req_data['EVT_ID'] = $this->_req_data['evt_id'];
		$this->_insert_or_update_message_template(TRUE);

	}


	/**
	 * _edit_message_template
	 * 
	 * @access protected
	 * @return void
	 */
	protected function _edit_message_template() {

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;

		$EVT_ID = isset( $this->_req_data['evt_id'] ) && !empty( $this->_req_data['evt_id'] ) ? absint( $this->_req_data['evt_id'] ) : FALSE;


		$this->_set_shortcodes(); //this also sets the _message_template property.
		$message_template = $this->_message_template;
		$c_label = $message_template->context_label();
		$c_config = $message_template->contexts_config();

		reset( $c_config );
		$context = isset( $this->_req_data['context']) && !empty($this->_req_data['context'] ) ? strtolower($this->_req_data['context']) : key($c_config);


		if ( empty($GRP_ID) ) {
			$action = 'insert_message_template';
			$button_both = FALSE;
			$button_text = array( __( 'Save','event_espresso') );
			$button_actions = array('something_different');
			$referrer = FALSE;
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		} else {
			$action = 'update_message_template';
			$button_both = !defined( 'DOING_AJAX' ) ? TRUE : FALSE;
			$event_name = $message_template->event_name();
			$button_text = array();
			$button_actions = array();
			$referrer = $this->_admin_base_url;
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		}

		//set active messenger for this view
		$this->_active_messenger = $this->_active_messengers[$message_template->messenger()]['obj'];

		//add in special css for tiny_mce
		add_filter( 'mce_css', array( $this, 'wp_editor_css' ) );


		//Do we have any validation errors?
		$validators = defined('DOING_AJAX') ? $this->_get_transient(FALSE, 'edit_message_template') : $this->_get_transient();
		$v_fields = !empty($validators) ? array_keys($validators) : array();


		//we need to assemble the title from Various details
		$context_label = sprintf( __('(%s %s)', 'event_espresso'), $c_config[$context]['label'], ucwords($c_label['label'] ));

		//we should eventually display the event title instead of ID.
		$event_label = isset($event_name) && !empty($event_name) ? sprintf( __('for Event: %s', 'event_espresso'), $event_name) : '';
		$title = sprintf( __(' %s %s Template %s %s', 'event_espresso'), ucwords(str_replace('_', ' ', $message_template->messenger()) ), ucwords(str_replace('_', ' ', $message_template->message_type()) ), $context_label, $event_label );

		$this->_template_args['GRP_ID'] = $GRP_ID;
		$this->_template_args['message_template'] = $message_template;
		$this->_template_args['is_extra_fields'] = FALSE;


		//let's get the EE_messages_controller so we can get template form fields
		$MSG = new EE_messages();
		$template_field_structure = $MSG->get_fields($message_template->messenger(), $message_template->message_type());
		
		if ( !$template_field_structure ) {
			$template_field_structure = FALSE;
			$template_fields = 'There was an error in assembling the fields for this display (you should see an error message';
		}


		$message_templates = $message_template->context_templates();

		//if we have the extra key.. then we need to remove the content index from the template_field_structure as it will get handled in the "extra" array.
		if ( isset( $template_field_structure[$context]['extra']) ) {
			foreach ( $template_field_structure[$context]['extra'] as $reference_field => $new_fields ) {
				unset( $template_field_structure[$context][$reference_field] );
			}
		}

		//let's loop through the template_field_structure and actually assemble the input fields!
		if ( !empty($template_field_structure) ) {
			$id_prefix= 'ee-msg-edit-template-fields-';
			foreach ( $template_field_structure[$context] as $template_field => $field_setup_array ) {
				//if this is an 'extra' template field then we need to remove any existing fields that are keyed up in the extra array and reset them.
				if ( $template_field == 'extra' ) {
					$this->_template_args['is_extra_fields'] = TRUE;
					foreach ( $field_setup_array as $reference_field => $new_fields_array ) {
						foreach ( $new_fields_array as $extra_field =>  $extra_array ) {
							//let's verify if we need this extra field via the shortcodes parameter.
							if ( isset( $extra_array['shortcodes_required'] ) ) {
								$continue = FALSE;
								foreach ( (array) $extra_array['shortcodes_required'] as $shortcode ) {
									if ( !array_key_exists( $shortcode, $this->_shortcodes ) )
										$continue = TRUE;
								}
								if ( $continue ) continue;
							}

							$field_id = $reference_field . '-' . $extra_field . '-content';
							$template_form_fields[$field_id] = $extra_array;
							$template_form_fields[$field_id]['name'] = 'MTP_template_fields[' . $reference_field . '][content][' . $extra_field . ']';
							$css_class = isset( $extra_array['css_class'] ) ? $extra_array['css_class'] : '';
							$template_form_fields[$field_id]['css_class'] = !empty( $v_fields ) && in_array($extra_field, $v_fields) && isset( $validators[$extra_field]['msg'] ) ? 'validate-error ' . $css_class : $css_class;
							$template_form_fields[$field_id]['value'] = !empty($message_templates) && isset($message_templates[$context][$reference_field]['content'][$extra_field]) ? stripslashes($message_templates[$context][$reference_field]['content'][$extra_field]) : '';

							//do we have a validation error?  if we do then let's use that value instead
							$template_form_fields[$field_id]['value'] = isset($validators[$extra_field]) ? $validators[$extra_field]['value'] : $template_form_fields[$field_id]['value'];

							$template_form_fields[$field_id]['db-col'] = 'MTP_content';	

							//if doing ajax and the extra field input type is wp_editor, let's change back to text area and also change class.
							if ( isset( $extra_array['input'] ) && $extra_array['input'] == 'wp_editor' ) {

								if ( defined('DOING_AJAX') ) {
									$template_form_fields[$field_id]['input'] = 'textarea';
									$template_form_fields[$field_id]['css_class'] = !empty( $v_fields ) && in_array($extra_field, $v_fields) ? 'large-text validate-error' : 'large-text';
									$template_form_fields[$field_id]['label'] = $extra_array['label'] . '&nbsp;' . __('(Basic HTML tags allowed)', 'event_espresso');
								}

								//with or without ajax we want to decode the entities
								$template_form_fields[$field_id]['value'] = html_entity_decode(stripslashes($template_form_fields[$field_id]['value']));

							}/**/
						}
						$templatefield_MTP_id = $reference_field . '-MTP_ID';
						$templatefield_templatename_id = $reference_field . '-name';

						$template_form_fields[$templatefield_MTP_id] = array(
							'name' => 'MTP_template_fields[' . $reference_field . '][MTP_ID]',
							'label' => NULL,
							'input' => 'hidden',
							'type' => 'int',
							'required' => FALSE,
							'validation' => FALSE,
							'value' => !empty($message_templates) ? $message_templates[$context][$reference_field]['MTP_ID'] : '',
							'css_class' => '',
							'format' => '%d',
							'db-col' => 'MTP_ID'
						);

						$template_form_fields[$templatefield_templatename_id] = array(
							'name' => 'MTP_template_fields[' . $reference_field . '][name]',
							'label' => NULL,
							'input' => 'hidden',
							'type' => 'string',
							'required' => FALSE,
							'validation' => TRUE,
							'value' => $reference_field,
							'css_class' => '',
							'format' => '%s',
							'db-col' => 'MTP_template_field'
						);
					}
					continue; //skip the next stuff, we got the necessary fields here for this dataset.
				} else {
					$field_id = $template_field . '-content';
					$template_form_fields[$field_id] = $field_setup_array;
					$template_form_fields[$field_id]['name'] = 'MTP_template_fields[' . $template_field . '][content]';
					$template_form_fields[$field_id]['value'] = !empty($message_templates) && isset($message_templates[$context][$template_field]['content']) ? stripslashes($message_templates[$context][$template_field]['content']) : '';

					//do we have a validator error for this field?  if we do then we'll use that value instead
					$template_form_fields[$field_id]['value'] = isset($validators[$template_field]) ? $validators[$template_field]['value'] : $template_form_fields[$field_id]['value'];


					$template_form_fields[$field_id]['db-col'] = 'MTP_content';
					$css_class = isset($field_setup_array['css_class']) ? $field_setup_array['css_class'] : '';
					$template_form_fields[$field_id]['css_class'] = !empty( $v_fields ) && in_array( $template_field, $v_fields ) && isset( $validators[$template_field]['msg'] ) ? 'validate-error ' . $css_class : $css_class;

					//if doing ajax and the extra field input type is wp_editor, let's change to text area and also change class.
					if ( isset( $field_setup_array['input'] ) && $field_setup_array['input'] == 'wp_editor' ) {
						if ( defined('DOING_AJAX') ) {
							$template_form_fields[$field_id]['input'] = 'textarea';
							$template_form_fields[$field_id]['css_class'] = !empty( $v_fields ) && in_array( $template_field, $v_fields ) ? 'large-text validate-error' : 'large-text';
							$template_form_fields[$field_id]['label'] = $extra_array['label'] . '&nbsp;' . __('(Basic HTML tags allowed)', 'event_espresso');
						}

						//with or without ajax we want to decode the entities
						$template_form_fields[$field_id]['value'] = html_entity_decode(stripslashes($template_form_fields[$field_id]['value']));
					}/**/
				}

				//k took care of content field(s) now let's take care of others.

				$templatefield_MTP_id = $template_field . '-MTP_ID';
				$templatefield_field_templatename_id = $template_field . '-name';

				//foreach template field there are actually two form fields created
				$template_form_fields[$templatefield_MTP_id] = array(
					'name' => 'MTP_template_fields[' . $template_field . '][MTP_ID]',
					'label' => NULL,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => !empty($message_templates) ? $message_templates[$context][$template_field]['MTP_ID'] : '',
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_ID'
				);

				$template_form_fields[$templatefield_field_templatename_id] = array(
					'name' => 'MTP_template_fields[' . $template_field . '][name]',
					'label' => NULL,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $template_field,
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_template_field'
				);

			}

			//add other fields
			$template_form_fields['ee-msg-current-context'] = array(
					'name' => 'MTP_context',
					'label' => null,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $context,
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_context'
				);
			$template_form_fields['ee-msg-event'] = array(
					'name' => 'EVT_ID',
					'label' => null,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $EVT_ID,
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'EVT_ID'
				);

			$template_form_fields['ee-msg-grp-id'] = array(
					'name' => 'GRP_ID',
					'label' => null,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $GRP_ID,
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'GRP_ID'
				);

			$template_form_fields['ee-msg-messenger'] = array(
					'name' => 'MTP_messenger',
					'label' => null,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_template->messenger(),
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_messenger'
				);

			$template_form_fields['ee-msg-message-type'] = array(
					'name' => 'MTP_message_type',
					'label' => null,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_template->message_type(),
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_message_type'
				);

			$sidebar_form_fields['ee-msg-is-global'] = array(
					'name' => 'MTP_is_global',
					'label' => __('Global Template', 'event_espresso'),
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_templates[$context]['MTP_is_global'],
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_global'
				);

			$sidebar_form_fields['ee-msg-is-override'] = array(
					'name' => 'MTP_is_override',
					'label' => __('Override all custom', 'event_espresso'),
					'input' => $message_template->is_global() ? 'checkbox' : 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_templates[$context]['MTP_is_override'],
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_override'
				);

			$sidebar_form_fields['ee-msg-is-active'] = array(
					'name' => 'MTP_is_active',
					'label' => __('Active Template', 'event_espresso'),
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_template->is_active(),
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_active'
				);

			$sidebar_form_fields['ee-msg-deleted'] = array(
					'name' => 'MTP_deleted',
					'label' => null,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_templates[$context]['MTP_deleted'],
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_deleted'
				);
			$sidebar_form_fields['ee-msg-author'] = array(
				'name' => 'MTP_user_id',
				'label' => __('Author', 'event_espresso'),
				'input' => 'hidden',
				'type'=> 'int',
				'required' => FALSE,
				'validation' => FALSE,
				'value' => !empty($message_templates[$context]['MTP_user_id']) ? $message_templates[$context]['MTP_user_id'] : get_current_user_id(),
				'format' => '%d',
				'db-col' => 'MTP_user_id'
			);

			$sidebar_form_fields['ee-msg-route'] = array(
				'name' => 'action',
				'input' => 'hidden',
				'type' => 'string',
				'value' => $action
				);

			$sidebar_form_fields['ee-msg-id'] = array(
				'name' => 'id',
				'input' => 'hidden',
				'type' => 'int',
				'value' => $GRP_ID
				);

			$sidebar_form_fields['ee-msg-evt-id'] = array(
				'name' => 'evt_id',
				'input' => 'hidden',
				'type' => 'int',
				'value' => $EVT_ID
				);
			$sidebar_form_fields['ee-msg-evt-nonce'] = array(
				'name' => $action . '_nonce',
				'input' => 'hidden',
				'type' => 'string',
				'value' => wp_create_nonce( $action . '_nonce')
				);

			$sidebar_array = array('ee-msg-is-global', 'ee-msg-is-override', 'ee-msg-deleted', 'ee-msg-is-active');

			if ( isset($this->_req_data['template_switch']) && $this->_req_data['template_switch'] ) {
				$sidebar_form_fields['ee-msg-template-switch'] = array(
					'name' => 'template_switch',
					'input' => 'hidden',
					'type' => 'int',
					'value' => 1
					);
			}

			//send to field generator
			
			$template_fields = $this->_generate_admin_form_fields( $template_form_fields );
			$sidebar_fields = $this->_generate_admin_form_fields( $sidebar_form_fields );


		} //end if ( !empty($template_field_structure) )

		//set extra content for publish box
		$this->_template_args['publish_box_extra_content'] = $sidebar_fields;
		$this->_set_publish_post_box_vars( 'id', $GRP_ID );
		
		if ( defined('DOING_AJAX') )
			$this->_set_save_buttons($button_both, $button_text, $button_actions, $referrer);

		//add preview button
		$preview_url = parent::add_query_args_and_nonce( array( 'message_type' => $message_template->message_type(), 'messenger' => $message_template->messenger(), 'context' => $context,'msg_id' => $GRP_ID, 'evt_id' => $EVT_ID, 'action' => 'preview_message' ), $this->_admin_base_url );
		$preview_button = '<a href="' . $preview_url . '" class="button-secondary messages-preview-button">' . __('Preview', 'event_espresso') . '</a>';


		//setup context switcher
		$context_switcher_args = array(
			'page' => 'espresso_messages',
			'action' => 'edit_message_template',
			'id' => $GRP_ID,
			'evt_id' => $EVT_ID,
			'context' => $context,
			'extra' => $preview_button
		);
		$this->_set_context_switcher($message_template, $context_switcher_args);

		//sidebar box
		if ( defined( 'DOING_AJAX' ) ) {
			$this->_template_args['sidebar_content'] = $sidebar_fields . '<div class="submitbox" id="submitpost"><div class="publishing-action">' . $this->_template_args['save_buttons'] . '</div></div>';
			$this->_template_args['sidebar_description'] = '';
			$this->_template_args['sidebar_title'] = '';
			$sidebar_title = __('Other Details', 'event_espresso');
			$sidebar_action = 'update_message_template_sidebar';
			/**/
			$sidebar_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_sidebar_edit_meta_box.template.php';
		}

		//main box
		$this->_template_args['template_fields'] = $template_fields;
		$this->_template_args['sidebar_box_id'] = 'details';
		$this->_template_args['action'] = $action;
		$this->_template_args['context'] = $context;
		$this->_template_args['EVT_ID'] = $EVT_ID;
		$this->_template_args['edit_message_template_form_url'] = $edit_message_template_form_url;
		$this->_template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();


		$this->_template_args['before_admin_page_content'] = $this->add_context_switcher();
		$this->_template_args['before_admin_page_content'] .= $this->_add_form_element_before();
		$this->_template_args['after_admin_page_content'] = $this->_add_form_element_after();

		$this->_template_path = $this->_template_args['GRP_ID'] ? EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_edit_meta_box.template.php' : EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';

	
		$this->_template_args['admin_page_content'] = espresso_display_template( $this->_template_path, $this->_template_args, TRUE );

		//sidebar metabox (if we are editing and doing_ajax)
		if ( $this->_template_args['GRP_ID'] && defined('DOING_AJAX') ) {
			$this->_template_path = $sidebar_template_path;
				$this->_template_args['admin_page_content'] .= espresso_display_template( $this->_template_path, $this->_template_args, TRUE );
		}


		//finally, let's set the admin_page title
		$this->_admin_page_title = sprintf( __('Editing %s', 'event_espresso'), $title );


		//we need to take care of setting the shortcodes property for use elsewhere.
		$this->_set_shortcodes();



		//final template wrapper
		$this->display_admin_page_with_sidebar();
	}

	public function add_context_switcher() {
		return $this->_context_switcher;
	}

	public function _add_form_element_before() {
		return '<form method="post" action="' . $this->_template_args["edit_message_template_form_url"] . '" id="ee-msg-edit-frm">';
	}

	public function _add_form_element_after() {
		return '</form>';
	}



	/**
	 * Retrieve and set the message preview for display.
	 * @return void
	 */
	public function _preview_message() {
		//first make sure we've got the necessary parameters
		if ( !isset( $this->_req_data['message_type'] ) || !isset( $this->_req_data['messenger'] ) || !isset( $this->_req_data['messenger'] ) || !isset( $this->_req_data['msg_id'] ) ) {
			EE_Error::add_error( __('Missing necessary parameters for displaying preview', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		$MSG = new EE_messages();

		//get the preview!
		$preview = $MSG->preview_message( $this->_req_data['message_type'], $this->_req_data['context'], $this->_req_data['messenger'] );



		//let's add a button to go back to the edit view
		$query_args = array(
			'id' => $this->_req_data['msg_id'],
			'context' => $this->_req_data['context'],
			'evt_id' => isset($this->_req_data['evt_id']) ? $this->_req_data['evt_id'] : '',
			'action' => 'edit_message_template'
			);
		$go_back_url = parent::add_query_args_and_nonce( $query_args, $this->_admin_base_url );
		$preview_button = '<a href="' . $go_back_url . '" class="button-secondary messages-preview-go-back-button">' . __('Go Back to Edit', 'event_espresso') . '</a>';

		//let's provide a helpful title for context
		$preview_title = sprintf( __('Viewing Preview for %s %s Message Template', 'event_espresso'), ucwords($this->_active_messengers[$this->_req_data['messenger']]['obj']->label['singular']), ucwords($this->_active_message_types[$this->_req_data['message_type']]['obj']->label['singular']) );


		//setup display of preview.
		$this->_admin_page_title = $preview_title;
		$this->_template_args['admin_page_content'] = $preview_button . '<br />' . html_entity_decode(stripslashes($preview));
		$this->_template_args['data']['force_json'] = TRUE;

		$this->display_admin_page_with_no_sidebar();
	}




	/**
	 * registers metaboxes that should show up on the "edit_message_template" page
	 *
	 * @access protected
	 * @return void
	 */
	protected function _register_edit_meta_boxes() {
		add_meta_box( 'mtp_valid_shortcodes', __('Valid Shortcodes', 'event_espresso'), array( $this, 'shortcode_meta_box' ), $this->_current_screen->id, 'side', 'default' );
	}


	/**
	 * This just takes care of returning the meta box content for shortcodes (only used on the edit message template page)
	 *
	 * @access public
	 * @return void 
	 */
	public function shortcode_meta_box() {
		$this->_set_shortcodes(); //just make sure shortcodes property is set
		

		//now let's set the content depending on the status of the shortcodes array
		if ( empty( $this->_shortcodes ) ) {
			$content = '<p>' . __('There are no valid shortcodes available', 'event_espresso') . '</p>';
			echo $content;
		} else {
			$alt = 0;
			?>
			<table class="widefat ee-shortcode-table">
			<?php foreach ( $this->_shortcodes as $code => $label ) : ?>
				<?php $alt_class = !($alt%2) ? 'class="alternate"' : ''; ?>
				<tr <?php echo $alt_class; ?>>
					<td><?php $this->_set_help_trigger( 'shortcode_' . $alt, TRUE, array('100', '400') ); echo $code; ?></td>
				</tr>
			<?php $alt++; endforeach; ?>
			</table> <!-- end .ee-shortcode-table -->
			<?php
		}


	}


	/**
	 * used to set the $_shortcodes property for when its needed elsewhere.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_shortcodes() {

		//no need to run this if the property is already set
		if ( !empty($this->_shortcodes ) ) return;

		$this->_set_message_template();

		//we need the messenger and message template to retrieve the valid shortcodes array.
		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;
		$context = isset( $this->_req_data['context'] ) ? $this->_req_data['context'] : key( $this->_message_template->contexts_config() );

		if ( !empty($GRP_ID) ) {
			$this->_shortcodes = $this->_message_template->get_shortcodes( $context );
		} else {
			$this->_shortcodes = array();
		}
	}



	/**
	 * This sets the _message_template property (containing the called message_template object)
	 *
	 * @access private
	 * @return  void 
	 */
	private function _set_message_template() {

		if ( !empty( $this->_message_template ) )
			return; //get out if this is already set.

		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;

		//let's get the message templates
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();

		if ( empty($GRP_ID) )
			$this->_message_template = $MTP->get_new_template();
		else
			$this->_message_template = $MTP->get_message_template_by_ID( $GRP_ID );

	}


	protected function _help_popup_content_edit_message_template() {
		$this->_set_shortcodes();

		$help = array();

		$i = 0;
		//let's setup the $help array for each shortcode
		foreach ( $this->_shortcodes as $shortcode => $description ) {
			$help['shortcode_' . $i] = array(
				'title' => $shortcode,
				'content' => $description
				);
			$i++;
		}


		$context_label = $this->_message_template->context_label();
		$context_configs = $this->_message_template->contexts_config();
		reset( $context_configs );
		$current_context = isset($this->_req_data['context']) ? $this->_req_data['context'] : key($context_configs);

		$content = '<p>' . $context_label['description'] . '</p>';
		$content .= '<p>' . sprintf( __(' The current %s selected is <strong>%s</strong>', 'event_espresso'), $context_label['label'], $context_configs[$current_context]['label'] ) . '<br />';
		$content .= '<em>' . $context_configs[$current_context]['description'] . '</em></p>';
		$content .= '<p>' . sprintf( __('Other %s:', 'event_espresso'), ucwords($context_label['plural']) ) . '</p>';

		foreach ( $context_configs as $ctxt => $details ) {
			if ( $ctxt == $current_context ) continue;
			$content .= '<p>' . $details['label'] . '<br />';
			$content .= '<em>' . $details['description'] . '</em></p>';
		}

		$title = sprintf( __('What is a %s?', 'event_espresso'), $context_label['label']);

		$help['context_switcher'] = array(
			'title' => $title,
			'content' => $content
		);

		//help for preview button
		$help['preview_button'] = array(
			'title' => __('Message Template Preview', 'event_espresso'),
			'content' => __('Clicking this button will show you a preview of what the current template will look like when received.', 'event_espresso')
			);

		return $help;
	}



	/**
	 * sets up a context switcher for edit forms
	 *
	 * @access  private
	 * @param  object $template_object the template object being displayed on the form
	 * @param array $args various things the context switcher needs.
	 * @return void
	 */
	private function _set_context_switcher(EE_Message_Template $template_object, $args) {
		$context_details = $template_object->contexts_config();
		$context_label = $template_object->context_label();
		ob_start();
		?>
		<div class="ee-msg-switcher-container">
			<form method="get" action="<?php echo EE_MSG_ADMIN_URL; ?>" id="ee-msg-context-switcher-frm">
				<?php
					foreach ( $args as $name => $value ) {
						if ( $name == 'context' || empty($value) || $name == 'extra' ) continue;
						?>
						<input type="hidden" name="<?php echo $name; ?>" value = "<?php echo $value; ?>" />
						<?php
					}
					//setup nonce_url
					wp_nonce_field($args['action'] . '_nonce', $args['action'] . '_nonce', false);
				?>
				<select name="context">
					<?php 
					$context_templates = $template_object->context_templates();
					if ( is_array($context_templates) ) :
							foreach ( $context_templates as $context => $template_fields ) :
								$checked = ($context == $args['context']) ? 'selected="selected"' : '';
					?>
					<option value="<?php echo $context; ?>" <?php echo $checked; ?>><?php echo $context_details[$context]['label']; ?></option>
					<?php endforeach; endif; ?>
				</select>
				<?php $button_text = sprintf( __('Switch %s', 'event_espresso'), ucwords($context_label['label']) ); ?>
				<input id="submit-msg-context-switcher-sbmt" class="button-secondary" type="submit" value="<?php echo $button_text; ?>"> <?php $this->_set_help_trigger( 'context_switcher' ); ?>
			</form>
			<?php echo $args['extra']; ?><?php $this->_set_help_trigger( 'preview_button' ); ?>
		</div> <!-- end .ee-msg-switcher-container -->
		<?php
		$output = ob_get_contents();
		ob_clean();
		$this->_context_switcher = $output;
	}






	/**
	 * utility for sanitizing new values coming in.
	 * Note: this is only used when updating a context.
	 * 
	 * @access protected
	 * @param int $index This helps us know which template field to select from the request array.
	 */
	protected function _set_message_template_column_values($index) {
		//first we need to make sure we run the content through html_entities
		if ( is_array($this->_req_data['MTP_template_fields'][$index]['content'] ) ) {
			foreach ( $this->_req_data['MTP_template_fields'][$index]['content'] as $field => $value ) {
				$this->_req_data['MTP_template_fields'][$index]['content'][$field] = htmlentities( $value );
			}
		} else {
			$this->_req_data['MTP_template_fields'][$index]['content'] = htmlentities( $this->_req_data['MTP_template_fields'][$index]['content'] );
		}


		$set_column_values = array(
			'MTP_ID' => absint($this->_req_data['MTP_template_fields'][$index]['MTP_ID']),
			'EVT_ID' => absint($this->_req_data['EVT_ID']),
			'GRP_ID' => absint($this->_req_data['GRP_ID']),
			'MTP_user_id' => absint($this->_req_data['MTP_user_id']),
			'MTP_messenger'	=> strtolower($this->_req_data['MTP_messenger']),
			'MTP_message_type' => strtolower($this->_req_data['MTP_message_type']),
			'MTP_template_field' => strtolower($this->_req_data['MTP_template_fields'][$index]['name']),
			'MTP_context' => strtolower($this->_req_data['MTP_context']),
			'MTP_content' => maybe_serialize($this->_req_data['MTP_template_fields'][$index]['content']),
			'MTP_is_global' => isset($this->_req_data['MTP_is_global']) ? absint($this->_req_data['MTP_is_global']) : 0,
			'MTP_is_override' => isset($this->_req_data['MTP_is_override']) ? absint($this->_req_data['MTP_is_override']) : 0,
			'MTP_deleted' => absint($this->_req_data['MTP_deleted']),
			'MTP_is_active' => absint($this->_req_data['MTP_is_active'])
		);

	
		return $set_column_values;
	}






	protected function _insert_or_update_message_template($new = FALSE ) {
		
		do_action ( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$success = 0;

		//setup notices description	
		$messenger = !empty($this->_req_data['MTP_messenger']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_messenger'] ) ) : false;
		$message_type = !empty($this->_req_data['MTP_message_type']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_message_type'] ) ) : false;
		$context = !empty($this->_req_data['MTP_context']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_context'] ) ) : false;
		$evt_id = !empty($this->_req_data['EVT_ID']) ? (int) $this->_req_data['EVT_ID'] : NULL;

		$item_desc = $messenger ? $messenger . ' ' . $message_type . ' ' . $context . ' ' : '';
		$item_desc .= 'Message Template';
		$query_args = array();
		$validates = '';

		//if this is "new" then we need to generate the default contexts for the selected messenger/message_type for user to edit.
		if ( $new ) {
			if ( $edit_array = $this->_generate_new_templates($messenger, $message_type, $evt_id) ) {
				if ( empty($edit_array) ) {
					$success = 0;
				} else {
					$success = 1;
					$edit_array = $edit_array[0];
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
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();

			
			//run update for each template field in displayed context
			if ( !isset($this->_req_data['MTP_template_fields']) && empty($this->_req_data['MTP_template_fields'] ) ) {
				EE_Error::add_error( __('There was a problem saving the template fields from the form because I didn\'t receive any actual template field data.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				$success = 0;
				$action_desc = '';
				
			} else {
				//first validate all fields!
				$validates = $MTP->validate($this->_req_data['MTP_template_fields'], $this->_req_data['MTP_context'],  $this->_req_data['MTP_messenger'], $this->_req_data['MTP_message_type']);

				//if $validate returned error messages (i.e. is_array()) then we need to process them and setup an appropriate response.
				if ( is_array($validates) ) {
					//add the transient so when the form loads we know which fields to highlight
					$this->_add_transient( 'edit_message_template', $validates );

					$success = 0;
					$action_desc ='';

					//setup notices
					foreach ( $validates as $field => $error ) {
						if ( isset($error['msg'] ) )
							EE_Error::add_error( $error['msg'], __FILE__, __FUNCTION__, __LINE__ );
					}

					if ( defined( 'DOING_AJAX' ) ) {
						//trigger reload of edit message form
						$new = TRUE;
						$this->_template_args['data'] = array(
						'close' => FALSE,
						'what' => 'clear',
						'where' => 'dialog'
						);
						$this->_template_args['ajax_notices'] = EE_Error::get_notices();
					}

				} else {
					foreach ( $this->_req_data['MTP_template_fields'] as $template_field => $content ) {
						$set_column_values = $this->_set_message_template_column_values($template_field);
						$where_cols_n_values = array( 'MTP_ID' => $this->_req_data['MTP_template_fields'][$template_field]['MTP_ID']);
						if ( $updated = $MTP->update( $set_column_values, $where_cols_n_values ) ) {
							if ( !$updated ) {
								$msg = sprintf( __('%s field was NOT updated for some reason', 'event_espresso') );
								EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__ );
						} else {
							$success = 1;
						}
					}
					$action_desc = 'updated';
				}
				
				}
			}

		}

		if ( defined('DOING_AJAX') && $new ) {
			$this->_req_data = array_merge($this->_req_data, $query_args);
			$this->_req_data['template_switch'] = TRUE;
			$this->_edit_message_template();
		}

		if ( defined('DOING_AJAX') ) {
			$this->_check_template_switch();
		}

		if ( empty( $query_args ) ) {
			$query_args = array(
				'id' => $this->_req_data['GRP_ID'],
				'evt_id' => $this->_req_data['EVT_ID'],
				'context' => $this->_req_data['MTP_context'],
				'action' => 'edit_message_template'
				);
		}

		$this->_redirect_after_action( $success, $item_desc, $action_desc, $query_args );
	}





	/**
	 * This ajax method is called during ajax requests and checks to see if a template switch has been triggered (via edit_event notifications meta box.  If it has then we want to regenerate the switching ui to reflect the change and assign that to the 'admin_page_content' template arg key
	 *
	 * 
	 * @return void 
	 */
	private function _check_template_switch() {
		if ( defined('DOING_AJAX') && isset($this->_req_data['template_switch']) && $this->_req_data['template_switch'] ) {
			if ( isset($this->_req_data['evt_id'] ) && !isset($this->_req_data['EVT_ID']) )
				$this->_req_data['EVT_ID'] = $this->_req_data['evt_id'];
			$this->_template_args['admin_page_content'] = $this->_hook_obj->messages_metabox('', array());
			$this->_template_args['data']['what'] = 'clear';
			$this->_template_args['data']['where'] = 'main';
		}
	}







	/**
	 * _generate_new_templates
	 * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will automatically create the defaults for the event.  The user would then be redirected to edit the default context for the event.
	 *
	 * @access protected
	 * @param  string  $messenger the messenger we are generating templates for
	 * @param array $message_types array of message types that the templates are generated for.
	 * @param int $evt_id If templates are event specific then we are also including the event_id
	 * @param bool $global true indicates generating templates on messenger activation. false requires evt_id for event specific template generation.
	 * @return array|error_object array of data required for the redirect to the correct edit page or error object if encountering problems.
	 */
	protected function _generate_new_templates($messenger, $message_types, $evt_id = NULL, $global = FALSE) {

		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/EE_MSG_Template.helper.php');

		return EE_MSG_Template::generate_new_templates($messenger, $message_types, $evt_id, $global);

	}





	/**
	 * [_trash_or_restore_message_template]
	 * 
	 * @access protected
	 * @param  boolean $trash whether to move an item to trash/restore (TRUE) or restore it (FALSE)
	 * @param boolean $all whether this is going to trash/restore all contexts within a template group (TRUE) OR just an individual context (FALSE).
	 * @return void
	 */
	protected function _trash_or_restore_message_template($trash = TRUE, $all = FALSE ) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();

		$success = 1;
		$MTP_deleted = $trash ? TRUE : FALSE;

		//incoming GRP_IDs
		if ( $all ) {
			//Checkboxes
			if ( !empty( $this->_req_data['checkbox'] ) && is_array($this->_req_data['checkbox'] ) ) {
				//if array has more than one element then success message should be plural.
				//todo: what about nonce?
				$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

				//cycle through checkboxes
				while ( list( $GRP_ID, $value ) = each ($this->_req_data['checkbox']) ) {
					if ( ! $MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => absint($GRP_ID) ) ) ) {
						$success = 0;
					}
				}
			} else {
				//grab single GRP_ID and handle
				$GRP_ID = absint($this->_req_data['id']);
				if ( !$MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => $GRP_ID ) ) ) {
					$success = 0;
				}
			}
		//not entire GRP, just individual context
		} else {
			//we should only have the MTP_id for the context,
			//todo: will probably need to make sure we have a nonce here?
			$GRP_ID = absint( $this->_req_data['id'] );
			$MTP_message_type = strtolower( $this->_req_data['message_type']);
			$MTP_context = strtolower( $this->_req_data['context'] );
			
			if ( !$MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => $GRP_ID, 'MTP_message_type' => $MTP_message_type, 'MTP_context' => $MTP_context ) ) ) {
				$success = 0;
			}
		}

		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$item_desc = $all ? 'Message Template Group' : 'Message Template Context';

		if ( defined('DOING_AJAX') ) {
			$this->_check_template_switch();
		}

		$this->_redirect_after_action( $success, $item_desc, $action_desc, array() );
	
	}







	/**
	 * [_delete_message_template]
	 * NOTE: at this point only entire message template GROUPS can be deleted because it 
	 * @return void
	 */
	protected function _delete_message_template() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();

		$success = 1;

		//checkboxes
		if ( !empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

			//cycle through bulk action checkboxes
			while ( list( $GRP_ID, $value ) = each($this->_req_data['checkbox'] ) ) {
				if ( ! $MTP->delete_by_id(absint($GRP_ID) ) ) {
					$success = 0;
				}
			}
		} else {
			//grab single grp_id and delete
			$GRP_ID = absint($this->_req_data['id'] );
			if ( ! $MTP->delete_by_id($GRP_ID) ) {
				$success = 0;
			}
		}

		$this->_redirect_after_action( $success, 'Message Templates', 'deleted', array() );

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
	 * [_event_name description]
	 * This just takes a given event_id and will output the name of the event for it.
	 * @todo: temporary... will need to remove/replace once proper Event models/classes are in place.
	 * @access private
	 * @param  int $evt_id event_id
	 * @return string event_name 
	 */
	private function _event_name($evt_id) {
		global $wpdb;
		$evt_id = absint($evt_id);
		$tablename = $wpdb->prefix . 'events_detail';
		$query = "SELECT event_name FROM {$tablename} WHERE id = %d";
		$event_name = $wpdb->get_var( $wpdb->prepare($query, $evt_id) );
		return $event_name;
	}







	/**
	 * get_active_events
	 * This just returns an array of event objects for events that are active. (objects contain event_name and ID);
	 *
	 * @access private
	 * @return array array of objects (event_name, event_id);
	 */
	private function _get_active_events() {
		global $wpdb;
		$tablename = $wpdb->prefix . 'events_detail';
		$msg_table = $wpdb->prefix . 'esp_message_template';
		$sub_query = "SELECT EVT_ID FROM {$msg_table} GROUP BY EVT_ID";
		$query = "SELECT event_name, id as event_id FROM {$tablename} WHERE is_active = '1' AND id NOT IN ({$sub_query})";
		$events = $wpdb->get_results( $query );
		return $events;
	}




	/**
	 * Used for setting up messenger/message type activation.  This loads up the initial view.  The rest is handled by ajax and other routes.
	 * @return void
	 */
	protected function _settings() {

		require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/EE_Tabbed_Content.helper.php';

		$this->_set_m_mt_settings();

		$selected_messenger = isset( $this->_req_data['selected_messenger'] ) ? $this->_req_data['selected_messenger'] : 'email';

		//let's setup the messenger tabs
		$this->_template_args['admin_page_header'] = EE_Tabbed_Content::tab_text_links( $this->_m_mt_settings['messenger_tabs'], 'messenger_links', '|', $selected_messenger );
		$this->_template_args['before_admin_page_content'] = '<div class="ui-widget ui-helper-clearfix">';
		$this->_template_args['after_admin_page_content'] = '</div><!-- end .ui-widget -->';

		$this->display_admin_page_with_sidebar();

	}




	/**
	 * This sets the $_m_mt_settings property for when needed (used on the Messages settings page)
	 *
	 * @access private
	 * @return void
	 */
	private function _set_m_mt_settings() {
		//first if this is already set then lets get out no need to regenerate data.
		if ( !empty($this->_m_mt_settings) )
			return;
		
		$selected_messenger = isset( $this->_req_data['selected_messenger'] ) ? $this->_req_data['selected_messenger'] : 'email';
		
		//get all installed messengers and message_types
		$installed_message_objects = $this->_get_installed_message_objects();

		$messengers = $installed_message_objects['messengers'];
		$message_types = $installed_message_objects['message_types'];

		//assemble the array for the _tab_text_links helper
		
		foreach ( $messengers as $messenger ) {
			$this->_m_mt_settings['messenger_tabs'][$messenger->name] = array(
				'label' => ucwords($messenger->label['singular']),
				'class' => isset( $this->_active_messengers[$messenger->name] ) ? 'messenger-active' : '',
				'href' => $messenger->name,
				'title' => __('Modify this Messenger', 'event_espresso'),
				'slug' => $messenger->name,
				'obj' => $messenger
				);

			//assemble the array for the ACTIVE and INACTIVE message types with the selected messenger //note that all message types will be in the inactive box if the messenger is NOT active.
			$selected_settings = isset( $this->_active_messengers[$messenger->name]['settings'] ) ? $this->_active_messengers[$messenger->name]['settings'] : array();
			foreach ( $message_types as $message_type ) {
				$a_or_i = isset( $selected_settings[$messenger->name . '-message_types'][$message_type->name] ) && $selected_settings[$messenger->name . '-message_types'][$message_type->name] ? 'active' : 'inactive';

				$this->_m_mt_settings['message_type_tabs'][$messenger->name][$a_or_i][$message_type->name] = array(
						'label' => ucwords($message_type->label['singular']),
						'class' => 'message-type-' . $a_or_i,
						'slug_id' => $message_type->name . '-messagetype-' . $messenger->name,
						'mt_nonce' => wp_create_nonce($message_type->name . '_nonce'),
						'href' => 'espresso_' . $message_type->name . '_message_type_settings',
						'title' => $a_or_i == 'active' ? __('Drag this message type to the Inactive window to deactivate', 'event_espresso') : __('Drag this message type to the messenger to activate', 'event_espresso'),
						'content' => $a_or_i == 'active' ? $this->_message_type_settings_content( $message_type, $messenger, TRUE ) : $this->_message_type_settings_content( $message_type, $messenger ),
						'slug' => $message_type->name,
						'active' => $a_or_i == 'active' ? TRUE : FALSE,
						'obj' => $message_type
						);
			}
		}
	}


	/**
	 * This just prepares the content for the message type settings
	 * @param  object  $message_type The message type object
	 * @param  object  $messenger    The messenger object
	 * @param  boolean $active       Whether the message type is active or not
	 * @return string                html output for the content
	 */
	private function _message_type_settings_content( $message_type, $messenger, $active = FALSE ) {
		//get message type fields
		$fields = $message_type->get_admin_settings_fields();
		$settings_template_args['template_form_fields']= '';

		if ( !empty( $fields ) && $active ) {

			$existing_settings = $message_type->get_existing_admin_settings( $messenger->name );

			foreach( $fields as $fldname => $fldprops ) {
				$field_id = $messenger->name . '-' . $message_type->name . '-' . $fldname;
				$template_form_field[$field_id] = array(
					'name' => 'message_type_settings[' . $fldname . ']',
					'label' => $fldprops['label'],
					'input' => $fldprops['field_type'],
					'type' => $fldprops['value_type'],
					'required' => $fldprops['required'],
					'validation' => $fldprops['validation'],
					'value' => isset( $existing_settings[$fldname]) ? $existing_settings[$fldname] : $fldprops['default'],
					'options' => isset( $fldprops['options'] ) ? $fldprops['options'] : array(),
					'default' => isset( $existing_settings[$fldname] ) ? $existing_settings[$fldname] : $fldprops['default'],
					'css_class' => 'no-drag',
					'format' => $fldprops['format']
					);
			}
			

			$settings_template_args['template_form_fields'] = !empty($template_form_field) ? $this->_generate_admin_form_fields( $template_form_field, 'string', 'ee_mt_activate_form' ) : '';
		}

		$settings_template_args['description'] = $message_type->description;
		//we also need some hidden fields
			$settings_template_args['hidden_fields'] = array(
				'message_type_settings[messenger]' => array(
					'type' => 'hidden',
					'value' => $messenger->name
					),
				'message_type_settings[message_type]' => array(
					'type' => 'hidden',
					'value' => $message_type->name
					),
				'type' => array(
					'type' => 'hidden',
					'value' => 'message_type'
					)
				);

		$settings_template_args['hidden_fields'] = $this->_generate_admin_form_fields( $settings_template_args['hidden_fields'], 'array' );
		$settings_template_args['show_form'] = empty( $settings_template_args['template_form_fields'] ) ? ' hidden' : '';



		$template = EE_MSG_TEMPLATE_PATH . 'ee_msg_mt_settings_content.template.php';
		$content = espresso_display_template( $template, $settings_template_args, TRUE );
		return $content;
	}



	/**
	 * Generate all the metaboxes for the message types and register them for the messages settings page.
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _messages_settings_metaboxes() {
		$this->_set_m_mt_settings();
		$m_boxes = $mt_boxes = array();
		$m_template_args = $mt_template_args = array();

		$selected_messenger = isset( $this->_req_data['selected_messenger'] ) ? $this->_req_data['selected_messenger'] : 'email';

		foreach ( $this->_m_mt_settings['messenger_tabs'] as $messenger => $tab_array ) {

			$hide_on_message = isset( $this->_active_messengers[$messenger] ) ? '' : 'hidden';
			$hide_off_message = isset( $this->_active_messengers[$messenger] ) ? 'hidden' : '';

			//messenger meta boxes
			$active = $selected_messenger == $messenger ? TRUE : FALSE;
			$active_mt_tabs = isset(  $this->_m_mt_settings['message_type_tabs'][$messenger]['active'] ) ?  $this->_m_mt_settings['message_type_tabs'][$messenger]['active'] : '';
			$m_boxes[$messenger . '_a_box'] = sprintf( __('%s Settings', 'event_espresso'), $tab_array['label'] );
			$m_template_args[$messenger . '_a_box'] = array(
					'active_message_types' => !empty( $active_mt_tabs ) ? $this->_get_mt_tabs( $active_mt_tabs ) : '',
					'content' => $this->_get_messenger_box_content( $tab_array['obj'] ),
					'hidden' => $active ? '' : ' hidden',
					'hide_on_message' => $hide_on_message,
					'messenger' => $messenger,
					'active' => $active
				);

			
			//message type meta boxes (which is really just the inactive container for each messenger showing inactive message types for that messenger)
			$mt_boxes[$messenger . '_i_box'] = __('Inactive Message Types', 'event_espresso');
			$mt_template_args[$messenger . '_i_box'] = array(
				'inactive_message_types' => isset( $this->_m_mt_settings['message_type_tabs'][$messenger]['inactive'] ) ? $this->_get_mt_tabs( $this->_m_mt_settings['message_type_tabs'][$messenger]['inactive'] ) : '',
				'hidden' => $active ? '' : ' hidden',
				'hide_on_message' => $hide_on_message,
				'hide_off_message' => $hide_off_message,
				'messenger' => $messenger,
				'active' => $active
				);
		}

		//register messenger metaboxes
		$m_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_messenger_mt_meta_box.template.php';
		foreach ( $m_boxes as $box => $label ) {
			$callback_args = array( 'template_path' => $m_template_path, 'template_args' => $m_template_args[$box] );
			$msgr = str_replace( '_a_box', '', $box );
			add_meta_box( 'espresso_' . $msgr . '_settings', $label, create_function('$post, $metabox', 'echo espresso_display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );'), $this->_current_screen_id, 'normal', 'high', $callback_args );
		}

		//register message type metaboxes
		$mt_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_messenger_meta_box.template.php';
		foreach ( $mt_boxes as $box => $label ) {
			$callback_args = array( 'template_path' => $mt_template_path, 'template_args' => $mt_template_args[$box] );
			$mt = str_replace( '_i_box', '', $box );
			add_meta_box( 'espresso_' . $msgr . '_inactive_mts', $label, create_function('$post, $metabox', 'echo espresso_display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );'), $this->_current_screen_id, 'side', 'high', $callback_args );
		}

	}


	/**
	 * this prepares the messenger tabs that can be dragged in and out of messenger boxes to activate/deactivate
	 * @param  array $tab_array  This is an array of message type tab details used to generate the tabs
	 * @return string            html formatted tabs
	 */ 
	private function _get_mt_tabs( $tab_array ) {
		$tab_array = (array) $tab_array;
		$template = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_mt_settings_tab_item.template.php';
		$tabs = '';

		foreach ( $tab_array as $tab ) {
			$tabs .=  espresso_display_template( $template, $tab, TRUE ); 
		}

		return $tabs;
	}




	/**
	 * This prepares the content of the messenger meta box admin settings
	 * @param  object $messenger The messenger we're setting up content for
	 * @return string            html formatted content
	 */
	private function _get_messenger_box_content( $messenger ) {

		$fields = $messenger->get_admin_settings_fields();
		$settings_template_args['template_form_fields'] = '';

		//is $messenger active?
		$settings_template_args['active'] = isset($this->_active_messengers[$messenger->name]) ? TRUE : FALSE;


		if ( !empty( $fields ) ) {

			$existing_settings = $messenger->get_existing_admin_settings();

			foreach( $fields as $fldname => $fldprops ) {
				$field_id = $messenger->name . '-' . $fldname;
				$template_form_field[$field_id] = array(
					'name' => 'messenger_settings[' . $field_id . ']',
					'label' => $fldprops['label'],
					'input' => $fldprops['field_type'],
					'type' => $fldprops['value_type'],
					'required' => $fldprops['required'],
					'validation' => $fldprops['validation'],
					'value' => isset( $existing_settings[$field_id]) ? $existing_settings[$field_id] : $fldprops['default'],
					'css_class' => '',
					'format' => $fldprops['format']
					);
			}
			

			$settings_template_args['template_form_fields'] = !empty($template_form_field) ? $this->_generate_admin_form_fields( $template_form_field, 'string', 'ee_m_activate_form' ) : '';
		}

		//we also need some hidden fields
		$settings_template_args['hidden_fields'] = array(
			'messenger_settings[messenger]' => array(
				'type' => 'hidden',
				'value' => $messenger->name
				),
			'type' => array(
				'type' => 'hidden',
				'value' => 'messenger'
				)
			);

		//make sure any active message types that are existing are included in the hidden fields
		if ( isset( $this->_m_mt_settings['message_type_tabs'][$messenger->name]['active'] ) ) {
			foreach ( $this->_m_mt_settings['message_type_tabs'][$messenger->name]['active'] as $mt => $values ) {
				$settings_template_args['hidden_fields']['messenger_settings[message_types]['.$mt.']'] = array(
						'type' => 'hidden',
						'value' => $mt
					);
			}
		}

		$settings_template_args['hidden_fields'] = $this->_generate_admin_form_fields( $settings_template_args['hidden_fields'], 'array' );

		$active = isset( $this->_active_messengers[$messenger->name] ) ? TRUE : FALSE;

		$settings_template_args['messenger'] = $messenger->name;
		$settings_template_args['description'] = $messenger->description;
		$settings_template_args['show_hide_edit_form'] = $active ? '' : ' hidden';

		$settings_template_args['show_hide_edit_form'] = empty( $settings_template_args['template_form_fields'] ) ? ' hidden' : $settings_template_args['show_hide_edit_form'];

		$settings_template_args['show_hide_edit_form'] = isset( $this->_active_messengers[$messenger->name] ) ? $settings_template_args['show_hide_edit_form'] : ' hidden';


		$settings_template_args['on_off_action'] = $active ? 'messenger-off' : 'messenger-on';
		$settings_template_args['nonce'] = wp_create_nonce('activate_' . $messenger->name . '_toggle_nonce');
		$settings_template_args['on_off_status'] = $active ? 'active' : 'inactive';
		$template = EE_MSG_TEMPLATE_PATH . 'ee_msg_m_settings_content.template.php';
		$content = espresso_display_template( $template, $settings_template_args, TRUE);
		return $content;
	}




	/**
	 * used by ajax on the messages settings page to activate|deactivate the messenger
	 * @return void
	 */
	public function activate_messenger_toggle() {
		$success = TRUE;
		//let's check that we have required data
		if ( !isset( $this->_req_data[ 'messenger' ] ) ) {
			EE_Error::add_error( __('Messenger name needed to toggle activation. None given', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		//do a nonce check here since we're not arriving via a normal route
		$nonce = isset($this->_req_data[ 'activate_nonce' ]) ? sanitize_text_field( $this->_req_data[ 'activate_nonce'] ) : '';
		$nonce_ref = 'activate_' . $this->_req_data['messenger'] . '_toggle_nonce';

		$this->_verify_nonce( $nonce, $nonce_ref );

		

		if ( !isset( $this->_req_data[ 'status' ])) {
			EE_Error::add_error( __('Messenger status needed to know whether activation or deactivation is happening. No status is given', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		//do check to verify we have a valid status.
		$status = $this->_req_data['status'];

		if ( $status != 'off' && $status != 'on' ) {
			EE_Error::add_error( sprintf( __('The given status (%s) is not valid. Must be "off" or "on"', 'event_espresso'), $this->_req_data['status'] ), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		if ( $success ) {
			//made it here?  Stop dawdling then!!
			if ( $status == 'off' ) {
				//off = deactivate.  get it?
				$success = $this->_activate_messenger( $this->_req_data['messenger'], TRUE );
			} else {
				$success = $this->_activate_messenger( $this->_req_data['messenger'] );
			}
		}

		$this->_template_args['success'] = $success;

		//no special instructions so let's just do the json return (which should automatically do all the special stuff).
		$this->_return_json();		

	}





	/**
	 * used by ajax from the messages settings page to activate|deactivate a message type
	 *
	 * @access public
	 * @return void
	 */
	public function activate_mt_toggle() {
		$success = TRUE;


		//let's make sure we have the necessary data
		if ( !isset( $this->_req_data[ 'message_type' ] ) ) {
			EE_Error::add_error( __('Message Type name needed to toggle activation. None given', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}


		//do a nonce check here since we're not arriving via a normal route
		$nonce = isset( $this->_req_data['mt_nonce'] ) ? sanitize_text_field( $this->_req_data['mt_nonce'] ) : '';
		$nonce_ref = $this->_req_data['message_type'] . '_nonce';

		$this->_verify_nonce( $nonce, $nonce_ref );

		
		if ( !isset( $this->_req_data[ 'messenger' ] ) ) {
			EE_Error::add_error( __('Messenger name needed to toggle activation. None given', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		if ( !isset( $this->_req_data[ 'status' ])) {
			EE_Error::add_error( __('Messenger status needed to know whether activation or deactivation is happening. No status is given', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}


		//do check to verify we have a valid status.
		$status = $this->_req_data['status'];

		if ( $status != 'activate' && $status != 'deactivate' ) {
			EE_Error::add_error( sprintf( __('The given status (%s) is not valid. Must be "active" or "inactive"', 'event_espresso'), $this->_req_data['status'] ), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}


		if ( $success ) {
			//made it here? um, what are you waiting for then?
			$deactivate = $status == 'deactivate' ? TRUE : FALSE;
			$success = $this->_activate_messenger( $this->_req_data['messenger'], $deactivate, $this->_req_data['message_type'] );
		}

		$this->_template_args['success'] = $success;
		$this->_return_json();

	}






	/**
	 * This just updates the active_messengers usermeta field when a messenger or message type is activated/deactivated. 
	 * NOTE: deactivating will remove the messenger (or message type) from the active_messengers wp_options field so all saved settings WILL be lost for the messenger AND message_types associated with that messenger (or message type).
	 *
	 * @param  string  $messenger What messenger we're toggling
	 * @param  boolean $deactivate if true then we deactivate
	 * @param  mixed   $message_type if present what message type we're toggling
	 * @return void
	 */
	private function _activate_messenger($messenger, $deactivate = FALSE, $message_type = FALSE) {
		global $espresso_wp_user;
		$success_msg = array();
		$templates = TRUE;
		$this->_set_m_mt_settings();
		
		if ( !$deactivate ) {
			//we are activating.  we can use $this->_m_mt_settings to get all the installed messengers.

			$this->_active_messengers[$messenger]['settings'] = !isset($this->_active_messengers[$messenger]['settings']) ? array() : $this->_active_messengers[$messenger]['settings'];
			$this->_active_messengers[$messenger]['obj'] = $this->_m_mt_settings['messenger_tabs'][$messenger]['obj'];

			//k we need to get what default message types are to be associated with the messenger that's been activated.
			$default_types = $message_type ? (array) $message_type : $this->_active_messengers[$messenger]['obj']->get_default_message_types();

			foreach ( $default_types as $type ) {
				$settings_fields = $this->_m_mt_settings['message_type_tabs'][$messenger]['inactive'][$type]['obj']->get_admin_settings_fields();
				if ( !empty( $settings_fields ) ) {
					//we have fields for this message type so let's get the defaults for saving.
					foreach ( $settings_fields as $field => $values ) {
						$settings[$field] = $values['default'];
					}
					//let's set the data for reloading this message type form in ajax
					$this->_template_args['data']['mt_reload'][] = $type;
				} else {
					$settings = array();
				}
				$this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'][$type]['settings'] =  $settings;
			}

			//any default settings for the messenger?
			$msgr_settings = $this->_active_messengers[$messenger]['obj']->get_admin_settings_fields();

			if ( !empty( $msgr_settings ) ) {
				foreach ( $msgr_settings as $field => $value ) {
					$this->_active_messengers[$messenger]['settings'][$field] = $value;
				}
			}

			//update settings in database
			update_option( 'ee_active_messengers', $this->_active_messengers );
			

			//generate new templates (if necessary)
			$templates = $this->_generate_new_templates( $messenger, $default_types, '', TRUE );

			EE_Error::overwrite_success();

			//if generation failed then we need to remove the active messenger.
			if ( !$templates ) {
				unset($this->_active_messengers[$messenger]);
				update_option('ee_active_messengers', $this->_active_messengers);
			} else {
				//all is good let's do a success message
				$success_msg = $message_type ? sprintf( __('%s message type has been successfully activated with the %s messenger', 'event_espresso'),ucwords($this->_m_mt_settings['message_type_tabs'][$messenger]['inactive'][$message_type]['obj']->label['singular']), ucwords( $this->_active_messengers[$messenger]['obj']->label['singular'] ) ) :sprintf( __('%s messenger has been successfully activated', 'event_espresso'), ucwords( $this->_active_messengers[$messenger]['obj']->label['singular'] ) );
			}

			$this->_template_args['data']['active_mts'] = $default_types;
			
		} else {
			//we're deactivating
			
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();

			//first lets make sure that there are NO existing event templates for the given messenger.  If there ARE then we need to drop out with an error message, prevent deactivation and display warning.
			$where_col = 'MTP_messenger';
			$_where = array(
				$where_col => $messenger,
				'MTP_is_global' => FALSE
				);

			//if this is a message type deactivation then let's setup the message type as well
			if ( $message_type ) {
				$_where['MTP_message_type'] = $message_type;
			}

			$event_templates = $MTP->get_all_message_templates_where( $_where );

			if ( $event_templates && count($event_templates) > 0 ) {
				$m_label_pl = __('Messengers', 'event_espresso');
				$m_label_sg = __('messenger', 'event_espresso');
				$warning_msg = $message_type ? sprintf( __('<strong>Warning:</strong> Message Types cannot be deactivated if there are any Events currently using a custom template for that message type and messenger. Before you can deactivate the "%s" message type, you must switch the following "Events" to use global templates:', 'event_espresso' ), ucwords($this->_m_mt_settings['message_type_tabs'][$messenger]['active'][$message_type]['obj']->label['singular']) ) : sprintf( __('<strong>Warning:</strong> %s cannot be deactivated if there are any Events currently using a custom template for it. Before you can deactivate the "%s" %s, you must switch the following "Events" to use global templates:', 'event_espresso' ), $m_label_pl, $this->_active_messengers[$messenger]['obj']->label['singular'], $m_label_sg  );
				$warning_msg .= '<ul>';

				//output list of events
				$base_event_admin_url = admin_url( 'admin.php?page=espresso_events' );
				foreach ( $event_templates as $template ) {
					$event_name = $this->event_name($template->event());
					$query_args = array(
						'action' => 'edit_event',
						'EVT_ID' => $template->event()
						);
					$edit_event_url = self::add_query_args_and_nonce( $query_args, $base_event_admin_url );
					$warning_msg .= "\n" . '<li><a href="' . $edit_event_url . '" title="' . __('Edit Event', 'event_espresso') . '">' . $event_name . '</a></li>';
				}

				$warning_msg .= '</ul>';
				$warning_msg .= $message_type ? '<br />' . __('Remember, deactivating message types does NOT delete any templates or any customization you have done.  All it does is "deactivate" them. Should you activate the message type later your templates will be restored.', 'event_espresso') : '<br />' . __('Remember, deactivating messengers does NOT delete any templates or any customization you have done.  All it does is "deactivate" them. Should you activate the message type or messenger later your templates will be restored.', 'event_espresso');
				EE_Error::add_error($warning_msg);
				return false;
			}

			//okay let's update the message templates that match this messenger so that they are deactivated in the database as well.
			$update_array = array(
				$where_col => $messenger);

			if ( $message_type ) {
				$update_array['MTP_message_type'] = $message_type;
			}
			
			$success = $MTP->update( array( 'MTP_is_active' => 0 ), $update_array );

			$messenger_obj = $this->_active_messengers[$messenger]['obj'];

			//if this is a message type deactivation then we're only unsetting the message type otherwise unset the messenger
			if ( $message_type ) {
				unset( $this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'][$message_type] );
			} else {
				unset( $this->_active_messengers[$messenger] );
			}

			update_option('ee_active_messengers', $this->_active_messengers);

			$success_msg = $message_type ? sprintf( __('%s %s has been successfully deactivated', 'event_espresso'), ucwords($this->_m_mt_settings['message_type_tabs'][$messenger]['active'][$message_type]['obj']->label['singular']), __('Message Type', 'event_espresso') ) : sprintf( __('%s %s has been successfully deactivated', 'event_espresso'), ucwords($messenger_obj->label['singular'] ) , __('Messenger', 'event_espresso') );
			
		}
		EE_Error::overwrite_success();
		if ( $templates ) EE_Error::add_success($success_msg);
		return true;
	}




	/**
	 * handles updating a message type form on messenger activation IF the message type has settings fields. (via ajax)
	 * @return string html data
	 */
	public function update_mt_form() {
		if ( !isset( $this->_req_data['messenger'] ) || !isset( $this->_req_data['message_type'] ) ) {
			EE_Error::add_error( __('Require message type or messenger to send an updated form'));
			$this->_return_json();
		}

		$message_types = $this->get_installed_message_types();

		$message_type = $message_types[$this->_req_data['message_type']]['obj'];
		$messenger = $this->_active_messengers[$this->_req_data['messenger']]['obj'];

		$content = $this->_message_type_settings_content ( $message_type, $messenger, TRUE, TRUE );
		$this->_template_args['success'] = true;
		$this->_template_args['content'] = $content;
		$this->_return_json();
	}




	/**
	 * this handles saving the settings for a messenger or message type
	 * @return json success or fail message
	 */
	public function save_settings() {
		if ( !isset( $this->_req_data['type'] ) ) {
			EE_Error::add_error(__('Cannot save settings because type is unknown (messenger settings or messsage type settings?)', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$this->_template_args['error'] = TRUE;
			$this->_return_json();
		}


		if ( $this->_req_data['type'] == 'messenger' ) {
			$settings = $this->_req_data['messenger_settings']; //this should be an array.
			$messenger = $settings['messenger'];
			//let's setup the settings data
			foreach ( $settings as $key => $value ) {
				switch ( $key ) {
					case 'messenger' :
						unset( $settings['messenger'] );
						break;
					case 'message_types' :
						if ( isset( $this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'] ) ) {
							foreach ( $this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'] as $mt => $v ) {
								if ( isset( $settings['message_types'][$mt] ) )
									$settings[$messenger . '-message_types'][$mt]['settings'] = isset( $this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt] ) ? $this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt] : array();
							}
						} else {
							foreach ( $value as $mt => $v ) {
								//let's see if this message type is already present and has settings.
								$settings[$messenger . '-message_types'][$mt]['settings'] = array();
							}
						}
						//k settings are set let's get rid of the message types index
						unset( $settings['message_types'] );
						break;
					default :
						$settings[$key] = $value;
						break;
				}
			}
			$this->_active_messengers[$messenger]['settings'] = $settings;
		}

		else if ( $this->_req_data['type'] == 'message_type' ) {
			$settings = $this->_req_data['message_type_settings'];
			$messenger = $settings['messenger'];
			$message_type = $settings['message_type'];

			foreach ( $settings as $key => $value ) {
				switch ( $key ) {
					case 'messenger' :
						unset( $settings['messenger'] );
						break;
					case 'message_type' :
						unset( $settings['message_type'] );
						break;
					default :
						$settings['settings'][$key] = $value;
						unset( $settings[$key] );
						break;
				}
			}

			$this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'][$message_type] = $settings;
		}

		//okay we should have the data all setup.  Now we just update!
		$success = update_option( 'ee_active_messengers', $this->_active_messengers );

		if ( $success ) {
			EE_Error::add_success( __('Settings updated', 'event_espresso') );
		} else {
			EE_Error::add_error( __('Settings did not get updated', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		$this->_template_args['success'] = $success;
		$this->_return_json();
	}



	


	protected function _messages_reports() {
		$this->_template_args['admin_page_content'] = "Feature coming soon man,  sit back, relax, and enjoy the fireworks.";
		$this->display_admin_page_with_no_sidebar();
	}





	/**
	 * [event_name description]
	 * This just takes a given event_id and will output the name of the event for it.
	 * @todo: temporary... will need to remove/replace once proper Event models/classes are in place.
	 * @access private
	 * @param  int $evt_id event_id
	 * @return string event_name 
	 */
	public function event_name($evt_id) {
		global $wpdb;
		$evt_id = absint($evt_id);
		$tablename = $wpdb->prefix . 'events_detail';
		$query = "SELECT event_name FROM {$tablename} WHERE id = %d";
		$event_name = $wpdb->get_var( $wpdb->prepare($query, $evt_id) );
		return $event_name;
	}

	
}
