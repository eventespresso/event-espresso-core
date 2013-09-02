<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
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
 * Events_Admin_Page
 *
 * This contains the logic for setting up the Events related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 *
 * @package		Events_Admin_Page
 * @subpackage	includes/core/admin/Events_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Events_Admin_Page extends EE_Admin_Page_CPT {

	/**
	 * _event
	 * This will hold the event object for event_details screen.
	 *
	 * @access protected
	 * @var object
	 */
	protected $_event;


	/**
	 * This will hold the category object for category_details screen.
	 * @var object
	 */
	protected $_category;


	/**
	 * This will hold the event model instance
	 * @var object
	 */
	protected $_event_model;


	protected function _init_page_props() {
		require_once( EE_MODELS . 'EEM_Event.model.php' );
		$this->page_slug = EVENTS_PG_SLUG;
		$this->page_label = EVENTS_LABEL;
		$this->_admin_base_url = EVENTS_ADMIN_URL;
		$this->_cpt_model_name = 'EEM_Event';
		$this->_event_model = EEM_Event::instance();
	}

	protected function _ajax_hooks() {
		//todo: all hooks for events ajax goes in here.
	}

	protected function _define_page_props() {
		$this->_admin_page_title = EVENTS_LABEL;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Event', 'event_espresso'),
				'edit' => __('Edit Event', 'event_espresso'),
				'delete' => __('Delete Event', 'event_espresso'),
				'add_category' => __('Add New Category', 'event_espresso'),
				'edit_category' => __('Edit Category', 'event_espresso'),
				'delete_category' => __('Delete Category', 'event_espresso')
			),
			'editor_title' => __('Enter event title here', 'event_espresso'),
			'publishbox' => array( 
				'create_new' => __('Save New Event', 'event_espresso'),
				'edit' => __('Update Event', 'event_espresso'),
				'add_category' => __('Save New Category', 'event_espresso'),
				'edit_category' => __('Update Category', 'event_espresso')
				)
		);
	}

	protected function _set_page_routes() {
		//load formatter helper
		require_once EE_HELPERS . 'EE_Formatter.helper.php';

		//load field generator helper
		require_once EE_HELPERS . 'EE_Form_Fields.helper.php';

		//the model is used a lot so let's just require it.
		require_once( EE_MODELS . $this->_cpt_model_name . '.model.php' );

		$this->_page_routes = array(
			'default' => '_events_overview_list_table',
			'copy_event' => array(
				'func' => '_copy_events',
				'noheader' => true
			),
			'trash_event' => array(
				'func' => '_trash_or_restore_event',
				'args' => array('event_status' => 'trash'),
				'noheader' => true
			),
			'trash_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array('event_status' => 'trash'),
				'noheader' => true
			),
			'restore_event' => array(
				'func' => '_trash_or_restore_event',
				'args' => array('event_status' => 'draft'),
				'noheader' => true
			),
			'restore_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array('event_status' => 'draft'),
				'noheader' => true
			),
			'delete_event' => array(
				'func' => '_delete_event',
				'noheader' => true
			),
			'delete_events' => array(
				'func' => '_delete_events',
				'noheader' => true
			),
			'view_report' => '_view_report',
			'export_events' => array(
				'func' => '_events_export',
				'noheader' => true
			),
			'import_page'=>'_import_page',
			'import' => array(
				'func'=>'_import_events',
				'noheader'=>TRUE,
				),
			'import_events' => array(
				'func'=>'_import_events',
				'noheader'=>TRUE,
				),
			'default_event_settings' => '_default_event_settings',
			'update_default_event_settings' => array(
				'func' => '_update_default_event_settings',
				'noheader' => TRUE,
				),
			//event category tab related
			'add_category' => array(
				'func' => '_category_details',
				'args' => array('add'),
				),
			'edit_category' => array(
				'func' => '_category_details',
				'args' => array('edit')
				),
			'delete_categories' => array(
				'func' => '_delete_categories', 
				'noheader' => TRUE 
				),

			'delete_category' => array(
				'func' => '_delete_categories', 
				'noheader' => TRUE
				),

			'insert_category' => array(
				'func' => '_insert_or_update_category',
				'args' => array('new_category' => TRUE),
				'noheader' => TRUE
				),

			'update_category' => array(
				'func' => '_insert_or_update_category',
				'args' => array('new_category' => FALSE),
				'noheader' => TRUE
				),
			'export_categories' => array(
				'func' => '_categories_export',
				'noheader' => TRUE
				),
			'import_categories' => '_import_categories',
			'category_list' => array(
				'func' => '_category_list_table'
				)
		);
	}

	protected function _set_page_config() {

		$default_espresso_boxes = $this->_default_espresso_metaboxes;
		$default_espresso_boxes[] = '_espresso_sponsors_post_box';

		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
				),
				'list_table' => 'Events_Admin_List_Table'
			),
			'import_events' => array(
				'nav' => array(
					'label' => __('Import', 'event_esprsso'),
					'order' => 30
				),
				'metaboxes' => $default_espresso_boxes
			),
			'create_new' => array(
				'nav' => array(
					'label' => __('Add Event', 'event_espresso'),
					'order' => 5,
					'persistent' => false
				),
				'metaboxes' => array('_register_event_editor_meta_boxes'),
				'help_tabs' => array(
					'event_date_info' => array(
						'title' => __('Event Date', 'event_espresso'),
						'callback' => 'event_date_info_help_tab'
					),
					'ticket_options_info' => array(
						'title' => __('Ticket Options', 'event_espresso'),
						'callback' => 'ticket_options_info_help_tab'
					)
				)
			),
			'edit' => array(
				'nav' => array(
					'label' => __('Edit Event', 'event_espresso'),
					'order' => 5,
					'persistent' => false,
					'url' => isset($this->_req_data['post']) ? add_query_arg(array('post' => $this->_req_data['post']), $this->_current_page_view_url) : $this->_admin_base_url
				),
				'metaboxes' => array('_register_event_editor_meta_boxes'),
				'help_tabs' => array(
					'event_date_info' => array(
						'title' => __('Event Date', 'event_espresso'),
						'callback' => 'event_date_info_help_tab'
					),
					'ticket_options_info' => array(
						'title' => __('Ticket Options', 'event_espresso'),
						'callback' => 'ticket_options_info_help_tab'
					)
				)
			),
			'default_event_settings' => array(
				'nav' => array(
					'label' => __('Default Settings', 'event_esprsso'),
					'order' => 40
				),
				'metaboxes' => array_merge($default_espresso_boxes, array('_publish_post_box')),
				'labels' => array(
					'publishbox' => __('Update Settings', 'event_espresso')
				),
				'help_tabs' => array(
					'events_expire_on_reg_end_date_help_tab' => array(
						'title' => __('Events Expire on Reg End Date', 'event_espresso'),
						'callback' => 'events_expire_on_reg_end_date_help_tab'
					),
					'default_payment_status_help_tab' => array(
						'title' => __('Default Payment Status', 'event_espresso'),
						'callback' => 'default_payment_status_help_tab'
					)
				)
			),
			//event category stuff
			'add_category' => array(
				'nav' => array(
					'label' => __('Add Category', 'event_espresso'),
					'order' => 15,
					'persistent' => false),
				'help_tabs' => array(
					'unique_id_help_tab' => array(
						'title' => __('Unique ID', 'event_espresso'),
						'callback' => 'unique_id_help_tab'
						)
					)
				),
			'edit_category' => array(
				'nav' => array(
					'label' => __('Edit Category', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['EVT_CAT_ID']) ? add_query_arg(array('EVT_CAT_ID' => $this->_req_data['EVT_CAT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'help_tabs' => array(
					'unique_id_help_tab' => array(
						'title' => __('Unique ID', 'event_espresso'),
						'callback' => 'unique_id_help_tab'
						)
					)
				),
			'category_list' => array(
				'nav' => array(
					'label' => __('Categories', 'event_espresso'),
					'order' => 20
					),
				'list_table' => 'Event_Categories_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				),
		);
	}

	protected function _add_screen_options() {
		//todo
	}

	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}

	protected function _add_feature_pointers() {
		//todo
	}

	/**
	 * 		default_event_settings_help_tab
	 * 		@access public
	 * 		@return void
	 */
	public function default_event_settings_help_tab($tab_name) {
		require_once( EVENTS_TEMPLATE_PATH . 'default_event_settings_help_tab.template.php' );
		$template = call_user_func($tab_name . '_html');
		espresso_display_template($template, array());
	}

	public function events_expire_on_reg_end_date_help_tab() {
		$this->default_event_settings_help_tab(__FUNCTION__);
	}

	public function default_payment_status_help_tab() {
		$this->default_event_settings_help_tab(__FUNCTION__);
	}

	/**
	 * event edit help tabs
	 * @access public
	 * @return void
	 */
	public function event_edit_help_tab($tab_name) {
		require_once EVENTS_TEMPLATE_PATH . 'event_edit_help_tab.template.php';
		$template = call_user_func($tab_name . '_html');
		espresso_display_template($template, array());
	}

	public function event_date_info_help_tab() {
		$this->event_edit_help_tab(__FUNCTION__);
	}

	public function ticket_options_info_help_tab() {
		$this->event_edit_help_tab(__FUNCTION__);
	}

	public function load_scripts_styles() {

		wp_register_style('events-admin-css', EVENTS_ASSETS_URL . 'events-admin-page.css', array(), EVENT_ESPRESSO_VERSION);
		wp_register_style('ee-cat-admin', EVENTS_ASSETS_URL . 'ee-cat-admin.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('events-admin-css');
		wp_enqueue_style('ee-cat-admin');
		//todo note: we also need to load_scripts_styles per view (i.e. default/view_report/event_details
		//registers for all views
		//scripts
		wp_register_script('event_editor_js', EVENTS_ASSETS_URL . 'event_editor.js', array('ee_admin_js', 'jquery-ui-slider', 'jquery-ui-timepicker-addon'), EVENT_ESPRESSO_VERSION, TRUE);
	}

	/**
	 * enqueuing scripts and styles specific to this view
	 * @return void
	 */
	public function load_scripts_styles_create_new() {
		$this->load_scripts_styles_edit();
	}

	/**
	 * enqueuing scripts and styles specific to this view
	 * @return void 
	 */
	public function load_scripts_styles_edit() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

		//scripts
		wp_register_script('event_editor_js', EVENTS_ASSETS_URL . 'event_editor.js', array('ee_admin_js', 'jquery-ui-slider', 'jquery-ui-timepicker-addon', 'jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_enqueue_script('event_editor_js');

		;
		EE_Registry::$i18n_js_strings['image_confirm'] = __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso');
		wp_localize_script('event_editor_js', 'eei18n', EE_Registry::$i18n_js_strings);
	}



	public function load_scripts_styles_add_category() {
		$this->load_scripts_styles_edit_category();
	}





	public function load_scripts_styles_edit_category() {
		//styles
		//wp_enqueue_style('jquery-ui-style');

		//scripts
		wp_enqueue_script( 'ee_cat_admin_js', EVENTS_ASSETS_URL . 'ee-cat-admin.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE );
		
		;
		EE_Registry::$i18n_js_strings['add_cat_name'] = __('Category Name is a required field. Please enter a value in order to continue.', 'event_espresso');
		wp_localize_script( 'ee_cat_admin_js', 'eei18n', EE_Registry::$i18n_js_strings );

	}



	protected function _set_list_table_views_category_list() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_categories' => __('Delete Permanently', 'event_espresso'),
					'export_categories' => __('Export Categories', 'event_espresso'),
					)
				)
		);
	}



	//nothing needed for events with these methods.
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}




	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('View All Events', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'export_events' => __('Export Events', 'event_espresso'),
					'trash_events' => __('Move to Trash', 'event_espresso'),
//					'export_payments' => __('Export Payments', 'event_espresso')
				)
			),
			'today' => array(
				'slug' => 'today',
				'label' => __('Today', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'export_events' => __('Export Events', 'event_espresso'),
					'trash_events' => __('Move to Trash', 'event_espresso'),
//					'export_payments' => __('Export Payments', 'event_espresso')
				)
			),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'export_events' => __('Export Events', 'event_espresso'),
					'trash_events' => __('Move to Trash', 'event_espresso'),
//					'export_payments' => __('Export Payments', 'event_espresso')
				)
			),
			'draft' => array(
				'slug' => 'draft',
				'label' => __('Draft', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'export_events' => __('Export Events', 'event_espresso'),
					'trash_events' => __('Move to Trash', 'event_espresso'),
					)
			),
			'trash' => array(
				'slug' => 'trash',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'export_events' => __('Export Events', 'event_espresso'),
					'restore_events' => __('Restore from Trash', 'event_espresso'),
					'delete_events' => __('Delete Permanently', 'event_espresso'),
					)
				)
		);
	}



	protected function _event_legend_items() {
		$items = array(
			'view_details' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/magnifier.png',
				'desc' => __('View Event', 'event_espresso')
			),
			'edit_event' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/calendar_edit.png',
				'desc' => __('Edit Event Details', 'event_espresso')
			),
			'view_attendees' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/group.png',
				'desc' => __('View Registrations for Event', 'event_espresso')
			),
			'event_shortcode' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/tag.png',
				'desc' => __('Get ShortURL/Shortcode for Event', 'event_espresso')
			),
			'excel_export' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/excel_icon.png',
				'desc' => __('Export Event details to excel', 'event_espresso')
			),
			'csv_export' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/csv_icon_sm.gif',
				'desc' => __('Export Event details to csv', 'event_espresso')
			)
		);
		return apply_filters('FHEE_event_legend_items', $items);
	}




	
	/**
	 * Adds extra buttons to the WP CPT permalink field row. 
	 *
	 * Method is called from parent and is hooked into the wp 'get_sample_permalink_html' filter.
	 * @param  string $return    the current html
	 * @param  int    $id        the post id for the page
	 * @param  string $new_title What the title is
	 * @param  string $new_slug  what the slug is
	 * @return string            The new html string for the permalink area
	 */
	public function extra_permalink_field_buttons( $return, $id, $new_title, $new_slug ) {
		//make sure this is only when editing
		if ( !empty( $id ) ) {
			$post = get_post( $id );
			$return .= '<a class="button button-small" onclick="prompt(\'Shortcode:\', jQuery(\'#shortcode\').val()); return false;" href="#"  tabindex="-1">' . __('Shortcode', 'event_espresso') . '</a> ';
			$return .= '<input id="shortcode" type="hidden" value="[SINGLEEVENT single_event_id=\'' . $post->post_name . '\']"">';
		}
		return $return;
	}




	/**
	 * _events_overview_list_table
	 * This contains the logic for showing the events_overview list
	 *
	 * @access protected
	 * @return string html for generated table
	 */
	protected function _events_overview_list_table() {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$this->_template_args['after_list_table'] = $this->_display_legend($this->_event_legend_items());
		$this->_admin_page_title .= $this->get_action_link_or_button('create_new', 'add', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_no_sidebar();
	}


	/**
	 * this allows for extra misc actions in the default WP publish box
	 * @return string html to add
	 */
	public function extra_misc_actions_publish_box() {
		$this->_generate_publish_box_extra_content();
	}



	
	protected function _insert_update_cpt_item( $post_id, $post ) {

		$wheres = array( $this->_event_model->primary_key_name() => $post_id );

		$event_values = array(
			'EVT_display_desc' => isset( $this->_req_data['display_desc'] ) ? 1 : 0,
			'EVT_display_reg_form' => isset( $this->_req_data['display_reg_form'] ) ? 1 : 0,
			'EVT_allow_multiple' => isset( $this->_req_data['allow_multiple'] ) ? 1 : 0,
			'EVT_additional_limit' => !empty( $this->_req_data['additional_limit'] ) ? $this->_req_data['additional_limit'] : NULL,
			'EVT_require_pre_approval' => isset( $this->_req_data['require_pre_approval'] ) ? 1 : 0,
			'EVT_member_only' => isset( $this->_req_data['member_only'] ) ? 1 : 0,
			'EVT_allow_overflow' => isset( $this->_req_data['EVT_allow_overflow'] ) ? 1 : 0,
			'EVT_timezone_string' => !empty( $this->_req_data['timezone_string'] ) ? $this->_req_data['timezone_string'] : NULL,
			'EVT_external_URL' => !empty( $this->_req_data['externalURL'] ) ? $this->_req_data['externalURL'] : NULL,
			'EVT_phone' => !empty( $this->_req_data['event_phone'] ) ? $this->_req_data['event_phone'] : NULL
			);

		//update event
		$success = $this->_event_model->update( $event_values, array($wheres) );


		//get event_object for other metaboxes... though it would seem to make sense to just use $this->_event_model->get_one_by_ID( $post_id ).. i have to setup where conditions to override the filters in the model that filter out autodraft and inherit statuses so we GET the inherit id!
		$get_one_where = array( $this->_event_model->primary_key_name() => $post_id, 'status' => $post->post_status );
		$event = $this->_event_model->get_one( array($get_one_where) );


		//the following are default callbacks for event attachment updates that can be overridden by caffeinated functionality and/or addons.
		$event_update_callbacks = apply_filters( 'FHEE_event_editor_update', array( array($this, '_default_venue_update' ), array( $this, '_default_tickets_update') ) );

		$att_success = TRUE;

		foreach ( $event_update_callbacks as $e_callback ) {
			$_succ = call_user_func_array( $e_callback, array( $event,  $this->_req_data ) );
			$att_success = !$att_success ? $att_success : $_succ; //if ANY of these updates fail then we want the appropriate global error message
		}

		//any errors?
		if ( $success && !$att_success ) {
			EE_Error::add_error( __('Event Details saved successfully but something went wrong with saving attachments.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		} else if ( $success === FALSE ) {
			EE_Error::add_error( __('Event Details did not save successfully.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}
	}




	/**
	 * @see parent::restore_item()
	 */
	protected function _restore_cpt_item( $post_id, $revision_id ) {
		//copy existing event meta to new post
		$post_evt = $this->_event_model->get_one_by_ID($post_id);
		
		//meta revision restore
		$post_evt->restore_revision($revision_id);

		//related objs restore
		$post_evt->restore_revision($revision_id, array( 'Venue', 'Datetime', 'Price' ) );
	}
	


	
	/**
	 * Attach the venue to the Event
	 * @param  object $evtobj Event Object to add the venue to
	 * @param  array  $data   The request data from the form
	 * @return bool           Success or fail.
	 */
	protected function _default_venue_update( $evtobj, $data ) {
		require_once( EE_MODELS . 'EEM_Venue.model.php' );
		$venue_model = $this->EE->load_model('Venue');
		$rows_affected = NULL;
		$venue_id = !empty( $data['venue_id'] ) ? $data['venue_id'] : NULL;

		$venue_array = array(
				'VNU_wp_user' => $evtobj->get('EVT_wp_user'), 
				'VNU_name' => !empty( $data['venue_title'] ) ? $data['venue_title'] : NULL,
				'VNU_desc' => !empty( $data['venue_description'] ) ? $data['venue_description'] : NULL,
				'VNU_identifier' => !empty( $data['venue_identifier'] ) ? $data['venue_identifier'] : NULL,
				'VNU_short_desc' => !empty( $data['venue_short_description'] ) ? $data['venue_short_description'] : NULL,
				'VNU_address' => !empty( $data['address'] ) ? $data['address'] : NULL,
				'VNU_address2' => !empty( $data['address2'] ) ? $data['address2'] : NULL,
				'VNU_city' => !empty( $data['city'] ) ? $data['city'] : NULL,
				'STA_ID' => !empty( $data['state'] ) ? $data['state'] : NULL,
				'CNT_ISO' => !empty( $data['countries'] ) ? $data['countries'] : NULL,
				'VNU_zip' => !empty( $data['zip'] ) ? $data['zip'] : NULL,
				'VNU_phone' => !empty( $data['venue_phone'] ) ? $data['venue_phone'] : NULL,
				'VNU_capacity' => !empty( $data['venue_capacity'] ) ? $data['venue_capacity'] : NULL,
				'VNU_url' => !empty($data['venue_url'] ) ? $data['venue_url'] : NULL,
				'VNU_virtual_phone' => !empty($data['virtual_phone']) ? $data['virtual_phone'] : NULL,
				'VNU_virtual_url' => !empty( $data['virtual_url'] ) ? $data['virtual_url'] : NULL,
				'VNU_enable_for_gmap' => isset( $data['enable_for_gmap'] ) ? 1 : 0,
				'status' => 'publish'
			);
		

		//if we've got the venue_id then we're just updating the existing venue so let's do that and then get out.
		if ( !empty( $venue_id ) ) {
			$update_where = array( $venue_model->primary_key_name() => $venue_id );
			$rows_affected = $venue_model->update( $venue_array, array( $update_where ) );
			//we've gotta make sure that the venue is always attached to a revision.. add_relation_to should take care of making sure that the relation is already present.
			$evtobj->_add_relation_to( $venue_id, 'Venue' );
			return $rows_affected > 0 ? TRUE : FALSE;
		} else {	
			//we insert the venue
			$venue_id = $venue_model->insert( $venue_array );
			$evtobj->_add_relation_to( $venue_id, 'Venue' );
			return !empty( $venue_id ) ? TRUE : FALSE;
		}
		return TRUE; //when we have the ancestor come in it's already been handled by the revision save.
	}




	/**
	 * Handles saving everything related to Tickets (datetimes, tickets, prices)
	 * @param  EE_Event $evtobj The Event object we're attaching data to
	 * @param  array    $data   The request data from the form
	 * @return bool             success or fail
	 */
	protected function _default_tickets_update( $evtobj, $data ) {
		//first we need to start with datetimes cause they are the "root" items attached to events.
		$saved_dtts = $this->_update_dtts( $evtobj, $data );

		//next tackle the tickets (and prices?)
		$success = $this->_update_tkts( $evtobj, $saved_dtts, $data );

	}



	

	/**
	 * update event_datetimes
	 * @param  EE_Event 	$evt_obj Event being updated
	 * @param  array    	$data    the request data from the form
	 * @return EE_Datetime           array of EE_Datetime ids created/updated.
	 */
	private function _update_dtts( $evt_obj, $data ) {
		$timezone = isset( $data['timezone_string'] ) ? $data['timezone_string'] : NULL;
		$success = TRUE;

		foreach ( $data['edit_event_datetimes'] as $row => $dtt ) {
			$dtt['DTT_EVT_end'] = isset($dtt['DTT_EVT_end']) && ! empty( $dtt['DTT_EVT_end'] ) ? $dtt['DTT_EVT_end'] : $dtt['DTT_EVT_start'];
			$datetime_values = array(
				'DTT_ID' => !empty( $dtt['DTT_ID'] ) ? $dtt['DTT_ID'] : NULL,
				'DTT_EVT_start' => $dtt['DTT_EVT_start'],
				'DTT_EVT_end' => $dtt['DTT_EVT_end'],
				'DTT_reg_limit' => empty( $dtt['DTT_reg_limit'] ) ? -1 : $dtt['DTT_reg_limit'],
				'DTT_order' => $row
				);

			//if we have an id then let's get existing object first and then set the new values.  Otherwise we instantiate a new object for save.
			
			if ( !empty( $dtt['DTT_ID'] ) ) {
				$DTM = $this->EE->load_model('Datetime', array($timezone) )->get_one_by_ID($dtt['DTT_ID'] );
				foreach ( $datetime_values as $field => $value ) {
					$DTM->set( $field, $value );
				}
				//make sure the $dtt_id here is saved just in case after the add_relation_to() the autosave replaces it.  We need to do this so we dont' TRASH the parent DTT.
				$saved_dtts[$DTM->ID()] = $DTM;
			} else {
				$DTM = $this->EE->load_class('Datetime', array( $datetime_values, $timezone ), FALSE, FALSE );
			}
			
			$DTT = $evt_obj->_add_relation_to( $DTM, 'Datetime' );

			//now we got to make sure we add the new DTT_ID to the $saved_dtts array  because it is possible there was a new one created for the autosave.
			$saved_dtts[$DTT->ID()] = $DTT;
			$saved_dtt_objs[$DTT->get('DTT_order')] = $DTT;

			$success = !$success ? $success : $DTT; //if ANY of these updates fail then we want the appropriate global error message. //todod this is actually sucky we need a better error message but this is what it is for now.
		}

		//now we need to REMOVE any dtts that got deleted.  Keep in mind that this process will only kick in for DTT's that don't have any DTT_sold on them. So its safe to permanently delete at this point.
		$old_datetimes = explode(',', $data['datetime_IDs'] );
		$old_datetimes = $old_datetimes[0] == '' ? array() : $old_datetimes;

		if ( is_array( $old_datetimes ) ) {
			$dtts_to_delete = array_diff( $old_datetimes, array_keys($saved_dtts) );
			foreach ( $dtts_to_delete as $id ) {
				$id = absint( $id );

				//remove tkt relationships.
				//Note: there shouldn't be any "orphaned" permanently deleteable tickets due to work that will be done on this codebase ticket -> https://events.codebasehq.com/projects/event-espresso/tickets/3533
				$related_tickets = $saved_dtts[$id]->get_many_related('Tickets');
				foreach ( $related_tickets as $tkt ) {
					$saved_dtts[$id]->_remove_relation_to($tkt, 'Ticket');
				}
				 

				$evt_obj->_remove_relation_to( $id, 'Datetime' );
			}
		}

		return $saved_dtt_objs;
	}




	/**
	 * update tickets
	 * @param  EE_Event         $evtobj     Event object being updated
	 * @param  EE_Datetime[]    $saved_dtts an array of datetime ids being updated
	 * @param  array            $data       incoming request data
	 * @return bool                 		success or fail
	 */
	private function _update_tkts( $evtobj, $saved_dtts, $data ) {
		$timezone = isset( $data['timezone_string'] ) ? $data['timezone_string'] : NULL;
		$success = TRUE;
		$saved_tickets = array();
		$update_prices = FALSE;
		$new_default = NULL;
		$old_tickets = isset( $data['ticket_IDs'] ) ? explode(',', $data['ticket_IDs'] ) : array();
		$ticket_price = isset( $tkt['TKT_price'] ) ? $tkt['TKT_price'] : 0;

		foreach ( $data['edit_tickets'] as $row => $tkt ) {

			//figure out what dtts were added to the ticket and what dtts were removed from the ticket in the session.

			$starting_tkt_dtt_rows = explode(',',$data['starting_ticket_datetime_rows'][$row]);
			$tkt_dtt_rows = explode(',', $data['ticket_datetime_rows'][$row] );
			$dtts_added = array_diff($tkt_dtt_rows, $starting_tkt_dtt_rows);
			$dtts_removed = array_diff($starting_tkt_dtt_rows, $tkt_dtt_rows);

			$TKT_values = array(
				'TKT_ID' => !empty( $tkt['TKT_ID'] ) ? $tkt['TKT_ID'] : NULL,
				'TTM_ID' => !empty( $tkt['TTM_ID'] ) ? $tkt['TTM_ID'] : 1,
				'TKT_start_date' => isset( $tkt['TKT_start_date'] ) ? $tkt['TKT_start_date'] : current_time('mysql'),
				'TKT_end_date' => isset( $tkt['TKT_end_date'] ) ? $tkt['TKT_end_date'] : current_time('mysql'),
				'TKT_qty' => isset( $tkt['TKT_qty'] ) ? $tkt['TKT_qty'] : -1,
				'TKT_uses' => isset( $tkt['TKT_uses'] ) ? $tkt['TKT_uses'] : -1,
				'TKT_min' => isset( $tkt['TKT_min'] ) ? $tkt['TKT_min'] : 1,
				'TKT_max' => isset( $tkt['TKT_max'] ) ? $tkt['TKT_max'] : -1,
				'TKT_row' => $row,
				'TKT_order' => isset( $tkt['TKT_order'] ) ? $tkt['TKT_order'] : 0
				);



			//if this is a default TKT, then we need to set the TKT_ID to 0 and update accordingly, which means in turn that the prices will become new prices as well.
			if ( isset( $tkt['TKT_is_default'] ) && $tkt['TKT_is_default'] ) {
				$TKT_values['TKT_ID'] = 0;
				$TKT_values['TKT_is_default'] = 0;
				$TKT_values['TKT_price'] = $ticket_price;
				$update_prices = TRUE;
			}

			//if we have a TKT_ID then we need to get that existing TKT_obj and update it
			//we actually do our saves a head of doing any add_relations to because its entirely possible that this ticket didn't removed or added to any datetime in the session but DID have it's items modified.
			//keep in mind that if the TKT has been sold (and we have changed pricing information), then we won't be updating the tkt but instead a new tkt will be created and the old one archived.
			
			if ( !empty( $tkt['TKT_ID'] ) ) {
				$TKT = $this->EE->load_model( 'Ticket', array( $timezone ) )->get_one_by_ID( $tkt['TKT_ID'] );

				$ticket_sold = $TKT->tickets_sold() > 0 ? true : false;

				//let's just check the total price for the existing ticket and determine if it matches the new total price.  if they are different then we create a new ticket (if tkts sold) if they aren't different then we go ahead and modify existing ticket.
				$create_new_TKT = $ticket_sold && $ticket_price !== $TKT->get('TKT_price') ? TRUE : FALSE;

				//set new values
				foreach ( $TKT_values as $field => $value ) {
					$TKT->set( $field, $value );
				}

				//if $create_new_TKT is false then we can safely update the existing ticket.  Otherwise we have to create a new ticket. 
				if ( $create_new_TKT ) {
					//archive the old ticket first
					$TKT->set('TKT_deleted', 1);
					$TKT->save();

					//make sure this ticket is still recorded in our saved_tkts so we don't run it through the regular trash routine.
					$saved_tickets[$TKT->ID()] = $TKT;


					//create new ticket that's a copy of the existing except a new id of course (and not archived) AND has the new TKT_price associated with it.
					$TKT->set( 'TKT_ID', 0 );
					$TKT->set( 'TKT_deleted', 0 );
					$TKT->set( 'TKT_price', $ticket_price );
					$TKT->set( 'TKT_sold', 0 );

					//now we need to make sure that $new prices are created as well and attached to new ticket.
					$update_prices = TRUE; 
				}
				

			} else {
				//no TKT_id so a new TKT
				$TKT_values['TKT_price'] = $ticket_price;
				$TKT = $this->EE->load_class('Ticket', array( $TKT_values, $timezone ), FALSE, FALSE );
				$update_prices = TRUE;
			}


			//update ticket.
			$TKT->save();
			$saved_tickets[$TKT->ID()] = $TKT;

			//add prices to ticket
			$this->_add_prices_to_ticket( $data['edit_prices'][$row], $TKT, $update_prices );


			//handle CREATING a default tkt from the incoming tkt but ONLY if this isn't an autosave.
			if ( ! defined('DOING_AUTOSAVE' ) ) {
				if ( !empty($tkt['TKT_is_default_selector'] ) ) {
					$new_default = $TKT;
					$new_default->set( 'TKT_ID', 0 );
					$new_default->set( 'TKT_is_default', 1 );
					$new_default->set( 'TKT_order', 0 );
					$new_default->set( 'TKT_row', 1 );
					$new_default->SET( 'TKT_price', $ticket_price );
					$new_default->save();

					//todo we need to add the current attached prices as new prices to the new default ticket.
					$this->_add_prices_to_ticket($data['edit_prices'][$row], $new_default, $update_prices);
				}
			}

			//now we just have to add the ticket to all the datetimes its supposed to be with and removing the ticket from datetimes it got removed from.
			

			//first let's do the add_relation_to()
			foreach ( $dtts_added as $dttrow ) {
				$saved_dtts[$dttrow]->_add_relation_to( $TKT, 'Ticket' );
			}

			//now let's do the remove_relation_to()
			foreach ( $dtts_removed as $dttrow ) {
				$saved_dtts[$dttrow]->_remove_relation_to( $TKT, 'Ticket' );
			}


			//DO ALL dtt relationships for both current tickets and any archived tickets for the given dtt that are related to the current ticket. TODO... not sure exactly how we're going to do this considering we don't know what current ticket the archived tickets are related to (and TKT_parent is used for autosaves so that's not a field we can reliably use).
			
		}

		//now we need to handle tickets actually "deleted permanently".  There are cases where we'd want this to happen (i.e. autosaves are happening and then in between autosaves the user trashes a ticket).  Or a draft event was saved and in the process of editing a ticket is trashed.  No sense in keeping all the related data in the db!
		$old_tickets = $old_tickets[0] == '' ? array() : $old_tickets;
		$tickets_removed = array_diff( $old_tickets, array_keys($saved_tickets) );

		foreach ( $tickets_removed as $id ) {
			$id = absint( $id );

			//need to get all the related datetimes on this ticket and remove from every single one of them (remember this process can ONLY kick off if there are NO tkts_sold)
			$dtts = $saved_tickets[$id]->get_many_related('Datetime');

			foreach( $dtts as $dtt ) {
				$saved_tickets[$id]->_remove_relation_to($dtt, 'Datetime');
			}

			//need to do the same for prices (except these prices can also be deleted because again, tickets can only be trashed if they don't have any TKTs sold (otherwise they are just archived))
			$prcs = $saved_tickets[$id]->get_may_related('Ticket');

			foreach( $prcs as $prc ) {
				$saved_tickets[$id]->delete_related_permanently($prc, 'Price');
			}

			//finally let's delete this ticket (which should not be blocked at this point b/c we've removed all our relationships)
			$saved_tickets[$id]->delete_permanently();
		}
	}





	/**
	 * This attaches a list of given prices to a ticket.
	 * Note we dont' have to worry about ever removing relationships (or archiving prices) because if there is a change in price information on a ticket, a new ticket is created anyways so the archived ticket will retain the old price info and prices are automatically "archived" via the ticket.
	 *
	 * @access  private
	 * @param array  	$prices  	Array of prices from the form.
	 * @param EE_Ticket $ticket  	EE_Ticket object that prices are being attached to.
	 * @param bool 		$new_prices Whether attach existing incoming prices or create new ones.
	 * @return  void
	 */
	private function  _add_prices_to_ticket( $prices, EE_Ticket $ticket, $new_prices = FALSE ) {
		foreach ( $prices as $row => $prc ) {
			$PRC_values = array(
				'PRC_ID' => !empty( $prc['PRC_ID'] ) ? $prc['PRC_ID'] : NULL,
				'PRT_ID' => !empty( $prc['PRT_ID'] ) ? $prc['PRT_ID'] : NULL,
				'PRC_amount' => !empty( $prc['PRC_amount'] ) ? $prc['PRC_amount'] : 0,
				'PRC_name' => !empty( $prc['PRC_name'] ) ? $prc['PRC_name'] : '',
				'PRC_desc' => !empty( $prc['PRC_desc'] ) ? $prc['PRC_desc'] : '',
				'PRC_row' => $row
				);

			if ( $new_prices || empty( $PRC_values['PRC_ID'] ) ) {
				$PRC_values['PRC_ID'] = 0;
				$PRC = $this->EE->load_class('Price', array( $PRC_values ), FALSE, FALSE);
			} else {
				$PRC = $this->EE->load_model( 'Price' )->get_one_by_ID( $prc['PRC_ID'] );
			}

			$PRC = $ticket->_add_relation_to( $PRC, 'Price' );
		}
	}


	/**
	 * Attach the Datetimes to the Event
	 * @param  object $evtobj Event Object to add the datetime(s) to
	 * @param  array  $data   The request data from the form
	 * @return bool           success or fail
	 */
	protected function _default_dtt_update( $evtobj, $data ) {
		
		return $evt_obj; //TEMPORARILY EXITING CAUSE THIS IS A TODO

		$timezone = isset( $data['timezone_string'] ) ? $data['timezone_string'] : NULL;
		$success = TRUE;


		foreach ( $data['event_datetimes'] as $row => $event_datetime ) {
			$event_datetime['evt_end'] = isset($event_datetime['evt_end']) && ! empty( $event_datetime['evt_end'] ) ? $event_datetime['evt_end'] : $event_datetime['evt_start'];

			$datetime_values = array(
				'DTT_ID' => isset( $event_datetime['ID'] ) && $event_datetime['ID'] !== '' ? absint( $event_datetime['ID'] ) : NULL,
				'DTT_EVT_start' => $event_datetime['evt_start'],
				'DTT_EVT_end' => $event_datetime['evt_end'],
				'DTT_is_primary' => $row === 1 ? TRUE : FALSE,
				'DTT_order' => $row
				);

			//if we have an id then let's get existing object first and then set the new values.  Otherwise we instantiate a new object for save.
			
			if ( !empty( $event_datetime['ID'] ) ) {
				$DTM = $this->EE->load_model('Datetime', array($timezone) )->get_one_by_ID($event_datetime['ID'] );
				foreach ( $datetime_values as $field => $value ) {
					$DTM->set( $field, $value );
				}
			} else {
				$DTM = $this->EE->load_class('Datetime', array( $datetime_values, $timezone ), FALSE, FALSE );
			}
			

			//we have to make sure we set the saved_id first (if it's not empty) because otherwise we could miss ids that are already attached to parents.
			$dtt_id = $DTM->ID();

			if ( !empty( $dtt_id ) )
				$saved_dtts[] = $dtt_id;
			
			$DTT = $evtobj->_add_relation_to( $DTM, 'Datetime' );

			//now we got to make sure we add the new DTT_ID to the $saved_dtts array  because it is possible there was a new one created for the autosave.
			$saved_dtts[] = $DTT->ID();

			$success = !$success ? $success : $DTT; //if ANY of these updates fail then we want the appropriate global error message
		}

		//now we need to REMOVE any dtts that got deleted.
		$old_datetimes = maybe_unserialize( $data['datetime_IDs'] );


		if ( is_array( $old_datetimes ) ) {
			$dtts_to_delete = array_diff( $old_datetimes, $saved_dtts );
			foreach ( $dtts_to_delete as $id ) {
				$id = absint( $id );
				$evtobj->_remove_relation_to( $id, 'Datetime' );
			}
		}

		return $success;
	}





	/**
	 * Add in our autosave ajax handlers
	 * @return void 
	 */
	protected function _ee_autosave_create_new() {
		$this->_ee_autosave_edit();
	}





	protected function _ee_autosave_edit() {

		return; //TEMPORARILY EXITING CAUSE THIS IS A TODO

		$postid = isset( $this->_req_data['post_ID'] ) ? $this->_req_data['post_ID'] : NULL;


		//if no postid then get out cause we need it for stuff in here
		if ( empty( $postid ) ) return;


		//handle datetime saves
		$items = array();

		$get_one_where = array( $this->_event_model->primary_key_name() => $postid );
		$event = $this->_event_model->get_one( array($get_one_where) );

		//now let's get the attached datetimes from the most recent autosave
		$dtts = $event->get_many_related('Datetime');

		$dtt_ids = array();
		foreach( $dtts as $dtt ) {
			$dtt_ids[] = $dtt->ID();
			$order = $dtt->order();
			$this->_template_args['data']['items']['ID-'.$order] = $dtt->ID();
		}
		$this->_template_args['data']['items']['datetime_IDS'] = serialize( $dtt_ids );

		//handle DECAF venues
		//we need to make sure that the venue_id gets updated in the form so that future autosaves will properly conntect that venue to the event.
		if ( $do_venue_autosaves = apply_filters('FHEE__Events_Admin_Page__ee_autosave_edit_do_decaf_venue_save', TRUE ) ) {
			$venue = $event->get_first_related('Venue');
			$this->_template_args['data']['items']['venue-id'] = $venue->ID();
		}


		//handle ticket updates.
		$tickets = $event->get_many_related('Ticket');

		$ticket_ids = array();
		$price_ids = array();
		foreach ( $tickets as $ticket ) {
			$ticket_ids[] = $price->ID();
			$ticket_order = $price->get('TKT_order');
			$this->_template_args['data']['items']['edit-ticket-id-' . $ticket_order] = $ticket->ID();
			$this->_template_args['data']['items']['edit-ticket-event-id-' . $order] = $event->ID();

			//now we have to make sure the prices are updated appropriately
			$prices = $ticket->get_many_related('Prices');

			foreach ( $prices as $price ) {
				$price_ids[] = $price->ID();
				$price_order = $price->get('PRC_order');
				$this->_template_args['data']['items']['quick-edit-ticket-price-id-ticketrow-' . $ticket_order . '-' . $price_order] = $price->ID();
				$this->_template_args['data']['items']['edit-ticket-price-id-ticketrow-' . $ticket_row . '-' . $price_row] = $price->ID();
				$this->_template_args['data']['items']['edit-ticket-price-is-default-ticketrow-' . $ticket_row . '-' . $price_row] = $price->get('PRC_is_default');
			}
			$this->_template_args['data']['items']['price-IDs-ticketrow-' . $ticket_row] = implode(',', $price_ids);
		}
		$this->_template_args['data']['items']['ticket-IDs'] = implode(',', $ticket_ids);
	}






	/**
	 * Attach the price(s) to the Event (note decaf only adds one price but we're adding the handling for multiple prices here)
	 * @param  object $evtobj Event Object to add the price(s) to
	 * @param  array  $data   The request data from the form
	 * @return bool           success or fail.
	 */
	protected function _default_prices_update( $evtobj, $data ) {

		return $evt_obj; //TEMPORARILY EXITING CAUSE THIS IS A TODO

		$timezone = isset( $data['timezone_string'] ) ? $data['timezone_string'] : NULL;
		$success = TRUE;

		$saved_tickets = array();
		$old_tickets = isset( $data['ticket-IDs'] ) ? explode(',', $data['ticket-IDs'] ) : array();
		$edited_tickets = isset( $data['edit_ticket_info'] ) ? $data['edit_ticket_info'] : array();

		if ( empty( $edited_tickets ) )
			return FALSE; //get out because there is somethign that went wrong (probably an error prevented display of the ticket form)

		//let's loop through all the tickets and set things up for saving
		foreach ( $edited_tickets as $ticketrow => $ticket_data ) {
			$TKT_values = array(
				'TKT_ID' => !empty( $ticket_data['TKT_ID'] ) ? $ticket_data['TKT_ID'] : NULL,
				'TTM_ID' => !empty( $ticket_data['TTM_ID'] ) ? $ticket_data['TTM_ID'] : 1,
				'TKT_start_date' => isset( $ticket_data['TKT_start_date'] ) ? $ticket_data['TKT_start_date'] : current_time('mysql'),
				'TKT_end_date' => isset( $ticket_data['TKT_end_date'] ) ? $ticket_data['TKT_end_date'] : current_time('mysql'),
				'TKT_qty' => isset( $ticket_data['TKT_qty'] ) ? $ticket_data['TKT_qty'] : -1,
				'TKT_order' => $ticketrow,
				);

			//if we have a TKT_ID then we need to get that existing TKT_obj and update it
			if ( !empty( $ticket_data['TKT_ID'] ) ) {
				$TKT = $this->EE->load_model( 'Ticket', array( $timezone ) )->get_one_by_ID( $ticket_data['TKT_ID'] );
				//set new values
				foreach ( $TKT_values as $field => $value ) {
					$TKT->set( $field, $value );
				}
			} else {
				//no TKT_id so a new TKT
				$TKT = $this->EE->load_class('Ticket', array( $TKT_values, $timezone ), FALSE, FALSE );
			}

			//now we just have to add the ticket to the event which in turn will make sure we have a ticket ID generated if this is a new ticket. In the case of tickets
			$saved_TKT = $evtobj->_add_relation_to( $TKT, 'Ticket' );
			$saved_tickets[] = $saved_TKT->ID();

			//now let's setup the price stuff for this ticket
			$old_prices = isset( $data['price-IDs'][$ticketrow] ) ? explode(',',$data['price-IDs'][$ticket_row]) : array();
			$edited_prices = isset($data['edit_ticket_price'][$ticketrow]) ? $data['edit_ticket_price'][$ticketrow] : array();
			$saved_prices = array();

			if ( $empty ( $edited_prices ) ) {
				$success = FALSE;
				EE_Error::add_error( __('There were no prices attached to the ticket.', 'event_espresso'), __FILE__, __FUNCTION, __LINE__ );
			}

			//let's loop through all prices and set things up.
			foreach ( $edited_prices as $row => $price_data ) {
				$PRC_values = array(
					'PRC_ID' => $price_data['PRC_ID'] === 0 ? NULL : $price_data['PRC_ID'],
					'PRT_ID' => isset( $price_data['PRT_ID'] ) ? $price_data['PRT_ID'] : 2,
					'PRC_order' => isset( $price_data['PRC_order'] ) && $price_data['PRC_order'] ? $price_data['PRC_order'] : 0,
					'PRC_name' => $price_data['PRC_name'] ? $price_data['PRC_name'] : NULL,
					'PRC_desc' => isset($price_data['PRC_desc']) ? $price_data['PRC_desc'] : '',
					'PRC_amount' => $price_data['PRC_amount'] ? $price_data['PRC_amount'] : 0,
					'PRC_is_active' => TRUE,
					'PRC_order' => $row
					);

				//if we have a PRC_ID then we need to get that existing PRC_obj and update it
				if ( !empty( $price_data['PRC_ID'] ) ) {
					$PRC = $this->EE->load_model( 'Price' )->get_one_by_ID( $price_data['PRC_ID'] );
					//set new values
					foreach ( $PRC_values as $field => $value ) {
						$PRC->set( $field, $value );
					}
				} else {
					//no PRC_ID so a new PRC
					$PRC = $this->EE->load_class('Price', array( $PRC_values ), FALSE, FALSE );
				}

				
				//now we have to determine if this price is a default price (or new price).  If it is then we MUST insert.
				if ( $price_data['PRC_is_default'] === 1 && $PRC->ID() > 0 ) {
					//unset the PRC_ID from the $old_prices array
					unset($old_prices[$price_data['PRC_ID']] );
					$PRC->set( 'PRC_ID', NULL );
					$PRC->set( 'PRC_is_default', 0 );
				}

				//now we just have to add to the ticket (*note that EEM_Price model already takes care of handling NOT saving the price if the price has already been used however, in that case the price object that is returned is going to be different than the one that was saved so we need to make sure we don't accidentally remove it again!  This also means that we need to keep the old price attached to the ticket (even though it might not be displayed ) ).
				$saved_PRC = $saved_TKT->_add_relation_to( $PRC, 'Price' );

				if ( ( $price_data['PRC_ID'] > 0 && $price_data['PRC_ID'] != $saved_PRC->ID()  && ! $price_data['PRC_is_default'] ) ) {
					//make sure we keep old price attached to ticket (even though it won't be displayed because it's archived)
					$saved_prices[] = $price_data['PRC_ID'];
				}

				$saved_prices[] = $saved_PRC->ID();		
			}

			//now remove any prices that got deleted (note IF this TKT has TKTs_sold, then we don't actually hard delete but instead just archive the price).
			$prices_to_delete = array_diff( $old_prices, $saved_prices );
			foreach ( $prices_to_delete as $price ) {
				$id = absint( $price );
				$price_to_archive = $this->EE->load_model('Price')->get_one_by_ID( $id );
				if ( $saved_TKT->tickets_sold() ) {
					//let's modify this to be archived
					$price_to_archive->set( 'PRC_deleted', 1 );
					$price_to_archive->save();
				} else {
					//no tickets sold so we can safely detach from the $saved_TKT and then hard delete.
					$saved_TKT->_remove_relation_to($price_to_archive, 'Price');
					$this->EE->load_model('Price')->delete_permanently_by_ID( $price_to_archive->ID() );
				}
			}
			
			//I don't think we need to worry about the below now because a ticket will always have at least one price associated with it but we'll just comment out for now until we've verified this.
			/*if ( count( $saved_prices ) < 1 ) {
				$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', array() );
				$espresso_no_ticket_prices[ $evtobj->get('EVT_ID') ] = $evtobj->get('EVT_name');
				update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
			} /**/

		}	

		return $success;
	}




	/**
	 * 	_generate_publish_box_extra_content
	 * 	@access private
	 * @return void
	 */
	private function _generate_publish_box_extra_content() {

		//load formatter helper
  		require_once EE_HELPERS . 'EE_Formatter.helper.php';
		// publish box
		$publish_box_extra_args['view_attendees_url'] = add_query_arg(array('action' => 'default', 'event_id' => $this->_cpt_model_obj->ID() ), REG_ADMIN_URL);
		$publish_box_extra_args['attendees_reg_limit'] = $this->_cpt_model_obj->get_number_of_attendees_reg_limit( 'num_attendees_slash_reg_limit' );
		$publish_box_extra_args['misc_pub_section_class'] = apply_filters('FHEE_event_editor_email_attendees_class', 'misc-pub-section');
		//$publish_box_extra_args['email_attendees_url'] = add_query_arg(array('event_admin_reports' => 'event_newsletter', 'event_id' => $this->_cpt_model_obj->id), 'admin.php?page=espresso_registrations');
		$publish_box_extra_args['event_editor_overview_add'] = do_action('AHEE_cpt_model_obj_editor_overview_add', $this->_cpt_model_obj);
		// load template
		espresso_display_template( EVENTS_TEMPLATE_PATH . 'event_publish_box_extras.template.php', $publish_box_extra_args );
	}





	/**
	 * This just returns whatever is set as the _event object property
	 *
	 * //todo this will become obsolete once the models are in place
	 * @return object
	 */
	public function get_event_object() {
		return $this->_cpt_model_obj;
	}



	/*	 * ************ */
	/** METABOXES * */

	/**
	 * _register_event_editor_meta_boxes
	 * add all metaboxes related to the event_editor
	 * 
	 * @return [type] [description]
	 */
	protected function _register_event_editor_meta_boxes() {


		add_meta_box('espresso_event_editor_tickets', __('Event Datetime & Ticket', 'event_espresso'), array($this, 'ticket_metabox'), $this->page_slug, 'normal', 'high');

		add_meta_box('espresso_event_editor_event_options', __('Event Registration Options', 'event_espresso'), array($this, 'registration_options_meta_box'), $this->page_slug, 'side', 'default');

		add_meta_box('espresso_event_editor_venue', __('Venue Details', 'event_espresso'), array( $this, 'venue_metabox' ), $this->page_slug, 'normal', 'core');	


		//note if you're looking for other metaboxes in here, where a metabox has a related management page in the admin you will find it setup in the related management page's "_Hooks" file.  i.e. messages metabox is found in "espresso_events_Messages_Hooks.class.php".
	}




	public function ticket_metabox() {
		$existing_datetime_ids = $existing_ticket_ids = array();

		//defaults for template args
		$template_args = array(
			'existing_datetime_ids' => '',
			'event_datetime_help_link' => '',
			'ticket_options_help_link' => '',
			'time' => null,
			'ticket_rows' => '',
			'existing_ticket_ids' => '',
			'total_ticket_rows' => 1,
			'ticket_js_structure' => ''
			);

		$event_id = is_object( $this->_cpt_model_obj ) ? $this->_cpt_model_obj->ID() : NULL;
		$timezone = is_object( $this->_cpt_model_obj ) ? $this->_cpt_model_obj->timezone_string() : NULL; 

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		/**
		 * 1. Start with retrieving Datetimes
		 * 2. Fore each datetime get related tickets
		 * 3. For each ticket get related prices
		 */
		
		$DTM_MDL = $this->EE->load_model('Datetime', array($timezone) );
		$times = $DTM_MDL->get_all_event_dates( $event_id );

		require_once(EE_MODELS . 'EEM_Datetime.model.php');
		$DTM_MDL = EEM_Datetime::instance( $timezone );
		require_once EE_HELPERS . 'EEH_DTT_helper.helper.php';

		//do we get related tickets?
		if ( $times[0]->get('DTT_ID') !== 0 ) {
			foreach ( $times as $time ) {
				$existing_datetime_ids[] = $time->get('DTT_ID');
				$template_args['time'] = $time;
				$related_tickets = $time->get_all_related('Ticket');
				
				if ( !empty($related_tickets) ) {
					$template_args['total_ticket_rows'] = count($related_tickets);
					foreach ( $related_tickets as $ticket ) {
						$existing_ticket_ids[] = $ticket->get('DTT_ID');
						$template_args['ticket_rows'] .= $this->_get_ticket_row($ticket);
					}
				} else {
					$template_args['total_ticket_rows'] = 1;
					$ticket = $this->EE->load_model('Ticket')->create_default_object();
					$template_args['ticket_rows'] .= $this->_get_ticket_row( $ticket );
				}
			}
		} else {
			$template_args['time'] = $time[0];
			$ticket = $this->EE->load_model('Ticket')->create_default_object();
			$template_args['ticket_rows'] .= $this->_get_ticket_row( $ticket );
		}

		$template_args['event_datetime_help_link'] = $this->_get_help_tab_link('event_date_info');
		$template_args['ticket_options_help_link'] = $this->_get_help_tab_link('ticket_options_info');
		$template_args['existing_datetime_ids'] = implode(',', $existing_datetime_ids);
		$template_args['existing_ticket_ids'] = implode(',', $existing_ticket_ids);
		$template_args['ticket_js_structure'] = $this->_get_ticket_row( $this->EE->load_model('Ticket')->create_default_object(), TRUE );
		$template = apply_filters( 'FHEE__Events_Admin_Page__ticket_metabox__template', EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_main.template.php' );
		espresso_display_template($template, $template_args);
	}



	/**
	 * Setup an individual ticket form for the decaf event editor page
	 *
	 * @access private
	 * @param  EE_Ticket  $ticket   the ticket object
	 * @param  boolean    $skeleton whether we're generating a skeleton for js manipulation
	 * @return string               generated html for the ticket row.
	 */	
	private function _get_ticket_row( $ticket, $skeleton = FALSE ) {
		$template_args = array(
			'ticketrow' => $skeleton ? 'TICKETNUM' : $ticket->get('TKT_row'),
			'TKT_ID' => $ticket->get('TKT_ID'),
			'TKT_name' => $ticket->get('TKT_name'),
			'TKT_start_date' => $ticket->get('TKT_start_date'),
			'TKT_end_date' => $ticket->get('TKT_end_date'),
			'TKT_qty' => $ticket->get('TKT_qty')
			);

		$price = $ticket->get('TKT_ID') !== 0 ? $ticket->get_first_related('Price') : array();

		if ( empty( $price ) )
			$price = $this->EE->load_model('Price')->create_default_object();

		$price_args = array(
			'price_currency_symbol' => $this->EE->CFG->currency_sign,
			'PRC_amount' => $price->get('PRC_amount'),
			'PRT_ID' => $price->get('PRT_ID'),
			'PRC_ID' => $price->get('PRC_ID'),
			'PRC_is_default' => $price->get('PRC_is_default'),
			);
		$template_args = array_merge( $template_args, $price_args );
		$template = apply_filters('FHEE__Events_Admin_Page__get_ticket_row__template', EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_ticket_row.template.php', $ticket);
		return espresso_display_template($template, $template_args, TRUE);
	}



	public function registration_options_meta_box() {

		global $org_options;

		$yes_no_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		$additional_attendee_reg_info_values = EEM_Event::additional_attendee_reg_info_array();
		$default_reg_status_values = EEM_Registration::reg_status_array();
		
		//$template_args['is_active_select'] = EE_Form_Fields::select_input('is_active', $yes_no_values, $this->_cpt_model_obj->is_active());
		$template_args['_event'] = $this->_cpt_model_obj;
		$template_args['active_status'] = $this->_cpt_model_obj->pretty_active_status(FALSE);
		$template_args['allow_group_reg_select'] = EE_Form_Fields::select_input('allow_multiple', $yes_no_values, $this->_cpt_model_obj->allow_multiple(), 'id="group-reg"', '', false);
		$template_args['additional_limit'] = $this->_cpt_model_obj->additional_limit();
		$template_args['default_registration_status'] = EE_Form_Fields::select_input('default_reg_status', $default_reg_status_values, $this->_cpt_model_obj->default_registration_status());
		$template_args['display_description'] = EE_Form_Fields::select_input('display_desc', $yes_no_values, $this->_cpt_model_obj->display_description());
		$template_args['display_registration_form'] = EE_Form_Fields::select_input('display_reg_form', $yes_no_values, $this->_cpt_model_obj->display_reg_form(), '', '', false);
		$template_args['additional_registration_options'] = apply_filters('FHEE_additional_registration_options_event_edit_page', '', $template_args, $yes_no_values, $additional_attendee_reg_info_values, $default_reg_status_values);
		$templatepath = EVENTS_TEMPLATE_PATH . 'event_registration_options.template.php';
		espresso_display_template($templatepath, $template_args);
	}



	/**
	 * decaf venue metabox
	 * @return string form for Event Venue
	 */
	public function venue_metabox() {
		global $org_options;
		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);

		//states and countries model
		$states = $this->EE->load_model('State')->get_all_active_states();
		$countries = $this->EE->load_model('Country')->get_all_active_countries();

		//prepare state/country arrays
		foreach ( $states as $id => $obj ) {
			$st_ary[$id] = $obj->name();
		}

		foreach ( $countries as $id => $obj ) {
			$ctry_ary[$id] = $obj->name();
		}

		$VNM = $this->EE->load_model('Venue');
		//first let's see if we have a venue already
		$evnt_id = $this->_cpt_model_obj->ID();
		$venue = !empty( $evnt_id ) ? $this->_cpt_model_obj->venues() : NULL;
		$venue = empty( $venue ) ? $VNM->create_default_object() : array_shift( $venue );
		$template_args['_venue'] = $venue;
		$template_args['org_options'] = $org_options;
		$template_args['states_dropdown'] = EE_Form_Fields::select_input('state', $st_ary, $venue->state_ID(), 'id="phys-state"');
		$template_args['countries_dropdown'] = EE_Form_Fields::select_input('countries', $ctry_ary, $venue->country_ID(), 'id="phys-country"');
		$template_args['enable_for_gmap'] = EE_Form_Fields::select_input('enable_for_gmap', $values, $venue->enable_for_gmap(), 'id="enable_for_gmap"');
		$template_path = EVENTS_TEMPLATE_PATH . 'event_venues_metabox_content.template.php';
		espresso_display_template( $template_path, $template_args );
	}

		

	/** end metaboxes * */
	/*	 * **************** *	

	


	/**
	 * _get_events()
	 * This method simply returns all the events (for the given _view and paging)
	 *
	 * @access public
	 *
	 * @param int $per_page count of items per page (20 default);
	 * @param int $current_page what is the current page being viewed.
	 * @param bool $count if TRUE then we just return a count of ALL events matching the given _view.  If FALSE then we return an array of event objects that match the given _view and paging parameters.
	 * @return array an array of event objects.
	 */
	public function get_events($per_page = 10, $current_page = 1, $count = FALSE) {
		global $wpdb, $org_options;

		$EEME = $this->_event_model;



		$offset = ($current_page - 1) * $per_page;
		$limit = $count ? '' : $offset . ',' . $per_page;
		$orderby = isset($this->_req_data['orderby']) ? $this->_req_data['orderby'] : 'EVT_ID';
		$order = isset($this->_req_data['order']) ? $this->_req_data['order'] : "DESC";

		if (isset($this->_req_data['month_range'])) {
			$pieces = explode(' ', $this->_req_data['month_range'], 3);
			$month_r = !empty($pieces[0]) ? $pieces[0] : '';
			$year_r = !empty($pieces[1]) ? $pieces[1] : '';
		}

		$where = array(
				//todo add event categories
				'Datetime.DTT_is_primary' => 1,
		);

		$status = isset( $this->_req_data['status'] ) ? $this->_req_data['status'] : NULL;
		//determine what post_status our condition will have for the query.
		switch ( $status ) {
			case 'month' :
			case 'today' :
			case NULL :
			case 'all' :
				$where['status'] = array( 'NOT IN', array('trash') );
				break;

			case 'draft' :
				$where['status'] = array( 'IN', array('draft', 'auto-draft') );

			default :
				$where['status'] = $status;
		}
		

		//date where conditions
		if (isset($this->_req_data['month_range']) && $this->_req_data['month_range'] != '') {
			$where['DTT_EVT_start'] = array('BETWEEN', array( strtotime($year_r . '-' . $month_r . '-01'), strtotime($year_r . '-' . $month_r . '-31') ) );
		} else if (isset($this->_req_data['status']) && $this->_req_data['status'] == 'today') {
			$where['DTT_EVT_start'] = array('BETWEEN', array( strtotime(date('Y-m-d') . ' 0:00:00'), strtotime(date('Y-m-d') . ' 23:59:59') ) );
		} else if ( isset($this->_req_data['status']) && $this->_req_data['status'] == 'month' ) {
			$this_year_r = date('Y');
			$this_month_r = date('m');
			$days_this_month = date('t');
			$where['DTT_EVT_start'] = array( 'BETWEEN', array( strtotime($this_year_r . '-' . $this_month_r . '-01'), strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month) ) );
		}

		$where['post_type'] = array( '!=', 'revision' );

		$query_params = array($where, 'limit' => $limit, 'order_by' => $orderby, 'order' => $order, 'group_by' => 'EVT_ID' );

		//let's first check if we have special requests coming in.
		if ( isset( $this->_req_data['active_status'] ) ) {
			switch ( $this->_req_data['active_status'] ) {
				case 'upcoming' :
					return $EEME->get_upcoming_events( $query_params, $count );
					break;

				case 'expired' :
					return $EEME->get_expired_events( $query_params, $count );
					break;

				case 'active' :
					return $EEME->get_active_events( $query_params, $count );
					break;
			}
		}

		$events = $count ? $EEME->count( array( $where ), 'EVT_ID' ) : $EEME->get_all( $query_params );

		return $events;
	}




	//handling for WordPress CPT actions (trash, restore, delete)
	public function trash_cpt_item( $post_id ) {
		$this->_req_data['EVT_ID'] = $post_id;
		$this->_trash_or_restore_event( 'trash', FALSE );
	}




	public function restore_cpt_item( $post_id ) {
		$this->_req_data['EVT_ID'] = $post_id;
		$this->_trash_or_restore_event( 'draft', FALSE );
	}


	public function delete_cpt_item( $post_id ) {
		$this->_req_data['EVT_ID'] = $post_id;
		$this->_delete_event( FALSE );
	}



	/**
	 * _trash_or_restore_event
	 *
	 * @access protected
	 * @param  string $event_status 
	 * @return void 
	 */
	protected function _trash_or_restore_event($event_status = 'trash', $redirect_after = TRUE ) {
		//determine the event id and set to array.
		$EVT_ID = isset($this->_req_data['EVT_ID']) ? absint($this->_req_data['EVT_ID']) : FALSE;
		// loop thru events
		if ($EVT_ID) {
			// clean status
			$event_status = sanitize_key($event_status);
			// grab status
			if (!empty($event_status)) {
				$success = $this->_change_event_status($EVT_ID, $event_status);
			} else {
				$success = FALSE;
				$msg = __('An error occured. The event could not be moved to the trash because a valid event status was not not supplied.', 'event_espresso');
				EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			}
		} else {
			$success = FALSE;
			$msg = __('An error occured. The event could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}
		$action = $event_status == 'trash' ? 'moved to the trash' : 'restored from the trash';

		if ( $redirect_after )
			$this->_redirect_after_action($success, 'Event', $action, array('action' => 'default'));
	}

	/**
	 * _trash_or_restore_events
	 *
	 * @access protected
	 * @param  string $event_status 
	 * @return void 
	 */
	protected function _trash_or_restore_events($event_status = 'trash') {
		// clean status
		$event_status = sanitize_key($event_status);
		// grab status
		if (!empty($event_status)) {
			$success = TRUE;
			//determine the event id and set to array.
			$EVT_IDs = isset($this->_req_data['EVT_IDs']) ? (array) $this->_req_data['EVT_IDs'] : array();
			// loop thru events
			foreach ($EVT_IDs as $EVT_ID) {
				if ($EVT_ID = absint($EVT_ID)) {
					$results = $this->_change_event_status($EVT_ID, $event_status);
					$success = $results !== FALSE ? $success : FALSE;
				} else {
					$msg = sprintf(__('An error occured. Event #%d could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso'), $EVT_ID);
					EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
					$success = FALSE;
				}
			}
		} else {
			$success = FALSE;
			$msg = __('An error occured. The event could not be moved to the trash because a valid event status was not not supplied.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}
		// in order to force a pluralized result message we need to send back a success status greater than 1
		$success = $success ? 2 : FALSE;
		$action = $event_status == 'trash' ? 'moved to the trash' : 'restored from the trash';
		$this->_redirect_after_action($success, 'Events', $action, array('action' => 'default'));
	}

	/**
	 * _trash_or_restore_events
	 *
	 * @access  private
	 * @param  int $event_id 
	 * @param  string $event_status 
	 * @return void
	 */
	private function _change_event_status($EVT_ID = FALSE, $event_status = FALSE) {
		// grab event id
		if (!$EVT_ID) {
			$msg = __('An error occured. No Event ID or an invalid Event ID was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}

		$this->_set_model_object( $EVT_ID );

		// clean status
		$event_status = sanitize_key($event_status);
		// grab status
		if (empty($event_status)) {
			$msg = __('An error occured. No Event Status or an invalid Event Status was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		
		// was event trashed or restored ?
		switch ($event_status) {
			case 'draft' :
				$action = 'restored from the trash';
				$hook = 'AHEE_event_restored_from_trash';
				break;
			case 'trash' :
				$action = 'moved to the trash';
				$hook = 'AHEE_event_moved_to_trash';
				break;
			default :
				$action = 'updated';
				$hook = FALSE;
		}
		//use class to change status
		$this->_cpt_model_obj->set_status( $event_status );
		$success = $this->_cpt_model_obj->save();
		
		if ($success === FALSE) {
			$msg = sprintf(__('An error occured. The event could not be %s.', 'event_espresso'), $action);
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		if ($hook) {
			do_action($hook);
		}
		return TRUE;
	}

	/**
	 * _delete_event
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _delete_event( $redirect_after = TRUE ) {
		//determine the event id and set to array.
		$EVT_ID = isset($this->_req_data['EVT_ID']) ? absint($this->_req_data['EVT_ID']) : NULL;
		$EVT_ID = isset( $this->_req_data['post'] ) ? absint( $this->_req_data['post'] ) : NULL;


		// loop thru events
		if ($EVT_ID) {
			$success = $this->_permanently_delete_event( $EVT_ID );
			// get list of events with no prices
			$espresso_no_ticket_prices = get_option('espresso_no_ticket_prices', array());
			// remove this event from the list of events with no prices
			if (isset($espresso_no_ticket_prices[$EVT_ID])) {
				unset($espresso_no_ticket_prices[$EVT_ID]);
			}
			update_option('espresso_no_ticket_prices', $espresso_no_ticket_prices);
		} else {
			$success = FALSE;
			$msg = __('An error occured. An event could not be deleted because a valid event ID was not not supplied.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}
		if ( $redirect_after )
			$this->_redirect_after_action($success, 'Event', 'deleted', array('action' => 'default'));
	}

	/**
	 * _delete_events
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _delete_events() {
		$succes = TRUE;
		// get list of events with no prices
		$espresso_no_ticket_prices = get_option('espresso_no_ticket_prices', array());
		//determine the event id and set to array.
		$EVT_IDs = isset($this->_req_data['EVT_IDs']) ? (array) $this->_req_data['EVT_IDs'] : array();
		// loop thru events
		foreach ($EVT_IDs as $EVT_ID) {
			if ($EVT_ID = absint($EVT_ID)) {
				$results = $this->_permanently_delete_event($EVT_ID);
				$succes = $results !== FALSE ? $succes : FALSE;
				// remove this event from the list of events with no prices
				if (isset($espresso_no_ticket_prices[$EVT_ID])) {
					unset($espresso_no_ticket_prices[$EVT_ID]);
				}
			} else {
				$succes = FALSE;
				$msg = __('An error occured. An event could not be deleted because a valid event ID was not not supplied.', 'event_espresso');
				EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			}
		}
		update_option('espresso_no_ticket_prices', $espresso_no_ticket_prices);
		// in order to force a pluralized result message we need to send back a success status greater than 1
		$succes = $succes ? 2 : FALSE;
		$this->_redirect_after_action($succes, 'Events', 'deleted', array('action' => 'default'));
	}

	/**
	 * _permanently_delete_event
	 *
	 * @access  private
	 * @param  int $EVT_ID 
	 * @return void
	 */
	private function _permanently_delete_event($EVT_ID = FALSE) {
		// grab event id
		if (!$EVT_ID = absint($EVT_ID)) {
			$msg = __('An error occured. No Event ID or an invalid Event ID was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		
		
		$this->_set_model_object( $EVT_ID );
		$success = $this->_cpt_model_obj->delete();
		// did it all go as planned ?
		if ($success) {
			$msg = sprintf(__('Event ID # %d has been deleted.', 'event_espresso'), $EVT_ID);
			EE_Error::add_success($msg);
		} else {
			$msg = sprintf(__('An error occured. Event ID # %d could not be deleted.', 'event_espresso'), $EVT_ID);
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		do_action('AHEE_event_permanently_deleted');
		return TRUE;
	}





	/**
	 * espresso_event_months_dropdown			
	 * This is copied (and slightly modified) from the same named function in EE core legacy.
	 * 
	 * @param  string $current_value current month range value
	 * @return string                dropdown listing month/year selections for events.
	 */
	public function espresso_event_months_dropdown($current_value = '') {
		global $wpdb;
		$SQL = "SELECT DTT_EVT_start as e_date FROM " . $wpdb->prefix . "esp_datetime GROUP BY YEAR(FROM_UNIXTIME(DTT_EVT_start)), MONTH(FROM_UNIXTIME(DTT_EVT_start))";

		$dates = $wpdb->get_results($SQL);

		echo '<select name="month_range" class="wide">';
			

		if ($wpdb->num_rows > 0) {
			echo '<option value="">' . __('Select a Month/Year', 'event_espresso') . '</option>';
			foreach ($dates as $row) {
				$option_date = date_i18n('M Y', $row->e_date);
				echo '<option value="' . $option_date . '"';
				echo $option_date == $current_value ? ' selected="selected=selected"' : '';
				echo '>' . $option_date . '</option>' . "\n";
			}
		} else {
			echo '<option value="">' . __('No Dates Yet', 'event_espresso') . '</option>';
		}
		echo "</select>";
	}





	/**
	 * returns a list of "active" statuses on the event
	 * @param  string $current_value whatever the ucrrent active status is
	 * @return string                html dropdown.
	 */
	public function  active_status_dropdown( $current_value = '' ) {
		$select_name = 'active_status';
		$values = array('none' => __('Show Active/Inactive', 'event_espresso'), 'active' => __('Active', 'event_epsresso'), 'upcoming' => __('Upcoming', 'event_espresso'), 'expired' => __('Expired', 'event_espresso') );
		$id = 'id="espresso-active-status-dropdown-filter"';
		$class = 'wide';
		echo EE_Form_Fields::select_input( $select_name, $values, $current_value, $id, $class );
	}





	/**
	 * get total number of events
	 *
	 * @access public
	 * @return int 
	 */
	public function total_events() {

		$count = EEM_Event::instance()->count( array( array('status' => array( 'NOT IN', array('trash') ) ) ), 'EVT_ID' );
		return $count;
	}

	/**
	 * get total number of events today
	 *
	 * @access public
	 * @return int 
	 */
	public function total_events_today() {
		$start = ' 00:00:00';
		$end = ' 23:59:59';

		$where = array(
			'status' => array( '!=', 'trash' ),
			'Datetime.DTT_EVT_start' => array( 'BETWEEN', array(strtotime(date('Y-m-d') . $start), strtotime(date('Y-m-d') . $end) ) )
			);

		$count = EEM_Event::instance()->count( array( $where ), 'EVT_ID' );
		return $count;
	}

	/**
	 * get total number of events this month
	 *
	 * @access public
	 * @return int 
	 */
	public function total_events_this_month() {
		//Dates
		$curdate = date('Y-m-d');
		$this_year_r = date('Y');
		$this_month_r = date('m');
		$days_this_month = date('t');
		$start = ' 00:00:00';
		$end = ' 23:59:59';

		$where = array(
			'status' => array( '!=', 'trash' ),
			'Datetime.DTT_EVT_start' => array( 'BETWEEN', array(strtotime($this_year_r . '-' . $this_month_r . '-01' . $start), strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end) ) )
			);

		$count = EEM_Event::instance()->count( array( $where ), 'EVT_ID' );
		return $count;
	}




	
	/**
	 * get total number of draft events
	 *
	 * @access public
	 * @return int
	 */
	public function total_events_draft() {
		$where = array(
			'status' => array( 'IN', array('draft', 'auto-draft' ) )
			);

		$count = EEM_Event::instance()->count( array( $where ), 'EVT_ID' );
		return $count;
	}





	/**
	 * get total number of trashed events
	 *
	 * @access public
	 * @return int
	 */
	public function total_trashed_events() {
		$where = array(
			'status' => 'trash'
			);

		$count = EEM_Event::instance()->count( array( $where ), 'EVT_ID' );
		return $count;
	}




	/**
	 * 	_default_event_settings
	 * 
	 * 	This generates the Default Settings Tab
	 * 
	 * 	@return string html for the settings page
	 */
	protected function _default_event_settings() {

		global $org_options;
		$this->_template_args['values'] = $this->_yes_no_values;

		$this->_template_args['org_options'] = isset($org_options['org_options']) ? maybe_unserialize($org_options['org_options']) : FALSE;

		$this->_template_args['reg_status_array'] = $this->_get_reg_status_array(array('RCN', 'RNA'));
		$this->_template_args['default_reg_status'] = isset($org_options['default_reg_status']) ? sanitize_text_field($org_options['default_reg_status']) : 'RPN';
		$this->_template_args['pending_counts_reg_limit'] = isset($org_options['pending_counts_reg_limit']) ? sanitize_text_field($org_options['pending_counts_reg_limit']) : TRUE;

		$this->_template_args['use_attendee_pre_approval'] = isset($org_options['use_attendee_pre_approval']) ? absint($org_options['use_attendee_pre_approval']) : FALSE;

		$this->_template_args['template_args'] = $this->_template_args;

		$this->_set_add_edit_form_tags('update_default_event_settings');
		$this->_set_publish_post_box_vars(NULL, FALSE, FALSE, NULL, FALSE);
		$this->_template_args['admin_page_content'] = espresso_display_template(EVENTS_TEMPLATE_PATH . 'event_settings.template.php', $this->_template_args, TRUE);
		$this->display_admin_page_with_sidebar();
	}

	/**
	 * 		_update_default_event_settings
	 * 		@access protected
	 * 		@return array
	 */
	protected function _update_default_event_settings() {

		$data = array();
		$data['default_reg_status'] = isset($this->_req_data['default_reg_status']) ? sanitize_text_field($this->_req_data['default_reg_status']) : 'RPN';
		$data['pending_counts_reg_limit'] = isset($this->_req_data['pending_counts_reg_limit']) ? absint($this->_req_data['pending_counts_reg_limit']) : TRUE;
		$data['use_attendee_pre_approval'] = isset($this->_req_data['use_attendee_pre_approval']) ? absint($this->_req_data['use_attendee_pre_approval']) : TRUE;

		$data = apply_filters('FHEE_default_event_settings_save', $data);

		$what = 'Default Event Settings';
		$success = $this->_update_espresso_configuration($what, $data, __FILE__, __FUNCTION__, __LINE__);
		$this->_redirect_after_action($success, $what, 'updated', array('action' => 'default_event_settings'));
	}

	

	/**
	 * _events_export
	 * Will export all (or just the given event) to a Excel compatible file.
	 * 
	 * @access protected
	 * @return file 
	 */
	protected function _events_export() {

		//todo: I don't like doing this but it'll do until we modify EE_Export Class.
		$new_request_args = array(
			'export' => 'report',
			'action' => 'all_event_data',
			'event_id' => $this->_req_data['EVT_ID'],
		);
		$this->_req_data = array_merge($this->_req_data, $new_request_args);

		if (file_exists(EE_CLASSES . 'EE_Export.class.php')) {
			require_once(EE_CLASSES . 'EE_Export.class.php');
			$EE_Export = EE_Export::instance($this->_req_data);
			$EE_Export->export();
		}
	}

	/**
	 * _payment_export
	 * Will export payments for events to an excel file (or for given events)
	 * @return file?
	 */
	protected function _payment_export() {

		//todo: I don't like doing this but it'll do until we modify EE_Export Class.
		$new_request_args = array(
			'export' => 'report',
			'action' => 'payment',
			'type' => 'csv',
			'event_id' => $this->_req_data['EVT_ID'],
		);
		$this->_req_data = array_merge($this->_req_data, $new_request_args);
		if (file_exists(EE_CLASSES . 'EE_Export.class.php')) {
			require_once(EE_CLASSES . 'EE_Export.class.php');
			$EE_Export = EE_Export::instance();
			$EE_Export->export();
		}
	}
	/**
	 * for GET requests to 
	 */

	protected function _import_page(){
		
		$title = __('Import Events', 'event_espresso');
		$intro = __('If you have a previously exported list of Event Details in a Comma Separated Value (CSV) file format, you can upload the file here: ', 'event_espresso');
		$form_url = EVENTS_ADMIN_URL;
		$action = 'import_events';
		$type = 'csv';
		$content = EE_Import::instance()->upload_form($title, $intro, $form_url, $action, $type);
		
		$this->_admin_page_title .= $this->get_action_link_or_button('create_new', 'add', array(), 'button add-new-h2');

		$title_cat = __( 'Import Event Categories', 'event_espresso' );
		$intro_cat = __( 'If you have a previously exported list of Event Categories in a Comma Separated Value (CSV) file format, you can upload the file here: ', 'event_espresso' );
		$form_url_cat = EVENTS_ADMIN_URL;
		$action_cat = 'import_categories';
		$type_cat = 'csv';
		$content .= EE_Import::instance()->upload_form( $title_cat, $intro_cat, $form_url_cat, $action_cat, $type_cat );

		$this->_template_args['admin_page_content'] = $content;
		$this->display_admin_page_with_sidebar();
	}
	/**
	 * _import_events
	 * This handles displaying the screen and running imports for importing events.
	 * 	
	 * @return string html
	 */
	protected function _import_events() {
		require_once(EE_CLASSES . 'EE_Import.class.php');
		$success = EE_Import::instance()->import();
		$this->_redirect_after_action($success, 'Import File', 'ran', array('action' => 'import_page'),true);
		
	}
	
	



	/** Event Category Stuff **/

	/**
	 * set the _category property with the category object for the loaded page.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_category_object() {
		if ( isset( $this->_category->id ) && !empty( $this->_category->id ) )
			return; //already have the category object so get out.

		//set default category object
		$this->_set_empty_category_object();
		
		//only set if we've got an id
		if ( !isset($this->_req_data['EVT_CAT_ID'] ) ) {
			return;
		}

		$category_id = absint($this->_req_data['EVT_CAT_ID']);
		$term = get_term( $category_id, 'espresso_event_categories' );


		if ( !empty( $term ) ) {
			$this->_category->category_name = $term->name;
			$this->_category->category_identifier = $term->slug;
			$this->_category->category_desc = $term->description;
			$this->_category->id = $term->term_id;
		}
	}




	private function _set_empty_category_object() {
		$this->_category = new stdClass();
		$this->_category->id = $this->_category->category_name = $this->_category->category_identifier = $this->_category->category_desc = '';
	}



	public function unique_id_help_tab() {
		?>		
			<h2><?php _e('Unique Category Identifier', 'event_espresso'); ?></h2>
			<p><?php _e('This should be a unique identifier for the category. Example: "category1" (without qoutes.)', 'event_espresso'); ?></p>
			<p><?php printf( __('The unique ID can also be used in individual pages using the %s shortcode', 'event_espresso'), '[EVENT_ESPRESSO_CATEGORY category_id="category_identifier"]' ); ?>.</p>		
		<?php
	}




	protected function _category_list_table() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->get_action_link_or_button('add_category', 'add_category', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}


	protected function _category_details($view) {

		//load formatter helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Formatter.helper.php';
		//load field generator helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';

		$route = $view == 'edit' ? 'update_category' : 'insert_category';
		$this->_set_add_edit_form_tags($route);

		$this->_set_category_object();
		$id = !empty($this->_category->id) ? $this->_category->id : '';

		$delete_action = $this->_category->category_identifier == 'uncategorized' ? FALSE : 'delete_category';

		$this->_set_publish_post_box_vars( 'category_id', $id, $delete_action );

		//take care of contents
		$this->_template_args['admin_page_content'] = $this->_category_details_content();
		$this->display_admin_page_with_sidebar();
	}



	protected function _category_details_content() {
		$editor_args['category_desc'] = array(
			'type' => 'wp_editor',
			'value' => EE_Formatter::admin_format_content($this->_category->category_desc),
			'class' => 'my_editor_custom'
		);
		$_wp_editor = $this->_generate_admin_form_fields( $editor_args, 'array' );
		$template_args = array(
			'category' => $this->_category,
			'unique_id_info_help_link' => $this->_get_help_tab_link('unique_id_info'),
			'category_desc_editor' =>  $_wp_editor['category_desc']['field'],
			'disable' => $this->_category->category_identifier == 'uncategorized' ? ' disabled' : '',
			'disabled_message' => $this->_category->category_identifier == 'uncategorized' ? TRUE : FALSE
			);
		$template = EVENTS_TEMPLATE_PATH . 'event_category_details.template.php';
		return espresso_display_template($template, $template_args, TRUE );
	}


	protected function _delete_categories() {
		$cat_ids = isset( $this->_req_data['EVT_CAT_ID'] ) ? (array) $this->_req_data['EVT_CAT_ID'] : (array) $this->_req_data['category_id'];

		foreach ( $cat_ids as $cat_id ) {
			$this->_delete_category($cat_id);
		}

		//doesn't matter what page we're coming from... we're going to the same place after delete.
		$query_args = array(
			'action' => 'category_list'
			);
		$this->_redirect_after_action(0,'','',$query_args);

	}





	protected function _delete_category($cat_id) {
		global $wpdb;
		$cat_id = absint( $cat_id );
		wp_delete_term( $cat_id, 'espresso_event_categories' );
	}



	protected function _insert_or_update_category($new_category) {

		$cat_id = $new_category ? $this->_insert_category() : $this->_insert_category( TRUE );
		$success = 0; //we already have a success message so lets not send another.
		$query_args = array(
			'action' => 'edit_category', 
			'EVT_CAT_ID' => $cat_id
		);
		$this->_redirect_after_action( $success, '','', $query_args );

	}



	private function _insert_category( $update = FALSE ) {
		global $wpdb;
		$cat_id = '';
		$category_name= $this->_req_data['category_name'];
		$category_identifier = $this->_req_data['category_identifier'];
		$category_desc= $this->_req_data['category_desc']; 


	
		$term_args=array(
			'category_name'=>$category_name, 
			'slug'=>$category_identifier, 
			'description'=>$category_desc,
			//'parent'=>$espresso_wp_user //eventually this will be added.
		);
		
		$insert_ids = $update ? wp_update_term( $category_name, 'espresso_event_categories', $term_args ) :wp_insert_term( $category_name, 'espresso_event_categories', $term_args );

		if ( !is_array( $insert_ids ) ) {
			$msg = __( 'An error occured and the category has not been saved to the database.', 'event_espresso', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		} else {
			$cat_id = $insert_ids['term_id'];
			$msg = sprintf ( __('The category %s was successfuly created', 'event_espresso'), $category_name );
			EE_Error::add_success( $msg );
		}
		
		return $cat_id;
	}


	/**
	 * TODO handle category exports()
	 * @return file export
	 */
	protected function _categories_export() {

		//todo: I don't like doing this but it'll do until we modify EE_Export Class.
		$new_request_args = array(
			'export' => 'report',
			'action' => 'categories',
			'category_ids' => $this->_req_data['EVT_CAT_ID']
			);

		$this->_req_data = array_merge( $this->_req_data, $new_request_args );

		if ( file_exists( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php') ) {
			require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance( $this->_req_data );
			$EE_Export->export();
		}

	}





	protected function _import_categories() {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
		EE_Import::instance()->import();

	}




	public function get_categories( $per_page = 10, $current_page = 1, $count = FALSE ) {
		global $wpdb;

		//testing term stuff
		$orderby = isset( $this->_req_data['orderby'] ) ? $this->_req_data['orderby'] : 'Term.term_id';
		$order = isset( $this->_req_data['order'] ) ? $this->_req_data['order'] : 'DESC';
		$limit = ($current_page-1)*$per_page;


		$query_params = array(
			0 => array( 'taxonomy' => 'espresso_event_categories' ),
			'order_by' => array( $orderby => $order ),
			'limit' => $limit . ',' . $per_page,
			'force_join' => array('Term')
			);

		$categories = $count ? EEM_Term_Taxonomy::instance()->count( $query_params, 'term_id' ) :EEM_Term_Taxonomy::instance()->get_all( $query_params );

		return $categories;
	}


	/* end category stuff */
	/**************/

}
//end class Events_Admin_Page
