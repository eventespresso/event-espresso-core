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
 * Events_Admin_Page
 *
 * This contains the logic for setting up the Events related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 events related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Events model is setup)
 *
 * @package		Events_Admin_Page
 * @subpackage	includes/core/admin/Events_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Events_Admin_Page extends EE_Admin_Page {


	/**
	 * _event
	 * This will hold the event object for event_details screen.
	 *
	 * @access protected
	 * @var object
	 */
	protected $_event;


	public function __construct() {
		parent::__construct();
	}




	protected function _init_page_props() {
		$this->page_slug = EVENTS_PG_SLUG;
		$this->page_label = EVENTS_LABEL;
	}




	protected function _ajax_hooks() {
		//todo: all hooks for events ajax goes in here.
	}





	protected function _define_page_props() {
		$this->_admin_base_url = EVENTS_ADMIN_URL;
		$this->_admin_page_title = EVENTS_LABEL;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Event', 'event_espresso'),
				'edit' => __('Edit Event', 'event_espresso'),
				'delete' => __('Delete Event', 'event_espresso')
			)
		);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(
		
			'default' => '_events_overview_list_table',
			
			'edit_event' => array(
				'func' => '_event_details',
				'args' => array('edit')
				),
				
			'add_event' => array(
				'func' => '_event_details',
				'args' => array('add')
				),
				
			'insert_event' => array(
				'func' => '_insert_or_update_event',
				'args' => array('new_event' => TRUE),
				'noheader' => TRUE
				 ),
				
			'update_event' => array(
				'func' => '_insert_or_update_event',
				'args' => array('new_event' => FALSE ), 
				'noheader' => true
				),
				
			'copy_event' => array(
				'func' => '_copy_events',
				'noheader' => true
				),

			'trash_event' => array(
				'func' => '_trash_or_restore_event',
				'args' => array( 'event_status' => 'D' ), 
				'noheader' => true
				),

			'trash_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array( 'event_status' => 'D' ), 
				'noheader' => true
				),

			'restore_event' => array(
				'func' => '_trash_or_restore_event',
				'args' => array( 'event_status' => 'A' ), 
				'noheader' => true
				),

			'restore_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array( 'event_status' => 'A' ), 
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

//			'export_payments' => array(
//				'func' => '_payment_export',
//				'noheader' => true
//				),

			'import' => '_import_events',
			'import_events' => '_import_events',

			'default_event_settings' => '_default_event_settings',

			'update_default_event_settings' => array(
				'func' => '_update_default_event_settings',
				'noheader' => TRUE,
				),		
					
			);
	}




	protected function _set_page_config() {

						
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
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box')
				),
				
			'add_event' => array(
				'nav' => array(
					'label' => __('Add Event', 'event_espresso'),
					'order' => 15,
					'persistent' => false
					),
				'metaboxes' => array( '_publish_post_box', '_register_event_editor_meta_boxes', '_premium_event_editor_meta_boxes' ),
				'help_tabs' => array(
					'event_date_info' => array(
						'title' => __('Event Date', 'event_espresso'),
						'callback' => 'event_date_info_help_tab'
						),
					'reg_date_info' => array(
						'title' => __('Registration Dates/Times', 'event_espresso'),
						'callback' => 'reg_date_info_help_tab'
						)
					)
				),
				
			'edit_event' => array(
				'nav' => array(
					'label' => __('Edit Event', 'event_espresso'),
					'order' => 15,
					'persistent' => false,
					'url' => isset($this->_req_data['EVT_ID']) ? add_query_arg(array('EVT_ID' => $this->_req_data['EVT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array( '_publish_post_box', '_register_event_editor_meta_boxes', '_premium_event_editor_meta_boxes' ),
				'help_tabs' => array(
					'event_date_info' => array(
						'title' => __('Event Date', 'event_espresso'),
						'callback' => 'event_date_info_help_tab'
						),
					'reg_date_info' => array(
						'title' => __('Registration Dates/Times', 'event_espresso'),
						'callback' => 'reg_date_info_help_tab'
						)
					)
				),
				
			'default_event_settings' => array(
				'nav' => array(
					'label' => __('Default Settings', 'event_esprsso'),
					'order' => 40
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
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
				)
				
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
	*		@access public
	*		@return void
	*/
	public function default_event_settings_help_tab( $tab_name ) {
		require_once( EVENTS_TEMPLATE_PATH . 'default_event_settings_help_tab.template.php' );
		$template = call_user_func( $tab_name . '_html' );
		espresso_display_template( $template, array() );
	}
	public function events_expire_on_reg_end_date_help_tab() { $this->default_event_settings_help_tab( __FUNCTION__ ); }
	public function default_payment_status_help_tab() { $this->default_event_settings_help_tab( __FUNCTION__ ); }


	/**
	 * event edit help tabs
	 * @access public
	 * @return void
	 */
	public function event_edit_help_tab( $tab_name ) {
		require_once EVENTS_TEMPLATE_PATH . 'event_edit_help_tab.template.php';
		$template = call_user_func( $tab_name . '_html' );
		espresso_display_template( $template, array() );
	}
	public function event_date_info_help_tab(){
		$this->event_edit_help_tab( __FUNCTION__ );
	}
	public function reg_date_info_help_tab(){
		$this->event_edit_help_tab( __FUNCTION__ );
	}
	



	


	public function load_scripts_styles() {

		wp_register_style('events-admin-css', EVENTS_ASSETS_URL . 'events-admin-page.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('events-admin-css');
		//todo note: we also need to load_scripts_styles per view (i.e. default/view_report/event_details	
	}



	/**
	 * enqueuing scripts and styles specific to this view
	 * @return void
	 */
	public function load_scripts_styles_add_event() {
		$this->load_scripts_styles_edit_event();
	}




	/**
	 * enqueuing scripts and styles specific to this view
	 * @return void 
	 */
	public function load_scripts_styles_edit_event() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

		//scripts
		wp_register_script('event_editor_js', EVENTS_ASSETS_URL . 'event_editor.js', array( 'ee_admin_js', 'jquery-ui-slider', 'jquery-ui-timepicker-addon', 'jquery-validate' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script('event_editor_js');
		
		global $eei18n_js_strings;
		$eei18n_js_strings['image_confirm'] = __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso');
		wp_localize_script( 'event_editor_js', 'eei18n', $eei18n_js_strings );	
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
					'export_events' 		=> __('Export Events', 'event_espresso'),
					'restore_events' 	=> __('Restore from Trash', 'event_espresso'),
					'trash_events' 		=> __('Move to Trash', 'event_espresso'),
					'delete_events' 		=> __('Delete Permanently', 'event_espresso'),
//					'export_payments' => __('Export Payments', 'event_espresso')
					)
				),
			'today' => array(
				'slug' => 'today',
				'label' => __('Today', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'export_events' 		=> __('Export Events', 'event_espresso'),
					'restore_events' 	=> __('Restore from Trash', 'event_espresso'),
					'trash_events' 		=> __('Move to Trash', 'event_espresso'),
					'delete_events' 		=> __('Delete Permanently', 'event_espresso'),
//					'export_payments' => __('Export Payments', 'event_espresso')
					)
				),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'export_events' 		=> __('Export Events', 'event_espresso'),
					'restore_events' 	=> __('Restore from Trash', 'event_espresso'),
					'trash_events' 		=> __('Move to Trash', 'event_espresso'),
					'delete_events' 		=> __('Delete Permanently', 'event_espresso'),
//					'export_payments' => __('Export Payments', 'event_espresso')
					)
				)
			);
	}





	protected function _event_legend_items() {
		$items = array(
			'view_details' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/magnifier.png',
				'desc' => __('View Event', 'event_espresso')
				),
			'edit_event' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/calendar_edit.png',
				'desc' => __('Edit Event Details', 'event_espresso')
				),
			'view_attendees' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/group.png',
				'desc' => __('View Registrations for Event', 'event_espresso')
				),
			'event_reports' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/chart_bar.png',
				'desc' => __('View Event Reports.', 'event_espresso')
				),
			'event_shortcode' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/tag.png',
				'desc' => __('Get ShortURL/Shortcode for Event', 'event_espresso')
				),
			'csv_export' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/csv_icon_sm.gif',
				'desc' => __('Export Event details to csv', 'event_espresso')
				)
			);
		return $items;
	}





	/**
	 * _events_overview_list_table
	 * This contains the logic for showing the events_overview list
	 *
	 * @access protected
	 * @return string html for generated table
	 */
	protected function _events_overview_list_table() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_template_args['after_list_table'] = $this->_display_legend( $this->_event_legend_items() );
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_event', 'add', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_no_sidebar();
	}






	/**
	 * _event_details
	 * Depending on the given argument, this will display the event_details page (add or edit)	
	 * @access protected
	 * @param  string $view add or edit
	 * @return string     html for event_details page.
	 */
	protected function _event_details($view) {

		//load formatter helper
		require_once ( EE_HELPERS . 'EE_Formatter.helper.php' );
		//load field generator helper
		require_once ( EE_HELPERS . 'EE_Form_Fields.helper.php' );
		//set _event property
		$this->_set_event_object();
		// form 
		$route = $view == 'edit' ? 'update_event' : 'insert_event';
		$this->_set_add_edit_form_tags($route);

		$this->_generate_event_title_and_desc();
		$this->_generate_publish_box_extra_content();
		
		$EVT_ID = isset($this->_event->id) ? $this->_event->id : '';
		// add delete link, but only if on edit page
		$delete_link = $view == 'edit' ? 'delete_event' : FALSE;
		$this->_set_publish_post_box_vars( 'EVT_ID', $EVT_ID, $delete_link );

		$this->display_admin_page_with_sidebar();

	}




	/**
	 * 	_generate_event_title_and_desc
	 * 	@access private
	 * @return void
	 */
	private function _generate_event_title_and_desc() {
		require_once ( EE_HELPERS . 'EE_Formatter.helper.php' );
		// title and desc content
		$title_and_desc_args['event_name'] = htmlentities( stripslashes( $this->_event->event_name ), ENT_QUOTES, 'UTF-8');
		$title_and_desc_args['event_page_url'] = $this->_event->page_url;
		$title_and_desc_args['event_slug'] = $this->_event->slug;
		$title_and_desc_args['event_is_new'] = $this->_event->is_new;
		$title_and_desc_args['event_identifier'] = $this->_event->event_identifier;
		$title_and_desc_args['shortlink'] = add_query_arg( array( 'ee' => $this->_event->id ), $this->_event->page_url );	
		// desc editor
		$editor_args['event_desc'] = array(
				'type' => 'wp_editor',
				'value' => EE_Formatter::admin_format_content($this->_event->event_desc),
				'class' => 'my_editor_custom'
			);
		$_wp_editor = $this->_generate_admin_form_fields($editor_args, 'array');
		$title_and_desc_args['event_desc_editor'] = $_wp_editor['event_desc']['field'];
		// load template
		$this->_template_args['admin_page_content'] = espresso_display_template( EVENTS_TEMPLATE_PATH . 'event_title_and_desc.template.php', $title_and_desc_args, TRUE );
	}




	/**
	 * 	_generate_publish_box_extra_content
	 * 	@access private
	 * @return void
	 */
	private function _generate_publish_box_extra_content() {
		require_once ( EE_HELPERS . 'EE_Formatter.helper.php' );
		// publish box
		$publish_box_extra_args['reg_url'] = espresso_reg_url($this->_event->id, $this->_event->slug);
		$publish_box_extra_args['event_id'] = $this->_event->id;
		$publish_box_extra_args['event_preview_url'] = add_query_arg( array( 'action' => 'copy_event', 'event_id' => $this->_event->id ), EVENTS_ADMIN_URL ); 
		$publish_box_extra_args['event_name'] = $this->_event->event_name;
		$publish_box_extra_args['event_start_date'] = EE_Formatter::event_date_display($this->_event->start_date);
		$publish_box_extra_args['event_status_display'] = $this->_event->status['display'];
		$publish_box_extra_args['view_attendees_url'] = add_query_arg( array( 'action' => 'default', 'event_id' => $this->_event->id ), REG_ADMIN_URL ); 
		$publish_box_extra_args['attendees_reg_limit'] = get_number_of_attendees_reg_limit($this->_event->id, 'num_attendees_slash_reg_limit', $this->_event->reg_limit ); 
		$publish_box_extra_args['misc_pub_section_class'] = apply_filters('FHEE_event_editor_email_attendees_class', 'misc-pub-section');
		$publish_box_extra_args['email_attendees_url'] = add_query_arg( array( 'event_admin_reports' => 'event_newsletter', 'event_id' => $this->_event->id ), 'admin.php?page=espresso_registrations' ); 
		$publish_box_extra_args['event_editor_overview_add'] = do_action( 'AHEE_event_editor_overview_add', $this->_event ); 
		// load template
		$this->_template_args['publish_box_extra_content'] = espresso_display_template( EVENTS_TEMPLATE_PATH . 'event_publish_box_extras.template.php', $publish_box_extra_args, TRUE );
	}







	protected function _publish_box_extra_content() {
		ob_start();
		?>
		<?php
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}






	/**
	 * _set_event_object
	 * this sets the _event property for the event details screen.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_event_object() {
		if ( is_object($this->_event) )
			return; //get out we've already set the object

		if ( isset($this->_req_data['EVT_ID']) ) {
			$this->_set_edit_event_object();
		} else {
			$this->_set_add_event_object();
		}
	}




	/**
	 * _set_add_event_object
	 * this sets the _event property for the event details screen when adding.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_add_event_object() {
		global $wpdb, $org_options, $current_user;
		get_currentuserinfo();
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$this->_event = new stdClass();
		$this->_event->is_new = TRUE;
		$this->_event->id = 0;
		$this->_event->event_name = '';
		$this->_event->start_date = date( 'Y-m-d', time() + (60 * 60 * 24 * 30));
		$this->_event->event_desc = '';
		$this->_event->phone = '';
		//$this->_event->externalURL = '';
		//$this->_event->early_disc = '';
		//$this->_event->early_disc_date = '';
		//$this->_event->early_disc_percentage = '';
		$this->_event->event_identifier = '';

		$this->_event->status = array('display' => 'OPEN');
		$this->_event->address = '';
		$this->_event->address2 = '';
		$this->_event->city = '';
		$this->_event->state = '';
		$this->_event->zip = '';
		$this->_event->country = '';
		$this->_event->virtual_url = '';
		$this->_event->virtual_phone = '';
		$this->_event->submitted = '';

		require_once EE_HELPERS . 'EE_Maps.helper.php';
		$atts = array( 
			'address' => $this->_event->address,
			'city' => $this->_event->city,
			'state' => $this->_event->state,
			'zip' => $this->_event->zip,
			'country' => $this->_event->country
		);
		$this->_event->google_map_link = EE_Maps::google_map_link( $atts );
				
				
		$this->_event->event_meta = array(
				'additional_attendee_reg_info' => 1,
				'default_reg_status' => '',
				//'add_attendee_question_groups' => array('1'),
				'originally_submitted_by' => $current_user->ID);
		$this->_event->wp_user = $current_user->ID;
		
/*		$this->_event->question_groups = array();
		$sql = "SELECT qg.* FROM " . EVENTS_QST_GROUP_TABLE . " qg JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr ON qg.id = qgr.group_id ";
		$sql2 = apply_filters('FHEE_event_editor_question_groups_sql', " WHERE wp_user = '0' OR wp_user = '1' ", $this->_event->id);
		$sql .= $sql2 . " GROUP BY qg.id ORDER BY qg.group_order";
		$sql = apply_filters('FHEE_question_group_sql', $sql);
		//Debug:
		//echo $sql;
		$this->_event->q_groups = $wpdb->get_results($sql);		
		$this->_event->num_rows = $wpdb->num_rows;*/
		
		$this->_event->reg_limit = '';
		$this->_event->allow_multiple = false;
		$this->_event->additional_limit = 0;
		$this->_event->is_active = true;
		$this->_event->event_status = 'A';
		$this->_event->display_desc = true;
		$this->_event->display_reg_form = true;
		//$this->_event->alt_email = '';
		$this->_event->require_pre_approval = false;
		$this->_event->member_only = false;
		$this->_event->ticket_id = 0;
		$this->_event->certificate_id = 0;
		$this->_event->post_id = '';
		$this->_event->slug = '';
		$this->_event->venue_id = FALSE;
		$this->_event->venue_title = '';
		$this->_event->venue_url = '';
		$this->_event->venue_phone = '';
		$this->_event->venue_image = '';
		$this->_event = apply_filters('FHEE_new_event_template', $this->_event);
		$this->_event->page_url = get_permalink($org_options['event_page_id']);
	}






	/**
	 * _set_edit_event_object
	 * this sets the _event property for the event details screen when adding.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_edit_event_object() {
		global $wpdb, $org_options;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		//check if we have an event_id if not then lets setup defaults for adding an event.
		if ( !isset($this->_req_data['EVT_ID']) ) {
			$this->_set_add_event_object();
			return;
		}

		$event_id = $this->_req_data['EVT_ID'];

		$sql = "SELECT e.*, ev.id as venue_id
		FROM " . EVENTS_DETAIL_TABLE . " e
		LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON e.id = vr.event_id
		LEFT JOIN " . EVENTS_VENUE_TABLE . " ev ON vr.venue_id = ev.id
		WHERE e.id = %d";
		$this->_event = $wpdb->get_row($wpdb->prepare($sql, $event_id), OBJECT);

		if ( empty( $this->_event) )
			return;
		
		require_once ( EE_HELPERS . 'EE_Formatter.helper.php' );
		// grab event times
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$this->_event->start_date = EEM_Datetime::instance()->get_event_start_date( $this->_event->id );
		
		//Debug
		//echo "<pre>".print_r($event,true)."</pre>";
		$this->_event->is_new = FALSE;
		$this->_event->event_name = stripslashes_deep($this->_event->event_name);
		$this->_event->event_desc = stripslashes_deep($this->_event->event_desc);
		$this->_event->phone = stripslashes_deep($this->_event->phone);
		$this->_event->externalURL = stripslashes_deep($this->_event->externalURL);
		//$this->_event->early_disc = stripslashes_deep($this->_event->early_disc);
		//$this->_event->early_disc_date = stripslashes_deep($this->_event->early_disc_date);
		//$this->_event->early_disc_percentage = stripslashes_deep($this->_event->early_disc_percentage);
		$this->_event->event_identifier = stripslashes_deep($this->_event->event_identifier);
	//	$this->_event->start_time = isset($this->_event->start_time) ? $this->_event->start_time : '';
	//	$this->_event->end_time = isset($this->_event->end_time) ? $this->_event->end_time : '';
		$this->_event->status = array();
		$this->_event->status = event_espresso_get_is_active($this->_event->id);
		$this->_event->address = stripslashes_deep($this->_event->address);
		$this->_event->address2 = stripslashes_deep($this->_event->address2);
		$this->_event->city = stripslashes_deep($this->_event->city);
		$this->_event->state = stripslashes_deep($this->_event->state);
		$this->_event->zip = stripslashes_deep($this->_event->zip);
		$this->_event->country = stripslashes_deep($this->_event->country);
		$this->_event->submitted = $this->_event->submitted != '0000-00-00 00:00:00' ? ( empty( $this->_event->submitted ) ? '' : EE_Formatter::event_date_display( $this->_event->submitted ) ) : 'N/A';
		
		require_once EE_HELPERS . 'EE_Maps.helper.php';
		$atts = array( 
			'address' => $this->_event->address,
			'city' => $this->_event->city,
			'state' => $this->_event->state,
			'zip' => $this->_event->zip,
			'country' => $this->_event->country
		);
		$this->_event->google_map_link = EE_Maps::google_map_link( $atts );
		
		
		$this->_event->event_meta = unserialize($this->_event->event_meta);
		
		$this->_event->page_url = get_permalink($org_options['event_page_id']);
	}





	/***************/
	/** METABOXES **/



	/**
	 * _register_event_editor_meta_boxes
	 * add all metaboxes related to the event_editor
	 * 
	 * @return [type] [description]
	 */
	protected function _register_event_editor_meta_boxes() {
		
		$this->_set_event_object();
		// Dates & Times
		add_meta_box('espresso_event_editor_date_time', __('Dates &amp; Times', 'event_espresso'), array( $this, 'date_time_metabox' ), $this->_current_screen->id, 'normal', 'high');
		// Event Pricing
		add_meta_box('espresso_event_editor_pricing', __('Event Pricing', 'event_espresso'), array( $this, 'pricing_metabox' ), $this->_current_screen->id, 'normal', 'core');
		// Venue Details
		add_meta_box('espresso_event_editor_venue', __('Venue Details', 'event_espresso'), array( $this, 'venue_metabox' ), $this->_current_screen->id, 'normal', 'core');		
		// Questions for Primary Attendee
		add_meta_box('espresso_event_editor_primary_questions', __('Questions for Primary Attendee', 'event_espresso'), array( $this, 'primary_questions_group_meta_box' ), $this->_current_screen->id, 'side', 'core');
		//Event Category
		add_meta_box('espresso_event_editor_categories', __('Event Category', 'event_espresso'), array( $this, 'categories_meta_box' ), $this->_current_screen->id, 'side', 'default');
	}





	



	public function date_time_metabox() {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		global $org_options, $times;

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$DTM_MDL = EEM_Datetime::instance();
		// grab event times
		$times = $DTM_MDL->get_all_event_dates( $this->_event->id );
		
		$datetime_IDs = array();
		?>

		
		<div id="event-datetimes-dv" class="" >

			<table id="event-dates-and-times" class="">
				<thead>
					<tr valign="top">
						<td> <?php echo __('Event Starts on', 'event_espresso') ?> 
							<?php echo $this->_get_help_tab_link('event_date_info'); ?>
							 </td>
						<td><?php echo __('Event Ends on', 'event_espresso') ?></td>
						<td><?php echo __('Registration Starts on', 'event_espresso') ?>
							<?php echo $this->_get_help_tab_link('reg_date_info'); ?>
						 </td>
						<td><?php echo __('Registration Ends on', 'event_espresso') ?></td>					
						<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <td><?php echo __('Max Reg Limit', 'event_espresso'); ?></td>*/ ?>
					</tr>
				</thead>
				
				<?php $row = 1; ?>
				
				<?php foreach ($times as $time) : ?>
					<tr valign="top" id="event-dates-and-times-row-<?php echo $row; ?>" class="">
						<td class="">
							<div class="small-screen-table-label"><?php echo __('Event Starts on', 'event_espresso') ?>
								<?php echo $this->_get_help_tab_link('event_date_info'); ?>
							 </div>
							<input id="event-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_start]" type="text" class="dtm-es-picker dtm-inp" value="<?php echo $time->start_date_and_time(  'Y-m-d '  ); ?>"/>
							<input name="event-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
							<?php if ($time->ID()) { ?>
							<?php $datetime_IDs[$row] = $time->ID(); ?>
							<input id="ID-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][ID]" type="hidden" value="<?php echo $time->ID(); ?>"/>
							<?php } ?>						
							<input id="is-primary-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][is_primary]" type="hidden" value="<?php echo $time->is_primary(); ?>" />
						</td>

						<td class="">
							<div class="small-screen-table-label"><?php echo __('Event Ends on', 'event_espresso') ?></div>
							<input id="event-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_end]" type="text" class="dtm-ee-picker dtm-inp" value="<?php echo $time->end_date_and_time(  'Y-m-d '  ); ?>"/>
							<input name="event-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
						</td>
						
						<td class="">
							<div class="small-screen-table-label"><?php echo __('Registration Starts on', 'event_espresso') ?></div>
							<input id="reg-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_start]" type="text" class="dtm-rs-picker dtm-inp" value="<?php echo $time->reg_start_date_and_time(  'Y-m-d '  ) ?>" />
							<input name="reg-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
						</td>

						<td class="">
							<div class="small-screen-table-label"><?php echo __('Registration Ends on', 'event_espresso') ?></div>
							<input id="reg-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_end]" type="text" class="dtm-re-picker dtm-inp" value="<?php echo $time->reg_end_date_and_time(  'Y-m-d '  ) ?>" />
							<input name="reg-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
						</td>
						
					</tr>
					<?php $row++; ?>
				<?php endforeach; // ($times as $time)  ?>
			</table>
			<br class="clear"/>

		</div>

		<input  type="hidden" name="datetime_IDs" value="<?php echo serialize( $datetime_IDs ); ?>"/>
		<input  type="hidden" id="process_datetimes" name="process_datetimes" value="1"/>

		<?php
	}





	public function pricing_metabox() {
		global $org_options;


		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		$show_no_event_price_msg = FALSE;		
		
		global $all_prices;
		if ( ! $all_prices = $PRC->get_all_event_prices_for_admin( $this->_event->id )) {
			$all_prices = array();
		}
		
		if ( empty( $all_prices[1] ) && empty( $all_prices[2] )) {
			$show_no_event_price_msg = TRUE;
		}
//		printr( $all_prices, '$all_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $PRT->type, '$PRT->type  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		foreach ($PRT->type as $type) {
			$all_price_types[] = array( 'id' => $type->ID(), 'text' => $type->name(), 'order' => $type->order() );
			if ( $type->is_global() ) {
				$global_price_types[ $type->ID() ] = $type;
			} else {
				$price_types[] = array( 'id' => $type->ID(), 'text' => $type->name(), 'order' => $type->order() );
			}						
		}
//		echo printr( $global_price_types, '$global_price_types' );
		
		$table_class = apply_filters('FHEE_pricing_table_class_filter', 'event_editor_pricing');
		?>


		<div id="ticket-prices-dv" class="">

		<?php if ( $show_no_event_price_msg ) : ?>
			<div class="error">
				<p><?php _e('There are currently no Prices set for this Event. Please see the Event Pricing section for more details.', 'event_espresso'); ?></p>
			</div>	
			<div id="no-ticket-prices-msg-dv">
				<p>
				<?php
				$no_prices_error_msg = apply_filters( 'FHEE_no_prices_error_msg', __( 'Please enter at lease one Event Price for this Event to ensure that this Event displays and functions properly.', 'event_espresso' ));
				 echo $no_prices_error_msg;
				?>					
				</p>
			</div>
		<?php endif; ?>

		<table id="event_editor_pricing" class="<?php echo $table_class;?>" width="100%" >
			<thead>
				<tr>
					<td class="event-price-tbl-hdr-type"><b><?php //_e('Type'); ?></b></td>
					<td class="event-price-tbl-hdr-name"><b><?php _e('Name', 'event_espresso'); ?></b></td>
					<td class="event-price-tbl-hdr-amount"><b><?php _e('Amount', 'event_espresso'); ?></b></td>
					<td class="event-price-tbl-hdr-actions"></td>
					<td class="event-price-tbl-hdr-desc"></td>
				</tr>
			</thead>
<?php 
		$counter = 1;
		
		if ( ! empty( $all_prices )) {			
			foreach ( $all_prices as $price_type => $prices ) {
				foreach ( $prices as $price ) {
					if ( ! $price->deleted() && isset( $PRT->type[$price->type()] )) {
						//printr( $price, '$price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						$disabled = ! $price->is_active() ? ' disabled="disabled"' : ''; 
						$disabled_class = ! $price->is_active() ? ' input-disabled' : ''; 
						$inactive = ! $price->is_active() ? '<span class="inactice-price">'.__('inactive price - edit advanced settings to reactivate', 'event_espresso').'</span>' : FALSE; 
						if ( $price->use_dates() ){
							$today = time();
							if ( $today < $price->start_date( FALSE ) ){
								$price_date_status = '<a title="'. __('This Event Price option is not yet active', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/timer-pending-16x22.png" width="16" height="22" alt="'. __('This Event Price option is not yet active', 'event_espresso') . '" class="price-date-status-img"/></a>';					
							} elseif ( $today > $price->start_date( FALSE ) && $today < $price->end_date( FALSE ) ) {
								$price_date_status = '<a title="'. __('This Event Price option is currently active', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/timer-active-16x22.png" width="16" height="22" alt="'. __('This Event Price option is currently active', 'event_espresso') . '" class="price-date-status-img"/></a>';					
							} else {
								$price_date_status = '<a title="'. __('This Event Price option has expired', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/timer-expired-16x22.png" width="16" height="22" alt="'. __('This Event Price option has expired', 'event_espresso') . '" class="price-date-status-img"/></a>';
								$disabled = ' disabled="disabled"'; 
								$disabled_class = ' input-disabled'; 
								$inactive = '<span class="inactice-price">'.__('This Event Price option has expired - edit advanced settings to reactivate', 'event_espresso').'</span>';
							}
						} else {
							$price_date_status = '';
						}
						
				?>
					
					<tr>
						<td colspan="6">
							<div id="event-price-<?php echo $price->ID(); ?>" class="event-price-dv">
								<table class="ticket-price-quick-edit-tbl" width="100%">
									<tr>
									
										<td class="type-column ticket-price-quick-edit-column"> 
											<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
											<span><?php echo $PRT->type[$price->type()]->name() . ' ' . $price_date_status; ?></span>
										</td> 

										<td class="name-column ticket-price-quick-edit-column"> 
											<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
											<input class="edit-ticket-price-input quick-edit regular-text required<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
										</td> 
										
										<td class="amount-column ticket-price-quick-edit-column"> 
											<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
											<span class="cur-sign jst-rght"><?php echo ($PRT->type[$price->type()]->is_percent()) ?  '' : $org_options['currency_symbol']; ?></span>
											<?php $price_amount =  ($PRT->type[$price->type()]->is_percent()) ? number_format( $price->amount(), 1 ) : number_format( $price->amount(), 2 ); ?>
											<input class="edit-ticket-price-input quick-edit small-text jst-rght required<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
											<span class="percent-sign jst-left"><?php echo ($PRT->type[$price->type()]->is_percent()) ? '%' : ''; ?></span>
										</td> 
																		
										<td class="desc-column ticket-price-quick-edit-column"> 
											<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
											<p class="description"><?php echo $inactive ? $inactive : implode( ' ', array_slice( explode( ' ', stripslashes( $price->desc() )), 0, 20 )); ?></p>
										</td> 

									</tr>
								</table>
							</div>
						</td>				
					</tr>

					<?php
					}
					$counter++;
				}
			}
		} else {
?>
					<tr>
						<td colspan="6">
							<div id="event-price-XXXXXX" class="event-price-dv">
								<table class="ticket-price-quick-edit-tbl" width="100%">
									<tr>
									
										<td class="type-column ticket-price-quick-edit-column"> 
											<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso'); ?></div>
											<span><?php echo __('New Event Price', 'event_espresso'); ?></span>
										</td> 
										
										<td class="name-column ticket-price-quick-edit-column"> 
											<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso'); ?></div>
											<input class="edit-ticket-price-input quick-edit regular-text" type="text" id="quick-edit-ticket-price-PRC_name-XXXXXX" name="quick_edit_ticket_price[XXXXXX][PRC_name]" value="" />
										</td> 
										
										<td class="amount-column ticket-price-quick-edit-column"> 
											<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso'); ?></div>
											<span class="cur-sign jst-rght"><?php echo $org_options['currency_symbol']; ?></span>
											<input class="edit-ticket-price-input quick-edit small-text jst-rght" type="text" id="quick-edit-ticket-price-PRC_amount-XXXXXX" name="quick_edit_ticket_price[XXXXXX][PRC_amount]" value="" />
											<span class="percent-sign jst-left"></span>
										</td> 
																			
									</tr>
								</table>
							</div>
						</td>				
					</tr>
			<?php			
		}
?>
			
			</table>
			<br/>
			
			<input id="edit_event_save_prices_btn" class="button-primary save right" type="submit" name="save" value="Save Event Prices">
			
			<br class="clear"/><br/>
			
			<input id="edited-ticket-price-IDs" name="edited_ticket_price_IDs" type="hidden" value="" />

			<input  type="hidden" id="price-count-inp" name="price_count" value="<?php echo $counter - 1;?>"/>
			
		</div>
		<?php
	}





	public function venue_metabox() {

		$values = array(
				array('id' => true, 'text' => __('Yes', 'event_espresso')),
				array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		?>
		
	<div class="inside">
		<table class="form-table">
			<tr>

				<td valign="top" class="manual-venue">
						<h4>
							<?php _e('Venue Information', 'event_espresso'); ?>
						</h4>
						<p>
							<label for="ven-title"><?php _e('Title:', 'event_espresso'); ?></label><br/>
							<input size="20"id="ven-title" tabindex="106"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_title) ?>" name="venue_title" />
						</p>
						<p>
							<label for="ven-website"><?php _e('Website:', 'event_espresso'); ?></label><br/>
							<input size="20" id="ven-website" tabindex="107"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_url) ?>" name="venue_url" />
						</p>
						<p>
							<label for="ven-phone"><?php _e('Phone:', 'event_espresso'); ?></label><br/>
							<input size="20" id="ven-phone" tabindex="108"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_phone) ?>" name="venue_phone" />
						</p>
						<p>
							<label for="ven-image"><?php _e('Image:', 'event_espresso'); ?></label><br/>
							<input size="20" id="ven-image" tabindex="110"  type="text"  value="<?php echo stripslashes_deep($this->_event->venue_image) ?>" name="venue_image" />
						</p>
				</td>
				
				<td valign="top" class="manual-venue">
					<fieldset>
						<h4><?php _e('Physical Location', 'event_espresso'); ?></h4>
						<p>
							<label for="phys-addr"><?php _e('Address:', 'event_espresso'); ?></label><br/>
							<input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $this->_event->address ?>" name="address" />
						</p>
						<p>
							<label for="phys-addr-2"><?php _e('Address 2:', 'event_espresso'); ?></label><br/>
							<input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $this->_event->address2 ?>" name="address2" />
						</p>
						<p>
							<label for="phys-city"><?php _e('City:', 'event_espresso'); ?></label><br/>
							<input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $this->_event->city ?>" name="city" />
						</p>
						<p>
							<label for="phys-state"><?php _e('State:', 'event_espresso'); ?></label><br/>
							<input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $this->_event->state ?>" name="state" />
						</p>
						<p>
							<label for="phys-country"><?php _e('Country:', 'event_espresso'); ?></label><br/>
							<input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $this->_event->country ?>" name="country" />
						</p>
						<p>
							<label for="zip-postal"><?php _e('Zip/Postal Code:', 'event_espresso'); ?></label><br/>
							<input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $this->_event->zip ?>" name="zip" />
						</p>
						
						<p>
							<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
							<?php echo $this->_event->google_map_link; ?> 
						</p>
						
						<p>
							<label for="enable_for_gmap">
								<?php _e('Display Google Map for this venue? ', 'event_espresso') ?>
							</label>
							<?php echo EE_Form_Fields::select_input('enable_for_gmap', $values, isset($this->_event->event_meta['enable_for_gmap']) ? $this->_event->event_meta['enable_for_gmap'] : '', 'id="enable_for_gmap"') ?> 
						</p>

					</fieldset>
				</td>
					
				<td valign="top" class="manual-venue">
					<fieldset id="virt-location">
						<h4>
							<?php _e('Virtual Location', 'event_espresso'); ?>
						</h4>
						<p>
							<label for="virt-phone" style="display:inline-block; width:100px;">
								<?php _e('Phone:', 'event_espresso'); ?>
							</label>
							<input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $this->_event->phone ?>" name="phone" />
						</p>
						<p>
							<label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
								<?php _e('URL of Event:', 'event_espresso'); ?>
							</label>
							<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo stripslashes_deep($this->_event->virtual_url) ?></textarea>
						</p>
						<p>
							<label for="call-in-num" style="display:inline-block; width:100px;">
								<?php _e('Call in Number:', 'event_espresso'); ?>
							</label>
							<input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo stripslashes_deep($this->_event->virtual_phone) ?>" name="virtual_phone" />
						</p>
					</fieldset>
				</td>
				
			</tr>
		</table>

	</div>
		<?php
	}






	/**
	 * _premium_event_editor_meta_boxes
	 * add all metaboxes related to the event_editor
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _premium_event_editor_meta_boxes() {
		$this->_set_event_object();
		add_meta_box('espresso_event_editor_event_options', __('Event Registration Options', 'event_espresso'), array( $this, 'registration_options_meta_box' ), $this->_current_screen->id, 'side', 'high');
	}






	public function registration_options_meta_box() {
		
		$yes_no_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		?>
		<p>
			<label><?php _e('Event is Active', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('is_active', $yes_no_values, $this->_event->is_active); ?>
		</p>
		
		<p>
			<label for="reg-limit">
				<?php _e('Attendee Limit: ', 'event_espresso'); ?>
			</label>
			<input id="reg-limit" name="reg_limit"  size="10" type="text" value="<?php echo $this->_event->reg_limit; ?>" /><br />
			<span>(<?php _e('leave blank for unlimited', 'event_espresso'); ?>)</span>
		</p>
		
		<p class="clearfix" style="clear: both;">
			<label for="group-reg"><?php _e('Allow group registrations? ', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('allow_multiple', $yes_no_values, $this->_event->allow_multiple, 'id="group-reg"', '', false); ?>
		</p>
		
		<p>
			<label for="max-registrants"><?php _e('Max Group Registrants: ', 'event_espresso'); ?></label>
			<input type="text" id="max-registrants" name="additional_limit" value="<?php echo $this->_event->additional_limit; ?>" size="4" />
		</p>
		
		<p>
			<label><?php _e('Display  Description', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('display_desc', $yes_no_values, $this->_event->display_desc); ?>
		</p>
		
		<p>
			<label><?php _e('Display  Registration Form', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('display_reg_form', $yes_no_values, $this->_event->display_reg_form, '', '', false); ?>
		</p>

		<?php
	}





	public function primary_questions_group_meta_box() {
		?>
		<div class="inside">
			<p><strong>
					<?php _e('Question Groups', 'event_espresso'); ?>
				</strong><br />
				<?php _e('Add a pre-populated', 'event_espresso'); ?>
				<a href="admin.php?page=espresso_registration_form" target="_blank">
					<?php _e('group of questions', 'event_espresso'); ?>
				</a>
				<?php _e('to your event. The personal information group is required for all events.', 'event_espresso'); ?>
			</p>
			<?php
			$QSGs = EEM_Event::instance()->get_all_question_groups();
			$EQGs = EEM_Event::instance()->get_event_question_groups( $this->_event->id );
			$EQGs = is_array( $EQGs ) ? $EQGs : array();

			if ( ! empty( $QSGs )) {
 				$html = count( $QSGs ) > 10 ? '<div style="height:250px;overflow:auto;">' : '';
				foreach ( $QSGs as $QSG ) {

					$checked = ( in_array( $QSG->QSG_ID, $EQGs ) || $QSG->QSG_system == 1 ) ? ' checked="checked"' : '';
					$visibility = $QSG->QSG_system == 1 ? ' style="visibility:hidden"' : '';
					$edit_link = self::add_query_args_and_nonce( array( 'action' => 'edit_question_group', 'QSG_ID' => $QSG->QSG_ID ), EE_FORMS_ADMIN_URL );
					
					$html .= '
					<p id="event-question-group-' . $QSG->QSG_ID . '">
						<input value="' . $QSG->QSG_ID . '" type="checkbox"' . $visibility . ' name="question_groups[' . $QSG->QSG_ID . ']"' . $checked . ' /> 
						<a href="' . $edit_link . '" title="Edit ' . $QSG->QSG_name . ' Group" target="_blank">' . $QSG->QSG_name . '</a>
					</p>';
				}
				$html .= count( $QSGs ) > 10 ? '</div>' : '';

				echo $html;
			} else {
				echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
			}
			do_action('AHEE_event_editor_questions_notice');
			?>
		</div>
		<?php
	}






	public function categories_meta_box() {
		$event_id = $this->_event->id;
		global $wpdb;
		?>
		<div class="inside">
			<?php
			$sql = "SELECT * FROM " . EVENTS_CATEGORY_TABLE;
			$sql = apply_filters('FHEE_event_editor_categories_sql', $sql);
			$event_categories = $wpdb->get_results($sql);
			$num_rows = $wpdb->num_rows;
			if ($num_rows > 0) {
				if ($num_rows > 10) {
					echo '<div style="height:250px;overflow:auto;">';
				}
				foreach ($event_categories as $category) {
					$category_id = $category->id;
					$category_name = $category->category_name;

					$in_event_categories = $wpdb->get_results("SELECT * FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id='" . $event_id . "' AND cat_id='" . $category_id . "'");
					foreach ($in_event_categories as $in_category) {
						$in_event_category = $in_category->cat_id;
					}
					if (empty($in_event_category))
						$in_event_category = '';
					?>
					<p id="event-category-<?php echo $category_id; ?>">
						<label for="in-event-category-<?php echo $category_id; ?>" class="selectit">
							<input value="<?php echo $category_id; ?>" type="checkbox" name="event_category[]" id="in-event-category-<?php echo $category_id; ?>"<?php echo ($in_event_category == $category_id ? ' checked="checked"' : "" ); ?>/>
							<?php echo $category_name; ?>
						</label>
					</p>
					<?php
				}
				if ($num_rows > 10) {
					echo '</div>';
				}
			} else {
				_e('No Categories', 'event_espresso');
			}
			?>
			<p>
				<a href="admin.php?page=espresso_event_categories" target="_blank">
					<?php _e('Manage Categories', 'event_espresso'); ?>
				</a>
			</p>
		</div>
		<?php
	}







	/** end metaboxes **/
	/*******************/





	/**
	 * _trash_or_restore_event
	 *
	 * @access protected
	 * @param  string $event_status 
	 * @return void 
	 */
	protected function _trash_or_restore_event( $event_status = 'D' ) {
		//determine the event id and set to array.
		$EVT_ID = isset( $this->_req_data['EVT_ID'] ) ?  absint( $this->_req_data['EVT_ID'] ) : FALSE;
		// loop thru events
		if ( $EVT_ID ) {
			// clean status
			$event_status = strtoupper( sanitize_key( $event_status ));
			// grab status
			if ( ! empty( $event_status )) {
				$succes = $this->_change_event_status( $EVT_ID, $event_status );
			} else {
				$succes = FALSE;		
				$msg = __( 'An error occured. The event could not be moved to the trash because a valid event status was not not supplied.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
			}
		} else {
			$succes = FALSE;
			$msg = __( 'An error occured. The event could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		$action = $event_status == 'D' ? 'moved to the trash' : 'restored from the trash';
		$this->_redirect_after_action( $succes, 'Event', $action, array( 'action' => 'default' ));
	}



	/**
	 * _trash_or_restore_events
	 *
	 * @access protected
	 * @param  string $event_status 
	 * @return void 
	 */
	protected function _trash_or_restore_events( $event_status = 'D' ) {
		// clean status
		$event_status = strtoupper( sanitize_key( $event_status ));
		// grab status
		if ( ! empty( $event_status )) {
			$succes = TRUE;
			//determine the event id and set to array.
			$EVT_IDs = isset( $this->_req_data['EVT_IDs'] ) ? (array) $this->_req_data['EVT_IDs'] : array();
			// loop thru events
			foreach ( $EVT_IDs as $EVT_ID ) {
				if ( $EVT_ID = absint( $EVT_ID )) {
					$results = $this->_change_event_status( $EVT_ID, $event_status );
					$succes = $results !== FALSE ? $succes : FALSE;
				} else {
					$msg = sprintf( __( 'An error occured. Event #%d could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso' ), $EVT_ID );
					EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
					$succes = FALSE;
				}
			}
		} else {
			$succes = FALSE;
			$msg = __( 'An error occured. The event could not be moved to the trash because a valid event status was not not supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		// in order to force a pluralized result message we need to send back a success status greater than 1
		$succes = $succes ? 2 : FALSE;
		$action = $event_status == 'D' ? 'moved to the trash' : 'restored from the trash';
		$this->_redirect_after_action( $succes, 'Events', $action, array( 'action' => 'default' ));
	}




	/**
	 * _trash_or_restore_events
	 *
	 * @access  private
	 * @param  int $event_id 
	 * @param  string $event_status 
	 * @return void
	 */
	private function _change_event_status( $EVT_ID = FALSE, $event_status = FALSE ) {
		// grab event id
		if ( ! $EVT_ID ) {
			$msg = __( 'An error occured. No Event ID or an invalid Event ID was received.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// clean status
		$event_status = strtoupper( sanitize_key( $event_status ));
		// grab status
		if ( empty( $event_status )) {
			$msg = __( 'An error occured. No Event Status or an invalid Event Status was received.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
			return FALSE;
		}
		// might need this
		global $wpdb;					
		// was event trashed or restored ?
		switch( $event_status ) {
			case 'A' :
					$action = 'restored from the trash';
					$hook = 'AHEE_event_restored_from_trash';
				break;
			case 'D' :
					$action = 'moved to the trash';
					$hook = 'AHEE_event_moved_to_trash';
				break;
			default :
					$action = 'updated';
					$hook = FALSE;
		}			
		$data_cols_and_vals = array('event_status' => $event_status );
		$where_cols_and_vals = array('id' => $EVT_ID);
		$updated = $wpdb->update( EVENTS_DETAIL_TABLE, $data_cols_and_vals, $where_cols_and_vals, array('%s'), array('%d'));
		if ( $updated === FALSE ) {
			$msg = sprintf( __( 'An error occured. The event could not be %s.', 'event_espresso' ), $action );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( $hook ) {
			do_action( $hook );
		}		
		return TRUE;
	}



	/**
	 * _delete_event
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _delete_event() {
		//determine the event id and set to array.
		$EVT_ID = isset( $this->_req_data['EVT_ID'] ) ?  absint( $this->_req_data['EVT_ID'] ) : FALSE;
		// loop thru events
		if ( $EVT_ID ) {
			$succes = $this->_permanently_delete_event( $EVT_ID );
			// get list of events with no prices
			$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', array() );
			// remove this event from the list of events with no prices
			if ( isset( $espresso_no_ticket_prices[ $EVT_ID ] )) {
				unset( $espresso_no_ticket_prices[ $EVT_ID ] );
			}
			update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
		} else {
			$succes = FALSE;			
			$msg =  __( 'An error occured. An event could not be deleted because a valid event ID was not not supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		$this->_redirect_after_action( $succes, 'Event', 'deleted', array( 'action' => 'default' ) );
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
		$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', array() );
		//determine the event id and set to array.
		$EVT_IDs = isset( $this->_req_data['EVT_IDs'] ) ? (array) $this->_req_data['EVT_IDs'] : array();
		// loop thru events
		foreach ( $EVT_IDs as $EVT_ID ) {
			if ( $EVT_ID = absint( $EVT_ID )) {
				$results = $this->_permanently_delete_event( $EVT_ID );
				$succes = $results !== FALSE ? $succes : FALSE;
				// remove this event from the list of events with no prices
				if ( isset( $espresso_no_ticket_prices[ $EVT_ID ] )) {
					unset( $espresso_no_ticket_prices[ $EVT_ID ] );
				}
			} else {
				$succes = FALSE;
				$msg =  __( 'An error occured. An event could not be deleted because a valid event ID was not not supplied.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
		}
		update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
		// in order to force a pluralized result message we need to send back a success status greater than 1
		$succes = $succes ? 2 : FALSE;
		$this->_redirect_after_action( $succes, 'Events', 'deleted', array( 'action' => 'default' ) );
	}




	/**
	 * _permanently_delete_event
	 *
	 * @access  private
	 * @param  int $EVT_ID 
	 * @return void
	 */
	private function _permanently_delete_event( $EVT_ID = FALSE ) {
		// grab event id
		if ( ! $EVT_ID = absint( $EVT_ID )) {
			$msg = __( 'An error occured. No Event ID or an invalid Event ID was received.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// might need this
		global $wpdb;
		// optimism YEAH
		$succes = TRUE;			
		// first check for active registrations
		$SQL = 'SELECT COUNT(REG_ID) FROM ' . $wpdb->prefix . "esp_registration WHERE EVT_ID = %d AND STS_ID NOT IN ( 'RCN', 'RNA' )";
		$registrations = $wpdb->get_var( $wpdb->prepare( $SQL, $EVT_ID ));
		
		if ( $registrations === FALSE || $registrations > 0 ) {
			$msg =  sprintf( __( 'Event ID # %d can not be permanently deleted because it has active registrations.', 'event_espresso' ), $EVT_ID );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		//delete datetimes
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'esp_datetime WHERE EVT_ID = %d';
		$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
		$succes = $deleted !== FALSE ? $succes : FALSE;
		//delete event_question_groups
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'esp_event_question_group WHERE EVT_ID = %d';
		$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
		$succes = $deleted !== FALSE ? $succes : FALSE;
		//delete message_template_groups
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'esp_message_template_group WHERE EVT_ID = %d';
		$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
		$succes = $deleted !== FALSE ? $succes : FALSE;
		//delete prices
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'esp_price WHERE EVT_ID = %d';
		$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
		$succes = $deleted !== FALSE ? $succes : FALSE;
		//delete events_categories
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'events_category_rel WHERE event_id = %d';
		$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
		$succes = $deleted !== FALSE ? $succes : FALSE;
		//delete events_personnel
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'events_personnel_rel WHERE event_id = %d';
		$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
		$succes = $deleted !== FALSE ? $succes : FALSE;
		//delete events_venues
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'events_venue_rel WHERE event_id = %d';
		$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
		$succes = $deleted !== FALSE ? $succes : FALSE;
		// did it all go as planned ?
		if ( $succes ) {
			// since everything else deleted successfully, we can now safely delete the actual event
			$SQL = 'DELETE FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id = %d';
			$deleted = $wpdb->query( $wpdb->prepare( $SQL, $EVT_ID ));
			if ( $deleted === FALSE ) {
				$msg = sprintf( __( 'An error occured. Event ID # %d could not be deleted.', 'event_espresso' ), $EVT_ID );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
		} else {
			$msg = sprintf( __( 'An error occured. Additional data in related DB tables could not be deleted, which prevented Event ID # %d from being deleted.', 'event_espresso' ), $EVT_ID );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		do_action( 'AHEE_event_permanently_deleted' );
		return TRUE;
	}




	protected function _copy_events() {
		$old_id = isset( $this->_req_data['event_id'] ) ? $this->_req_data['event_id'] : null; 
		$new_id = $this->_duplicate_event();
		
		if ( $new_id ) {
			$query_args = array(
				'action' => 'edit_event',
				'EVT_ID' => $new_id
				);
		} else {
			$query_args = array(
				'action' => 'edit_event',
				'EVT_ID' => $old_id
				);
		}

		$this->_redirect_after_action(0,'','',$query_args);
	}





	protected function _duplicate_event( ) {
		global $wpdb, $espresso_wp_user, $org_options;
		$event_id = isset( $this->_req_data['event_id'] ) ? absint( $this->_req_data['event_id'] ) : '';

		$result = $wpdb->get_row("SELECT * FROM ". EVENTS_DETAIL_TABLE ." WHERE id ='" . $event_id . "'");

		if ( $result ){
						
			$event_id= $result->id;
			$display_reg_form=$result->display_reg_form;
			$event_name=$result->event_name;
			$event_desc=$result->event_desc;
			$display_desc=$result->display_desc;
			$event_slug=$result->slug;
			$event_identifier=$result->event_identifier.'-'.time();
			$reg_limit = $result->reg_limit;
			$allow_multiple = $result->allow_multiple;
			$additional_limit = $result->additional_limit;

			$registration_start = $result->registration_start;
			$registration_end = $result->registration_end;
			$start_date = $result->start_date;
			$end_date = $result->end_date;

			$start_time = $result->start_time;
			$end_time = $result->end_time;

			$is_active=$result->is_active;

			$address=stripslashes_deep($result->address);
			$address2=stripslashes_deep($result->address2);
			$city=stripslashes_deep($result->city);
			$state=stripslashes_deep($result->state);
			$zip=stripslashes_deep($result->zip);
			$country=stripslashes_deep($result->country);

			$phone=$result->phone;

			//$use_coupon_code= $result->use_coupon_code;
					
			$allow_overflow = $result->allow_overflow;
			$overflow_event_id = $result->overflow_event_id;
		
			$event_code=uniqid($espresso_wp_user.'-');
					
			$registration_startT =  $result->registration_startT;
			$registration_endT =  $result->registration_endT;
					
			$event_status = $result->event_status;
					
			$virtual_url = $result->virtual_url;
			$virtual_phone = $result->virtual_phone;
					
			$member_only = $result->member_only;
			$post_id = $result->post_id;
			$post_type = $result->post_type;
			$post_type = $result->post_type;
			$externalURL = $result->externalURL;
			//$early_disc = $result->early_disc;
			//$early_disc_date = $result->early_disc_date;
			//$early_disc_percentage = $result->early_disc_percentage;
					
			$venue_title = $result->venue_title;
			$venue_url = $result->venue_url;
			$venue_phone = $result->venue_phone;
			$venue_image = $result->venue_image;
			$event_meta = $result->event_meta;			
			$require_pre_approval = isset( $result->require_pre_approval ) ? $result->require_pre_approval : FALSE;
			$timezone_string = $result->timezone_string;
					
					
			$sql=array(
				'event_code' => $event_code,
				'event_name'=>$event_name, 
				'event_desc'=>$event_desc, 
				'display_desc'=>$display_desc, 
				'display_reg_form'=>$display_reg_form, 
				'event_identifier'=>$event_identifier,
				'slug'=>$event_slug,
				'address'=>$address, 
				'address2'=>$address2, 
				'city' => $city, 
				'state' => $state, 
				'zip' => $zip, 
				'country' => $country, 
				'phone'=>$phone, 
				'virtual_url'=>$virtual_url, 
				'virtual_phone'=>$virtual_phone, 
				'registration_start'=>$registration_start, 
				'registration_end'=>$registration_end, 
				'start_date'=>$start_date, 
				'end_date'=>$end_date, 
				'allow_multiple'=>$allow_multiple,
				'is_active'=>$is_active, 
				'event_status'=>$event_status,
				//'use_coupon_code'=>$use_coupon_code, 
				'member_only'=>$member_only,
				'externalURL' => $externalURL, 
				//'early_disc' => $early_disc, 
				//'early_disc_date' => $early_disc_date, 
				//'early_disc_percentage' => $early_disc_percentage, 
				//'alt_email' => $alt_email, 
				'post_type' => $post_type, 
				'registration_startT' => $registration_startT, 
				'registration_endT' => $registration_endT, 
				'venue_title' => $venue_title, 
				'venue_url' => $venue_url, 
				'venue_phone' => $venue_phone, 
				'venue_image' => $venue_image,
				'event_meta' => $event_meta, 
				'require_pre_approval' => $require_pre_approval, 
				'timezone_string' => $timezone_string, 
				'submitted' => date('Y-m-d H:i:s', time()), 
				'reg_limit'=>$reg_limit, 
				'additional_limit'=>$additional_limit, 
				'wp_user' => $espresso_wp_user,
				'post_id' => $post_id);
			}
			
			$sql_data = array(
				'%s','%s','%s','%s',
				'%s','%s','%s','%s',
				'%s','%s','%s','%s',
				'%s','%s','%s','%s',
				'%s','%s','%s','%s',
				'%s','%s',
				'%s','%s','%s','%s',
				'%s','%s','%s','%s',
				'%s','%s','%s','%s',
				'%s','%s','%s','%d',
				'%d','%d','%d'
			);
			
			/*//check the counts to make sure the data is matched up correctly
			echo 'SQL Count ';		
			print count ($sql);
			echo '<br />SQL Data Count ';	
			print count($sql_data);
			
			//Output the data
			echo '<br />SQL Values: ';	
			print_r($sql);*/
		

		if ( $wpdb->insert( EVENTS_DETAIL_TABLE, $sql, $sql_data) === FALSE ){
			$error = true;
		}
		$new_id = $wpdb->insert_id;

		$event_categories = $wpdb->get_results("SELECT * FROM ". EVENTS_CATEGORY_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_categories as $category){
			if ($category->event_id != ''){

				foreach (array($category->event_id) as $k=>$v){
					if($v != '') {
						$insert_cat = "INSERT INTO ".EVENTS_CATEGORY_REL_TABLE." (event_id, cat_id) VALUES ('".$new_id."', '".$category->cat_id."')";
						if ( FALSE === $wpdb->query($insert_cat)){
							$error = true;
						}
					}
				}
			}
		}
		
		$event_venues = $wpdb->get_results("SELECT * FROM ". EVENTS_VENUE_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_venues as $venue){
			if ($venue->event_id != ''){

				foreach (array($venue->event_id) as $k=>$v){
					if($v != '') {
						$insert_venue = "INSERT INTO ".EVENTS_VENUE_REL_TABLE." (event_id, venue_id) VALUES ('".$new_id."', '".$venue->venue_id."')";
						if ( FALSE === $wpdb->query($insert_venue)){
							$error = true;
						}
					}
				}
			}
		}
					
		$event_persons = $wpdb->get_results("SELECT * FROM ". EVENTS_PERSONNEL_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_persons as $person){
			if ($person->event_id != ''){

				foreach (array($person->event_id) as $k=>$v){
					if($v != '') {
						$insert_person = "INSERT INTO ".EVENTS_PERSONNEL_REL_TABLE." (event_id, person_id) VALUES ('".$new_id."', '".$person->person_id."')";
						if ( FALSE === $wpdb->query($insert_person)){
							$error = true;
						}
					}
				}
			}
		}		

			
		$event_discounts = $wpdb->get_results("SELECT * FROM ". EVENTS_DISCOUNT_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_discounts as $discount){
			if ($discount->event_id != ''){

				foreach (array($discount->event_id) as $k=>$v){
					if($v != '') {
						$insert_discount = "INSERT INTO ".EVENTS_DISCOUNT_REL_TABLE." (event_id, discount_id) VALUES ('".$new_id."', '".$discount->discount_id."')";
						if ( FALSE === $wpdb->query($insert_discount)){
							$error = true;
						}
					}
				}
			}
		}

		$event_times = $wpdb->get_results("SELECT * FROM ". EVENTS_START_END_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_times as $event_time){
			if ($event_time->start_time != ''){

				foreach (array($event_time->start_time) as $k=>$v){
					if($v != '') {
						$sql3="INSERT INTO ".EVENTS_START_END_TABLE." (event_id, start_time, end_time) VALUES ('".$new_id."', '".$v."', '".$event_time->end_time."')";
						//echo "$sql3 <br>";
						if ( FALSE === $wpdb->query($sql3)){
							$error = true;
						}
					}
				}
			}
		}
		
		$event_prices = $wpdb->get_results("SELECT * FROM ". EVENTS_PRICES_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_prices as $event_price){
			if ($event_price->event_cost != ''){
				foreach (array($event_price->event_cost) as $k=>$v){
					if($v != '') {
						$prices_sql="INSERT INTO ".EVENTS_PRICES_TABLE." (event_id, event_cost, surcharge, price_type, member_price, member_price_type) VALUES ('".$new_id."', '".$v."', $event_price->surcharge, '".$event_price->price_type."', '".$event_price->member_price."', '".$event_price->member_price_type."')";
						//echo "$sql6 <br>";
						if ( FALSE === $wpdb->query($prices_sql)){
							$error = true;
						}
					}
				}
			}
		}

		if ( ! $error ){
			//overwrite default success messages
			EE_Error::overwrite_success();
			$msg = sprintf( __('The event %s has been added', 'event_espresso'), '<a href="' . $_SERVER['REQUEST_URI'] . '#event-id-' . $wpdb->insert_id . '">' . stripslashes($event_name) . '</a>');
			EE_Error::add_success( $msg );
		 } else { 
		 	$msg = __('There was an error duplicating the event. The event was not saved!', 'event_espresso');
		 	EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__ );
		 	return false;
		 }

		return $new_id;

	}





	/**
	 * _insert_or_update_event
	 * depending on argument, will handling inserting or updating event
	 *
	 * @access protected
	 * @param  bool $new_event true = insert, false = update
	 * @return void
	 */
	protected function _insert_or_update_event($new_event) {
		
		$_SESSION['event_id'] = $event_id = $new_event ? $this->_insert_event() : $this->_update_event();

		$success = 0; //we already have a success message so lets not send another.
		$query_args = array(
			'action' => 'edit_event',
			'EVT_ID' => $event_id
		);

		$this->_redirect_after_action( $success, '', '', $query_args );
	}





	private function _insert_event() {
		//Delete the transients that may be set
		$this->_espresso_reset_cache();
		
	/* @var $espresso_wp_user type array*/
		global $wpdb, $org_options, $espresso_wp_user;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$wpdb->show_errors();
		
		//will be used to hold event meta data
		$event_meta = array(); 
		
		$wp_user_id = empty($this->_req_data['wp_user']) ? $espresso_wp_user : $this->_req_data['wp_user'][0];
		$wp_user_id = $wp_user_id == 0 ? 1 : $wp_user_id;

		$event_desc = $this->_req_data['event_desc'];
		$display_desc = $this->_req_data['display_desc'];
		$display_reg_form = $this->_req_data['display_reg_form'];

		$address = empty($this->_req_data['address']) ? '' : esc_html($this->_req_data['address']);
		$address2 = empty($this->_req_data['address2']) ? '' : esc_html($this->_req_data['address2']);
		$city = empty($this->_req_data['city']) ? '' : esc_html($this->_req_data['city']);
		$state = empty($this->_req_data['state']) ? '' : esc_html($this->_req_data['state']);
		$zip = empty($this->_req_data['zip']) ? '' : esc_html($this->_req_data['zip']);
		$country = empty($this->_req_data['country']) ? '' : esc_html($this->_req_data['country']);
		$phone = esc_html($this->_req_data['phone']);

		// enable event address for Gmaps
		if (!empty($this->_req_data['venue_id'][0]) || !empty($this->_req_data['zip']) || !empty($this->_req_data['city']) || !empty($this->_req_data['state'])) {
			$event_meta['enable_for_gmap'] = $this->_req_data['enable_for_gmap'];
		} else {
			$event_meta['enable_for_gmap'] = false;
		}

		$event_location = ($address != '' ? $address . ' ' : '') . ($address2 != '' ? '<br />' . $address2 : '') . ($city != '' ? '<br />' . $city : '') . ($state != '' ? ', ' . $state : '') . ($zip != '' ? '<br />' . $zip : '') . ($country != '' ? '<br />' . $country : '');
		$reg_limit = $this->_req_data['reg_limit'];
		$allow_multiple = $this->_req_data['allow_multiple'];
		$additional_limit = $this->_req_data['additional_limit'];
		$is_active = $this->_req_data['is_active'];

		//Venue Information
		$venue_title = empty($this->_req_data['venue_title']) ? '' : $this->_req_data['venue_title'];
		$venue_url = empty($this->_req_data['venue_url']) ? '' : $this->_req_data['venue_url'];
		$venue_phone = empty($this->_req_data['venue_phone']) ? '' : $this->_req_data['venue_phone'];
		$venue_image = empty($this->_req_data['venue_image']) ? '' : $this->_req_data['venue_image'];

		//Virtual location
		$virtual_url = $this->_req_data['virtual_url'];
		$virtual_phone = $this->_req_data['virtual_phone'];

		if ($reg_limit == '') {
			$reg_limit = 999;
		}

		$event_meta['venue_id'] = isset($this->_req_data['venue_id']) ? $this->_req_data['venue_id'][0] : '';
		$event_meta['date_submitted'] = date("Y-m-d H:i:s");
		$event_meta['originally_submitted_by'] = $espresso_wp_user;

		if ( isset( $this->_req_data['emeta'] ) && ! empty ( $this->_req_data['emeta'] )) {
			foreach ($this->_req_data['emeta'] as $k => $v) {
				$event_meta[$v] = strlen(trim($this->_req_data['emetad'][$k])) > 0 ? $this->_req_data['emetad'][$k] : '';
			}
		}
		//echo strlen(trim($this->_req_data['emetad'][$k]));
		//print_r($this->_req_data['emeta'] );

		$event_meta = serialize($event_meta);

		//Event name
		$event_name = empty($this->_req_data['event']) ? uniqid($espresso_wp_user . '-') : html_entity_decode( wp_strip_all_tags( $this->_req_data['event'] ), ENT_QUOTES, 'UTF-8' );

		//Create the event code and prefix it with the user id
		$event_code = uniqid($espresso_wp_user . '-');

		//Create the event identifier with the event code appended to the end
		$event_identifier = (empty($this->_req_data['event_identifier'])) ? $event_identifier = sanitize_title_with_dashes($event_name . '-' . $event_code) : $event_identifier = sanitize_title_with_dashes($this->_req_data['event_identifier']) . $event_code;

		//Create the event slug
		$event_slug = ($this->_req_data['slug'] == '') ? sanitize_title_with_dashes($event_name) : sanitize_title_with_dashes($this->_req_data['slug']);

		//When adding colums to the following arrays, be sure both arrays have equal values.
		$cols_n_values = array(
		
				'event_code' => $event_code, 
				'event_name' => $event_name,
				'event_desc' => $event_desc,
				'display_desc' => $display_desc,
				'display_reg_form' => $display_reg_form,
				
				'event_identifier' => $event_identifier,
				'slug' => $event_slug,
				'address' => $address,
				'address2' => $address2,
				'city' => $city,
				
				'state' => $state,
				'zip' => $zip,
				'country' => $country,
				'phone' => $phone,
				'virtual_url' => $virtual_url,
				
				'virtual_phone' => $virtual_phone,
				'venue_title' => $venue_title,
				'venue_url' => $venue_url,
				'venue_phone' => $venue_phone,
				'venue_image' => $venue_image,
				
				'submitted' => date('Y-m-d H:i:s', time()),
				'allow_multiple' => $allow_multiple,
				'is_active' => $is_active,
				'reg_limit' => $reg_limit,
				'additional_limit' => $additional_limit,	
							
				'wp_user' => $wp_user_id
		);

		$data_format = array(
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',				
				'%s', '%d', '%s', '%d', '%d',
				'%s'
		);

		if ( $wpdb->insert(EVENTS_DETAIL_TABLE, $cols_n_values, $data_format ) === FALSE ) {
			$error = true;
		}
		$last_event_id = absint( $wpdb->insert_id );

		//echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		do_action('AHEE_insert_event_add_ons');
		
		// save question groups
		// firs save primary attendee's question groups
		$question_groups = isset( $this->_req_data['question_groups'] ) ? $this->_req_data['question_groups'] : array();
		foreach ( $question_groups as $question_group ) {
			$wpdb->insert(
				$wpdb->prefix . 'esp_event_question_group',
				array( 'EVT_ID' => $last_event_id, 'QSG_ID' => $question_group, 'EQG_primary' => 1 ),
				array( '%d', '%d', '%d' )
			);
		}

		//Add event to a category
		if (isset($this->_req_data['event_category']) && $this->_req_data['event_category'] != '') {
			foreach ($this->_req_data['event_category'] as $k => $v) {
				if ($v != '') {
					$sql_cat = "INSERT INTO " . EVENTS_CATEGORY_REL_TABLE . " (event_id, cat_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql3 <br>";
					if ( FALSE === $wpdb->query($sql_cat)) {
						$error = true;
					}
				}
			}
		}

		if (!empty($this->_req_data['venue_id'])) {
			foreach ($this->_req_data['venue_id'] as $k => $v) {
				if ($v != '' && $v != 0) {
					$sql_venues = "INSERT INTO " . EVENTS_VENUE_REL_TABLE . " (event_id, venue_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql_venues <br>";
					if ( FALSE === $wpdb->query($sql_venues) )
						$error = true;
				}
			}
		}


		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$DTM = EEM_Datetime::instance();

		//printr( event_datetimes, 'event_datetimes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		$q = 1;
		foreach ($this->_req_data['event_datetimes'] as $event_datetime) {
		
			$event_datetime['evt_end'] = ( isset($event_datetime['evt_end']) && $event_datetime['evt_end'] != '' ) ? $event_datetime['evt_end'] : $event_datetime['evt_start'];
			$event_datetime['reg_end'] = ( isset($event_datetime['reg_end']) && $event_datetime['reg_end'] != '' ) ? $event_datetime['reg_end'] : $event_datetime['reg_start'];
						
			$insert = array(
							'EVT_ID'					=> $last_event_id,
							'DTT_EVT_start'		=> strtotime( $event_datetime['evt_start'] ),
							'DTT_EVT_end' 		=> strtotime( $event_datetime['evt_end'] ),
							'DTT_REG_start' 		=> strtotime( $event_datetime['reg_start'] ),
							'DTT_REG_end' 		=> strtotime( $event_datetime['reg_end'] ),
							'DTT_is_primary' 	=> $q == 1 ? TRUE : FALSE,							
							/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
							'DTT_reg_limit' 		=>( isset( $event_datetime['reg_limit'] ) && $event_datetime['reg_limit'] != 0 ) ? $event_datetime['reg_limit'] : NULL,
							'DTT_tckts_left' 	=>( isset( $event_datetime['tckts_left'] ) && $event_datetime['tckts_left'] != 0 ) ? $event_datetime['tckts_left'] : NULL,*/
					);

			$DTM->insert($insert);
			
			if ( $q == 1 ) {
				$evt_date = date( 'F j, Y  g:i a', strtotime( $event_datetime['evt_start'] ));	
			}			
			
			$q++;
		}




		
		/************************************   PRICING   ******************************************* */
		
		$ticket_prices_to_save = array();
		$quick_edit_ticket_price = isset($this->_req_data['quick_edit_ticket_price']) ? $this->_req_data['quick_edit_ticket_price'] : array();
//			echo printr( $quick_edit_ticket_price, '$quick_edit_ticket_price' );
		if ( isset( $quick_edit_ticket_price['XXXXXX'] )) {
			$new_quick_price = $quick_edit_ticket_price['XXXXXX'];
			if ( isset( $new_quick_price['PRC_name'] ) && ! empty( $new_quick_price['PRC_name'] ) && isset( $new_quick_price['PRC_amount'] )) {
				$ticket_prices_to_save[] = array(
					'PRT_ID' => 2,
					'EVT_ID' => 4,
					'PRT_is_global' => FALSE,
					'PRC_overrides' => 0,
					'PRC_deleted' => FALSE,
					'PRC_order' => isset( $new_quick_price['PRC_order'] ) && $new_quick_price['PRC_order'] ? $new_quick_price['PRC_order'] : 0,
					'PRC_name' => $new_quick_price['PRC_name'] ? $new_quick_price['PRC_name'] : NULL,
					'PRC_desc' => NULL,
					'PRC_amount' => $new_quick_price['PRC_amount'] ? $new_quick_price['PRC_amount'] : 0,
					'PRC_use_dates' => FALSE,
					'PRC_start_date' => NULL,
					'PRC_end_date' => NULL,
					'PRC_is_active' => TRUE			
				);
			}
		}
		
		// grab list of edited ticket prices
		if ($edited_ticket_price_IDs = isset($this->_req_data['edited_ticket_price_IDs']) ? $this->_req_data['edited_ticket_price_IDs'] : FALSE) {
			// remove last comma
			$edited_ticket_price_IDs = trim($edited_ticket_price_IDs, ',');
			// create array of edited ticket prices
			$edited_ticket_price_IDs = explode(',', $edited_ticket_price_IDs);
			// flipper once
			$edited_ticket_price_IDs = array_flip($edited_ticket_price_IDs);
			// flipper twice - hey!?!?! where did all the duplicate entries go???
			$edited_ticket_price_IDs = array_flip($edited_ticket_price_IDs);
//				echo printr( $edited_ticket_price_IDs, '$edited_ticket_price_IDs' );
			// grab existing ticket price data
			if ($edited_ticket_prices = isset($this->_req_data['edit_ticket_price']) ? $this->_req_data['edit_ticket_price'] : FALSE) {
//					echo printr( $edited_ticket_prices, '$edited_ticket_prices' );
				// cycle thru list                    
				foreach ($edited_ticket_prices as $PRC_ID => $edited_ticket_price) {
//						echo printr( $edited_ticket_price, '$edited_ticket_price' );	
					// add edited ticket prices to list of ticket prices to save
					if (in_array($PRC_ID, $edited_ticket_price_IDs)) {
//							echo printr( $quick_edit_ticket_price[$PRC_ID], '$quick_edit_ticket_price[$PRC_ID]' );
						if ( isset( $quick_edit_ticket_price[$PRC_ID] ) && is_array( $quick_edit_ticket_price[$PRC_ID] )) {
							$edited_ticket_price = array_merge( $edited_ticket_price, $quick_edit_ticket_price[$PRC_ID] );
//								echo printr( $edited_ticket_price, '$edited_ticket_price' );	
						}
						$ticket_prices_to_save[$PRC_ID] = $edited_ticket_price;
					}
				}
			}
		}
		
//			echo printr( $ticket_prices_to_save, '$ticket_prices_to_save' );	

		// add new tickets if any
		if ($new_ticket_price = isset($this->_req_data['new_ticket_price']) ? $this->_req_data['new_ticket_price'] : array('PRC_name' => NULL)) {
			if ( ! empty( $new_ticket_price['PRC_amount'] ) && ! empty( $new_ticket_price['PRC_name'] )) {
				$ticket_prices_to_save[0] = $new_ticket_price;
			} else if ( empty( $new_ticket_price['PRC_amount'] ) && ! empty( $new_ticket_price['PRC_name'] )) {
				$msg = __( 'Event prices require an amount before they can be saved. Please make sure you enter an amount for the new event price before attempting to save it.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );		
			} else if ( ! empty( $new_ticket_price['PRC_amount'] ) && empty( $new_ticket_price['PRC_name'] )) {
				$msg = __( 'Event prices require a name before they can be saved. Please make sure you enter a name for the new event price before attempting to save it.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );		
			}

		}
//		printr( $ticket_prices_to_save, '$ticket_prices_to_save  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// and now we actually save the ticket prices
		if (!empty($ticket_prices_to_save)) {

			//echo printr( $new_ticket_price, '$new_ticket_price' );
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
			$PRC = EEM_Price::instance();

			global $current_user;
			get_currentuserinfo();

			foreach ($ticket_prices_to_save as $PRC_ID => $ticket_price) {

				//determine whether this price overrides an existing global or not
				$overrides = absint($ticket_price['PRT_is_global']) ? $PRC_ID : NULL;
//echo '<br/><br/><h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
				// or whether it was already overriding a global from before
				$overrides = $ticket_price['PRC_overrides'] ? absint($ticket_price['PRC_overrides']) : $overrides;
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
				
				// create ticket object
				$new_price = new EE_Price(
												$ticket_price['PRT_ID'],
												$last_event_id,
												preg_replace( '/[^0-9,.]/', '', $ticket_price['PRC_amount'] ),
												$ticket_price['PRC_name'],
												$ticket_price['PRC_desc'],
												isset( $ticket_price['PRC_reg_limit'] ) ? $ticket_price['PRC_reg_limit'] : NULL,
												NULL,
												$ticket_price['PRC_use_dates'] ? TRUE : FALSE,
												$ticket_price['PRC_start_date'],
												$ticket_price['PRC_end_date'],
/*												FALSE,
												FALSE,
												0,
												TRUE,
												$current_user->ID,*/
												$ticket_price['PRC_is_active'] ? TRUE : FALSE,
												$overrides,
												$ticket_price['PRT_ID'] < 3 ? 0 : $ticket_price['PRC_order'],
												$ticket_price['PRC_deleted']
				);
				
				if ( $new_price->deleted()) {
					$this->_req_data['price_count']--;
				} else {
					$this->_req_data['price_count']++;
				}
				

//                    echo printr( $ticket_price, '$ticket_price' );
//                    echo printr( $new_price, '$new_price' );

				$results = $new_price->insert();

			}
		}

		if ( isset( $this->_req_data['price_count'] ) && absint( $this->_req_data['price_count'] ) < 1 ) {
			$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', array() );
			$espresso_no_ticket_prices[ $last_event_id ] = $event_name;
			update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
		}  		

		
		if (empty($error)) {				
			// overwrite default success messages
			EE_Error::overwrite_success();
			$msg = sprintf( 
					__( 'The event %s has been added for %s.', 'event_espresso' ), 
					'<a href=' . espresso_reg_url($last_event_id) . '>' . stripslashes_deep($this->_req_data['event']) . '</a>', 
					$evt_date 
			);
			EE_Error::add_success( $msg );
		} else { 
			$msg = sprintf( 
					__( 'An error occured and the event %s has not been saved to the database.', 'event_espresso' ), 
					'<a href=' . espresso_reg_url($last_event_id) . '>' . stripslashes_deep($this->_req_data['event']) . '</a>' 
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		return $last_event_id;
		
	}





	private function _update_event() {
		//print_r($this->_req_data);

		global $wpdb, $org_options, $espresso_wp_user;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');

		$wpdb->show_errors();
		
		$event_id = isset( $this->_req_data['EVT_ID'] )? absint( $this->_req_data['EVT_ID'] ) : null;
		
		$event_meta = array(); //will be used to hold event meta data
		$wp_user_id = empty($this->_req_data['wp_user']) ? $espresso_wp_user : $this->_req_data['wp_user'][0];
		$event_name = html_entity_decode( wp_strip_all_tags( $this->_req_data['event'] ), ENT_QUOTES, 'UTF-8' );
		$event_slug = ($this->_req_data['slug'] == '') ? sanitize_title_with_dashes($event_name . '-' . $event_id) : sanitize_title_with_dashes($this->_req_data['slug']);
		$event_desc = $this->_req_data['event_desc'];
		$display_desc = $this->_req_data['display_desc'];
		$display_reg_form = $this->_req_data['display_reg_form'];
		$reg_limit = absint( $this->_req_data['reg_limit'] );
		$allow_multiple = $this->_req_data['allow_multiple'];
		$additional_limit = $this->_req_data['additional_limit'];
		$is_active = $this->_req_data['is_active'];
		
		$address = !empty($this->_req_data['address']) ? esc_html($this->_req_data['address']) : '';
		$address2 = !empty($this->_req_data['address2']) ? esc_html($this->_req_data['address2']) : '';
		$city = !empty($this->_req_data['city']) ? esc_html($this->_req_data['city']) : '';
		$state = !empty($this->_req_data['state']) ? esc_html($this->_req_data['state']) : '';
		$zip = !empty($this->_req_data['zip']) ? esc_html($this->_req_data['zip']) : '';
		$country = !empty($this->_req_data['country']) ? esc_html($this->_req_data['country']) : '';
		$phone = !empty($this->_req_data['phone']) ? esc_html($this->_req_data['phone']) : '';
		$event_location = ($address != '' ? $address . ' ' : '') . ($city != '' ? '<br />' . $city : '') . ($state != '' ? ', ' . $state : '') . ($zip != '' ? '<br />' . $zip : '') . ($country != '' ? '<br />' . $country : '');

		//Venue Information
		$venue_title = isset($this->_req_data['venue_title']) ? $this->_req_data['venue_title'] : '';
		$venue_url = isset($this->_req_data['venue_url']) ? $this->_req_data['venue_url'] : '';
		$venue_phone = isset($this->_req_data['venue_phone']) ? $this->_req_data['venue_phone'] : '';
		$venue_image = isset($this->_req_data['venue_image']) ? $this->_req_data['venue_image'] : '';

		//Virtual location
		$virtual_url = isset($this->_req_data['virtual_url']) ? $this->_req_data['virtual_url'] : '';
		$virtual_phone = isset($this->_req_data['virtual_phone']) ? $this->_req_data['virtual_phone'] : '';

		if (isset($reg_limit) && $reg_limit == '') {
			$reg_limit = 999999;
		}

		$event_meta['venue_id'] = empty($this->_req_data['venue_id']) ? '' : $this->_req_data['venue_id'][0];
		$event_meta['date_submitted'] = isset( $this->_req_data['date_submitted'] ) ? $this->_req_data['date_submitted'] : NULL;
		$event_meta['originally_submitted_by'] = isset( $this->_req_data['originally_submitted_by'] ) ? $this->_req_data['originally_submitted_by'] : NULL;

		if (isset($espresso_wp_user) && $espresso_wp_user != $event_meta['originally_submitted_by']) {
			$event_meta['orig_event_staff'] = !empty($this->_req_data['event_person']) ? serialize($this->_req_data['event_person']) : '';
		}

		if (!empty($this->_req_data['venue_id'][0]) || !empty($this->_req_data['zip']) || !empty($this->_req_data['city']) || !empty($this->_req_data['state'])) {
			$event_meta['enable_for_gmap'] = isset( $this->_req_data['enable_for_gmap'] )  ? $this->_req_data['enable_for_gmap'] : FALSE;
		} else {
			$event_meta['enable_for_gmap'] = false;
		}

		if ( isset( $this->_req_data['emeta'] ) && ! empty ( $this->_req_data['emeta'] )) {
			foreach ($this->_req_data['emeta'] as $k => $v) {
				$event_meta[$v] = $this->_req_data['emetad'][$k];
			}
		}
		$event_meta = serialize($event_meta);

		################# END #################
		//When adding colums to the following arrays, be sure both arrays have equal values.
		$cols_n_values = array(
		
				'event_name' => $event_name,
				'event_desc' => $event_desc,
				'display_desc' => $display_desc,
				'display_reg_form' => $display_reg_form,
				'slug' => $event_slug,
				
				'address' => $address,
				'address2' => $address2,
				'city' => $city,
				'state' => $state,
				'zip' => $zip,
				
				'country' => $country,
				'phone' => $phone,
				'virtual_url' => $virtual_url,
				'virtual_phone' => $virtual_phone,
				'venue_title' => $venue_title,
				
				'venue_url' => $venue_url,
				'venue_phone' => $venue_phone,
				'venue_image' => $venue_image,
				'event_meta' => $event_meta,
				'allow_multiple' => $allow_multiple,
				
				'is_active' => $is_active,
				'reg_limit' => $reg_limit,
				'additional_limit' => $additional_limit,
				'wp_user' => $wp_user_id,
		);

		$data_format = array(
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s', 
				'%s', '%s', '%s', '%s', '%d', 
				'%s', '%s', '%s',  '%d'
		);

		$where_values = array('id' => $event_id);

		if ( $wpdb->update( EVENTS_DETAIL_TABLE, $cols_n_values, $where_values, $data_format, array('%d')) === FALSE ) {
			$error = true;
		}
//		echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		$del_cats = "DELETE FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
		if ( FALSE === $wpdb->query($del_cats) ) {
			$error = true;
		}

		if (!empty($this->_req_data['event_category'])) {
			foreach ($this->_req_data['event_category'] as $k => $v) {
				if ($v != '') {
					$sql_cat = "INSERT INTO " . EVENTS_CATEGORY_REL_TABLE . " (event_id, cat_id) VALUES ('" . $event_id . "', '" . $v . "')";
					//echo "$sql_cat <br>";
					if ( FALSE === $wpdb->query($sql_cat) )
						$error = true;
				}
			}
		}

		$del_venues = "DELETE FROM " . EVENTS_VENUE_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
		if ( FALSE === $wpdb->query($del_venues) )
			$error = true;

		if (!empty($this->_req_data['venue_id'])) {
			foreach ($this->_req_data['venue_id'] as $k => $v) {
				if ($v != '' && $v != 0) {
					$sql_venues = "INSERT INTO " . EVENTS_VENUE_REL_TABLE . " (event_id, venue_id) VALUES ('" . $event_id . "', '" . $v . "')";
					//echo "$sql_venues <br>";
					if ( FALSE === $wpdb->query($sql_venues) )
						$error = true;
				}
			}
		}




/*************************************   QUESTION GROUPS   ******************************************* */


		// first delete the old ones
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'esp_event_question_group ';
		$SQL .= 'WHERE EVT_ID = %d AND EQG_primary = 1';
		$wpdb->query( $wpdb->prepare( $SQL, $event_id ));
		
		// then save primary attendee's question groups
		$question_groups = isset( $this->_req_data['question_groups'] ) ? $this->_req_data['question_groups'] : array();
		foreach ( $question_groups as $question_group ) {
			$wpdb->insert(
				$wpdb->prefix . 'esp_event_question_group',
				array( 'EVT_ID' => $event_id, 'QSG_ID' => $question_group, 'EQG_primary' => 1 ),
				array( '%d', '%d', '%d' )
			);
		}
		
		// first delete the old ones
		$SQL = 'DELETE FROM ' . $wpdb->prefix . 'esp_event_question_group ';
		$SQL .= 'WHERE EVT_ID = %d AND EQG_primary = 0';
		$wpdb->query( $wpdb->prepare( $SQL, $event_id ));

		// then additional attendee question groups
		$add_attendee_question_groups = isset( $this->_req_data['add_attendee_question_groups'] ) ? $this->_req_data['add_attendee_question_groups'] : array();
		foreach ( $add_attendee_question_groups as $question_group ) {
			$wpdb->insert(
				$wpdb->prefix . 'esp_event_question_group',
				array( 'EVT_ID' => $event_id, 'QSG_ID' => $question_group, 'EQG_primary' => 0 ),
				array( '%d', '%d', '%d' )
			);
		}


/*************************************   DATE TIME   ******************************************* */

//			if (isset($this->_req_data['process_datetimes']) && $this->_req_data['process_datetimes']) {

			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Datetime.class.php');
			$DTM = EEM_Datetime::instance();

			// grab list of all datetime ID's we are processing
			if (isset($this->_req_data['datetime_IDs'])) {
				$datetime_IDs = unserialize( $this->_req_data['datetime_IDs'] );
				array_walk( $datetime_IDs, 'absint');
				$datetime_IDs = array_flip($datetime_IDs);
			} else {
				$datetime_IDs = array();
			}
			
//			printr( $datetime_IDs, '$datetime_IDs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			
			$event_datetimes = isset($this->_req_data['event_datetimes']) ? $this->_req_data['event_datetimes'] : array();
			// add hook so addons can manipulate event datetimes prior to saving			
			$event_datetimes = apply_filters( 'FHEE_update_event_datetimes', $event_datetimes );
			
//			printr( $event_datetimes, '$event_datetimes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			if ( $event_datetimes ) {			

				ksort($this->_req_data['event_datetimes']);

				foreach ($this->_req_data['event_datetimes'] as $dtm) {

//						echo printr( $dtm, '$dtm' );

					$dtm['evt_end'] = ( isset($dtm['evt_end']) && $dtm['evt_end'] != '' ) ? $dtm['evt_end'] : $dtm['evt_start'];
					$dtm['reg_end'] = ( isset($dtm['reg_end']) && $dtm['reg_end'] != '' ) ? $dtm['reg_end'] : $dtm['reg_start'];

//echo '<h4>evt_start : ' . $dtm['evt_start'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>evt_end : ' . $dtm['evt_end'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_start : ' . $dtm['reg_start'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_end : ' . $dtm['reg_end'] . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';


					//	EVT_ID 	DTT_is_primary 	DTT_EVT_start 	DTT_EVT_end 	DTT_REG_start 	DTT_REG_end 	DTT_event_or_reg 	DTT_reg_limit 	DTT_tckts_left 	 DTT_ID
					$new_event_date = new EE_Datetime(
													$event_id,
													$dtm['is_primary'],
													$dtm['evt_start'],
													$dtm['evt_end'],
													$dtm['reg_start'],
													$dtm['reg_end'],
													/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
													$dtm['reg_limit'],
													$dtm['tckts_left'],
													DO NOT DELETE - NEW FEATURE IN PROGRESS   */
													isset( $dtm['ID'] ) ? $dtm['ID'] : NULL
					);
					
					// copy primary datetime info for event post
					if ( $new_event_date->is_primary() ) {
						$start_date = $new_event_date->start_date();
						$end_date = $new_event_date->end_date();
						$start_time = $new_event_date->start_time();
						$end_time = $new_event_date->end_time();
						$registration_start = $new_event_date->reg_start_date();
						$registration_end = $new_event_date->reg_end_date();
						$registration_startT =$new_event_date->reg_start_time() ;
						$registration_endT = $new_event_date->reg_end_time();
					}
				
				
//					printr( $new_event_date, '$new_event_date  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

//echo '<h4>start_date_and_time : ' . $new_event_date->start_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>end_date_and_time : ' . $new_event_date->end_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_start_date_and_time : ' . $new_event_date->reg_start_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>reg_end_date_and_time : ' . $new_event_date->reg_end_date_and_time() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';

					// if an ID exists then update
					if ($new_event_date->ID()) {
						// remove this ID from list of datetime IDs - any remainders will get deleted afterwards
						if (array_key_exists($new_event_date->ID(), $datetime_IDs)) {
							unset($datetime_IDs[$new_event_date->ID()]);
						}
						$update = $new_event_date->update();
					} else {
						$insert = $new_event_date->insert();
					}
				}
			}

			// delete any Datetimes that are not being resaved
			foreach ($datetime_IDs as $datetime_ID => $bunk) {
				$DTM->delete_datetime($datetime_ID);
			}
//			}	// end if process_datetimes
//die();

		/************************************   PRICING   ******************************************* */

		$ticket_prices_to_save = array();
		$quick_edit_ticket_price = isset($this->_req_data['quick_edit_ticket_price']) ? $this->_req_data['quick_edit_ticket_price'] : array();
		//printr( $quick_edit_ticket_price, '$quick_edit_ticket_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( isset( $quick_edit_ticket_price['XXXXXX'] )) {
			$new_quick_price = $quick_edit_ticket_price['XXXXXX'];
			if ( isset( $new_quick_price['PRC_name'] ) && ! empty( $new_quick_price['PRC_name'] ) && isset( $new_quick_price['PRC_amount'] )) {
				$ticket_prices_to_save[] = array(
					'PRT_ID' => 2,
					'EVT_ID' => 4,
					'PRT_is_global' => FALSE,
					'PRC_overrides' => 0,
					'PRC_deleted' => FALSE,
					'PRC_order' =>  isset( $new_quick_price['PRC_order'] ) && $new_quick_price['PRC_order'] ? array( 2 => $new_quick_price['PRC_order'] ) : array( 2 => 0 ),
					'PRC_name' => $new_quick_price['PRC_name'] ? $new_quick_price['PRC_name'] : NULL,
					'PRC_desc' => NULL,
					'PRC_amount' => $new_quick_price['PRC_amount'] ? $new_quick_price['PRC_amount'] : 0,
					'PRC_use_dates' => FALSE,
					'PRC_start_date' => NULL,
					'PRC_end_date' => NULL,
					'PRC_is_active' => TRUE			
				);
			}
		}

		// grab list of edited ticket prices
		if ($edited_ticket_price_IDs = isset($this->_req_data['edited_ticket_price_IDs']) ? $this->_req_data['edited_ticket_price_IDs'] : FALSE) {
			// remove last comma
			$edited_ticket_price_IDs = trim($edited_ticket_price_IDs, ',');
			// create array of edited ticket prices
			$edited_ticket_price_IDs = explode(',', $edited_ticket_price_IDs);
			// flipper once
			$edited_ticket_price_IDs = array_flip($edited_ticket_price_IDs);
			// flipper twice - hey!?!?! where did all the duplicate entries go???
			$edited_ticket_price_IDs = array_flip($edited_ticket_price_IDs);
			// echo printr( $edited_ticket_price_IDs, '$edited_ticket_price_IDs' );
			// grab existing ticket price data
			if ( $edited_ticket_prices = isset($this->_req_data['edit_ticket_price']) ? $this->_req_data['edit_ticket_price'] : array() ) {
				// echo printr( $edited_ticket_prices, '$edited_ticket_prices' );
				// cycle thru list                    
				foreach ($edited_ticket_prices as $PRC_ID => $edited_ticket_price) {
//					echo printr( $edited_ticket_price, '$edited_ticket_price' );	
					// add edited ticket prices to list of ticket prices to save
					if (in_array($PRC_ID, $edited_ticket_price_IDs)) {
//						echo printr( $quick_edit_ticket_price[$PRC_ID], '$quick_edit_ticket_price[$PRC_ID]' );
						if ( isset( $quick_edit_ticket_price[$PRC_ID] ) && is_array( $quick_edit_ticket_price[$PRC_ID] )) {
							$edited_ticket_price = array_merge( $quick_edit_ticket_price[$PRC_ID], $edited_ticket_price );
//							echo printr( $edited_ticket_price, '$edited_ticket_price' );	
						}
						$ticket_prices_to_save[$PRC_ID] = $edited_ticket_price;
					}
				}
			}
		}
		
		//printr( $ticket_prices_to_save, '$ticket_prices_to_save  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// add new tickets if any
		if ($new_ticket_price = isset($this->_req_data['new_ticket_price']) ? $this->_req_data['new_ticket_price'] : array( 'PRC_name' => NULL, 'PRC_amount' => NULL )) {
			if ( $new_ticket_price['PRC_amount'] != '' && ! empty( $new_ticket_price['PRC_name'] )) {
				$ticket_prices_to_save[] = $new_ticket_price;
			} else if ( $new_ticket_price['PRC_amount'] == '' && ! empty( $new_ticket_price['PRC_name'] )) {
				$msg = __( 'Event prices require an amount before they can be saved. Please make sure you enter an amount for the new event price before attempting to save it.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );		
			} else if ( $new_ticket_price['PRC_amount'] != '' && empty( $new_ticket_price['PRC_name'] )) {
				$msg = __( 'Event prices require a name before they can be saved. Please make sure you enter a name for the new event price before attempting to save it.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );		
			}
		}
		
		// add hook so addons can manipulate event ticket prices prior to saving			
		$ticket_prices_to_save = apply_filters( 'FHEE_update_event_ticket_prices', $ticket_prices_to_save );

		// and now we actually save the ticket prices
		if (!empty($ticket_prices_to_save)) {

			//echo printr( $new_ticket_price, '$new_ticket_price' );
			//printr( $ticket_prices_to_save, '$ticket_prices_to_save  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
			$PRC = EEM_Price::instance();

			global $current_user;
			get_currentuserinfo();
			
			
			foreach ($ticket_prices_to_save as $PRC_ID => $ticket_price) {

				//determine whether this price overrides an existing global or not
				$overrides = absint($ticket_price['PRT_is_global']) ? $PRC_ID : NULL;
//echo '<br/><br/><h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
				// or whether it was already overriding a global from before
				$overrides = $ticket_price['PRC_overrides'] ? absint($ticket_price['PRC_overrides']) : $overrides;
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
				$ticket_price['PRC_order'] = $PRC_ID ? $ticket_price['PRC_order'] : $ticket_price['PRC_order'][ $ticket_price['PRT_ID'] ];
				$new_price = new EE_Price(
												$ticket_price['PRT_ID'],
												absint($event_id),
												preg_replace( '/[^0-9,.]/', '', $ticket_price['PRC_amount'] ),
												$ticket_price['PRC_name'],
												$ticket_price['PRC_desc'],
												isset( $ticket_price['PRC_reg_limit'] ) ? $ticket_price['PRC_reg_limit'] : NULL,
												isset( $ticket_price['PRC_tckts_left'] ) ? $ticket_price['PRC_tckts_left'] : NULL,
												isset( $ticket_price['PRC_use_dates'] ) ? $ticket_price['PRC_use_dates'] : FALSE,
												isset( $ticket_price['PRC_start_date'] ) ? $ticket_price['PRC_start_date'] : FALSE,
												isset( $ticket_price['PRC_end_date'] ) ? $ticket_price['PRC_end_date'] : FALSE,
												$ticket_price['PRC_is_active'] ? TRUE : FALSE,
												$overrides,
//												$ticket_price['PRT_ID'] < 3 ? 0 : $ticket_price['PRC_order'],
												$ticket_price['PRC_order'],
												isset( $ticket_price['PRC_deleted'] ) ? $ticket_price['PRC_deleted'] : FALSE,
												$ticket_price['PRT_is_global'] == 1 &&  ! isset ( $PRC_ID ) ? 0 : $PRC_ID
				);
				
//				printr( $ticket_price, '$ticket_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//				printr( $new_price, '$new_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//die();
				if ( $new_price->deleted() && isset( $this->_req_data['price_count'] ) ) {
					$this->_req_data['price_count']--;
				}

				if (!$new_price->ID()) {
//echo '<h1>insert !!!</h1>';
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
					$results = $new_price->insert();
					$this->_req_data['price_count']++;
				} else {
//echo '<h1>update !!!</h1>';
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
					$results = $new_price->update();
				}
			}
		}


//echo printr( $this->_req_data, '$this->_req_data' );	
//echo EE_Error::get_notices();            
//die();
		
		// if ticket prices have eben set for this event, then remove it from the list of events with no prices,
		if ( isset( $this->_req_data['price_count'] ) && absint( $this->_req_data['price_count'] ) > 0 ) {
			$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', array() );
			if ( isset( $espresso_no_ticket_prices[ $event_id ] )) {
				unset( $espresso_no_ticket_prices[ $event_id ] );
				update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
			}
		} else {
			// event has no set prices, so add it to list for tracking
			$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', array() );
			$espresso_no_ticket_prices[ $event_id ] = $event_name;
			update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
		}

		if ( empty( $error )) {			
			// overwrite default success messages
			EE_Error::overwrite_success();
			$msg = sprintf( 
					__( 'The event %s has been updated', 'event_espresso' ), 
					'<a href=' . espresso_reg_url($event_id) . '>' . stripslashes_deep($this->_req_data['event']) . '</a>'
			);
			EE_Error::add_success( $msg );
		} else { 
			$msg = sprintf( 
					__( 'An error occured and the event %s has not been updated in the database.', 'event_espresso' ), 
					'<a href=' . espresso_reg_url($event_id) . '>' . stripslashes_deep($this->_req_data['event']) . '</a>' 
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );		
		}

		//Empty the event cache
		$this->_espresso_reset_cache($event_id);
		
		return $event_id;
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

		$this->_template_args['org_options'] = isset( $org_options['org_options'] ) ? maybe_unserialize( $org_options['org_options'] ) : FALSE;
		$this->_template_args['expire_on_registration_end'] = isset( $org_options['expire_on_registration_end'] ) ? absint( $org_options['expire_on_registration_end'] ) : FALSE;

		$this->_template_args['reg_status_array'] = $this->_get_reg_status_array( array( 'RCN', 'RNA' ));
		$this->_template_args['default_reg_status'] = isset( $org_options['default_reg_status'] ) ? sanitize_text_field( $org_options['default_reg_status'] ) : 'RPN';
		$this->_template_args['pending_counts_reg_limit'] = isset( $org_options['pending_counts_reg_limit'] ) ? sanitize_text_field( $org_options['pending_counts_reg_limit'] ) : TRUE;

		$this->_template_args['use_attendee_pre_approval'] = isset( $org_options['use_attendee_pre_approval'] ) ? absint( $org_options['use_attendee_pre_approval'] ) : FALSE;

		$this->_set_add_edit_form_tags( 'update_default_event_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = espresso_display_template( EVENTS_TEMPLATE_PATH . 'event_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();	
		
	}




	/**
	 * 		_update_default_event_settings
	*		@access protected
	*		@return array
	*/
	protected function _update_default_event_settings() {	

		$data = array();
		$data['expire_on_registration_end'] = isset( $this->_req_data['expire_on_registration_end'] ) ? absint( $this->_req_data['expire_on_registration_end'] ) : FALSE;
		$data['default_reg_status'] = isset( $this->_req_data['default_reg_status'] ) ? sanitize_text_field( $this->_req_data['default_reg_status'] ) : 'RPN';
		$data['pending_counts_reg_limit'] = isset( $this->_req_data['pending_counts_reg_limit'] ) ? absint( $this->_req_data['pending_counts_reg_limit'] ) : TRUE;
		$data['use_attendee_pre_approval'] = isset( $this->_req_data['use_attendee_pre_approval'] ) ? absint( $this->_req_data['use_attendee_pre_approval'] ) : TRUE;

		$data = apply_filters('FHEE_default_event_settings_save', $data);	
		
		$what = 'Default Event Settings';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'default_event_settings' ) );
				
	}





	/**
	 * 		get list of payment statuses
	*		@access private
	* 		@param	array 	$exclude		array of STS_IDs to exclude from returned array
	*		@return array
	*/
	private function _get_reg_status_array( $exclude = array() ) {

		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "registration"';
		$results = $wpdb->get_results( $SQL );

		$reg_status = array();
		foreach ( $results as $status ) {
			if ( ! in_array( $status->STS_ID, $exclude )) {
				$reg_status[] = array( 'id' => $status->STS_ID, 'text' => ucwords( strtolower( str_replace( '_', ' ', $status->STS_code ))));
			}
		}
		return $reg_status;
	}




	/**
	 * _view_report
	 * Shows the report page for events
	 * @return string html for the report page
	 */
	protected function _view_report() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_event', 'add', array(), 'button add-new-h2');
		$this->_template_args['admin_page_content'] = 'in here';
		$this->display_admin_page_with_sidebar();
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
		$this->_req_data = array_merge( $this->_req_data, $new_request_args);
		
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance( $this->_req_data );
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
		$this->_req_data = array_merge( $this->_req_data, $new_request_args );
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance();
			$EE_Export->export();
		}

	}



	/**
	 * _import_events
	 * This handles displaying the screen and running imports for importing events.
	 * 	
	 * @return string html
	 */
	protected function _import_events() {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
		
		//first check if we've got an incoming import
		if ( isset( $this->_req_data['import'] ) &&  $this->_req_data['import']  == 'csv' ) {
			EE_Import::instance()->import();
		}

		$title = __( 'Import Events', 'event_espresso' );
		$intro = __( 'If you have a previously exported list of Event Details in a Comma Separated Value (CSV) file format, you can upload the file here: ', 'event_espresso' );
		$form_url = EVENTS_ADMIN_URL;
		$action = 'import_events';
		$type = 'csv';
		$content = EE_Import::instance()->upload_form( $title, $intro, $form_url, $action, $type );

		$this->_admin_page_title .= $this->_get_action_link_or_button('add_event', 'add', array(), 'button add-new-h2');
		$this->_template_args['admin_page_content'] = $content;	
		$this->display_admin_page_with_sidebar();
	}




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


		$offset = ($current_page-1)*$per_page; 
		$limit = $count ? '' : ' LIMIT ' . $offset . ',' . $per_page;
		$orderby = isset($this->_req_data['orderby']) ? " ORDER BY " . $this->_req_data['orderby'] : " ORDER BY e.event_name";
		$order = isset($this->_req_data['order']) ? " " . $this->_req_data['order'] : " DESC";

		if (isset($this->_req_data['month_range'])) {
			$pieces = explode(' ', $this->_req_data['month_range'], 3);
			$month_r = !empty($pieces[0]) ? $pieces[0] : '';
			$year_r = !empty($pieces[1]) ? $pieces[1] : '';
		}
		
		$sql = '';
		$sql = $count ? "SELECT COUNT(e.id) " : "SELECT e.id as event_id, e.event_name, e.slug, e.event_identifier, e.reg_limit, e.is_active, e.event_meta, e.event_status, dtt.*";

		if ( !$count ) {

			//venue information
			if (isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] ) {
				$sql .= ", v.name AS venue_title, v.address AS venue_address, v.address2 AS venue_address2, v.city AS venue_city, v.state AS venue_state, v.zip AS venue_zip, v.country AS venue_country ";
			} else {
				$sql .= ", e.venue_title, e.phone, e.address, e.address2, e.city, e.state, e.zip, e.country ";
			}
		}

		$sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";

	
		$sql .= " LEFT JOIN " . ESP_DATETIME_TABLE . " dtt ON dtt.EVT_ID = e.id ";

		if (isset($org_options['use_venue_manager']) && $org_options['use_venue_manager']) {
			$sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON vr.event_id = e.id ";
			$sql .= " LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = vr.venue_id ";
		}
		


		if ( isset($this->_req_data['category_id']) && $this->_req_data['category_id'] != '') {
			$sql .= " LEFT JOIN " . EVENTS_CATEGORY_REL_TABLE . " cr ON cr.event_id = e.id ";
			$sql .= " LEFT JOIN " . EVENTS_CATEGORY_TABLE . " c ON c.id = cr.cat_id ";
		}

		$sql .= ' WHERE ';

		if ( !$count ) {
			$sql .= "dtt.DTT_is_primary = '1' AND ";
		}

		$sql .= ( isset($this->_req_data['event_status']) && ($this->_req_data['event_status'] != '') ) ? "e.event_status = '" . $this->_req_data['event_status'] . "' " : "e.event_status != 'D' ";
		$sql .= isset($this->_req_data['category_id']) && $this->_req_data['category_id'] != '' ? " AND c.id = '" . $this->_req_data['category_id'] . "' " : '';

		if ( isset($this->_req_data['month_range']) && $this->_req_data['month_range'] != '' ) {
			$sql .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($year_r . '-' . $month_r . '-01') . "' AND '" . strtotime($year_r . '-' . $month_r . '-31') . "' ";
		} elseif (isset($this->_req_data['status']) && $this->_req_data['status'] == 'today') {
			$sql .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime(date('Y-m-d') . ' 0:00:00') . "' AND '" . strtotime(date('Y-m-d') . ' 23:59:59') . "' ";
		} elseif (isset($this->_req_data['status']) && $this->_req_data['status'] == 'month') {
			$this_year_r = date('Y');
			$this_month_r = date('m');
			$days_this_month = date('t');
			$sql .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($this_year_r . '-' . $this_month_r . '-01') . "' AND '" . strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month) . "' ";
		}

		$sql .= !$count ? " GROUP BY e.id " . $orderby . $order . $limit : '';

		//todo: This needs to be prepared to protect agains injection attacks... but really the whole stinking query could probably be better layed out.
		
		
		$events = $count ? $wpdb->get_var( $sql ) : $wpdb->get_results( $sql );

		return $events;
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

		if ($wpdb->num_rows > 0) {
			echo '<select name="month_range" class="wide">';
			echo '<option value="">' . __('Select a Month/Year', 'event_espresso') . '</option>';
			foreach ($dates as $row) {
				$option_date = date_i18n( 'M Y', $row->e_date );
				echo '<option value="' . $option_date . '"';
				echo $option_date == $current_value ? ' selected="selected=selected"' : '';
				echo '>' . $option_date . '</option>' . "\n";
			}
			echo "</select>";
		} else {
			_e('No Results', 'event_espresso');
		}
	}







	/**
	 * get tal number of events
	 *
	 * @access public
	 * @return int 
	 */
	public function total_events() {
		
		global $wpdb;

		//Dates
		$curdate = date('Y-m-d');
		$this_year_r = date('Y');
		$this_month_r = date('m');
		$days_this_month = date('t');

		$group = '';
		if (function_exists('espresso_member_data')&&espresso_member_data('role')=='espresso_group_admin'){
			$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
			$group = unserialize($group);
			if (!empty($group)){
				$group = implode(",",$group);
			}
		}

		$sql1 = "(";
		if ( $group != '' ){
			$sql1 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
			$sql1 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$sql1 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			$sql1 .= " WHERE event_status != 'D'";
			$sql1 .= !empty($group) ? " AND l.locale_id IN (" . $group . ") " : '';
			$sql1 .= ") UNION (";
		}
		$sql1 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql1 .= " WHERE event_status != 'D'";
		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
			$sql1 .= " AND wp_user = '" . espresso_member_data('id') ."' ";
		}
		$sql1 .= ")";
		$total_events = 0;
		if( $wpdb->query($sql1) ){
			$total_events =	$wpdb->num_rows;
		}
		return $total_events;
	}






	/**
	 * get total number of events today
	 *
	 * @access public
	 * @return int 
	 */
	public function total_events_today() {
		global $wpdb;

		//Dates
		$curdate = date('Y-m-d');
		$this_year_r = date('Y');
		$this_month_r = date('m');
		$days_this_month = date('t');
		$start = ' 00:00:00';
		$end = ' 23:59:59';

		$sql2 = "(";
		if ( !empty($group)){
			$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
			$sql2 .= " JOIN " . ESP_DATETIME_TABLE . " dtt ON dtt.EVT_ID = e.id ";
			$sql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$sql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			$sql2 .= " WHERE e.event_status != 'D'";
			$sql2 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime( date('Y-m-d') . $start ) . "' AND '" . strtotime( date('Y-m-d') . $end ) . "' ";
			$sql2 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
			$sql2 .= ") UNION (";
		}
		$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql2 .= " JOIN " . ESP_DATETIME_TABLE . " dtt ON dtt.EVT_ID = e.id ";
		$sql2 .= " WHERE e.event_status != 'D'";
		$sql2 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime( date('Y-m-d') . $start ) . "' AND '" . strtotime( date('Y-m-d') . $end ) . "' ";

		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
			$sql2 .= " AND e.wp_user = '" . espresso_member_data('id') ."' ";
		}
		$sql2 .= ")";
		$total_events_today = 0;
		if( $wpdb->query($sql2) ){
			$total_events_today =	$wpdb->num_rows;
		}
		return $total_events_today;
	}






	/**
	 * get total number of events this month
	 *
	 * @access public
	 * @return int 
	 */
	public function total_events_this_month() {
		global $wpdb;

		//Dates
		$curdate = date('Y-m-d');
		$this_year_r = date('Y');
		$this_month_r = date('m');
		$days_this_month = date('t');
		$start = ' 00:00:00';
		$end = ' 23:59:59';

		$sql3 = "(";
		if (!empty($group)){
			$sql3 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
			$sql3 .= " JOIN " . ESP_DATETIME_TABLE . " dtt ON dtt.EVT_ID = e.id ";
			$sql3 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$sql3 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			$sql3 .= " WHERE event_status != 'D'";
			$sql3 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($this_year_r . '-' . $this_month_r . '-01' . $start) . "' AND '" . strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end ) . "' ";

			$sql3 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
			$sql3 .= ") UNION (";
		}
		$sql3 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql3 .= " JOIN " . ESP_DATETIME_TABLE . " dtt ON dtt.EVT_ID = e.id ";
		$sql3 .= " WHERE event_status != 'D'";
		$sql3 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($this_year_r . '-' . $this_month_r . '-01' . $start) . "' AND '" . strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end ) . "' ";

		if(  function_exists('espresso_member_data') && ( espresso_member_data('role')=='espresso_event_manager' || espresso_member_data('role')=='espresso_group_admin') ){
			$sql3 .= " AND wp_user = '" . espresso_member_data('id') ."' ";
		}
		$sql3 .= ")";
		//echo $sql3;
		$wpdb->query($sql3);
		$total_events_this_month = 0;
		if( $wpdb->query($sql3) ){
			$total_events_this_month =	$wpdb->num_rows;
		}
		return $total_events_this_month;
	}







	/**
	 * flushes the event cache
	 *
	 * @access private
	 * @param  integer $event_id 
	 * @return void            
	 */
	private function _espresso_reset_cache( $event_id = 0 ) {
		delete_transient('all_espresso_events');
		delete_transient('all_espresso_calendar_events');

		//Flushes the cache that may be set for an event slug
		if ($event_id > 0) {
			delete_transient('espresso_event_slug_' . $event_id);
			delete_transient('espresso_time_dropdown_' . $event_id);
		}
	}


} //end class Events_Admin_Page