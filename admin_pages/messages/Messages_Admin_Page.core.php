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
 * @version		4.0
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

	protected $_active_messengers = array();
	protected $_active_message_types = array();
	protected $_active_messenger;
	protected $_activate_state;
	protected $_activate_meta_box_type;
	protected $_current_message_meta_box;
	protected $_current_message_meta_box_object;
	protected $_context_switcher;
	protected $_shortcodes = array();
	protected $_message_template_group;
	protected $_m_mt_settings = array();





	/**
	 * constructor
	 * @constructor
	 * @access public
	 * @return void
	 */
	public function __construct( $routing = TRUE ) {
		//make sure messages autoloader is running
		EE_Registry::instance()->load_lib( 'Messages_Init' );
		EE_Registry::instance()->load_helper('MSG_Template');
		EE_Messages_Init::set_autoloaders();
		parent::__construct($routing);
	}





	protected function _init_page_props() {
		global $espresso_wp_user;
		$this->page_slug = EE_MSG_PG_SLUG;
		$this->page_label = __('Messages Settings', 'event_espresso');
		$this->_admin_base_url = EE_MSG_ADMIN_URL;
		$this->_admin_base_path = EE_MSG_ADMIN;

		$this->_activate_state = isset($this->_req_data['activate_state']) ? (array) $this->_req_data['activate_state'] : array();

		$this->_active_messenger = isset( $this->_req_data['messenger'] ) ? $this->_req_data['messenger'] : NULL;

		EE_Registry::instance()->load_lib( 'messages' );
		//we're also going to set the active messengers and active message types in here.
		$this->_active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		$this->_active_messengers = !empty($this->_active_messengers) ?  $this->_active_messengers : array();
		$this->_active_message_types = !empty($this->_active_messenger) && !empty($this->_active_messengers[$this->_active_messenger]) ? array_keys($this->_active_messengers[$this->_active_messenger]['settings'][$this->_active_messenger . '-message_types']) : array();


		//what about saving the objects in the active_messengers and active_message_types?
		$this->_load_active_messenger_objects();
		$this->_load_active_message_type_objects();
	}




	/**
	 * loads messenger objects into the $_active_messengers property (so we can access the needed methods)
	 *
	 * @access  protected
	 * @return void
	 */
	protected function _load_active_messenger_objects() {
		foreach ( $this->_active_messengers as $messenger => $values ) {
			$ref = ucwords( str_replace( '_' , ' ', $messenger) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_messenger';
			require_once( EE_LIBRARIES . 'messages'. DS .'messenger' . DS . $classname . '.class.php' );
			if ( !class_exists($classname) )
				throw new EE_Error( sprintf( __('There is no messenger for the given classname (%s)', 'event_espresso'), $classname ) );

			$a = new ReflectionClass( $classname );
			$this->_active_messengers[$messenger]['obj'] = $a->newInstance();
		}
	}




	/**
	 * loads messenger objects into the $_active_messengers property (so we can access the needed methods)
	 *
	 * @access  protected
	 * @return void
	 */
	protected function _load_active_message_type_objects() {
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
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Message Template', 'event_espresso'),
				'edit' => __('Edit Message Template', 'event_espresso'),
				'delete' => __('Delete Message Template', 'event_espresso')
			),
			'publishbox' => __('Update Actions', 'event_espresso')
		);
	}







	/**
	 * 		an array for storing key => value pairs of request actions and their corresponding methods
	*		@access protected
	*		@return void
	*/
	protected function _set_page_routes() {

		$this->_page_routes = array(
				'default'=> '_ee_default_messages_overview_list_table',
				'custom_mtps' => '_custom_mtps_preview',
				'add_new_message_template'	=>array(
					 'func' => '_add_message_template',
					 'noheader' => TRUE
					),
				'edit_message_template'	=> '_edit_message_template',
				'preview_message' => '_preview_message',
				'insert_message_template' => array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => TRUE ), 'noheader' => TRUE ),
				'update_message_template' => array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => FALSE ), 'noheader' => TRUE ),
				'trash_message_template' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE, 'all' => TRUE ), 'noheader' => TRUE ),
				'trash_message_template_context' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE ), 'noheader' => TRUE ),
				'restore_message_template' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => FALSE, 'all' => TRUE ), 'noheader' => TRUE ),
				'restore_message_template_context' => array( 'func' => '_trash_or_restore_message_template' , 'args' => array('trash' => FALSE), 'noheader' => TRUE  ),
				'delete_message_template' => array( 'func' => '_delete_message_template', 'noheader' => TRUE ),
				'reset_to_default' => array( 'func' => '_reset_to_default_template', 'noheader' => TRUE ),
				'settings' => '_settings',
				'reports' => '_messages_reports'
		);
	}








	protected function _set_page_config() {

		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Default Message Templates', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'Messages_Template_List_Table',
				'help_tabs' => array(
					'messages_overview_help_tab' => array(
						'title' => __('Messages Overview', 'event_espresso'),
						'filename' => 'messages_overview'
						),
					'messages_overview_messages_table_column_headings_help_tab' => array(
						'title' => __('Messages Table Column Headings', 'event_espresso'),
						'filename' => 'messages_overview_table_column_headings'
					),
					'messages_overview_messages_filters_help_tab' => array(
						'title' => __('Message Filters', 'event_espresso'),
						'filename' => 'messages_overview_filters'
					),
					'messages_overview_messages_views_help_tab' => array(
						'title' => __('Message Views', 'event_espresso'),
						'filename' => 'messages_overview_views'
					),
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
				'help_tour' => array( 'Messages_Overview_Help_Tour' ),
				'require_nonce' => FALSE
				),
			'custom_mtps' => array(
				'nav' => array(
					'label' => __('Custom Message Templates', 'event_espresso'),
					'order' => 15
					),
				'help_tabs' => array(),
				'help_tour' => array(),
				'require_nonce' => FALSE
			),
			'add_new_message_template' => array(
				'nav' => array(
					'label' => __('Add New Message Templates', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'require_nonce' => FALSE
				),
			'edit_message_template' => array(
				'labels' => array(
					'buttons' => array(
						'reset' => __('Reset Templates'),
					),
					'publishbox' => __('Update Actions', 'event_espresso')
				),
				'nav' => array(
					'label' => __('Edit Message Templates', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => ''
					),
				'metaboxes' => array('_publish_post_box', '_register_edit_meta_boxes'),
				'has_metaboxes' => TRUE,
				'help_tour' => array( 'Message_Templates_Edit_Help_Tour' ),
				'help_tabs' => array(
						'edit_message_template' => array(
							'title' => __('Message Template Editor', 'event_espresso'),
							'callback' => 'edit_message_template_help_tab'
							),
                        'message_templates_help_tab' => array(
                            'title' => __('Message Templates', 'event_espresso'),
                            'filename' => 'messages_templates'
                            ),
						'message_template_shortcodes' => array(
							'title' => __('Message Shortcodes', 'event_espresso'),
							'callback' => 'message_template_shortcodes_help_tab'
							),
                        'message_preview_help_tab' => array(
                            'title' => __('Message Preview', 'event_espresso'),
                            'filename' => 'messages_preview'
                            ),
					),
				'require_nonce' => FALSE
				),
			'preview_message' => array(
				'nav' => array(
					'label' => __('Message Preview', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'help_tabs' => array(
						'preview_message' => array(
							'title' => __('About Previews', 'event_espresso'),
							'callback' => 'preview_message_help_tab'
							)
					),
				'require_nonce' => FALSE
				),
			'settings' => array(
				'nav' => array(
					'label' => __('Settings', 'event_espresso'),
					'order' => 20
					),
				'metaboxes' => array('_messages_settings_metaboxes'),
                'help_tabs' => array(
						'messages_settings_help_tab' => array(
							'title' => __('Messages Settings', 'event_espresso'),
							'filename' => 'messages_settings'
							),
						'messages_settings_message_types_help_tab' => array(
							'title' => __('Activating / Deactivating Message Types', 'event_espresso'),
							'filename' => 'messages_settings_message_types'
							),
						'messages_settings_messengers_help_tab' => array(
							'title' => __('Activating / Deactivating Messengers', 'event_espresso'),
							'filename' => 'messages_settings_messengers'
							),
                    ),
				'help_tour' => array( 'Messages_Settings_Help_Tour' ),
				'require_nonce' => FALSE
				)
			/*'reports' => array(
				'nav' => array(
					'label' => __('Reports', 'event_espresso'),
					'order' => 30
					)
				)*/
		);

	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$page_title = $this->_admin_page_title;
		$this->_admin_page_title = __('Global Message Templates', 'event_espresso');
		$this->_per_page_screen_option();
		$this->_admin_page_title = $page_title;
	}






	//none of the below group are currently used for Messages
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function messages_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_help_tab.template.php';
		EEH_Template::display_template( $templatepath, array());
	}


	public function messengers_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messenger_help_tab.template.php';
		EEH_Template::display_template( $templatepath, array());
	}


	public function message_types_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_message_type_help_tab.template.php';
		EEH_Template::display_template( $templatepath, array());
	}


	public function messages_overview_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_overview_help_tab.template.php';
		EEH_Template::display_template( $templatepath, array());
	}


	public function message_templates_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_message_templates_help_tab.template.php';
		EEH_Template::display_template( $templatepath, array());
	}


	public function edit_message_template_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_templates_editor_help_tab.template.php';
		$args['img1'] = '<img src="' . EE_MSG_ASSETS_URL . 'images/editor.png' . '" alt="' . __('Editor Title', 'event_espresso') . '" />';
		$args['img2'] = '<img src="' . EE_MSG_ASSETS_URL . 'images/switch-context.png' . '" alt="' . __('Context Switcher and Preview', 'event_espresso') . '" />';
		$args['img3'] = '<img class="left" src="' . EE_MSG_ASSETS_URL . 'images/form-fields.png' . '" alt="' . __('Message Template Form Fields', 'event_espresso') . '" />';
		$args['img4'] = '<img class="right" src="' . EE_MSG_ASSETS_URL . 'images/shortcodes-metabox.png' . '" alt="' . __('Shortcodes Metabox', 'event_espresso') . '" />';
		$args['img5'] = '<img class="right" src="' . EE_MSG_ASSETS_URL . 'images/publish-meta-box.png' . '" alt="' . __('Publish Metabox', 'event_espresso') . '" />';
		EEH_Template::display_template( $templatepath, $args);
	}



	public function message_template_shortcodes_help_tab() {
		$this->_set_shortcodes();
		$args['shortcodes'] = $this->_shortcodes;
		$template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_shortcodes_help_tab.template.php';
		EEH_Template::display_template( $template_path, $args );
	}



	public function preview_message_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_preview_help_tab.template.php';
		EEH_Template::display_template( $templatepath, array());
	}


	public function settings_help_tab() {
		$templatepath = EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_settings_help_tab.template.php';
		$args['img1'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-active.png' . '" alt="' . __('Active Email Tab', 'event_espresso') . '" />';
		$args['img2'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-inactive.png' . '" alt="' . __('Inactive Email Tab', 'event_espresso') . '" />';
		$args['img3'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'on-toggle.png' . '" alt="' . __('On Toggle Image', 'event_espresso') . '" />';
		$args['img4'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'off-toggle.png' . '" alt="' . __('Off Toggle Image', 'event_espresso') . '" />';
		EEH_Template::display_template( $templatepath, $args);
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
		;
		$this->_set_shortcodes();
		EE_Registry::$i18n_js_strings['confirm_default_reset'] = sprintf( __('Are you sure you want to reset the %s %s message templates?  Remember continuing will reset the templates for all contexts in this messenger and message type group.', 'event_espresso'), $this->_message_template_group->messenger_obj()->label['singular'], $this->_message_template_group->message_type_obj()->label['singular'] );


		wp_register_script('ee_msgs_edit_js', EE_MSG_ASSETS_URL . 'ee_message_editor.js', array('jquery'), EVENT_ESPRESSO_VERSION );

		wp_enqueue_script('ee_admin_js');
		wp_enqueue_script('ee_msgs_edit_js');

		wp_localize_script( 'ee_msgs_edit_js', 'eei18n', EE_Registry::$i18n_js_strings );

		//add in special css for tiny_mce
		add_filter( 'mce_css', array( $this, 'wp_editor_css' ) );
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
			)
		);
	}



	protected function _ee_default_messages_overview_list_table() {
		$this->_admin_page_title = __('Default Message Templates', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}



	protected function _custom_mtps_preview() {
		$this->_admin_page_title = __('Custom Message Templates (Preview)', 'event_espresso');
		$this->_template_args['preview_img'] = '<img src="' . EE_MSG_ASSETS_URL . 'images/custom_mtps_preview.png" alt="Preview Custom Message Templates screenshot" />';
		$this->_template_args['preview_text'] = '<strong>'.__('Custom Message Templates is a feature that is only available in the caffeinated version of Event Espresso.  With the Custom Message Templates feature, you are able to create custom templates and set them per event.', 'event_espresso').'</strong>';
		$this->display_admin_caf_preview_page( 'custom_message_types', FALSE );
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
	 * @param bool $global whether to return just global (true) or custom templates (false)
	 * @return array|WP_Error object
	 */
	public function get_message_templates( $perpage = 10, $type = 'in_use', $count = FALSE, $all = FALSE, $global = TRUE ) {
		global $espresso_wp_user;
		// start with an empty array
		$message_templates = array();

		$MTP = EEM_Message_Template_Group::instance();

		$this->_req_data['orderby'] = empty($this->_req_data['orderby']) ? 'GRP_ID' : $this->_req_data['orderby'];
		$orderby = $this->_req_data['orderby'];

		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] ) ) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $perpage;

		$offset = ($current_page-1)*$per_page;
		$limit = $all ? NULL : array( $offset, $per_page );


		//options will match what is in the _views array property
		switch( $type ) {

			case 'in_use':
				$templates = $MTP->get_all_active_message_templates($orderby, $order, $limit, $count, $global );
				break;

			default:
				$templates = $MTP->get_all_trashed_grouped_message_templates($orderby, $order, $limit, $count, $global );

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
	protected function _get_installed_message_objects() {
		//get all installed messengers and message_types
		$EE_MSG = new EE_messages();
		$installed_message_objects = $EE_MSG->get_installed();
		return $installed_message_objects;
	}


	/**
	 * _add_message_template
	 *
	 * This is used when creating a custom template. All Custom Templates start based off another template.
	 *
	 * @access  protected
	 * @return void
	 */
	protected function _add_message_template(  $message_type = '', $messenger='', $GRP_ID = '' ) {
		//set values override any request data
		$message_type = !empty( $message_type ) ? $message_type : '';
		$message_type = empty( $message_type ) && !empty( $this->_req_data['message_type'] ) ? $this->_req_data['message_type'] : $message_type;

		$messenger = !empty( $messenger ) ? $messenger : '';
		$messenger = empty( $messenger ) && !empty( $this->_req_data['messenger'] ) ? $this->_req_data['messenger'] : $messenger;

		$GRP_ID = !empty( $GRP_ID ) ? $GRP_ID : '';
		$GRP_ID = empty( $GRP_ID ) && !empty( $this->_req_data['GRP_ID'] ) ? $this->_req_data['GRP_ID'] : $GRP_ID;

		//we need messenger and message type.  They should be coming from the event editor. If not here then return error
		if ( empty( $message_type ) || empty( $messenger )  )
			throw new EE_error(__('Sorry, but we can\'t create new templates because we\'re missing the messenger or message type', 'event_espresso'));

		//we need the GRP_ID for the template being used as the base for the new template
		if ( empty( $GRP_ID ) )
			throw new EE_Error( __('In order to create a custom message template the GRP_ID of the template being used as a base is needed', 'event_espresso' ) );

		//let's just make sure the template gets generated!

		//we need to reassign some variables for what the insert is expecting
		$this->_req_data['MTP_messenger'] = $messenger;
		$this->_req_data['MTP_message_type'] = $message_type;
		$this->_req_data['GRP_ID'] = $GRP_ID;
		$this->_insert_or_update_message_template(TRUE);
	}



	/**
	 * public wrapper for the _add_message_template method
	 * @param string $message_type message type slug
	 * @param string $messenger    messenger slug
	 * @param int      $GRP_ID         GRP_ID for the related message template group this new template will be based off of.
	 */
	public function add_message_template( $message_type, $messenger, $GRP_ID ) {
		$this->_add_message_template( $message_type, $messenger, $GRP_ID );
	}


	/**
	 * _edit_message_template
	 *
	 * @access protected
	 * @return void
	 */
	protected function _edit_message_template() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '');
		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;

		$this->_set_shortcodes(); //this also sets the _message_template property.
		$message_template_group = $this->_message_template_group;
		$c_label = $message_template_group->context_label();
		$c_config = $message_template_group->contexts_config();

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
			$button_both = TRUE;
			$button_text = array();
			$button_actions = array();
			$referrer = $this->_admin_base_url;
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		}

		//set active messenger for this view
		$this->_active_messenger = $this->_active_messengers[$message_template_group->messenger()]['obj'];


		//Do we have any validation errors?
		$validators = $this->_get_transient();
		$v_fields = !empty($validators) ? array_keys($validators) : array();


		//we need to assemble the title from Various details
		$context_label = sprintf( __('(%s %s)', 'event_espresso'), $c_config[$context]['label'], ucwords($c_label['label'] ));

		$title = sprintf( __(' %s %s Template %s', 'event_espresso'), ucwords($message_template_group->messenger_obj()->label['singular']), ucwords($message_template_group->message_type_obj()->label['singular']), $context_label );

		$this->_template_args['GRP_ID'] = $GRP_ID;
		$this->_template_args['message_template'] = $message_template_group;
		$this->_template_args['is_extra_fields'] = FALSE;


		//let's get the EE_messages_controller so we can get template form fields
		$MSG = new EE_messages();
		$template_field_structure = $MSG->get_fields($message_template_group->messenger(), $message_template_group->message_type());

		if ( !$template_field_structure ) {
			$template_field_structure = FALSE;
			$template_fields = __('There was an error in assembling the fields for this display (you should see an error message)', 'event_espresso');
		}


		$message_templates = $message_template_group->context_templates();


		//if we have the extra key.. then we need to remove the content index from the template_field_structure as it will get handled in the "extra" array.
		if ( is_array($template_field_structure[$context]) && isset( $template_field_structure[$context]['extra']) ) {
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
							$continue = FALSE;
							if ( isset( $extra_array['shortcodes_required'] ) ) {
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
							$template_form_fields[$field_id]['css_class'] = !empty( $v_fields ) && in_array($extra_field, $v_fields) && ( is_array($validators[$extra_field] ) && isset( $validators[$extra_field]['msg'] ) ) ? 'validate-error ' . $css_class : $css_class;
							$content = $message_templates[$context][$reference_field]->get('MTP_content');
							$template_form_fields[$field_id]['value'] = !empty($message_templates) && isset($content[$extra_field]) ? stripslashes( html_entity_decode( $content[$extra_field], ENT_QUOTES, "UTF-8") ) : '';

							//do we have a validation error?  if we do then let's use that value instead
							$template_form_fields[$field_id]['value'] = isset($validators[$extra_field]) ? $validators[$extra_field]['value'] : $template_form_fields[$field_id]['value'];


							$template_form_fields[$field_id]['db-col'] = 'MTP_content';

							if ( isset( $extra_array['input'] ) && $extra_array['input'] == 'wp_editor' ) {
								//we want to decode the entities
								$template_form_fields[$field_id]['value'] = stripslashes( html_entity_decode( $template_form_fields[$field_id]['value'], ENT_QUOTES, "UTF-8") );

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
							'value' => !empty($message_templates) ? $message_templates[$context][$reference_field]->ID() : '',
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
					$template_form_fields[$field_id]['value'] = !empty($message_templates) && is_array($message_templates[$context]) && isset($message_templates[$context][$template_field]) ?$message_templates[$context][$template_field]->get('MTP_content') : '';

					//do we have a validator error for this field?  if we do then we'll use that value instead
					$template_form_fields[$field_id]['value'] = isset($validators[$template_field]) ? $validators[$template_field]['value'] : $template_form_fields[$field_id]['value'];


					$template_form_fields[$field_id]['db-col'] = 'MTP_content';
					$css_class = isset($field_setup_array['css_class']) ? $field_setup_array['css_class'] : '';
					$template_form_fields[$field_id]['css_class'] = !empty( $v_fields ) && in_array( $template_field, $v_fields ) && isset( $validators[$template_field]['msg'] ) ? 'validate-error ' . $css_class : $css_class;

					if ( isset( $field_setup_array['input'] ) && $field_setup_array['input'] == 'wp_editor' ) {
						//we want to decode the entities
						$template_form_fields[$field_id]['value'] = $template_form_fields[$field_id]['value'];
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
					'value' => !empty($message_templates) ? $message_templates[$context][$template_field]->ID() : '',
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
					'value' => $message_template_group->messenger(),
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
					'value' => $message_template_group->message_type(),
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
					'value' => $message_template_group->get('MTP_is_global'),
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_global'
				);

			$sidebar_form_fields['ee-msg-is-override'] = array(
					'name' => 'MTP_is_override',
					'label' => __('Override all custom', 'event_espresso'),
					'input' => $message_template_group->is_global() ? 'checkbox' : 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_template_group->get('MTP_is_override'),
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
					'value' => $message_template_group->is_active(),
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
					'value' => $message_template_group->get('MTP_deleted'),
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
				'value' => $message_template_group->user(),
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

		//add preview button
		$preview_url = parent::add_query_args_and_nonce( array( 'message_type' => $message_template_group->message_type(), 'messenger' => $message_template_group->messenger(), 'context' => $context,'msg_id' => $GRP_ID, 'action' => 'preview_message' ), $this->_admin_base_url );
		$preview_button = '<a href="' . $preview_url . '" class="button-secondary messages-preview-button">' . __('Preview', 'event_espresso') . '</a>';


		//setup context switcher
		$context_switcher_args = array(
			'page' => 'espresso_messages',
			'action' => 'edit_message_template',
			'id' => $GRP_ID,
			'context' => $context,
			'extra' => $preview_button
		);
		$this->_set_context_switcher($message_template_group, $context_switcher_args);

		//main box
		$this->_template_args['template_fields'] = $template_fields;
		$this->_template_args['sidebar_box_id'] = 'details';
		$this->_template_args['action'] = $action;
		$this->_template_args['context'] = $context;
		$this->_template_args['edit_message_template_form_url'] = $edit_message_template_form_url;
		$this->_template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();


		$this->_template_args['before_admin_page_content'] = $this->add_context_switcher();
		$this->_template_args['before_admin_page_content'] .= $this->_add_form_element_before();
		$this->_template_args['after_admin_page_content'] = $this->_add_form_element_after();

		$this->_template_path = $this->_template_args['GRP_ID'] ? EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_edit_meta_box.template.php' : EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';

		//send along EE_Message_Template_Group object for further template use.
		$this->_template_args['MTP'] = $message_template_group;

		$this->_template_args['admin_page_content'] = EEH_Template::display_template( $this->_template_path, $this->_template_args, TRUE );


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
	 * This handles resetting the template for the given messenger/message_type so that users can start from scratch if they want.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _reset_to_default_template() {
		$success = TRUE;
		$templates = array();
		$GRP_ID = !empty( $this->_req_data['GRP_ID'] ) ? $this->_req_data['GRP_ID'] : 0;
		//we need to make sure we've got the info we need.
		if ( !isset( $this->_req_data['msgr'] ) && !isset( $this->_req_data['mt'] ) && !isset( $this->_req_data['GRP_ID'] ) ) {
			EE_Error::add_error( __('In order to reset the template to its default we require the messenger, message type, and message template GRP_ID to know what is being reset.  At least one of these is missing.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		//all templates will be reset to whatever the defaults are for the global template matching the messenger and message type.
		$success = !empty( $GRP_ID ) ? TRUE : FALSE;

		if ( $success ) {

			//let's first determine if the incoming template is a global template, if it isn't then we need to get the global template matching messenger and message type.
			$MTPG = EEM_Message_Template_Group::instance()->get_one_by_ID( $GRP_ID );

			$success = $this->_delete_mtp_permanently( $GRP_ID, FALSE );

			//if successfully deleted, lets generate the new ones.  Note. We set GLOBAL to true, because resets on ANY template will use the related global template defaults for regeneration.  This means that if a custom template is reset, it does NOT reset to whatever the related GLOBAL is in the db but rather what the related
			if ( $success ) {
				$templates = $this->_generate_new_templates( $this->_req_data['msgr'], $this->_req_data['mt'], $GRP_ID, TRUE );
			}
		}

		//any error messages?
		if ( !$success ) {
			EE_Error::add_error( __('Something went wrong with deleting existing templates. Unable to reset to default', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		if ( $success && empty( $templates ) ) {
			EE_Error::add_error( __('Successfully deleted existing templates but unable to regenerate default templates. You can try regenerating by deactivating and reactivating the messenger in the messenger settings page, if that doesn\'t work please contact support', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		//all good, let's add a success message!
		if ( $success && !empty( $templates ) ) {
			EE_Error::overwrite_success();
			EE_Error::add_success( __('Templates have been reset to defaults.', 'event_espresso') );
		}

		$query_args = array(
			'id' => isset( $templates['GRP_ID'] ) ? $templates['GRP_ID'] : NULL,
			'context' => isset( $templates['MTP_context'] ) ? $templates['MTP_context'] : NULL,
			'action' => isset( $templates['GRP_ID'] ) ? 'edit_message_template' : 'default'
			);

		$this->_redirect_after_action( FALSE, '', '', $query_args, TRUE );
	}



	/**
	 * Retrieve and set the message preview for display.
	 *
	 * @param bool $send if TRUE then we are doing an actual TEST send with the results of the preview.
	 * @return void
	 */
	public function _preview_message( $send = FALSE ) {
		//first make sure we've got the necessary parameters
		if ( !isset( $this->_req_data['message_type'] ) || !isset( $this->_req_data['messenger'] ) || !isset( $this->_req_data['messenger'] ) || !isset( $this->_req_data['msg_id'] ) ) {
			EE_Error::add_error( __('Missing necessary parameters for displaying preview', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}

		$_POST['msg_id'] = $this->_req_data['msg_id']; //make sure post global has the msg_id param for later use.

		$MSG = new EE_messages();

		//get the preview!
		$preview = $MSG->preview_message( $this->_req_data['message_type'], $this->_req_data['context'], $this->_req_data['messenger'], $send );

		if ( $send ) {
			return $preview;
		}

		//let's add a button to go back to the edit view
		$query_args = array(
			'id' => $this->_req_data['msg_id'],
			'context' => $this->_req_data['context'],
			'action' => 'edit_message_template'
			);
		$go_back_url = parent::add_query_args_and_nonce( $query_args, $this->_admin_base_url );
		$preview_button = '<a href="' . $go_back_url . '" class="button-secondary messages-preview-go-back-button">' . __('Go Back to Edit', 'event_espresso') . '</a>';

		//let's provide a helpful title for context
		$preview_title = sprintf( __('Viewing Preview for %s %s Message Template', 'event_espresso'), ucwords($this->_active_messengers[$this->_req_data['messenger']]['obj']->label['singular']), ucwords($this->_active_message_types[$this->_req_data['message_type']]['obj']->label['singular']) );


		//setup display of preview.
		$this->_admin_page_title = $preview_title;
		$this->_template_args['admin_page_content'] = $preview_button . '<br />' .stripslashes($preview);
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
		add_meta_box( 'mtp_extra_actions', __('Extra Actions', 'event_espresso'), array( $this, 'extra_actions_meta_box' ), $this->_current_screen->id, 'side', 'high' );
	}



	/**
	 * This meta box holds any extra actions related to Message Templates
	 * For now, this includes Resetting templates to defaults and sending a test email.
	 *
	 * @access  public
	 * @return void
	 */
	public function extra_actions_meta_box() {
		$template_form_fields = array();

		$extra_args = array(
			'msgr' => $this->_message_template_group->messenger(),
			'mt' => $this->_message_template_group->message_type(),
			'GRP_ID' => $this->_message_template_group->GRP_ID()
			);

		$button = $this->get_action_link_or_button( 'reset_to_default', 'reset', $extra_args, 'button-primary reset-default-button' );


		//test button
		//first we need to see if there are any fields
		$fields = $this->_message_template_group->messenger_obj()->get_test_settings_fields();
		if ( !empty( $fields ) ) {
			//yup there be fields
			foreach ( $fields as $field => $config ) {
				$field_id = $this->_message_template_group->messenger() . '_' . $field;
				$existing = $this->_message_template_group->messenger_obj()->get_existing_test_settings();
				$default = isset( $config['default'] ) ? $config['default'] : '';
				$default = isset( $config['value'] ) ? $config['value'] : $default;

				//if type is hidden and the value is empty something may have gone wrong so let's correct with the defaults
				$fix = $config['input'] == 'hidden' && isset($existing[$field]) && empty($existing[$field]) ? $default : '';
				$existing[$field] = isset( $existing[$field] ) && empty( $fix ) ? $existing[$field] : $fix;

				$template_form_fields[$field_id] = array(
					'name' => 'test_settings_fld[' . $field . ']',
					'label' => $config['label'],
					'input' => $config['input'],
					'type' => $config['type'],
					'required' => $config['required'],
					'validation' => $config['validation'],
					'value' => isset( $existing[$field] ) ? $existing[$field] : $default,
					'css_class' => $config['css_class'],
					'options' => isset( $config['options'] ) ? $config['options'] : array(),
					'default' => $default,
					'format' => $config['format']
					);
			}
		}

		$test_settings_fields = !empty( $template_form_fields) ? $this->_generate_admin_form_fields( $template_form_fields, 'string', 'ee_tst_settings_flds' ) : '';

		//print out $test_settings_fields
		if ( !empty( $test_settings_fields ) ) {
			echo $test_settings_fields;
		}

		//and button
		echo '<input type="submit" class="button-primary mtp-test-button alignright" name="test_button" value="' . __('Test Send', 'event_espresso') . '" /><div class="publishing-action alignright resetbutton">' . $button . '</div><div style="clear:both"></div>';
	}


	/**
	 * This just takes care of returning the meta box content for shortcodes (only used on the edit message template page)
	 *
	 * @access public
	 * @return void
	 */
	public function shortcode_meta_box() {
		$shortcodes = $this->_get_shortcodes(array(), FALSE); //just make sure shortcodes property is set
		$messenger = $this->_message_template_group->messenger_obj();
		//now let's set the content depending on the status of the shortcodes array
		if ( empty( $shortcodes ) ) {
			$content = '<p>' . __('There are no valid shortcodes available', 'event_espresso') . '</p>';
			echo $content;
		} else {
			$alt = 0;
			?>
			<div style="float:right; margin-top:10px"><?php echo $this->_get_help_tab_link('message_template_shortcodes'); ?></div><p class="small-text"><?php _e('This is a list of shortcodes that have been organized by content areas where they can be used: ', 'event_espresso' ); ?></p>

			<?php foreach ( $shortcodes as $field => $allshortcodes ) : ?>
				<?php
				//get the field label
				$field_label = $messenger->get_field_label($field);
				?>
				<div class="shortcode-field-table">
					<h3 class="shortcode-field-title"><?php echo $field_label; ?>:</h3>
					<div class="ee-shortcode-table-scroll">
						<table class="widefat ee-shortcode-table">
							<tbody>
					<?php foreach ( $allshortcodes as $code => $label ) : ?>
						<?php $alt_class = !($alt%2) ? 'class="alternate"' : ''; ?>
						<tr <?php echo $alt_class; ?>>
							<td><?php echo $code; ?></td>
						</tr>
					<?php $alt++; endforeach; ?>
							</tbody>
						</table>
					</div>
				</div>
			<?php endforeach; ?>
			</table> <!-- end .ee-shortcode-table -->
			<?php
		}


	}


	/**
	 * used to set the $_shortcodes property for when its needed elsewhere.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_shortcodes() {

		//no need to run this if the property is already set
		if ( !empty($this->_shortcodes ) ) return;

		$this->_shortcodes = $this->_get_shortcodes();
	}





	/**
	 * get's all shortcodes for a given template group. (typically used by _set_shortcodes to set the $_shortcodes property)
	 *
	 * @access  protected
	 * @param  array   $fields include an array of specific field name sthat you want to be used to get the shortcodes for. Defaults to all (for the given context)
	 * @param  boolean $merged Whether to merge all the shortcodes into one list of unique shortcodes
	 * @return array          Shortcodes indexed by fieldname and the an array of shortcode/label pairs OR if merged is true just an array of shortcode/label pairs.
	 */
	protected function _get_shortcodes( $fields = array(), $merged = TRUE ) {
		$this->_set_message_template_group();

		//we need the messenger and message template to retrieve the valid shortcodes array.
		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;
		$context = isset( $this->_req_data['context'] ) ? $this->_req_data['context'] : key( $this->_message_template_group->contexts_config() );

		return !empty($GRP_ID) ? $this->_message_template_group->get_shortcodes( $context, $fields, $merged ) : array();
	}



	/**
	 * This sets the _message_template property (containing the called message_template object)
	 *
	 * @access protected
	 * @return  void
	 */
	protected function _set_message_template_group() {

		if ( !empty( $this->_message_template_group ) )
			return; //get out if this is already set.

		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;

		//let's get the message templates
		$MTP = EEM_Message_Template_Group::instance();

		if ( empty($GRP_ID) )
			$this->_message_template_group = $MTP->create_default_object();
		else
			$this->_message_template_group = $MTP->get_one_by_ID( $GRP_ID );

	}




	/**
	 * sets up a context switcher for edit forms
	 *
	 * @access  protected
	 * @param  EE_Message_Template_Group $template_object the template group object being displayed on the form
	 * @param array $args various things the context switcher needs.
	 * @return void
	 */
	protected function _set_context_switcher(EE_Message_Template_Group $template_group_object, $args) {
		$context_details = $template_group_object->contexts_config();
		$context_label = $template_group_object->context_label();
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
					$context_templates = $template_group_object->context_templates();
					if ( is_array($context_templates) ) :
							foreach ( $context_templates as $context => $template_fields ) :
								$checked = ($context == $args['context']) ? 'selected="selected"' : '';
					?>
					<option value="<?php echo $context; ?>" <?php echo $checked; ?>><?php echo $context_details[$context]['label']; ?></option>
					<?php endforeach; endif; ?>
				</select>
				<?php $button_text = sprintf( __('Switch %s', 'event_espresso'), ucwords($context_label['label']) ); ?>
				<input id="submit-msg-context-switcher-sbmt" class="button-secondary" type="submit" value="<?php echo $button_text; ?>">
			</form>
			<?php echo $args['extra']; ?>
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
		if ( is_array($this->_req_data['MTP_template_fields'][$index]['content'] ) ) {
			foreach ( $this->_req_data['MTP_template_fields'][$index]['content'] as $field => $value ) {
				$this->_req_data['MTP_template_fields'][$index]['content'][$field] = $value;
			}
		} else {
			$this->_req_data['MTP_template_fields'][$index]['content'] = $this->_req_data['MTP_template_fields'][$index]['content'];
		}


		$set_column_values = array(
			'MTP_ID' => absint($this->_req_data['MTP_template_fields'][$index]['MTP_ID']),
			'GRP_ID' => absint($this->_req_data['GRP_ID']),
			'MTP_user_id' => absint($this->_req_data['MTP_user_id']),
			'MTP_messenger'	=> strtolower($this->_req_data['MTP_messenger']),
			'MTP_message_type' => strtolower($this->_req_data['MTP_message_type']),
			'MTP_template_field' => strtolower($this->_req_data['MTP_template_fields'][$index]['name']),
			'MTP_context' => strtolower($this->_req_data['MTP_context']),
			'MTP_content' => $this->_req_data['MTP_template_fields'][$index]['content'],
			'MTP_is_global' => isset($this->_req_data['MTP_is_global']) ? absint($this->_req_data['MTP_is_global']) : 0,
			'MTP_is_override' => isset($this->_req_data['MTP_is_override']) ? absint($this->_req_data['MTP_is_override']) : 0,
			'MTP_deleted' => absint($this->_req_data['MTP_deleted']),
			'MTP_is_active' => absint($this->_req_data['MTP_is_active'])
		);


		return $set_column_values;
	}






	protected function _insert_or_update_message_template($new = FALSE ) {

		do_action ( 'AHEE_log', __FILE__, __FUNCTION__, '');
		$success = 0;
		$override = FALSE;

		//setup notices description
		$messenger = !empty($this->_req_data['MTP_messenger']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_messenger'] ) ) : false;
		$message_type = !empty($this->_req_data['MTP_message_type']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_message_type'] ) ) : false;
		$context = !empty($this->_req_data['MTP_context']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_context'] ) ) : false;

		$item_desc = $messenger ? $messenger . ' ' . $message_type . ' ' . $context . ' ' : '';
		$item_desc .= 'Message Template';
		$query_args = array();
		$validates = '';

		//if this is "new" then we need to generate the default contexts for the selected messenger/message_type for user to edit.
		if ( $new ) {
			$GRP_ID = !empty( $this->_req_data['GRP_ID'] ) ? $this->_req_data['GRP_ID'] : 0;
			if ( $edit_array = $this->_generate_new_templates($messenger, $message_type, $GRP_ID ) ) {
				if ( empty($edit_array) ) {
					$success = 0;
				} else {
					$success = 1;
					$edit_array = $edit_array[0];
					$query_args = array(
						'id' => $edit_array['GRP_ID'],
						'context' => $edit_array['MTP_context'],
						'action' => 'edit_message_template'
						);
				}
			}
			$action_desc = 'created';
		} else {
			$MTPG = EEM_Message_Template_Group::instance();
			$MTP = EEM_Message_Template::instance();


			//run update for each template field in displayed context
			if ( !isset($this->_req_data['MTP_template_fields']) && empty($this->_req_data['MTP_template_fields'] ) ) {
				EE_Error::add_error( __('There was a problem saving the template fields from the form because I didn\'t receive any actual template field data.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				$success = 0;
				$action_desc = '';

			} else {
				//first validate all fields!
				$validates = $MTPG->validate($this->_req_data['MTP_template_fields'], $this->_req_data['MTP_context'],  $this->_req_data['MTP_messenger'], $this->_req_data['MTP_message_type']);

				//if $validate returned error messages (i.e. is_array()) then we need to process them and setup an appropriate response. HMM, dang this isn't correct, $validates will ALWAYS be an array.  WE need to make sure there is no actual error messages in validates.
				if ( is_array($validates) && !empty($validates) ) {
					//add the transient so when the form loads we know which fields to highlight
					$this->_add_transient( 'edit_message_template', $validates );

					$success = 0;
					$action_desc ='';

					//setup notices
					foreach ( $validates as $field => $error ) {
						if ( isset($error['msg'] ) )
							EE_Error::add_error( $error['msg'], __FILE__, __FUNCTION__, __LINE__ );
					}

				} else {
					foreach ( $this->_req_data['MTP_template_fields'] as $template_field => $content ) {
						$set_column_values = $this->_set_message_template_column_values($template_field);

						$where_cols_n_values = array( 'MTP_ID' => $this->_req_data['MTP_template_fields'][$template_field]['MTP_ID']);

						$message_template_fields = array(
							'GRP_ID' => $set_column_values['GRP_ID'],
							'MTP_template_field' => $set_column_values['MTP_template_field'],
							'MTP_context' => $set_column_values['MTP_context'],
							'MTP_content' => $set_column_values['MTP_content']
							);
						if ( $updated = $MTP->update( $message_template_fields, array( $where_cols_n_values ) ) ) {
							if ( $updated === FALSE ) {
								$msg = sprintf( __('%s field was NOT updated for some reason', 'event_espresso'), $template_field );
								EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__ );
							} else {
								$success = 1;
							}
						}
						$action_desc = 'updated';
					}

					//we can use the last set_column_values for the MTPG update (because its the same for all of these specific MTPs)
					$mtpg_fields = array(
						'MTP_user_id' => $set_column_values['MTP_user_id'],
						'MTP_messenger' => $set_column_values['MTP_messenger'],
						'MTP_message_type' => $set_column_values['MTP_message_type'],
						'MTP_is_global' => $set_column_values['MTP_is_global'],
						'MTP_is_override' => $set_column_values['MTP_is_override'],
						'MTP_deleted' => $set_column_values['MTP_deleted'],
						'MTP_is_active' => $set_column_values['MTP_is_active'],
						'MTP_name' => !empty( $this->_req_data['ee_msg_non_global_fields']['MTP_name'] ) ? $this->_req_data['ee_msg_non_global_fields']['MTP_name'] : '',
						'MTP_description' => !empty( $this->_req_data['ee_msg_non_global_fields']['MTP_description'] ) ? $this->_req_data['ee_msg_non_global_fields']['MTP_description'] : ''
						);

					$mtpg_where = array('GRP_ID' => $set_column_values['GRP_ID'] );
					$updated = $MTPG->update( $mtpg_fields, array($mtpg_where) );

					if ( $updated === FALSE ) {
						$msg = sprintf( __('The Message Template Group (%d) was NOT updated for some reason', 'event_espresso'), $set_column_values['GRP_ID'] );
						EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__ );
					} else {
						$success = 1;
					}
				}
			}

		}

		//we return things differently if doing ajax
		if ( defined('DOING_AJAX') && DOING_AJAX ) {
			$this->_template_args['success'] = $success;
			$this->_template_args['error'] = ! $success ? TRUE : FALSE;
			$this->_template_args['content'] = '';
			$this->_template_args['data'] = array(
				'grpID' => $edit_array['GRP_ID'],
				'templateName' => $edit_array['template_name']
				);
			if ( $success ) {
				EE_Error::overwrite_success();
				EE_Error::add_success( __('The new template has been created and automatically selected for this event.  You can edit the new template by clicking the edit button.  Note before this template is assigned to this event, the event must be saved.', 'event_espresso') );
			}

			$this->_return_json();
		}


		//was a test send triggered?
		if ( isset( $this->_req_data['test_button'] ) ) {
			EE_Error::overwrite_success();
			$this->_do_test_send( $this->_req_data['MTP_context'],  $this->_req_data['MTP_messenger'], $this->_req_data['MTP_message_type'] );
			$override = TRUE;
		}

		if ( empty( $query_args ) ) {
			$query_args = array(
				'id' => $this->_req_data['GRP_ID'],
				'context' => $this->_req_data['MTP_context'],
				'action' => 'edit_message_template'
				);
		}

		$this->_redirect_after_action( $success, $item_desc, $action_desc, $query_args, $override );
	}




	/**
	 * processes a test send request to do an actual messenger delivery test for the given message template being tested
	 * @param  string $context      what context being tested
	 * @param  string $messenger  	messenger being tested
	 * @param  string $message_type message type being tested
	 * @return void
	 */
	protected function _do_test_send( $context, $messenger, $message_type ) {
		//set things up for preview
		$this->_req_data['messenger'] = $messenger;
		$this->_req_data['message_type'] = $message_type;
		$this->_req_data['context'] = $context;
		$this->_req_data['msg_id'] = isset($this->_req_data['GRP_ID'] ) ? $this->_req_data['GRP_ID'] : '';

		//let's save any existing fields that might be required by the messenger
		if ( isset( $this->_req_data['test_settings_fld'] ) ) {
			$this->_active_messengers[$messenger]['obj']->set_existing_test_settings( $this->_req_data['test_settings_fld'] );
		}

		$success = $this->_preview_message(TRUE);

		if ( $success ) {
			EE_Error::add_success( __('Test message sent', 'event_espresso') );
		} else {
			EE_Error::add_error( __('The test message was not sent', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
	}






	/**
	 * _generate_new_templates
	 * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will automatically create the defaults for the event.  The user would then be redirected to edit the default context for the event.
	 *
	 * @access protected
	 * @param  string  $messenger the messenger we are generating templates for
	 * @param array $message_types array of message types that the templates are generated for.
	 * @param int $GRP_ID If this is a custom template being generated then a GRP_ID needs to be included to indicate the message_template_group being used as the base.
	 * @return array|error_object array of data required for the redirect to the correct edit page or error object if encountering problems.
	 */
	protected function _generate_new_templates($messenger, $message_types, $GRP_ID = 0, $global = FALSE) {

		EE_Registry::instance()->load_helper( 'MSG_Template' );

		return EEH_MSG_Template::generate_new_templates($messenger, $message_types, $GRP_ID,  $global);

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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$MTP = EEM_Message_Template_Group::instance();

		$success = 1;

		//incoming GRP_IDs
		if ( $all ) {
			//Checkboxes
			if ( !empty( $this->_req_data['checkbox'] ) && is_array($this->_req_data['checkbox'] ) ) {
				//if array has more than one element then success message should be plural.
				//todo: what about nonce?
				$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

				//cycle through checkboxes
				while ( list( $GRP_ID, $value ) = each ($this->_req_data['checkbox']) ) {
					$trashed_or_restored = $trash ? $MTP->delete_by_ID( $GRP_ID ) : $MTP->restore_by_ID( $GRP_ID );
					if ( ! $trashed_or_restored ) {
						$success = 0;
					}
				}
			} else {
				//grab single GRP_ID and handle
				$GRP_ID = isset( $this->_req_data['id'] ) ? absint($this->_req_data['id']) : 0;
				if ( ! empty( $GRP_ID ) ) {
					$trashed_or_restored = $trash ? $MTP->delete_by_ID( $GRP_ID ) : $MTP->restore_by_ID( $GRP_ID );
					if ( ! $trashed_or_restored ) {
						$success = 0;
					}
				} else {
					$success = 0;
				}
			}

		}

		$action_desc = $trash ? __('moved to the trash', 'event_espresso') : __('restored', 'event_espresso');

		$action_desc = !empty( $this->_req_data['template_switch'] ) ? __('switched') : $action_desc;

		$item_desc = $all ? _n('Message Template Group', 'Message Template Groups', $success, 'event_espresso') : _n('Message Template Context', 'Message Template Contexts', $success, 'event_espresso');

		$item_desc = !empty( $this->_req_data['template_switch'] ) ? _n('template', 'templates', $success, 'event_espresso') : $item_desc;

		$this->_redirect_after_action( $success, $item_desc, $action_desc, array() );

	}







	/**
	 * [_delete_message_template]
	 * NOTE: this handles not only the deletion of the groups but also all the templates belonging to that group.
	 * @return void
	 */
	protected function _delete_message_template() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$success = 1;

		//checkboxes
		if ( !empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

			//cycle through bulk action checkboxes
			while ( list( $GRP_ID, $value ) = each($this->_req_data['checkbox'] ) ) {
				$success = $this->_delete_mtp_permanently( $GRP_ID );
			}
		} else {
			//grab single grp_id and delete
			$GRP_ID = absint($this->_req_data['id'] );
			$success = $this->_delete_mtp_permanently( $GRP_ID );
		}

		$this->_redirect_after_action( $success, 'Message Templates', 'deleted', array() );

	}




	/**
	 * helper for permanently deleting a mtP group and all related message_templates
	 * @param  int    $GRP_ID The group being deleted
	 * @param  bool $include_group whether to delete the Message Template Group as well.
	 * @return success        boolean to indicate the success of the deletes or not.
	 */
	private function _delete_mtp_permanently( $GRP_ID, $include_group = TRUE ) {
		$success = 1;
		$MTPG = EEM_Message_Template_Group::instance();
		//first let's GET this group
		$MTG = $MTPG->get_one_by_ID( $GRP_ID );
		//then delete permanently all the related Message Templates
		$deleted = $MTG->delete_related_permanently( 'Message_Template' );

		if ( $deleted === 0 )
			$success = 0;

		//now delete permanently this particular group

		if ( $include_group && ! $MTG->delete_permanently() ) {
			$success = 0;
		}
		return $success;
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
	 * Used for setting up messenger/message type activation.  This loads up the initial view.  The rest is handled by ajax and other routes.
	 * @return void
	 */
	protected function _settings() {

		EE_Registry::instance()->load_helper( 'Tabbed_Content' );

		$this->_set_m_mt_settings();

		$selected_messenger = isset( $this->_req_data['selected_messenger'] ) ? $this->_req_data['selected_messenger'] : 'email';

		//let's setup the messenger tabs
		$this->_template_args['admin_page_header'] = EEH_Tabbed_Content::tab_text_links( $this->_m_mt_settings['messenger_tabs'], 'messenger_links', '|', $selected_messenger );
		$this->_template_args['before_admin_page_content'] = '<div class="ui-widget ui-helper-clearfix">';
		$this->_template_args['after_admin_page_content'] = '</div><!-- end .ui-widget -->';

		$this->display_admin_page_with_sidebar();

	}




	/**
	 * This sets the $_m_mt_settings property for when needed (used on the Messages settings page)
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_m_mt_settings() {
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
	protected function _message_type_settings_content( $message_type, $messenger, $active = FALSE ) {
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
		$content = EEH_Template::display_template( $template, $settings_template_args, TRUE );
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
			add_meta_box( 'espresso_' . $msgr . '_settings', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );'), $this->_current_screen_id, 'normal', 'high', $callback_args );
		}

		//register message type metaboxes
		$mt_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_messenger_meta_box.template.php';
		foreach ( $mt_boxes as $box => $label ) {
			$callback_args = array( 'template_path' => $mt_template_path, 'template_args' => $mt_template_args[$box] );
			$mt = str_replace( '_i_box', '', $box );
			add_meta_box( 'espresso_' . $msgr . '_inactive_mts', $label, create_function('$post, $metabox', 'echo EEH_Template::display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );'), $this->_current_screen_id, 'side', 'high', $callback_args );
		}

	}


	/**
	 * this prepares the messenger tabs that can be dragged in and out of messenger boxes to activate/deactivate
	 * @param  array $tab_array  This is an array of message type tab details used to generate the tabs
	 * @return string            html formatted tabs
	 */
	protected function _get_mt_tabs( $tab_array ) {
		$tab_array = (array) $tab_array;
		$template = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_mt_settings_tab_item.template.php';
		$tabs = '';

		foreach ( $tab_array as $tab ) {
			$tabs .=  EEH_Template::display_template( $template, $tab, TRUE );
		}

		return $tabs;
	}




	/**
	 * This prepares the content of the messenger meta box admin settings
	 * @param  object $messenger The messenger we're setting up content for
	 * @return string            html formatted content
	 */
	protected function _get_messenger_box_content( $messenger ) {

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


		$settings_template_args['show_hide_edit_form'] = isset( $this->_active_messengers[$messenger->name] ) ? $settings_template_args['show_hide_edit_form'] : ' hidden';

		$settings_template_args['show_hide_edit_form'] = empty( $settings_template_args['template_form_fields'] ) ? ' hidden' : $settings_template_args['show_hide_edit_form'];


		$settings_template_args['on_off_action'] = $active ? 'messenger-off' : 'messenger-on';
		$settings_template_args['nonce'] = wp_create_nonce('activate_' . $messenger->name . '_toggle_nonce');
		$settings_template_args['on_off_status'] = $active ? 'active' : 'inactive';
		$template = EE_MSG_TEMPLATE_PATH . 'ee_msg_m_settings_content.template.php';
		$content = EEH_Template::display_template( $template, $settings_template_args, TRUE);
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
	protected function _activate_messenger($messenger, $deactivate = FALSE, $message_type = FALSE) {
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
			EEH_MSG_Template::update_active_messengers_in_db( $this->_active_messengers );


			//generate new templates (if necessary)
			$templates = $this->_generate_new_templates( $messenger, $default_types, 0, TRUE );

			EE_Error::overwrite_success();

			//if generation failed then we need to remove the active messenger.
			if ( !$templates ) {
				unset($this->_active_messengers[$messenger]);
				EEH_MSG_Template::update_active_messengers_in_db( $this->_active_messengers );
			} else {
				//all is good let's do a success message
				$success_msg = $message_type ? sprintf( __('%s message type has been successfully activated with the %s messenger', 'event_espresso'),ucwords($this->_m_mt_settings['message_type_tabs'][$messenger]['inactive'][$message_type]['obj']->label['singular']), ucwords( $this->_active_messengers[$messenger]['obj']->label['singular'] ) ) :sprintf( __('%s messenger has been successfully activated', 'event_espresso'), ucwords( $this->_active_messengers[$messenger]['obj']->label['singular'] ) );
			}

			$this->_template_args['data']['active_mts'] = $default_types;

		} else {
			//we're deactivating

			$MTP = EEM_Message_Template_Group::instance();


			//okay let's update the message templates that match this messenger so that they are deactivated in the database as well.
			$update_array = array(
				'MTP_messenger' => $messenger);

			if ( $message_type ) {
				$update_array['MTP_message_type'] = $message_type;
			}

			$success = $MTP->update( array( 'MTP_is_active' => 0 ), array($update_array) );

			$messenger_obj = $this->_active_messengers[$messenger]['obj'];

			//if this is a message type deactivation then we're only unsetting the message type otherwise unset the messenger
			if ( $message_type ) {
				unset( $this->_active_messengers[$messenger]['settings'][$messenger . '-message_types'][$message_type] );
			} else {
				unset( $this->_active_messengers[$messenger] );
			}

			EEH_MSG_Template::update_active_messengers_in_db( $this->_active_messengers );

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
			EE_Error::add_error( __('Require message type or messenger to send an updated form'), __FILE__, __FUNCTION__, __LINE__ );
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
		$success = EEH_MSG_Template::update_active_messengers_in_db( $this->_active_messengers );

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

}
