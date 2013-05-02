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
			'delete_events' => array(
				'func' => '_delete_events', //coming from overview page
				'noheader' => true
				),
			'delete_event' => array(
				'func' => '_delete_events', //coming from edit page.
				'noheader' => true
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
			'trash_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array('trash' => TRUE ),
				'noheader' => true
				),
			'restore_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array('trash' => FALSE ),
				'noheader' => true
				),
			'view_report' => '_view_report',
			'export_events' => array(
				'func' => '_events_export',
				'noheader' => true
				),
			'export_payments' => array(
				'func' => '_payment_export',
				'noheader' => true
				),
			'import_events' => '_import_events',
			'import' => '_import_events',
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
			'view_report' => array(
				'nav' => array(
					'label' => __('Report', 'event_espresso'),
					'order' => 20
					)
				),
			'import_events' => array(
				'nav' => array(
					'label' => __('Import', 'event_esprsso'),
					'order' => 30
					),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box')
				),
			'add_event' => array(
				'nav' => array(
					'label' => __('Add Event', 'event_espresso'),
					'order' => 5,
					'persistent' => false
					),
				'metaboxes' => array( '_publish_post_box', '_register_event_editor_meta_boxes', '_premium_event_editor_meta_boxes' )
				),
			'edit_event' => array(
				'nav' => array(
					'label' => __('Edit Event', 'event_espresso'),
					'order' => 5,
					'persistent' => false,
					'url' => isset($this->_req_data['EVT_ID']) ? add_query_arg(array('EVT_ID' => $this->_req_data['EVT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array( '_publish_post_box', '_register_event_editor_meta_boxes', '_premium_event_editor_meta_boxes' )
				),
			'default_event_settings' => array(
				'nav' => array(
					'label' => __('Default Settings', 'event_esprsso'),
					'order' => 40
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box' )
				)
			);
	}



	protected function _add_screen_options() {
		//todo
	}


	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}




	protected function _add_help_tabs() {
		//todo
	}





	protected function _add_feature_pointers() {
		//todo
	}





	public function load_scripts_styles() {
		//todo note: we also need to load_scripts_styles per view (i.e. default/view_report/event_details)		
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
					'delete_events' => __('Delete Permanently', 'event_espresso'),
					'export_events' => __('Export Events', 'event_espresso'),
					'export_payments' => __('Export Payments', 'event_espresso')
					)
				),
			'today' => array(
				'slug' => 'today',
				'label' => __('Today', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_events' => __('Delete Permanently', 'event_espresso'),
					'export_events' => __('Export Events', 'event_espresso'),
					'export_payments' => __('Export Payments', 'event_espresso')
					)
				),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_events' => __('Delete Permanently', 'event_espresso'),
					'export_events' => __('Export Events', 'event_espresso'),
					'export_payments' => __('Export Payments', 'event_espresso')
					)
				)
			);
	}




	/**
	 * _events_overview_list_table
	 * This contains the logic for showing the events_overview list
	 *
	 * @access protected
	 * @return string html for generated table
	 */
	protected function _events_overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
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
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Formatter.helper.php';

		//load field generator helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';

		//set _event property
		$this->_set_event_object();

		// form 
		$route = $view == 'edit' ? 'update_event' : 'insert_event';
		$this->_set_add_edit_form_tags($route);

		//any specific javascript here.
		//todo: this needs to be done properly via an enqueue and wp_localize_scripts() for vars
		add_action( 'action_hook_espresso_event_editor_footer', array($this, 'event_editor_footer_js') );

		$this->_generate_event_title_and_desc();
		$this->_generate_publish_box_extra_content();
		
		$id = isset($this->_event->id) ? $this->_event->id : '';
		$this->_set_publish_post_box_vars( 'event_id', $id, 'delete_event' );

		$this->display_admin_page_with_sidebar();

	}




	/**
	 * 	_generate_event_title_and_desc
	 * 	@access private
	 * @return void
	 */
	private function _generate_event_title_and_desc() {
		// title and desc content
		$title_and_desc_args['event_name'] = $this->_event->event_name;
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
		// publish box
		$publish_box_extra_args['reg_url'] = espresso_reg_url($this->_event->id, $this->_event->slug);
		$publish_box_extra_args['event_id'] = $this->_event->id;
		$publish_box_extra_args['event_preview_url'] = add_query_arg( array( 'action' => 'copy_event', 'event_id' => $this->_event->id ), EVENTS_ADMIN_URL ); 
		$publish_box_extra_args['event_name'] = $this->_event->event_name;
		$publish_box_extra_args['event_start_date'] = event_date_display($this->_event->start_date);
		$publish_box_extra_args['event_status_display'] = $this->_event->status['display'];
		$publish_box_extra_args['view_attendees_url'] = add_query_arg( array( 'action' => 'default', 'event_id' => $this->_event->id ), REG_ADMIN_URL ); 
		$publish_box_extra_args['attendees_reg_limit'] = get_number_of_attendees_reg_limit($this->_event->id, 'num_attendees_slash_reg_limit', $this->_event->reg_limit ); 

		//todo this would be the place to hook the newsletter message type trigger once its ready.
		$publish_box_extra_args['misc_pub_section_class'] = apply_filters('filter_hook_espresso_event_editor_email_attendees_class', 'misc-pub-section');
		$publish_box_extra_args['email_attendees_url'] = add_query_arg( array( 'event_admin_reports' => 'event_newsletter', 'event_id' => $this->_event->id ), 'admin.php?page=espresso_registrations' ); 
		$publish_box_extra_args['event_editor_overview_add'] = do_action( 'action_hook_espresso_event_editor_overview_add', $this->_event ); 
		// load template
		$this->_template_args['publish_box_extra_content'] = espresso_display_template( EVENTS_TEMPLATE_PATH . 'event_publish_box_extras.template.php', $publish_box_extra_args, TRUE );
	}




	/**
	 * [event_editor_footer_js description]
	 * @return string
	 */
	public function event_editor_footer_js($content) {
		ob_start();
		include_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin_screens/events/help.php');
		$n_content = ob_get_contents();
		ob_end_clean();
		$content .= $n_content;
		return $content;
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
		global $wpdb, $org_options, $caffeinated, $current_user;
		get_currentuserinfo();
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_event = new stdClass();
		$this->_event->is_new = TRUE;
		$this->_event->id = 0;
		$this->_event->event_name = '';
		$this->_event->start_date = date( 'Y-m-d', time() + (60 * 60 * 24 * 30));
		$this->_event->event_desc = '';
		$this->_event->phone = '';
		$this->_event->externalURL = '';
		$this->_event->early_disc = '';
		$this->_event->early_disc_date = '';
		$this->_event->early_disc_percentage = '';
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
		$this->_event->google_map_link = espresso_google_map_link(array(
				'address' => $this->_event->address,
				'city' => $this->_event->city,
				'state' => $this->_event->state,
				'zip' => $this->_event->zip,
				'country' => $this->_event->country));
		$this->_event->event_meta = array(
				'additional_attendee_reg_info' => 1,
				'default_reg_status' => '',
				//'add_attendee_question_groups' => array('1'),
				'originally_submitted_by' => $current_user->ID);
		$this->_event->wp_user = $current_user->ID;
		
/*		$this->_event->question_groups = array();
		$sql = "SELECT qg.* FROM " . EVENTS_QST_GROUP_TABLE . " qg JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr ON qg.id = qgr.group_id ";
		$sql2 = apply_filters('filter_hook_espresso_event_editor_question_groups_sql', " WHERE wp_user = '0' OR wp_user = '1' ", $this->_event->id);
		$sql .= $sql2 . " GROUP BY qg.id ORDER BY qg.group_order";
		$sql = apply_filters('filter_hook_espresso_question_group_sql', $sql);
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
		$this->_event->alt_email = '';
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
		$this->_event = apply_filters('filter_hook_espresso_new_event_template', $this->_event);
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
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

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

		//Debug
		//echo "<pre>".print_r($event,true)."</pre>";
		$this->_event->is_new = FALSE;
		$this->_event->event_name = stripslashes_deep($this->_event->event_name);
		$this->_event->event_desc = stripslashes_deep($this->_event->event_desc);
		$this->_event->phone = stripslashes_deep($this->_event->phone);
		$this->_event->externalURL = stripslashes_deep($this->_event->externalURL);
		$this->_event->early_disc = stripslashes_deep($this->_event->early_disc);
		$this->_event->early_disc_date = stripslashes_deep($this->_event->early_disc_date);
		$this->_event->early_disc_percentage = stripslashes_deep($this->_event->early_disc_percentage);
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
		$this->_event->submitted = $this->_event->submitted != '0000-00-00 00:00:00' ? ( empty( $this->_event->submitted ) ? '' : event_date_display( $this->_event->submitted ) ) : 'N/A';
		$this->_event->google_map_link = espresso_google_map_link(array('address' => $this->_event->address, 'city' => $this->_event->city, 'state' => $this->_event->state, 'zip' => $this->_event->zip, 'country' => $this->_event->country));
		$this->_event->event_meta = unserialize($this->_event->event_meta);

/*		$this->_event->question_groups = unserialize($this->_event->question_groups);
		$sql = "SELECT qg.* FROM " . EVENTS_QST_GROUP_TABLE . " qg JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr ON qg.id = qgr.group_id ";
		$sql2 = apply_filters('filter_hook_espresso_event_editor_question_groups_sql', " WHERE wp_user = '0' OR wp_user = '1' ", $this->_event->id);
		$sql .= $sql2 . " GROUP BY qg.id ORDER BY qg.group_order";
		$sql = apply_filters('filter_hook_espresso_question_group_sql', $sql);
		//Debug:
		//echo $sql;
		$this->_event->q_groups = $wpdb->get_results($sql);		
		$this->_event->num_rows = $wpdb->num_rows;*/
		
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

		add_meta_box('espresso_event_editor_date_time', __('Dates &amp; Times', 'event_espresso'), array( $this, 'date_time_metabox' ), $this->_current_screen->id, 'normal', 'high');

		add_meta_box('espresso_event_editor_pricing', __('Event Pricing', 'event_espresso'), array( $this, 'pricing_metabox' ), $this->_current_screen->id, 'normal', 'core');

		add_meta_box('espresso_event_editor_venue', __('Venue Details', 'event_espresso'), array( $this, 'venue_metabox' ), $this->_current_screen->id, 'normal', 'core');

		
		add_meta_box('espresso_event_editor_primary_questions', __('Questions for Primary Attendee', 'event_espresso'), array( $this, 'primary_questions_group_meta_box' ), $this->_current_screen->id, 'side', 'core');

		add_meta_box('espresso_event_editor_categories', __('Event Category', 'event_espresso'), array( $this, 'categories_meta_box' ), $this->_current_screen->id, 'side', 'default');
	}





	



	public function date_time_metabox() {
		global $org_options, $caffeinated;

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Ticket.model.php');
	//	$TKT_MDL = EEM_Ticket::instance();
	//	
	//	$all_event_tickets = $TKT_MDL->get_all_event_tickets( $event->id );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$DTM_MDL = EEM_Datetime::instance();

		global $times;
		// grab event times
		$times = $DTM_MDL->get_all_event_dates( $this->_event->id );
		// grab reg times
		//$reg_times = $DTM_MDL->get_all_reg_dates($this->_event->id);
		
		$datetime_IDs = array();
		
		//printr( $times, '$times' );
		?>

		
		<div id="event-datetimes-dv" class="" >

			<table id="event-dates-and-times">
				<thead>
					<tr valign="top">
						<td> <?php echo __('Event Starts on', 'event_espresso') ?> 
							<?php echo $this->_get_help_tab_link('event_date_info'); ?> </td>
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
					<tr valign="top" id="event-dates-and-times-row-<?php echo $row; ?>">
						<td>
							<div class="small-screen-table-label"><?php echo __('Event Starts on', 'event_espresso') ?>
								<?php echo $this->_get_help_tab_link('event_date_info'); ?>
							</div>
							<input id="event-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_start]" type="text" class="dtm-es-picker dtm-inp medium-text" value="<?php echo $time->start_date_and_time(  'Y-m-d '  ); ?>"/>
							<input name="event-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
							<?php /* <input id="event-start-max-date-<?php echo $row; ?>" type="hidden" value=""/> */ ?>
							<?php if ($time->ID()) { ?>
							<?php $datetime_IDs[$row] = $time->ID(); ?>
							<input id="ID-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][ID]" type="hidden" value="<?php echo $time->ID(); ?>"/>
							<?php } ?>						
							<input id="is-primary-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][is_primary]" type="hidden" value="<?php echo $time->is_primary(); ?>" />
						</td>

						<td>
							<div class="small-screen-table-label"><?php echo __('Event Ends on', 'event_espresso') ?></div>
							<input id="event-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_end]" type="text" class="dtm-ee-picker dtm-inp medium-text" value="<?php echo $time->end_date_and_time(  'Y-m-d '  ); ?>"/>
							<input name="event-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
							<?php /* <input id="event-end-min-date-<?php echo $row; ?>" type="hidden" value=""/> */ ?>
						</td>
						
						<td>
							<div class="small-screen-table-label"><?php echo __('Registration Starts on', 'event_espresso') ?></div>
							<input id="reg-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_start]" type="text" class="dtm-rs-picker dtm-inp medium-text" value="<?php echo $time->reg_start_date_and_time(  'Y-m-d '  ) ?>" />
							<input name="reg-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
						</td>

						<td>
							<div class="small-screen-table-label"><?php echo __('Registration Ends on', 'event_espresso') ?></div>
							<input id="reg-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_end]" type="text" class="dtm-re-picker dtm-inp medium-text" value="<?php echo $time->reg_end_date_and_time(  'Y-m-d '  ) ?>" />
							<input name="reg-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
						</td>
			
						<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
						<?php if ($org_options['time_reg_limit']) : ?>
							<td>
								<input type="text" id="reg-limit-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_limit]" class="small-text dtm-inp" style="text-align:right;" value="<?php echo $time->reg_limit(); ?>"/>
							</td>
						<?php endif; // time_reg_limit   ?>
						  */ ?>
						
	<!--					<td>
							<input type="text" id="tckts-left-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][tckts_left]" class="small-text dtm-inp" style="text-align:right;" value="<?php echo $time->tckts_left(); ?>"/>
						</td>-->
																	
						<td>
							<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>
							<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <a class='display-dtm-tickets-left-lnk display-ticket-manager' data-reveal-id="ticket-manager-dv" rel="<?php echo $time->ID(); ?>"  title='Display the Ticket Manager for this Date Time' style="position:relative; top:5px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;" >
								<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/tickets-1-16x16.png" width="16" height="16" alt="<?php _e('tickets left', 'event_espresso'); ?>"/>
							</a> */ ?>
							<a class='clone-date-time dtm-inp-btn' rel='<?php echo $row; ?>' title='<?php _e('Clone this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:5px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'>
								<img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/clone-trooper-16x16.png' width='16' height='16' alt='<?php _e('clone', 'event_espresso'); ?>'/>
							</a>
					<?php if ( $row != 1 ) : ?>
							<a class='remove-xtra-time dtm-inp-btn' rel='<?php echo $row; ?>' title='<?php _e('Remove this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'>
								<img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png' width='16' height='16' alt='<?php _e('trash', 'event_espresso'); ?>'/>
							</a>
					<?php endif; ?>
						</td>
						
					</tr>
					<?php $row++; ?>
				<?php endforeach; // ($times as $time)  ?>
			</table>
			<br class="clear"/>
			<!--<input type="button" id="add-time" class="button dtm-inp-btn" value="<?php _e('Add Additional Time', 'event_espresso'); ?>" />-->
			<a id="add-new-date-time" class="button dtm-inp-btn" ><?php _e('Add New Dates &amp; Times', 'event_espresso'); ?></a>
			<br class="clear"/><br/>
		</div>

		
		<div id="timezones-datetimes-dv" class="">

			<?php if ((!isset($org_options['use_event_timezones']) || $org_options['use_event_timezones'] ) && $caffeinated === TRUE) : ?>
				<span class="run-in"> <?php _e('Current Time:', 'event_espresso'); ?> </span>
				<span class="current-date"> <?php echo date(get_option('date_format')) . ' ' . date(get_option('time_format')); ?></span>
				<?php echo $this->_get_help_tab_link('current_time_info'); ?>
				<a class="change-date-time" href="options-general.php" target="_blank"><?php _e('Change timezone and date format settings?', 'event_espresso'); ?></a>
			<?php endif; ?>

			<?php if (!empty($org_options['use_event_timezones']) && $caffeinated === TRUE) : ?>
				<h6> <?php _e('Event Timezone:', 'event_espresso') ?> </h6>
				<?php echo eventespresso_ddtimezone($this->_event->id) ?>
			<?php endif; ?>

		</div>

		<input  type="hidden" name="datetime_IDs" value="<?php echo serialize( $datetime_IDs ); ?>"/>
		<input  type="hidden" id="process_datetimes" name="process_datetimes" value="1"/>


		<?php if ($caffeinated) : ?>
			<script type="text/javascript">
				(function($) {
					var counter = <?php echo $row; ?>;

					$('#add-new-date-time').live('click', function(){
						var newRow = "<tr valign='top' id='event-dates-and-times-row-"+counter+"'><td><div class='small-screen-table-label'><?php echo __('Event Starts on', 'event_espresso') ?></div><input id='event-start-"+counter+"' name='event_datetimes["+counter+"][evt_start]' type='text' class='dtm-es-picker dtm-inp medium-text' value=''/><input name='event-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/><input id='is-primary-"+counter+"' name='event_datetimes["+counter+"][is_primary]' type='hidden' value='' /></td><td><div class='small-screen-table-label'><?php echo __('Event Ends on', 'event_espresso') ?></div><input id='event-end-"+counter+"' name='event_datetimes["+counter+"][evt_end]' type='text' class='dtm-ee-picker dtm-inp medium-text' value=''/><input name='event-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Starts on', 'event_espresso') ?></div><input id='reg-start-"+counter+"' name='event_datetimes["+counter+"][reg_start]' type='text' class='dtm-rs-picker dtm-inp medium-text' value='' /><input name='reg-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Ends on', 'event_espresso') ?></div><input id='reg-end-"+counter+"' name='event_datetimes["+counter+"][reg_end]' type='text' class='dtm-re-picker dtm-inp medium-text' value='' /><input name='reg-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <?php if ($org_options['time_reg_limit']) : ?><td><input type='text' id='reg-limit-"+counter+"' name='event_datetimes["+counter+"][reg_limit]' class='small-text dtm-inp' style='text-align:right;' value=''/></td><?php endif; // time_reg_limit   ?><td><input type='text' id='tckts-left-"+counter+"' name='event_datetimes["+counter+"][tckts_left]' class='small-text dtm-inp' style='text-align:right;' value=''/></td> */ ?><td><div class=small-screen-table-label><?php echo __('Actions', 'event_espresso') ?></div><a class='clone-date-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Clone this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/clone-trooper-16x16.png' width='16' height='16' alt='<?php _e('clone', 'event_espresso'); ?>'/></a><a class='remove-xtra-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Remove this Event Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png' width='16' height='16' alt='<?php _e('trash', 'event_espresso'); ?>'/></a></td></tr>";
						$('#event-dates-and-times tr:last').after( newRow );
						counter++;
					});
					

					$('.clone-date-time').live('click', function(){				
						var cloneRow = $(this).attr('rel');					
						var newRow = "<tr valign='top' id='event-dates-and-times-row-"+counter+"'><td><div class='small-screen-table-label'><?php echo __('Event Starts on', 'event_espresso') ?></div><input id='event-start-"+counter+"' name='event_datetimes["+counter+"][evt_start]' type='text' class='dtm-es-picker dtm-inp medium-text' value=''/><input name='event-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/><input id='is-primary-"+counter+"' name='event_datetimes["+counter+"][is_primary]' type='hidden' value='' /></td><td><div class='small-screen-table-label'><?php echo __('Event Ends on', 'event_espresso') ?></div><input id='event-end-"+counter+"' name='event_datetimes["+counter+"][evt_end]' type='text' class='dtm-ee-picker dtm-inp medium-text' value=''/><input name='event-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Starts on', 'event_espresso') ?></div><input id='reg-start-"+counter+"' name='event_datetimes["+counter+"][reg_start]' type='text' class='dtm-rs-picker dtm-inp medium-text' value='' /><input name='reg-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Ends on', 'event_espresso') ?></div><input id='reg-end-"+counter+"' name='event_datetimes["+counter+"][reg_end]' type='text' class='dtm-re-picker dtm-inp medium-text' value='' /><input name='reg-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <?php if ($org_options['time_reg_limit']) : ?><td><input type='text' id='reg-limit-"+counter+"' name='event_datetimes["+counter+"][reg_limit]' class='small-text dtm-inp' style='text-align:right;' value=''/></td><?php endif; // time_reg_limit   ?><td><input type='text' id='tckts-left-"+counter+"' name='event_datetimes["+counter+"][tckts_left]' class='small-text dtm-inp' style='text-align:right;' value=''/></td>  */ ?><td><div class=small-screen-table-label><?php echo __('Actions', 'event_espresso') ?></div><a class='clone-date-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Clone this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/clone-trooper-16x16.png' width='16' height='16' alt='<?php _e('clone', 'event_espresso'); ?>'/></a><a class='remove-xtra-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Remove this Event Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png' width='16' height='16' alt='<?php _e('trash', 'event_espresso'); ?>'/></a></td></tr>";
						$('#event-dates-and-times-row-'+cloneRow).after( newRow );
						$('#event-start-'+counter).val( $('#event-start-'+(cloneRow)).val() );
						$('#event-end-'+counter).val( $('#event-end-'+(cloneRow)).val() );
						$('#reg-start-'+counter).val( $('#reg-start-'+(cloneRow)).val() );
						$('#reg-end-'+counter).val( $('#reg-end-'+(cloneRow)).val() );
						<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
						$('#reg-limit-'+counter).val( $('#reg-limit-'+(cloneRow)).val() );
						$('#tckts-left-'+counter).val( $('#tckts-left-'+(cloneRow)).val() );
						  */ ?>
						counter++;
					});

					$('.remove-xtra-time').live("click", function(){
						var whichRow = '#event-dates-and-times-row-' + $(this).attr('rel');
						$(whichRow).remove();
						counter--;
					});

				})(jQuery);
			</script>
		<?php endif; // $caffeinated 
	}





	public function pricing_metabox() {
		global $org_options, $caffeinated;

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
		//printr( $all_prices, '$all_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		foreach ($PRT->type as $type) {
			$all_price_types[] = array('id' => $type->ID(), 'text' => $type->name());
			if ( $type->is_global() ) {
				$global_price_types[ $type->ID() ] = $type;
			} else {
				$price_types[] = array('id' => $type->ID(), 'text' => $type->name());
			}						
		}
		//echo printr( $global_price_types, '$global_price_types' );
		
		$table_class = apply_filters('filter_hook_espresso_pricing_table_class_filter', 'event_editor_pricing');
		?>


		<div id="ticket-prices-dv" class="">

		<?php if ( $show_no_event_price_msg ) : ?>
			<div class="error">
				<p><?php _e('There are currently no Prices set for this Event. Please see the Event Pricing section for more details.', 'event_espresso'); ?></p>
			</div>	
			<div id="no-ticket-prices-msg-dv">
				<p>
				<?php 
				if ( $caffeinated ) {
					_e('Please enter at lease one Event Price for this Event, or one Default Event Price to ensure that this Event displays and functions properly. Default Event Prices can be set on the <a href="'. admin_url( 'admin.php?page=espresso_pricing' ) .'">Pricing Management</a> page.', 'event_espresso'); 
				} else {
					_e('Please enter at lease one Event Price for this Event to ensure that this Event displays and functions properly.', 'event_espresso'); 
				}				
				?>					
				</p>
			</div>
		<?php endif; ?>

		<!--<h5 id="add-new-ticket-price-h5" ><?php _e('All Prices, Discounts and Surcharges that are Currently Active for This Event', 'event_espresso'); ?></h5>-->

		<table id="event_editor_pricing" width="100%" >
			<thead>
				<tr>
					<td class="event-price-tbl-hdr-type"><b><?php //_e('Type'); ?></b></td>
					<td class="event-price-tbl-hdr-order"><b><?php _e('Order', 'event_espresso'); ?></b></td>
					<td class="event-price-tbl-hdr-name"><b><?php _e('Name', 'event_espresso'); ?></b></td>
					<!--<td style="width:2.5%; text-align:center;"></td>-->
					<td class="event-price-tbl-hdr-amount"><b><?php _e('Amount', 'event_espresso'); ?></b></td>
					<!--<td style="width:1%; text-align:center;"></td>-->
					<td class="event-price-tbl-hdr-actions"></td>
					<td class="event-price-tbl-hdr-desc"></td>
				</tr>
			</thead>
			<?php 
		$counter = 1;
		foreach ( $all_prices as $price_type => $prices ) :
			foreach ( $prices as $price ) :
				if ( ! $price->deleted() ) :
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
						<div id="edit-event-price-<?php echo $price->ID(); ?>" class="event-price-settings-dv hidden">

							<a class="cancel-event-price-btn" rel="<?php echo $price->ID(); ?>" ><?php _e('close', 'event_espresso'); ?></a>
							
							<h6><?php _e('Edit : ', 'event_espresso'); ?><?php echo $price->name(); ?></h6>
							<?php //echo printr( $price, '$price' ); ?>
							<table class="form-table" width="100%">
								<tbody>
								
									<tr valign="top">					
										<th><label for="edit-ticket-price-PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
										<td>
											<?php $select_name = 'edit_ticket_price['. $price->ID() .'][PRT_ID]'; ?>
											<?php echo EE_Form_Fields::select_input( $select_name, $all_price_types, $price->type(), 'id="edit-ticket-price-type-ID-'.$price->ID().'" style="width:auto;"', 'edit-ticket-price-input' ); ?>
											<p class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></p>
											<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_ID]" type="hidden" value="<?php echo $price->ID()?>"/>
											<input name="edit_ticket_price[<?php echo $price->ID()?>][EVT_ID]" type="hidden" value="<?php echo $this->_event->id?>"/>
											<?php $price_type = isset( $global_price_types[$price->type()] ) ? $global_price_types[$price->type()]->is_global() : FALSE; ?>
											<input name="edit_ticket_price[<?php echo $price->ID()?>][PRT_is_global]" type="hidden" value="<?php echo $price_type?>"/>
											<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_overrides]" type="hidden" value="<?php echo $price->overrides()?>"/>
											<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_deleted]" id="edit-ticket-price-PRC_deleted-<?php echo $price->ID(); ?>" type="hidden" value="<?php echo $price->deleted()?>"/>										
											<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_order]" id="edit-ticket-price-PRC_order-<?php echo $price->ID(); ?>" type="hidden"  value="<?php echo $PRT->type[$price->type()]->order(); ?>"/>										
											<input name="edit_ticket_price[<?php echo $price->ID()?>][use_quick_edit]" type="hidden" value="1"/>										
										</td>
									</tr>
									
									<tr valign="top">
										<th><label for="edit-ticket-price-PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
										<td>
											<input class="edit-ticket-price-input regular-text" type="text" id="edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>"/>
											<p class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></p>
										</td>
									</tr>
									
									<tr valign="top">
										<th><label for="edit-ticket-price-PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
										<td>
											<input class="edit-ticket-price-input widefat" type="text" id="edit-ticket-price-PRC_desc-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_desc]" value="<?php echo stripslashes( $price->desc() ); ?>"/><br/>
											<p class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></p>
										</td>							
									</tr>
									
									<tr valign="top">
										<th><label for="edit-ticket-price-PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
										<td>
											<?php $price_amount =  ($PRT->type[$price->type()]->is_percent()) ? number_format( $price->amount(), 1 ) : number_format( $price->amount(), 2 ); ?>
											<input class="edit-ticket-price-input small-text" type="text" id="edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" style="text-align:right;" value="<?php echo $price_amount; ?>"/>
											<p class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></p>
										</td>
									</tr>
									
	<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 		
									<tr valign="top">
										<th><label for="edit-ticket-price-PRC_reg_limit"><?php _e('Registration Limit', 'event_espresso'); ?></label></th>
										<td>
											<input type="text" id="edit-ticket-price-PRC_reg_limit-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_reg_limit]" class="edit-ticket-price-input small-text" style="text-align:right;" value="<?php echo $price->reg_limit(); ?>"/>
											<p class="description">&nbsp;&nbsp;<?php _e('The maximum number of attendees that can be registratered at this Price Level. Leave blank for no limit.', 'event_espresso'); ?></p>
										</td>
									</tr>
									
									<tr valign="top">
										<th><label for="edit-ticket-price-PRC_tckts_left"><?php _e('Tickets Left', 'event_espresso'); ?></label></th>
										<td>
											<input type="text" id="edit-ticket-price-PRC_tckts_left-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_tckts_left]" class="edit-ticket-price-input small-text" style="text-align:right;" value="<?php echo $price->tckts_left(); ?>"/>
											<p class="description">&nbsp;&nbsp;<?php _e('The number of tickets left, or available spaces, at this Price Level. This field is computed and any changes made to this quatity will have no affect. To change the number of Tickets LEft you will need to manually add Attendees via the Registrations Admin page.', 'event_espresso'); ?></p>
										</td>
									</tr>
	  */ ?>			
									
									<tr valign="top" class="edit-ticket-price-use-dates-tbl-row">
										<th><label><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
										<td>
											<?php $price_uses_dates = $price->use_dates();?>
											<label class="edit-ticket-price-radio-lbl">
												<?php $checked = $price_uses_dates == 1 ? ' checked="checked"' : '';?>
												<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_use_dates]" class="edit-ticket-price-use-dates-yes edit-ticket-price-input etp-radio" type="radio" value="1"<?php echo $checked;?> style="margin-right:5px;"/>
												<?php _e('Yes', 'event_espresso');?>
											</label>
											<label class="edit-ticket-price-radio-lbl">
												<?php $checked = $price_uses_dates == 0 ? ' checked="checked"' : '';?>
												<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_use_dates]" class="edit-ticket-price-use-dates-no edit-ticket-price-input etp-radio" type="radio" value="0"<?php echo $checked;?> style="margin-right:5px;"/>
												<?php _e('No', 'event_espresso');?>
											</label>
											<p class="description"><?php _e( 'If set to "Yes", then you will be able to set the dates for when this price will become active / inactive.', 'event_espresso' ); ?></p>
										</td>
									</tr>
				
									<tr valign="top">
										<th>
											<div class="edit-ticket-price-dates">
												<label for="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_start_date]"><?php _e('Start Date', 'event_espresso'); ?></label>
											</div>
										</th>
										<td>
											<div class="edit-ticket-price-dates">
												<input id="edit-ticket-price-PRC_start_date-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_start_date]" type="text" class="datepicker edit-ticket-price-input" value="<?php echo $price->start_date(); ?>" />
												<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If the "Triggered by Date" field above is set to "Yes", then this is the date that this Event Price would become active and displayed.' ), 'event_espresso'); ?></p>
											</div>
										</td>
									</tr>
				
									<tr valign="top">
										<th>
											<div class="edit-ticket-price-dates">
											<label for="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_end_date]"><?php _e('End Date', 'event_espresso'); ?></label>
											</div>
										</th>
										<td>
											<div class="edit-ticket-price-dates">
											<input id="edit-ticket-price-PRC_end_date-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_end_date]" type="text" class="datepicker edit-ticket-price-input" value="<?php echo $price->end_date(); ?>" />
											<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If "Triggered by Date" is set to "Yes", then this is the date that this Event Price would become inactive and no longer displayed.' ), 'event_espresso'); ?></p>
											</div>
										</td>
									</tr>			
									<?php if ( $counter > 1 ) : ?>
									<tr valign="top">
										<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
										<td>
											<label class="edit-ticket-price-radio-lbl">
												<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_is_active]" value="1" style="margin-right:5px;" <?php echo $price->is_active() ? 'checked="checked"' : '' ?> />
												<?php _e('Yes', 'event_espresso');?>
											</label>
											<label class="edit-ticket-price-radio-lbl">
												<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_is_active]" value="0" style="margin-right:5px;" <?php echo ! $price->is_active() ? 'checked="checked"' : '' ?> />
												<?php _e('No', 'event_espresso');?>
											</label>
											<p class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></p>
										</td>
									</tr>
									<?php else : ?>
											<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_is_active]" type="hidden" value="1"/>										
									<?php endif; ?>
								</tbody>
							</table>
				
						</div>
					</td>
				</tr>
				
				<tr>
					<td colspan="6">
						<div id="event-price-<?php echo $price->ID(); ?>" class="event-price-dv">
							<table class="ticket-price-quick-edit-tbl" width="100%">
								<tr>
								
									<td class="type-column ticket-price-quick-edit-column"> 
										<?php
										 //echo $PRT->type[$price->type()]->name(); 
										 //$select_name = 'edit_ticket_price['. $price->ID() .'][PRT_ID]'; 
										//echo EE_Form_Fields::select_input( $select_name, $all_price_types, $price->type(), 'id="quick-edit-ticket-price-type-ID" ', 'edit-ticket-price-input quick-edit' ); 
										?>
										<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
										<span><?php echo $PRT->type[$price->type()]->name() . ' ' . $price_date_status; ?></span>
									</td> 
									
									<td class="order-column ticket-price-quick-edit-column"> 
										<?php //echo $PRT->type[$price->type()]->order(); ?>
										<div class="small-screen-table-label"><?php echo __('Order', 'event_espresso') ?></div>
										<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_order-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_order]" value="<?php echo $PRT->type[$price->type()]->order(); ?>"<?php echo $disabled; ?>/>							
									</td> 
									
									<td class="name-column ticket-price-quick-edit-column"> 
										<?php //echo $price->name(); ?>
										<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
										<input class="edit-ticket-price-input quick-edit regular-text<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
									</td> 
									
									<!--<td class="cur-sign-column ticket-price-quick-edit-column"> 
										<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
										<?php echo ($PRT->type[$price->type()]->is_percent()) ?  '' : $org_options['currency_symbol']; ?>
									</td>--> 
									
									<td class="amount-column ticket-price-quick-edit-column"> 
										<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
										<span class="cur-sign jst-rght"><?php echo ($PRT->type[$price->type()]->is_percent()) ?  '' : $org_options['currency_symbol']; ?></span>
										<?php $price_amount =  ($PRT->type[$price->type()]->is_percent()) ? number_format( $price->amount(), 1 ) : number_format( $price->amount(), 2 ); ?>
										<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
										<span class="percent-sign jst-left"><?php echo ($PRT->type[$price->type()]->is_percent()) ? '%' : ''; ?></span>
									</td> 
									
									<!--<td class="percent-column ticket-price-quick-edit-column"> 
										<?php echo ($PRT->type[$price->type()]->is_percent()) ? '%' : ''; ?>
									</td> -->
									
	<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
									<td class="tckts-left-column" style="width:7.5%; height:2.5em; text-align:right;"> 
										<input class="edit-tickets-left-input quick-edit" type="text" id="quick-edit-ticket-price[<?php echo $price->ID(); ?>][PRC_tckts_left]" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_tckts_left]" style="width:100%;text-align:right;" value="<?php echo $price->tckts_left(); ?>" disabled="disabled"/>
									</td> 
	 */ ?>
									
									<td class="edit-column ticket-price-quick-edit-column">
										<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>									
										<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
										<a class='display-price-tickets-left-lnk display-ticket-manager' data-reveal-id="ticket-manager-dv" rel="<?php echo $price->ID(); ?>"  title='Display the Ticket Manager for this Event' style="cursor:pointer;" >
											<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/tickets-1-16x16.png" width="16" height="16" alt="<?php _e('tickets left', 'event_espresso'); ?>"/>
										</a>
										 */ ?>
										<a class='edit-event-price-lnk evt-prc-btn' rel="<?php echo $price->ID(); ?>"  title="Edit Advanced Settings for this Event Price">
											<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/settings-16x16.png" width="16" height="16" alt="<?php _e('edit', 'event_espresso'); ?>"/>
										</a>
										<a class='delete-event-price-lnk evt-prc-btn' rel="<?php echo $price->ID(); ?>" title="Delete this Event Price" >
											<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png" width="16" height="16" alt="<?php _e('trash', 'event_espresso'); ?>"/>
										</a>
									</td>

									
									<td class="desc-column ticket-price-quick-edit-column"> 
										<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
										<?php //echo $price->desc(); ?>
										<!--<input class="edit-ticket-price-input quick-edit widefat" type="text" id="quick-edit-ticket-price[<?php echo $price->ID(); ?>][PRC_desc]" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_desc]" value="<?php echo $price->desc(); ?>" style="width:100%;"/>-->
										<p class="description"><?php echo $inactive ? $inactive : stripslashes( $price->desc() ); ?></p>
									</td> 
									

								</tr>
							</table>
						</div>
					</td>				
				</tr>

				<?php
				endif;
				$counter++;
			endforeach;
		endforeach;
			?>
			</table>
			<br/>

			<div id="add-new-ticket-price-dv" class="hidden">
		
				<h5 id="add-new-ticket-price-h5" ><?php _e('Add New Event Price', 'event_espresso'); ?></h5>
					
				<table class="form-table">
					<tbody>
					
						<tr valign="top">					
							<th><label for="new-ticket-price-PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
							<td>
								<?php echo EE_Form_Fields::select_input( 'new_ticket_price[PRT_ID]', $price_types, 2, 'id="new-ticket-price-type-ID"', 'add-new-ticket-price-input' ); ?>
								<p class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></p>
								<input id="new_ticket_price-EVT_ID" name="new_ticket_price[EVT_ID]" type="hidden" value="<?php echo $this->_event->id; ?>" />
								<input id="new_ticket_price-PRT_is_global" name="new_ticket_price[PRT_is_global]" type="hidden" value="0" />									
								<input id="new_ticket_price-PRC_overrides" name="new_ticket_price[PRC_overrides]" type="hidden" value="0" />									
								<input id="new_ticket_price-PRC_deleted" name="new_ticket_price[PRC_deleted]" type="hidden" value="0" />									
							</td>
						</tr>
						
						<tr valign="top">
							<th><label for="new-ticket-price-PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
							<td>
								<input class="add-new-ticket-price-input regular-text" type="text" id="new-ticket-price-PRC_name" name="new_ticket_price[PRC_name]" value=""/>
								<p class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></p>
							</td>
						</tr>
						
						<tr valign="top">
							<th><label for="new-ticket-price-PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
							<td>
								<textarea class="add-new-ticket-price-input regular-text" type="text" id="new-ticket-price[PRC_desc]" name="new_ticket_price[PRC_desc]" cols="100" rows="1" ></textarea><br/>
								<p class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></p>
							</td>							
						</tr>
						
						<tr valign="top">
							<th><label for="new-ticket-price-PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
							<td>
								<input class="add-new-ticket-price-input small-text" type="text" id="new-ticket-price[PRC_amount]" name="new_ticket_price[PRC_amount]" style="text-align:right;" value=""/>
								<p class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></p>
							</td>
						</tr>

	<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
						<tr valign="top">
							<th><label for="new-ticket-price-PRC_amount"><?php _e('Registration Limit', 'event_espresso'); ?></label></th>
							<td>
								<input type="text" id="new_ticket_price[PRC_reg_limit]" name="new_ticket_price[PRC_reg_limit]" class="add-new-ticket-price-input small-text" style="text-align:right;" value=""/>
								<p class="description">&nbsp;&nbsp;<?php _e('The maximum number of attendees that can be registratered at this Price Level. Leave blank for no limit.', 'event_espresso'); ?></p>
							</td>
						</tr>
	*/ ?>
						
						<tr valign="top">
							<th><label><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
							<td>
								<label class="edit-ticket-price-radio-lbl">
									<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_use_dates]" value="1" style="margin-right:5px;">
									<?php _e('Yes', 'event_espresso');?>
								</label>
								<label class="edit-ticket-price-radio-lbl">
									<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_use_dates]" value="0" style="margin-right:5px;" checked="checked" />
									<?php _e('No', 'event_espresso');?>
								</label>
								<p class="description"><?php _e( 'If set to "Yes", then you will be able to set the dates for when this price will become active / inactive.', 'event_espresso' ); ?></p>
							</td>
						</tr>

						<tr valign="top">
							<th><label for="new_ticket_price[PRC_start_date]"><?php _e('Start Date', 'event_espresso'); ?></label></th>
							<td>
								<input id="new-ticket-price[PRC_start_date]" name="new_ticket_price[PRC_start_date]" type="text" class="datepicker add-new-ticket-price-input" value="" />
								<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If the "Triggered by Date" field above is set to "Yes", then this is the date that this Event Price would become active and displayed for this Event.' ), 'event_espresso'); ?></p>
							</td>
						</tr>

						<tr valign="top">
							<th><label for="new_ticket_price[PRC_end_date]"><?php _e('End Date', 'event_espresso'); ?></label></th>
							<td>
								<input id="new-ticket-price[PRC_end_date]" name="new_ticket_price[PRC_end_date]" type="text" class="datepicker add-new-ticket-price-input" value="" />
								<p class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If "Triggered by Date" is set to "Yes", then this is the date that this Event Price would become inactive and no longer displayed for this Event.' ), 'event_espresso'); ?></p>
							</td>
						</tr>			

						<tr valign="top">
							<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
							<td>
								<label class="edit-ticket-price-radio-lbl">
									<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_is_active]" value="1" style="margin-right:5px;" checked="checked" />
									<?php _e('Yes', 'event_espresso');?>
								</label>
								<label class="edit-ticket-price-radio-lbl">
									<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_is_active]" value="0" style="margin-right:5px;" />
									<?php _e('No', 'event_espresso');?>
								</label>
								<p class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></p>
							</td>
						</tr>
						
					</tbody>
				</table>
				<br/>

				<div>

					<div>
						<a id="hide-add-new-ticket-price" class="cancel-event-price-btn hidden" rel="add-new-ticket-price" style="left:230px;"><?php _e('cancel', 'event_espresso');?></a>
					</div>

				</div>
				
			</div>
			
			<a id="display-add-new-ticket-price" class="button-secondary display-the-hidden" rel="add-new-ticket-price">
				<?php _e('Add New Event Price', 'event_espresso'); ?>
			</a>
			<br class="clear"/><br/>
			
			<input id="edited-ticket-price-IDs" name="edited_ticket_price_IDs" type="hidden" value="" />
			
		</div>
		<?php
	}






	private function _espresso_venue_dd($current_value = 0) {
		global $caffeinated;
		if ($caffeinated != true)
			return;
		global $wpdb, $espresso_manager, $espresso_wp_user;

		$WHERE = " WHERE ";
		$sql = "SELECT ev.*, el.name AS locale FROM " . EVENTS_VENUE_TABLE . " ev ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_REL_TABLE . " lr ON lr.venue_id = ev.id ";
		$sql .= " LEFT JOIN " . EVENTS_LOCALE_TABLE . " el ON el.id = lr.locale_id ";

		if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_group_admin' )) {
			if ($espresso_manager['event_manager_venue']) {
				//show only venues inside their assigned locales.
				$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
				$group = unserialize($group);
				$sql .= " $WHERE lr.locale_id IN (" . implode(",", $group) . ")";
				$sql .= " OR ev.wp_user = " . $espresso_wp_user;
				$WHERE = " AND ";
			}
		}
		$sql .= " GROUP BY ev.id ORDER by name";

		$venues = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;

		if ($num_rows > 0) {
			$field = '<label>' . __('Select from Venue Manager list', 'event_espresso') . '</label>';
			$field .= '<select name="venue_id[]" id="venue_id" class="chzn-select"  >\n';
			$field .= '<option value="0">' . __('Select a Venue', 'event_espresso') . '</option>';
			$div = "";
			$help_div = "";
			$i = 0;
			foreach ($venues as $venue) {

				$i++;
				$selected = $venue->id == $current_value ? 'selected="selected"' : '';
				if ($venue->locale != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->locale) . ') </option>\n';
				} else if ($venue->city != '' && $venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->city) . ', ' . stripslashes_deep($venue->state) . ') </option>\n';
				} else if ($venue->state != '') {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' (' . stripslashes_deep($venue->state) . ') </option>\n';
				} else {
					$field .= '<option rel="' . $i . '" ' . $selected . ' value="' . $venue->id . '">' . stripslashes_deep($venue->name) . ' </option>\n';
				}

				$hidden = "display:none;";
				if ($selected)
					$hidden = '';
				$div .= "
	<fieldset id='eebox_" . $i . "' class='eebox' style='" . $hidden . "'>
		<ul class='address-view'>
			<li>
				<p><span>Address:</span> " . stripslashes($venue->address) . "<br/>
				<span></span> " . stripslashes($venue->address2) . "<br/>
				<span>City:</span> " . stripslashes($venue->city) . "<br/>
				<span>State:</span> " . stripslashes($venue->state) . "<br/>
				<span>Zip:</span> " . stripslashes($venue->zip) . "<br/>
				<span>Country:</span> " . stripslashes($venue->country) . "<br/>
				<span>Venue ID:</span> " . $venue->id . "<br/></p>
				This venues shortcode <b class='highlight'>[ESPRESSO_VENUE id='" . $venue->id . "']</b><br/>";
				$div .= '<a href="admin.php?page=espresso_venues&action=edit&id=' . $venue->id . '" target="_blank">' . __('Edit this venue', 'event_espresso') . '</a> | <a class="thickbox link" href="#TB_inline?height=300&width=400&inlineId=venue_info">Shortcode</a></li></ul>';
				$div .= "</fieldset>";
			}
			$field .= "</select>";
			$help_div .= '<div id="venue_info" style="display:none">';
			$help_div .= '<div class="TB-ee-frame">';
			$help_div .= '<h2>' . __('Venue Shortcode', 'event_espresso') . '</h2>';
			$help_div .= '<p>' . __('Add the following shortcode into the description to show the venue for this event.', 'event_espresso') . '<br/>';
			$help_div .= '[ESPRESSO_VENUE]<br/>';
			$help_div .=  __('To use this venue in a page or post. Use the following shortcode.', 'event_espresso') . '<br/>';
			$help_div .= '[ESPRESSO_VENUE id="selected_venue_id"]</p>';
			$help_div .= '<p>Example with Optional Parameters:<br />[ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]</p>';
			$help_div .= '<p><strong><a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#venue_shortcode" target="_blank">More Examples</a></strong></p>';
			$help_div .= '</div>';
			$help_div .= '</div>';
			ob_start();
			?>
			<script>
				jQuery("#venue_id").change( function(){
					var selected = jQuery("#venue_id option:selected");
					var rel = selected.attr("rel");
					jQuery(".eebox").hide();
					jQuery("#eebox_"+rel).show();
				});
			</script>
			<?php
			$js = ob_get_contents();
			ob_end_clean();
			$html = '<table><tr><td>' . $field . '</td></tr><tr><td>' . $div . '</td></tr></table>' . $help_div . $js;
			return $html;
		}
	}






	public function venue_metabox() {
		global $org_options, $caffeinated;
		$values = array(
				array('id' => true, 'text' => __('Yes', 'event_espresso')),
				array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		?>
		
	<div class="inside">
		<table class="form-table">
			<tr>
				<?php
				if ( $org_options['use_venue_manager'] && $caffeinated ) {
					$ven_type = 'class="use-ven-manager"';

					?>
				<td valign="top" <?php echo $ven_type ?>><fieldset id="venue-manager">
							<legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
							<?php if (! $this->_espresso_venue_dd()) : ?>
								<p class="info">
									<b><?php _e('You have not created any venues yet.', 'event_espresso'); ?></b>
								</p>
								<p><a href="admin.php?page=espresso_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
							<?php else: ?>
								<?php echo $this->_espresso_venue_dd($this->_event->venue_id) ?>
							<?php endif; ?>
						</fieldset>
					</td>
					<?php
				} else {
					$ven_type = 'class="manual-venue"';
					?>
					<td valign="top" <?php echo $ven_type; ?>>

							<legend>
								<?php _e('Venue Information', 'event_espresso'); ?>
							</legend>
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
					<td valign="top" <?php echo $ven_type ?>>
						<fieldset>
							<legend><?php _e('Physical Location', 'event_espresso'); ?></legend>
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
								<br/>
							<p>
								<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
								<?php echo $this->_event->google_map_link; ?> 
							</p>	
								<br/>
							<p>
								<label for="enable_for_gmap">
									<?php _e('Enable event address in Google Maps? ', 'event_espresso') ?>
								</label>
								<?php echo EE_Form_Fields::select_input('enable_for_gmap', $values, isset($this->_event->event_meta['enable_for_gmap']) ? $this->_event->event_meta['enable_for_gmap'] : '', 'id="enable_for_gmap"') ?> 
							</p>

						</fieldset>
					</td>
						<?php } ?>
				<td valign="top" <?php echo $ven_type ?>>
					<fieldset id="virt-location">
						<legend>
							<?php _e('Virtual Location', 'event_espresso'); ?>
						</legend>
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
		global $org_options;
		$this->_set_event_object();

		add_meta_box('espresso_event_editor_event_meta', __('Event Meta', 'event_espresso'), array( $this, 'event_meta_metabox'), $this->_current_screen->id, 'advanced', 'high');

		add_meta_box('espresso_event_editor_event_post', __('Create a Post', 'event_espresso'), array( $this, 'event_post_metabox'), $this->_current_screen->id, 'advanced', 'core');

		add_meta_box('espresso_event_editor_event_options', __('Event Options', 'event_espresso'), array( $this, 'event_options_meta_box' ), $this->_current_screen->id, 'side', 'high');

		add_meta_box('espresso_event_editor_additional_questions', __('Questions for Additional Attendees', 'event_espresso'), array( $this, 'additional_attendees_question_groups_meta_box' ), $this->_current_screen->id, 'side', 'core');

		//add_meta_box('espresso_event_editor_promo_box', __('Event Promotions', 'event_espresso'), array( $this, 'promotions_meta_box' ), $this->_current_screen->id, 'side', 'core');

		add_meta_box('espresso_event_editor_featured_image_box', __('Featured Image', 'event_espresso'), array( $this, 'featured_image_meta_box' ), $this->_current_screen->id, 'side', 'default');

		if ($org_options['use_attendee_pre_approval']) {
			add_meta_box('espresso_event_editor_preapproval_box', __('Attendee Pre-Approval', 'event_espresso'), array( $this, 'preapproval_metabox' ), $this->_current_screen->id, 'side', 'default');
		}

		if ($org_options['use_personnel_manager']) {
			add_meta_box('espresso_event_editor_personnel_box', __('Event Staff / Speakers', 'event_espresso'), array( $this, 'personnel_metabox' ), $this->_current_screen->id, 'side', 'default');
		}
	}




	public function event_meta_metabox() {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $caffeinated;
		if ($caffeinated != true)
			return;

		$event_meta = $this->_event->event_meta;
		?>
		<div class="inside">
		<?php
			$good_meta = array();
			$hiddenmeta = array("", "venue_id", "additional_attendee_reg_info", /*"add_attendee_question_groups",*/ "date_submitted", "event_host_terms", "default_reg_status", "display_thumb_in_lists", "display_thumb_in_regpage", "display_thumb_in_calendar", "event_thumbnail_url", "originally_submitted_by", "enable_for_gmap", "orig_event_staff");
			$meta_counter = 1;

			$default_event_meta = array();
			$default_event_meta = apply_filters('filter_hook_espresso_filter_default_event_meta', $default_event_meta);

			$default_meta = $event_meta == '' ? $default_event_meta : array();
			$event_meta = $event_meta == '' ? array() : $event_meta;
			$event_meta = array_merge($event_meta, $default_meta);
			//print_r( $event_meta );
			$good_meta = $event_meta;
			//print_r( $good_meta );
			?>
			<p>
				<?php _e('Using Event Meta boxes', 'event_espresso'); ?>
				<?php echo $this->_get_help_tab_link('event-meta-boxes'); ?>
			<ul id="dynamicMetaInput">
				<?php
				if ($event_meta != '') {
					foreach ($event_meta as $k => $v) {
						?>
						<?php
						if (in_array($k, $hiddenmeta)) {
							//echo "<input type='hidden' name='emeta[]' value='{$v}' />";
							unset($good_meta[$k]);
						} else {
							?>
							<li>
								<label>
						<?php _e('Key', 'event_espresso'); ?>
								</label>
								<select id="emeta[]" name="emeta[]">
									<?php foreach ($good_meta as $k2 => $v2) { ?>
										<option value="<?php echo $k2; ?>" <?php echo ($k2 == $k ? "SELECTED" : null); ?>><?php echo $k2; ?></option>
						<?php } ?>
								</select>
								<label for="meta-value">
						<?php _e('Value', 'event_espresso'); ?>
								</label>
								<input  size="20" type="text" value="<?php echo $v; ?>" name="emetad[]" id="emetad[]" />
								<?php
								echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />';
								?>
							</li>
							<?php
							$meta_counter++;
						}
						?>
				<li>
					<label for="emeta-box">
						<?php
					}
					echo  __('Key', 'event_espresso');
					?>
				</label>
				<input id="emeta-box" size="20" type="text" value="" name="emeta[]" >
				<label for="emetaad[]">
				<?php _e('Value', 'event_espresso'); ?>
				</label>
				<input size="20" type="text" value="" name="emetad[]" id="emetad[]">
				<?php
				echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" /></li>';
			} else {
				echo '<li><label for="emeta[]">' . __('Key', 'event_espresso');
				?>
				</label>
				<input size="20" type="text" value="" name="emeta[]" id="emeta[]">
				<?php _e('Value', 'event_espresso'); ?>
				<input size="20" type="text" value="" name="emetad[]" id="emetad[]">
				<?php
				echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />' . '</li>';
				// $meta_counter++;
			}
			?>
			</ul>
			<p>
				<input type="button" class="button" value="<?php _e('Add A Meta Box', 'event_espresso'); ?>" onClick="addMetaInput('dynamicMetaInput');">
			</p>
			<script type="text/javascript">
				//Dynamic form fields
				var meta_counter = <?php echo $meta_counter > 1 ? $meta_counter - 1 : $meta_counter++; ?>;
				function addMetaInput(divName){
					var next_counter = counter_staticm(meta_counter);
					var newdiv = document.createElement('li');
					newdiv.innerHTML = "<label><?php _e('Key', 'event_espresso'); ?></label> <input size='20' type='text' value='' name='emeta[]' id='emeta[]'> <label><?php _e('Value', 'event_espresso'); ?></label> <input size='20' type='text' value='' name='emetad[]' id='emetad[]'><?php echo ' <img class=\"remove-item\" title=\"' . __('Remove this meta box', 'event_espresso') . '\" onclick=\"this.parentNode.parentNode.removeChild(this.parentNode);\" src=\"' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif\" alt=\"' . __('Remove Meta', 'event_espresso') . '\" />'; ?>";
					document.getElementById(divName).appendChild(newdiv);
					counter++;
				}

				function counter_staticm(meta_counter) {
					if ( typeof counter_static.counter == 'undefined' ) {

						counter_static.counter = meta_counter;
					}
					return ++counter_static.counter;
				}
			</script>
		</div>
		<?php
	}





	public function event_post_metabox() {
		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')));
		if (function_exists('espresso_member_data')) {
			global $espresso_manager;
			$is_admin = (espresso_member_data('role') == "administrator" || espresso_member_data('role') == 'espresso_event_admin') ? true : false;
			if (!$espresso_manager['event_manager_create_post'] && !$is_admin) {
				return;
			}
		}
		?>
		<div class="inside">
			<?php
			if (strlen($this->_event->post_id) > 1) {
				$create_post = true; //If a post was created previously, default to yes on the update post.
			} else {
				$create_post = false; //If a post was NOT created previously, default to no so we do not create a post on accident.
			}
			global $current_user;
			get_currentuserinfo();
			?>
			<table class="form-table">
				<tbody>
					<tr>
						<th class="middle">
							<label>
								<?php echo __('Add/Update post for this event?', 'event_espresso') ?>
							</label>
						</th>
						<td class="med">
							<?php
							echo EE_Form_Fields::select_input('create_post', $values, $create_post);
							if (strlen($this->_event->post_id) > 1) {
								echo '<p>' . __('If no, delete current post?', 'event_espresso');
								?>
								<input name="delete_post" type="checkbox" value="true" />
							<?php } ?>
							</p>
							<input type="hidden" name="post_id" value="<?php if (isset($this->_event->post_id)) echo $this->_event->post_id; ?>">
							<?php /* ?><p><?php _e('Category:', 'event_espresso'); ?> <?php wp_dropdown_categories(array('orderby'=> 'name','order' => 'ASC', 'selected' => $category, 'hide_empty' => 0 )); ?></p><?php */ ?>
						<td>
					</tr>
					<tr>
						<th class="middle">

							<?php
							if (!empty($this->_event->post_id)) {
								$post_data = get_post($this->_event->post_id);
								$tags = get_the_tags($this->_event->post_id);
								if ($tags) {
									foreach ($tags as $k => $v) {
										$tag[$k] = $v->name;
									}
									$tags = join(', ', $tag);
								}
							} else {
								$post_data = new stdClass();
								$post_data->ID = 0;
								$tags = '';
							}
							$box = array();

							$custom_post_array = array(array('id' => 'espresso_event', 'text' => __('Espresso Event', 'event_espresso')));
							$post_page_array = array(array('id' => 'post', 'text' => __('Post', 'event_espresso')), array('id' => 'page', 'text' => __('Page', 'event_espresso')));
							$post_page_array = !empty($org_options['template_settings']['use_custom_post_types']) ? array_merge($custom_post_array, $post_page_array) : $post_page_array;
							//print_r($post_page_array);

							$post_types = $post_page_array;
							?>

							<label>
								<?php _e('Author', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
							<?php wp_dropdown_users(array('who' => 'authors', 'selected' => $current_user->ID)); ?>
						</td>
					</tr>
					<tr>
						<th class="middle">
							<label>
								<?php _e('Post Type', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
							<?php echo EE_Form_Fields::select_input('post_type', $post_types, 'espresso_event') ?>
						</td>
					</tr>
					<tr>
						<th class="middle">
							<label>
								<?php _e('Tags', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
							<input id="post_tags" name="post_tags" size="20" type="text" value="<?php echo $tags; ?>" />
						</td>
					</tr>
				</tbody>
			</table>



			<p class="section-heading"><?php _e('Post Categories:', 'event_espresso'); ?> </p>
			<?php
			require_once( 'includes/meta-boxes.php');
			post_categories_meta_box($post_data, $box);
			?>

			<!-- if post templates installed, post template -->

		</div>
		<?php
	}





	public function event_options_meta_box() {
		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		$additional_attendee_reg_info_values = array(
				array('id' => '1', 'text' => __('No info required', 'event_espresso')),
				array('id' => '2', 'text' => __('Personal Information only', 'event_espresso')),
				array('id' => '3', 'text' => __('Full registration information', 'event_espresso'))
		);
		$event_status_values = array(
				array('id' => 'A', 'text' => __('Public', 'event_espresso')),
				array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')),
				array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')),
				array('id' => 'R', 'text' => __('Draft', 'event_espresso')),
				array('id' => 'D', 'text' => __('Deleted', 'event_espresso'))
		);
		$event_status_values = apply_filters('filter_hook_espresso_event_status_values', $event_status_values);

		$default_reg_status_values = array(
				array('id' => "", 'text' => __('No Change', 'event_espresso')),
				array('id' => 'Incomplete', 'text' => __('Incomplete', 'event_espresso')),
				array('id' => 'Pending', 'text' => __('Pending', 'event_espresso')),
				array('id' => 'Completed', 'text' => __('Completed', 'event_espresso'))
		);
		?>
		<p class="inputundersmall">
			<label for="reg-limit">
				<?php _e('Attendee Limit: ', 'event_espresso'); ?>
			</label>
			<input id="reg-limit" name="reg_limit"  size="10" type="text" value="<?php echo $this->_event->reg_limit; ?>" /><br />
			<span>(<?php _e('leave blank for unlimited', 'event_espresso'); ?>)</span>
		</p>
		<p class="clearfix" style="clear: both;">
			<label for="group-reg"><?php _e('Allow group registrations? ', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('allow_multiple', $values, $this->_event->allow_multiple, 'id="group-reg"', '', false); ?>
		</p>
		<p class="inputundersmall">
			<label for="max-registrants"><?php _e('Max Group Registrants: ', 'event_espresso'); ?></label>
			<input type="text" id="max-registrants" name="additional_limit" value="<?php echo $this->_event->additional_limit; ?>" size="4" />
		</p>
		<p class="inputunder">
			<label><?php _e('Additional Attendee Registration info?', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('additional_attendee_reg_info', $additional_attendee_reg_info_values, $this->_event->event_meta['additional_attendee_reg_info']); ?>
		</p>
		<p>
			<label><?php _e('Event is Active', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('is_active', $values, $this->_event->is_active); ?>
		</p>
		<p>
			<label><?php _e('Event Status', 'event_espresso'); ?>
				<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=status_types_info">
					<span class="question">[?]</span>
				</a>
			</label>
			<?php echo EE_Form_Fields::select_input('new_event_status', $event_status_values, $this->_event->event_status, '', '', false); ?>
		</p>
		<p>
			<label><?php _e('Display  Description', 'event_espresso'); ?></label>
			<?php echo EE_Form_Fields::select_input('display_desc', $values, $this->_event->display_desc); ?>
		</p>
		<p>
			<label>
				<?php _e('Display  Registration Form', 'event_espresso'); ?>
			</label>
			<?php echo EE_Form_Fields::select_input('display_reg_form', $values, $this->_event->display_reg_form, '', '', false); ?>
		</p>
		<p class="inputunder">
			<label>
				<?php _e('Default Payment Status', 'event_espresso'); ?>
				<a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=payment_status_info">
					<span class="question">[?]</span>
				</a>
			</label>
			<?php echo EE_Form_Fields::select_input('default_reg_status', $default_reg_status_values, $this->_event->event_meta['default_reg_status']); ?>
		</p>
		<p class="inputunder">
			<label><?php _e('Alternate Registration Page', 'event_espresso'); ?>
				<a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=external_URL_info">
					<span class="question">[?]</span>
				</a>
			</label>
			<input name="externalURL" size="20" type="text" value="<?php echo $this->_event->externalURL; ?>">
		</p>
		<p class="inputunder">
			<label><?php _e('Alternate Email Address', 'event_espresso'); ?>
				<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=alt_email_info">
					<span class="question">[?]</span>
				</a>
			</label>
			<input name="alt_email" size="20" type="text" value="<?php echo $this->_event->alt_email; ?>">
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

					$checked = ( in_array( $QSG->QSG_ID, $EQGs ) || $QSG->QST_system == 1 ) ? ' checked="checked"' : '';
					$visibility = $QSG->QST_system == 1 ? ' style="visibility:hidden"' : '';
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
			do_action('action_hook_espresso_event_editor_questions_notice');
			?>
		</div>
		<?php
	}





	public function additional_attendees_question_groups_meta_box() {

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
			$EQGs = EEM_Event::instance()->get_event_question_groups( $this->_event->id, TRUE );
			$EQGs = is_array( $EQGs ) ? $EQGs : array();

			if ( ! empty( $QSGs )) {
 				$html = count( $QSGs ) > 10 ? '<div style="height:250px;overflow:auto;">' : '';
				foreach ( $QSGs as $QSG ) {

					$checked = in_array( $QSG->QSG_ID, $EQGs ) || $QSG->QST_system == 1 ? ' checked="checked" ' : '';
					$visibility = $QSG->QST_system == 1 ? ' style=" visibility:hidden"' : '';
					$edit_link = self::add_query_args_and_nonce( array( 'action' => 'edit_question_group', 'QSG_ID' => $QSG->QSG_ID ), EE_FORMS_ADMIN_URL );

					$html .= '
					<p id="event-question-group-' . $QSG->QSG_ID . '">
						<input value="' . $QSG->QSG_ID . '" type="checkbox"' . $visibility . ' name="add_attendee_question_groups[' . $QSG->QSG_ID . ']"' . $checked . ' /> 
						<a href="' . $edit_link . '" title="Edit ' . $QSG->QSG_name . ' Group" target="_blank">' . $QSG->QSG_name . '</a>
					</p>';
				}
				$html .= count( $QSGs ) > 10 ? '</div>' : '';

				echo $html;

			} else {
				echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
			}
			?>
		</div>
		<?php
	}




/*
	public function promotions_meta_box() {
		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		global $wpdb;
		?>
	  <div class="inside">

	  	<p>
		  	<strong>
		  		<?php _e('Early Registration Discount', 'event_espresso'); ?>
	  		</strong>
	  	</p>

	  	<p>
	  		<label for="early_disc_date">
		  		<?php _e('End Date:', 'event_espresso'); ?>
	  		</label>
			<input type="text" class="datepicker" size="12" id="early_disc_date" name="early_disc_date" value="<?php echo isset($this->_event->early_disc_date) ? $this->_event->early_disc_date : ''; ?>"/>
	  	</p>

	  	<p class="promo-amnts">
	  		<label for="early_disc">
		  		<?php _e('Amount:', 'event_espresso'); ?>
	  		</label>
			<input type="text" size="3" id="early_disc" name="early_disc" value="<?php echo isset($this->_event->early_disc) ? $this->_event->early_disc : ''; ?>" /> <br />
	  		<p class="description">
		  		<?php _e('(Leave blank if not applicable)', 'event_espresso'); ?>
	  		</p>
	  	</p>

	  	<p>
	  		<label>
		  		<?php _e('Percentage:', 'event_espresso') ?>
	  		</label>
	  		<?php echo EE_Form_Fields::select_input('early_disc_percentage', $values, !isset($this->_event->early_disc_percentage) ? '' : $this->_event->early_disc_percentage); ?>
	  	</p>

	  	<p>
		  	<strong>
		  		<?php _e('Promotion Codes', 'event_espresso'); ?>
	  		</strong>
	  	</p>
	  	<p class="disc-codes">
	  		<label>
		  		<?php _e('Allow discount codes?', 'event_espresso'); ?> <?php do_action('action_hook_espresso_help', 'coupon_code_info'); ?>
	  		</label>
	  		<?php echo EE_Form_Fields::select_input('use_coupon_code', $values, !isset($this->_event->use_coupon_code) || $this->_event->use_coupon_code == '' ? false : $this->_event->use_coupon_code); ?>
	  	</p>

	  	<?php
	  	$sql = "SELECT * FROM " . EVENTS_DISCOUNT_CODES_TABLE;
	  	if (function_exists('espresso_member_data') && !empty($this->_event->event_id)) {
	  		$wpdb->get_results("SELECT wp_user FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $this->_event->event_id . "'");
	  		$this->_event->wp_user = $wpdb->last_result[0]->wp_user != '' ? $wpdb->last_result[0]->wp_user : espresso_member_data('id');
	  		$sql .= " WHERE ";
	  		if ($this->_event->wp_user == 0 || $this->_event->wp_user == 1) {
	  			$sql .= " (wp_user = '0' OR wp_user = '1') ";
	  		}else {
	  			$sql .= " wp_user = '" . $this->_event->wp_user . "' ";
	  		}
	  	}
	  	$event_discounts = $wpdb->get_results($sql);
	  	if (!empty($event_discounts)) {
	  		foreach ($event_discounts as $event_discount) {
	  			$discount_id        = $event_discount->id;
	  			$coupon_code        = $event_discount->coupon_code;

	  			$in_event_discounts = !empty($this->_event->event_id) ? $wpdb->get_results("SELECT * FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE event_id='" . $this->_event->event_id . "' AND discount_id='" . $discount_id . "'") : array();
	  			$in_event_discount = '';
	  			foreach ($in_event_discounts as $in_discount) {
	  				$in_event_discount = $in_discount->discount_id;
	  			}
	  			echo '<p class="event-disc-code" id="event-discount-' . $discount_id . '"><label for="in-event-discount-' . $discount_id . '" class="selectit"><input value="' . $discount_id . '" type="checkbox" name="event_discount[]" id="in-event-discount-' . $discount_id . '"' . ($in_event_discount == $discount_id ? ' checked="checked"' : "" ) . '/> ' . $coupon_code . "</label></p>";
	  		}
	  	}

	  	echo '<p><a href="admin.php?page=discounts" target="_blank">' . __('Manage Promotional Codes ', 'event_espresso') . '</a></p>';
	  	?>
	  </div>
		<?php
	}
*/




	public function featured_image_meta_box() {
		$event_meta = $this->_event->event_meta;
		$values = array(
				array('id' => true, 'text' => __('Yes', 'event_espresso')),
				array('id' => false, 'text' => __('No', 'event_espresso')));
		?>
		<div class="inside">
			<div id="featured-image">
				<?php
				if (!empty($event_meta['event_thumbnail_url'])) {
					$event_thumb = $event_meta['event_thumbnail_url'];
				} else {
					$event_thumb = '';
				}
				?>
				<label for="upload_image">
					<?php _e('Add Featured Image', 'event_espresso'); ?>
				</label>
				<input id="upload_image" type="hidden" size="36" name="upload_image" value="<?php echo $event_thumb ?>" />
				<input id="upload_image_button" type="button" value="<?php _e('Upload Image', 'event_espresso'); ?>" />
				<?php if ($event_thumb) { ?>
					<p class="event-featured-thumb"><img  src="<?php echo $event_thumb ?>" alt="" /></p>
					<a id='remove-image' href='#' title='<?php _e('Remove this image', 'event_espresso'); ?>' onclick='return false;'><?php _e('Remove Image', 'event_espresso'); ?></a>
				<?php } ?>
			</div>
			<p>
				<label>
					<?php _e('Enable image in event lists', 'event_espresso'); ?>
				</label>
				<?php echo EE_Form_Fields::select_input('show_thumb_in_lists', $values, isset($event_meta['display_thumb_in_lists']) ? $event_meta['display_thumb_in_lists'] : '', 'id="show_thumb_in_lists"'); ?> </p>
			<p>
				<label>
					<?php _e('Enable image in registration', 'event_espresso'); ?>
				</label>
				<?php echo EE_Form_Fields::select_input('show_thumb_in_regpage', $values, isset($event_meta['display_thumb_in_regpage']) ? $event_meta['display_thumb_in_regpage'] : '', 'id="show_thumb_in_regpage"'); ?> </p>
		</div>
		<?php
	}





	public function preapproval_metabox() {
		$pre_approval_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')));
		?>
		<div class="inside">
			<p class="pre-approve">
				<label>
					<?php _e('Attendee pre-approval required?', 'event_espresso'); ?>
				</label>
				<?php
				echo EE_Form_Fields::select_input("require_pre_approval", $pre_approval_values, $this->_event->require_pre_approval);
				?>
			</p>
		</div>
		<?php
	}





	public function personnel_metabox() {
		$event_id = !empty($this->_event->id) ? $this->_event->id : 0;
		$originally_submitted_by = !empty($this->_event->event_meta['originally_submitted_by']) ? $this->_event->event_meta['originally_submitted_by'] : 0;
		$orig_event_staff = !empty($this->_event->event_meta['orig_event_staff']) ? $this->_event->event_meta['orig_event_staff'] : 0;
		require_once( EE_CORE . 'admin/admin_helper.php');
		?>
		<div class="inside">
			<?php echo espresso_personnel_cb($event_id, $originally_submitted_by, $orig_event_staff); ?>
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
			$sql = apply_filters('filter_hook_espresso_event_editor_categories_sql', $sql);
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
	 * _delete_events
	 * deletes a given event(s)
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _delete_events() {
		
		//determine the event id and set to array.
		$event_ids = isset( $this->_req_data['EVT_ID'] ) ? (array) $this->_req_data['EVT_ID'] : (array) $this->_req_data['event_id'];

		foreach ( $event_ids as $event_id ) {
			$this->_delete_event($event_id);
		}

		//doesn't matter what page we're coming from... we're going to the same place after delete.
		$query_args = array(
			'action' => 'default'
			);
		$this->_redirect_after_action(0,'','',$query_args);

	}






	/**
	 * processes event deletes
	 *
	 * @access  private
	 * @param  int $event_id 
	 * @return void
	 */
	private function _delete_event($event_id) {
		$event_id = absint( $event_id );

		global $wpdb;	
		
		if ( !empty($event_id) ) {
		
			$data_cols_and_vals = array('event_status' => 'D');
			$where_cols_and_vals = array('id' => $event_id);
			$where_format = array('%s');
 
			if( $wpdb->update( EVENTS_DETAIL_TABLE, $data_cols_and_vals, $where_cols_and_vals, $where_format, array('%d'))) {

				$sql = 'SELECT event_name FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id  = %d';
				$event = $wpdb->get_row($wpdb->prepare($sql, $event_id));
				
				$msg = sprintf( 
						__( '%s has been successfully deleted.', 'event_espresso' ), 
						stripslashes( html_entity_decode( $event->event_name, ENT_QUOTES, 'UTF-8' ))
				);
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
				do_action( 'action_hook_espresso_event_moved_to_trash' );
				
				} else {
					$msg = __( 'An error occured. The event could not be moved to the trash.', 'event_espresso' );
					EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				}			
		} else {
			
			$msg = __( 'An error occured. The event could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		
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
		global $wpdb, $espresso_wp_user;
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

			$use_coupon_code= $result->use_coupon_code;
					
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
			$early_disc = $result->early_disc;
			$early_disc_date = $result->early_disc_date;
			$early_disc_percentage = $result->early_disc_percentage;
					
			$venue_title = $result->venue_title;
			$venue_url = $result->venue_url;
			$venue_phone = $result->venue_phone;
			$venue_image = $result->venue_image;
			$event_meta = $result->event_meta;
			$require_pre_approval = $result->require_pre_approval;
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
				'use_coupon_code'=>$use_coupon_code, 
				'member_only'=>$member_only,
				'externalURL' => $externalURL, 
				'early_disc' => $early_disc, 
				'early_disc_date' => $early_disc_date, 
				'early_disc_percentage' => $early_disc_percentage, 
				'alt_email' => $alt_email, 
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
				'%s','%s','%s',
				'%s','%s','%s','%s',
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
		
			//Add groupon reference if installed
			if (function_exists('event_espresso_add_event_to_db_groupon')) {
				$sql = event_espresso_add_event_to_db_groupon($sql, $this->_req_data['use_groupon_code']);
				//print count ($sql);
				$sql_data = array_merge((array)$sql_data, (array)'%s');
				//print count($sql_data);
				if ( FALSE === $wpdb->insert( EVENTS_DETAIL_TABLE, $sql, $sql_data)){
					$error = true;
				}
			}else{
				if ( FALSE === $wpdb->insert( EVENTS_DETAIL_TABLE, $sql, $sql_data)){
					$error = true;
				}
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

		if ($error != true){
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
		if ( $new_event ) {
			$_SESSION['event_id'] = $event_id = $this->_insert_event();
			$success = 0; //we already have a success message so lets not send another.
			$query_args = array(
				'action' => 'edit_event',
				'EVT_ID' => $event_id
				);
		} else {
			$_SESSION['event_id'] = $event_id = $this->_update_event();
			$success = 0; //we already have a success message so lets not send another.
			$query_args = array(
				'action' => 'edit_event',
				'EVT_ID' => $event_id
				);
		}

		$this->_redirect_after_action( $success, '', '', $query_args );
	}





	private function _insert_event() {
		//Delete the transients that may be set
		$this->_espresso_reset_cache();

	/* @var $espresso_wp_user type array*/
		global $wpdb, $espresso_wp_user, $caffeinated;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$wpdb->show_errors();

		$event_meta = array(); //will be used to hold event meta data
		//If the Espresso Facebook Events is installed, add the event to Facebook
		//$fb = new FacebookEvents();
		//echo $fb->espresso_createevent();
		//echo $this->_req_data['event'];
		$wp_user_id = empty($this->_req_data['wp_user']) ? $espresso_wp_user : $this->_req_data['wp_user'][0];
		if ($wp_user_id == 0) {
			$wp_user_id = 1;
		}

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
		$externalURL = esc_html($this->_req_data['externalURL']);

		$post_type = $this->_req_data['post_type'];

		// thumbnail image options
		$event_meta['event_thumbnail_url'] = $this->_req_data['upload_image'];
		$event_meta['display_thumb_in_lists'] = $this->_req_data['show_thumb_in_lists'];
		$event_meta['display_thumb_in_regpage'] = $this->_req_data['show_thumb_in_regpage'];
		if (function_exists('espresso_calendar_config_mnu') && $caffeinated == true) {
			$event_meta['display_thumb_in_calendar'] = $this->_req_data['show_on_calendar'];
		}

		// enable event address for Gmaps
		if (!empty($this->_req_data['venue_id'][0]) || !empty($this->_req_data['zip']) || !empty($this->_req_data['city']) || !empty($this->_req_data['state'])) {
			$event_meta['enable_for_gmap'] = $this->_req_data['enable_for_gmap'];
		} else {
			$event_meta['enable_for_gmap'] = false;
		}

		//$event_location = $address . ' ' . $city . ', ' . $state . ' ' . $zip;
		$event_location = ($address != '' ? $address . ' ' : '') . ($address2 != '' ? '<br />' . $address2 : '') . ($city != '' ? '<br />' . $city : '') . ($state != '' ? ', ' . $state : '') . ($zip != '' ? '<br />' . $zip : '') . ($country != '' ? '<br />' . $country : '');
		$reg_limit = $this->_req_data['reg_limit'];
		$allow_multiple = $this->_req_data['allow_multiple'];
		$additional_limit = $this->_req_data['additional_limit'];
		$member_only = isset($this->_req_data['member_only']) ? $this->_req_data['member_only'] : '';
		$is_active = $this->_req_data['is_active'];
		$event_status = $this->_req_data['new_event_status'];
		$ticket_id = empty($this->_req_data['ticket_id']) ? '' : $this->_req_data['ticket_id'];
		$certificate_id = empty($this->_req_data['certificate_id']) ? '' : $this->_req_data['certificate_id'];

		//Early discounts
		$early_disc = isset($this->_req_data['early_disc']) ? $this->_req_data['early_disc'] : '';
		$early_disc_date = isset($this->_req_data['early_disc_date']) ? $this->_req_data['early_disc_data'] : '';
		$early_disc_percentage = isset($this->_req_data['early_disc_percentage']) ? $this->_req_data['early_disc_percentage'] : '';

		$use_coupon_code = isset( $this->_req_data['use_coupon_code'] ) ? $this->_req_data['use_coupon_cod'] : '';
		$alt_email = $this->_req_data['alt_email'];

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
		$event_meta['additional_attendee_reg_info'] = $this->_req_data['additional_attendee_reg_info'];
		$event_meta['date_submitted'] = date("Y-m-d H:i:s");
		$event_meta['originally_submitted_by'] = $espresso_wp_user;
		$event_meta['default_reg_status'] = $this->_req_data['default_reg_status'];

		if ( isset( $this->_req_data['emeta'] ) && ! empty ( $this->_req_data['emeta'] )) {
			foreach ($this->_req_data['emeta'] as $k => $v) {
				$event_meta[$v] = strlen(trim($this->_req_data['emetad'][$k])) > 0 ? $this->_req_data['emetad'][$k] : '';
			}
		}
		//echo strlen(trim($this->_req_data['emetad'][$k]));
		//print_r($this->_req_data['emeta'] );

		$event_meta = serialize($event_meta);

		############ Added by wp-developers ######################
		$require_pre_approval = 0;
		if (isset($this->_req_data['require_pre_approval'])) {
			$require_pre_approval = $this->_req_data['require_pre_approval'];
		}
		################# END #################
		//Event name
		$event_name = empty($this->_req_data['event']) ? uniqid($espresso_wp_user . '-') : htmlentities( wp_strip_all_tags( $this->_req_data['event'] ), ENT_QUOTES, 'UTF-8');

		//Create the event code and prefix it with the user id
		$event_code = uniqid($espresso_wp_user . '-');

		//Create the event identifier with the event code appended to the end
		$event_identifier = (empty($this->_req_data['event_identifier'])) ? $event_identifier = sanitize_title_with_dashes($event_name . '-' . $event_code) : $event_identifier = sanitize_title_with_dashes($this->_req_data['event_identifier']) . $event_code;

		//Create the event slug
		$event_slug = ($this->_req_data['slug'] == '') ? sanitize_title_with_dashes($event_name) : sanitize_title_with_dashes($this->_req_data['slug']);

		//When adding colums to the following arrays, be sure both arrays have equal values.
		$sql = array(
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
				'allow_multiple' => $allow_multiple,
				'is_active' => $is_active,
				'event_status' => $event_status,
				'use_coupon_code' => $use_coupon_code,
				'member_only' => $member_only,
				'externalURL' => $externalURL,
				'early_disc' => $early_disc,
				'early_disc_date' => $early_disc_date,
				'early_disc_percentage' => $early_disc_percentage,
				'alt_email' => $alt_email,
				'event_meta' => $event_meta,
				'require_pre_approval' => $require_pre_approval,
				'submitted' => date('Y-m-d H:i:s', time()),
				'reg_limit' => $reg_limit,
				'additional_limit' => $additional_limit,
				'wp_user' => $wp_user_id,
				'ticket_id' => $ticket_id,
				'certificate_id' => $certificate_id,
		);

		$sql_data = array(
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%d', '%d', '%d', '%d',
				'%d'
		);

		//Add groupon reference if installed
		if (function_exists('event_espresso_add_event_to_db_groupon')) {
			$sql = event_espresso_add_event_to_db_groupon($sql, $this->_req_data['use_groupon_code']);
			//print count ($sql);
			$sql_data = array_merge((array) $sql_data, (array) '%s');
			//print count($sql_data);
			if ( FALSE === $wpdb->insert(EVENTS_DETAIL_TABLE, $sql, $sql_data)) {
				$error = true;
			}
		} else {
			if (FALSE === $wpdb->insert(EVENTS_DETAIL_TABLE, $sql, $sql_data)) {
				$error = true;
			}
		}

		$last_event_id = $wpdb->insert_id;

		do_action('action_hook_espresso_insert_event_add_ons');
		############# MailChimp Integration ##############
		if (get_option('event_mailchimp_active') == 'true' && $caffeinated == true) {
			MailChimpController::add_event_list_rel($last_event_id);
		}

		/*
		 * Added for seating chart addon
		 */
		if (isset($this->_req_data['seating_chart_id'])) {
			$cls_seating_chart = new seating_chart();
			$cls_seating_chart->associate_event_seating_chart($this->_req_data['seating_chart_id'], $last_event_id);
		}
		/*
		 * End
		 */
		
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
		// now additional attendee question groups
		$add_attendee_question_groups = isset( $this->_req_data['add_attendee_question_groups'] ) ? $this->_req_data['add_attendee_question_groups'] : array();
		foreach ( $add_attendee_question_groups as $question_group ) {
			$wpdb->insert(
				$wpdb->prefix . 'esp_event_question_group',
				array( 'EVT_ID' => $last_event_id, 'QSG_ID' => $question_group, 'EQG_primary' => 0 ),
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

		if (!empty($this->_req_data['event_person'])) {
			foreach ($this->_req_data['event_person'] as $k => $v) {
				if ($v != '') {
					$sql_ppl = "INSERT INTO " . EVENTS_PERSONNEL_REL_TABLE . " (event_id, person_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql_ppl <br>";
					if ( FALSE === $wpdb->query($sql_ppl) )
						$error = true;
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

		if (!empty($this->_req_data['event_discount'])) {
			foreach ($this->_req_data['event_discount'] as $k => $v) {
				if ($v != '') {
					$sql_cat = "INSERT INTO " . EVENTS_DISCOUNT_REL_TABLE . " (event_id, discount_id) VALUES ('" . $last_event_id . "', '" . $v . "')";
					//echo "$sql3 <br>";
					if ( FALSE === $wpdb->query($sql_cat)) {
						$error = true;
					}
				}
			}
		}

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$DTM = EEM_Datetime::instance();

//		printr( $this->_req_data['event_datetimes'] ); die();

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
			if (!empty($new_ticket_price['PRC_name'])) {
				$ticket_prices_to_save[0] = $new_ticket_price;
			}
		}

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
												absint($last_event_id),
												$ticket_price['PRC_amount'],
												$ticket_price['PRC_name'],
												$ticket_price['PRC_desc'],
												 /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
												$ticket_price['PRC_reg_limit'],
												*/
												$ticket_price['PRC_use_dates'] ? TRUE : FALSE,
												$ticket_price['PRC_start_date'],
												$ticket_price['PRC_end_date'],
												FALSE,
												FALSE,
												0,
												TRUE,
												$current_user->ID,
												$ticket_price['PRC_is_active'] ? TRUE : FALSE,
												$overrides,
												$ticket_price['PRT_ID'] < 3 ? 0 : $ticket_price['PRC_order'],
												$ticket_price['PRC_deleted']
				);

//                    echo printr( $ticket_price, '$ticket_price' );
//                    echo printr( $new_price, '$new_price' );

				$results = $new_price->insert();

			}
		}

		
		
		

		/// Create Event Post Code Here
		if ( isset( $this->_req_data['create_post'] ) && $this->_req_data['create_post'] == 1 ) {

			$post_type = $this->_req_data['post_type'];
			
			
			if ($post_type == 'post') {
				if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php") || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/event_post.php")) {
					// Load message from template into message post variable
					ob_start();
					if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php")) {
						require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php");
					} else {
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/event_post.php");
					}
					$post_content = ob_get_contents();
					ob_end_clean();
				} else {
					_e('There was error finding a post template. Please verify your post templates are available.', 'event_espresso');
				}
				
			} elseif ($post_type == 'espresso_event') {
				ob_start();
				echo $event_desc;
				$post_content = ob_get_contents();
				ob_end_clean();
			}
			
			$my_post = array();

			$my_post['post_title'] = esc_html($this->_req_data['event']);
			$my_post['post_content'] = $post_content;
			$my_post['post_status'] = 'publish';
			$my_post['post_author'] = $this->_req_data['user'];
			$my_post['post_category'] = $this->_req_data['post_category'];
			$my_post['tags_input'] = $this->_req_data['post_tags'];
			$my_post['post_type'] = $post_type;
			//print_r($my_post);
			// Insert the post into the database
			$post_id = wp_insert_post($my_post);
			// Store the POST ID so it can be displayed on the edit page
			$sql = array('post_id' => $post_id, 'post_type' => $post_type);

			add_post_meta($post_id, 'event_id', $last_event_id);
			add_post_meta($post_id, 'event_identifier', $event_identifier);
			add_post_meta($post_id, 'slug', $event_slug);
			add_post_meta($post_id, 'event_start_date', $this->_req_data['start_date']);
			add_post_meta($post_id, 'event_end_date', $this->_req_data['end_date']);
			add_post_meta($post_id, 'event_location', $event_location);
			add_post_meta($post_id, 'virtual_url', $virtual_url);
			add_post_meta($post_id, 'virtual_phone', $virtual_phone);
			add_post_meta($post_id, 'event_address', $address);
			add_post_meta($post_id, 'event_address2', $address2);
			add_post_meta($post_id, 'event_city', $city);
			add_post_meta($post_id, 'event_state', $state);
			add_post_meta($post_id, 'event_country', $country);
			add_post_meta($post_id, 'event_phone', $phone);
			add_post_meta($post_id, 'venue_title', $venue_title);
			add_post_meta($post_id, 'venue_url', $venue_url);
			add_post_meta($post_id, 'venue_phone', $venue_phone);
			add_post_meta($post_id, 'venue_image', $venue_image);
			add_post_meta($post_id, 'event_externalURL', $externalURL);
			add_post_meta($post_id, 'event_reg_limit', $reg_limit);

			$sql_data = array('%d', '%s');
			$update_id = array('id' => $last_event_id);
			if ( FALSE === $wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d')) )
				$error = true;
		}

		
		if (empty($error)) {	
			
			// overwrite default success messages
			EE_Error::overwrite_success();
			//$edit_event_link = add_query_arg(array('action' => 'edit_event', 'event_id' => $last_event_id ), EVENTS_ADMIN_URL);
			
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
		// end nonce check
	}





	private function _update_event() {
		//print_r($this->_req_data);

		global $wpdb, $espresso_wp_user, $caffeinated;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$wpdb->show_errors();

		$event_meta = array(); //will be used to hold event meta data
		$wp_user_id = empty($this->_req_data['wp_user']) ? $espresso_wp_user : $this->_req_data['wp_user'][0];
		$event_id = isset( $this->_req_data['event_id'] )? absint( $this->_req_data['event_id'] ) : null;
		$event_name = htmlentities( wp_strip_all_tags( $this->_req_data['event'] ), ENT_QUOTES, 'UTF-8' );
		$event_slug = ($this->_req_data['slug'] == '') ? sanitize_title_with_dashes($event_name . '-' . $event_id) : sanitize_title_with_dashes($this->_req_data['slug']);
		$event_desc = $this->_req_data['event_desc'];
		$display_desc = $this->_req_data['display_desc'];
		$display_reg_form = $this->_req_data['display_reg_form'];
		$reg_limit = absint( $this->_req_data['reg_limit'] );
		$allow_multiple = $this->_req_data['allow_multiple'];
		$ticket_id = empty($this->_req_data['ticket_id']) ? '' : $this->_req_data['ticket_id'];
		$certificate_id = empty($this->_req_data['certificate_id']) ? '' : $this->_req_data['certificate_id'];

		$allow_overflow = empty($this->_req_data['allow_overflow']) ? false : $this->_req_data['allow_overflow'];

		$additional_limit = $this->_req_data['additional_limit'];
		//$member_only=$this->_req_data['member_only'];
		$member_only = empty($this->_req_data['member_only']) ? false : $this->_req_data['member_only'];

		$is_active = $this->_req_data['is_active'];
		$event_status = $this->_req_data['new_event_status'];

		$address = !empty($this->_req_data['address']) ? esc_html($this->_req_data['address']) : '';
		$address2 = !empty($this->_req_data['address2']) ? esc_html($this->_req_data['address2']) : '';
		$city = !empty($this->_req_data['city']) ? esc_html($this->_req_data['city']) : '';
		$state = !empty($this->_req_data['state']) ? esc_html($this->_req_data['state']) : '';
		$zip = !empty($this->_req_data['zip']) ? esc_html($this->_req_data['zip']) : '';
		$country = !empty($this->_req_data['country']) ? esc_html($this->_req_data['country']) : '';
		$phone = !empty($this->_req_data['phone']) ? esc_html($this->_req_data['phone']) : '';
		$externalURL = !empty($this->_req_data['externalURL']) ? esc_html($this->_req_data['externalURL']) : '';

		//$event_location = $address . ' ' . $city . ', ' . $state . ' ' . $zip;
		$event_location = ($address != '' ? $address . ' ' : '') . ($city != '' ? '<br />' . $city : '') . ($state != '' ? ', ' . $state : '') . ($zip != '' ? '<br />' . $zip : '') . ($country != '' ? '<br />' . $country : '');

		//Get the first instance of the start and end times
		//$start_time = $this->_req_data['start_time'][0];
		//$end_time = $this->_req_data['end_time'][0];
		// Add registration times
		//$registration_startT = event_date_display($this->_req_data['registration_startT'], 'H:i');
		//$registration_endT = event_date_display($this->_req_data['registration_endT'], 'H:i');
		//Add timezone
		$timezone_string = empty($this->_req_data['timezone_string']) ? '' : $this->_req_data['timezone_string'];

		//Early discounts
		$early_disc = isset( $this->_req_data['early_disc'] ) ? $this->_req_data['early_disc'] : '';
		$early_disc_date = isset( $this->_req_data['early_disc_date'] ) ? $this->_req_data['early_disc_date'] : '';
		$early_disc_percentage = isset( $this->_req_data['early_disc_percentage'] ) ? $this->_req_data['early_disc_percentage'] : '';

		$use_coupon_code = isset( $this->_req_data['use_coupon_code'] ) ? $this->_req_data['use_coupon_code'] : FALSE;
		$alt_email = $this->_req_data['alt_email'];


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

		$event_meta['default_reg_status'] = $this->_req_data['default_reg_status'];
		$event_meta['venue_id'] = empty($this->_req_data['venue_id']) ? '' : $this->_req_data['venue_id'][0];
		$event_meta['additional_attendee_reg_info'] = $this->_req_data['additional_attendee_reg_info'];
		$event_meta['date_submitted'] = isset( $this->_req_data['date_submitted'] ) ? $this->_req_data['date_submitted'] : NULL;
		$event_meta['originally_submitted_by'] = isset( $this->_req_data['originally_submitted_by'] ) ? $this->_req_data['originally_submitted_by'] : NULL;

		if (isset($espresso_wp_user) && $espresso_wp_user != $event_meta['originally_submitted_by']) {
			$event_meta['orig_event_staff'] = !empty($this->_req_data['event_person']) ? serialize($this->_req_data['event_person']) : '';
		}
		//print_r($event_meta['orig_event_staff']);
		//Thumbnails
		$event_meta['event_thumbnail_url'] = !empty($this->_req_data['upload_image']) ? $this->_req_data['upload_image'] : '';
		$event_meta['display_thumb_in_lists'] = !empty($this->_req_data['show_thumb_in_lists']) ? $this->_req_data['show_thumb_in_lists'] : '';
		$event_meta['display_thumb_in_regpage'] = !empty($this->_req_data['show_thumb_in_regpage']) ? $this->_req_data['show_thumb_in_regpage'] : '';
		$event_meta['display_thumb_in_calendar'] = !empty($this->_req_data['show_on_calendar']) ? $this->_req_data['show_on_calendar'] : '';

		if (!empty($this->_req_data['venue_id'][0]) || !empty($this->_req_data['zip']) || !empty($this->_req_data['city']) || !empty($this->_req_data['state'])) {
			$event_meta['enable_for_gmap'] = isset( $this->_req_data['enable_for_gmap'] )  ? $this->_req_data['enable_for_gmap'] : FALSE;
		} else {
			$event_meta['enable_for_gmap'] = false;
		}

		/*
		 * Added for seating chart addon
		 */
		if (isset($this->_req_data['seating_chart_id'])) {
			$cls_seating_chart = new seating_chart();
			$seating_chart_result = $cls_seating_chart->associate_event_seating_chart($this->_req_data['seating_chart_id'], $event_id);
			$tmp_seating_chart_id = $this->_req_data['seating_chart_id'];
			if ($tmp_seating_chart_id > 0) {
				if ($seating_chart_result === false) {
					$tmp_seating_chart_row = $wpdb->get_row("select seating_chart_id from " . EVENTS_SEATING_CHART_EVENT_TABLE . " where event_id = $event_id");
					if ($tmp_seating_chart_row !== NULL) {
						$tmp_seating_chart_id = $tmp_seating_chart_row->seating_chart_id;
					} else {
						$tmp_seating_chart_id = 0;
					}
				}

				if ($this->_req_data['allow_multiple'] == 'true' && isset($this->_req_data['seating_chart_id']) && $tmp_seating_chart_id > 0) {

					$event_meta['additional_attendee_reg_info'] = 3;
				}
			}
		}
		/*
		 * End
		 */


		if ( isset( $this->_req_data['emeta'] ) && ! empty ( $this->_req_data['emeta'] )) {
			foreach ($this->_req_data['emeta'] as $k => $v) {
				$event_meta[$v] = $this->_req_data['emetad'][$k];
			}
		}
		$event_meta = serialize($event_meta);
		############ Added by wp-developers ######################
		$require_pre_approval = 0;
		if (isset($this->_req_data['require_pre_approval'])) {
			$require_pre_approval = $this->_req_data['require_pre_approval'];
		}

		################# END #################
		//When adding colums to the following arrays, be sure both arrays have equal values.
		$sql = array(
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

				'allow_multiple' => $allow_multiple,
				'is_active' => $is_active,
				'event_status' => $event_status,
				'use_coupon_code' => $use_coupon_code,
				'member_only' => $member_only,
				'externalURL' => $externalURL,
				'early_disc' => $early_disc,
				'early_disc_date' => $early_disc_date,
				'early_disc_percentage' => $early_disc_percentage,
				'alt_email' => $alt_email,
				'allow_overflow' => $allow_overflow,

				'event_meta' => $event_meta,
				'require_pre_approval' => $require_pre_approval,
				'timezone_string' => $timezone_string,
				'reg_limit' => $reg_limit,
				'additional_limit' => $additional_limit,
				'wp_user' => $wp_user_id,
				'ticket_id' => $ticket_id,
				'certificate_id' => $certificate_id
		);



		$sql_data = array(
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s',
				'%s', '%s', '%s', '%s', '%s', 
				'%s', '%s', '%s', '%s', '%s', 
				'%s', '%s', '%s', '%s', 
				'%s', '%s', '%s',  '%d', '%d', 
				'%d', '%d', '%d'
		);

		$update_id = array('id' => $event_id);


		if (function_exists('event_espresso_add_event_to_db_groupon')) {
			$sql = event_espresso_add_event_to_db_groupon($sql, $this->_req_data['use_groupon_code']);
			///print count ($sql);
			$sql_data = array_merge((array) $sql_data, (array) '%s');
			//print count($sql_data);
			if ( FALSE === $wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d')) ) {
				$error = true;
			}
			
		} else {
			if ( FALSE === $wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d')) ) {
				$error = true;
			}
			
		}

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

		$del_ppl = "DELETE FROM " . EVENTS_PERSONNEL_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
		if ( FALSE === $wpdb->query($del_ppl) )
			$error = true;

		if (!empty($this->_req_data['event_person'])) {
			foreach ($this->_req_data['event_person'] as $k => $v) {
				if ($v != '') {
					$sql_ppl = "INSERT INTO " . EVENTS_PERSONNEL_REL_TABLE . " (event_id, person_id) VALUES ('" . $event_id . "', '" . $v . "')";
					//echo "$sql_ppl <br>";
					if ( FALSE === $wpdb->query($sql_ppl) )
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

		$del_discounts = "DELETE FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE event_id = '" . $event_id . "'";
		if ( FALSE === $wpdb->query($del_discounts) )
			$error = true;

		if (!empty($this->_req_data['event_discount'])) {
			foreach ($this->_req_data['event_discount'] as $k => $v) {
				if ($v != '') {
					$sql_discount = "INSERT INTO " . EVENTS_DISCOUNT_REL_TABLE . " (event_id, discount_id) VALUES ('" . $event_id . "', '" . $v . "')";
					//echo "$sql_discount <br>";
					if ( FALSE === $wpdb->query($sql_discount) )
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
			
			$event_datetimes = isset($this->_req_data['event_datetimes']) ? $this->_req_data['event_datetimes'] : array();
			// add hook so addons can manipulate event datetimes prior to saving			
			$event_datetimes = apply_filters( 'filter_hook_espresso_update_event_datetimes', $event_datetimes );

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
				
				
//						echo printr( $new_event_date, '$new_event_date' );	

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


		/************************************   PRICING   ******************************************* */
		
		$ticket_prices_to_save = array();
		$quick_edit_ticket_price = isset($this->_req_data['quick_edit_ticket_price']) ? $this->_req_data['quick_edit_ticket_price'] : array();
		//printr( $quick_edit_ticket_price, '$quick_edit_ticket_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

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
			if ( $edited_ticket_prices = isset($this->_req_data['edit_ticket_price']) ? $this->_req_data['edit_ticket_price'] : array() ) {
//					echo printr( $edited_ticket_prices, '$edited_ticket_prices' );
				// cycle thru list                    
				foreach ($edited_ticket_prices as $PRC_ID => $edited_ticket_price) {
//						echo printr( $edited_ticket_price, '$edited_ticket_price' );	
					// add edited ticket prices to list of ticket prices to save
					if (in_array($PRC_ID, $edited_ticket_price_IDs)) {
//							echo printr( $quick_edit_ticket_price[$PRC_ID], '$quick_edit_ticket_price[$PRC_ID]' );
						if ( isset( $quick_edit_ticket_price[$PRC_ID] ) && is_array( $quick_edit_ticket_price[$PRC_ID] )) {
							$edited_ticket_price = array_merge( $quick_edit_ticket_price[$PRC_ID], $edited_ticket_price );
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
			if (!empty($new_ticket_price['PRC_name'])) {
				$ticket_prices_to_save[0] = $new_ticket_price;
			}
		}
		
		// add hook so addons can manipulate event ticket prices prior to saving			
		$ticket_prices_to_save = apply_filters( 'filter_hook_espresso_update_event_ticket_prices', $ticket_prices_to_save );

		// and now we actually save the ticket prices
		if (!empty($ticket_prices_to_save)) {

			//echo printr( $new_ticket_price, '$new_ticket_price' );
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
			$PRC = EEM_Price::instance();

			global $current_user;
			get_currentuserinfo();
			
			
			foreach ($ticket_prices_to_save as $PRC_ID => $ticket_price) {
				//printr( $ticket_price, '$ticket_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

				//determine whether this price overrides an existing global or not
				$overrides = absint($ticket_price['PRT_is_global']) ? $PRC_ID : NULL;
//echo '<br/><br/><h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
				// or whether it was already overriding a global from before
				$overrides = $ticket_price['PRC_overrides'] ? absint($ticket_price['PRC_overrides']) : $overrides;
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
				// create ticket object
				$new_price = new EE_Price(
												$ticket_price['PRT_ID'],
												absint($event_id),
												$ticket_price['PRC_amount'],
												$ticket_price['PRC_name'],
												$ticket_price['PRC_desc'],
												isset( $ticket_price['PRC_reg_limit'] ) ? $ticket_price['PRC_reg_limit'] : NULL,
												isset( $ticket_price['PRC_tckts_left'] ) ? $ticket_price['PRC_tckts_left'] : NULL,
												isset( $ticket_price['PRC_use_dates'] ) ? $ticket_price['PRC_use_dates'] : FALSE,
												isset( $ticket_price['PRC_start_date'] ) ? $ticket_price['PRC_start_date'] : FALSE,
												isset( $ticket_price['PRC_end_date'] ) ? $ticket_price['PRC_end_date'] : FALSE,
												$ticket_price['PRC_is_active'] ? TRUE : FALSE,
												$overrides,
												$ticket_price['PRT_ID'] < 3 ? 0 : $ticket_price['PRC_order'],
												isset( $ticket_price['PRC_deleted'] ) ? $ticket_price['PRC_deleted'] : FALSE,
												$ticket_price['PRT_is_global'] == 1 &&  ! isset ( $PRC_ID ) ? 0 : $PRC_ID
				);
				
//				printr( $ticket_price, '$ticket_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//				printr( $new_price, '$new_price  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );


				if (!$new_price->ID()) {
//echo '<h1>insert !!!</h1>';
//echo '<h4>$overrides : ' . $overrides . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
					$results = $new_price->insert();
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


		############# MailChimp Integration ###############
		if (get_option('event_mailchimp_active') == 'true' && $caffeinated == true) {
			MailChimpController::update_event_list_rel($event_id);
		}

		/// Create Event Post Code Here
		if ( isset( $this->_req_data['create_post'] )) {
		
			if ( $this->_req_data['create_post'] ) {
			
				$post_type = $this->_req_data['post_type'];
				if ($post_type == 'post') {
					if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php") || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/event_post.php")) {
						// Load message from template into message post variable
						ob_start();
						if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php")) {
							require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "event_post.php");
						} else {
							require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/event_post.php");
						}
						$post_content = ob_get_contents();
						ob_end_clean();
													
					} else {
						_e('There was error finding a post template. Please verify your post templates are available.', 'event_espresso');
					}
				} elseif ($post_type == 'espresso_event') {
					ob_start();
					echo $event_desc;
					$post_content = ob_get_contents();
					ob_end_clean();
				}

				$my_post = array();

				// check for post id in form input first before just hitting the db
				if ( isset( $this->_req_data['post_id'] ) && ! empty( $this->_req_data['post_id'] )) {
					$post_id = absint( $this->_req_data['post_id'] );
				} else {
					$sql = " SELECT * FROM " . EVENTS_DETAIL_TABLE;
					$sql .= " WHERE id = '" . $event_id . "' ";
					$wpdb->get_results($sql);
					$post_id = $wpdb->last_result[0]->post_id;
				}

				$post_type = $this->_req_data['post_type'];

				if ($post_id > 0)
					$my_post['ID'] = $post_id;

				$my_post['post_title'] = esc_html($this->_req_data['event']);
				$my_post['post_content'] = $post_content;
				$my_post['post_status'] = 'publish';
				$my_post['post_author'] = $this->_req_data['user'];
				$my_post['post_category'] = $this->_req_data['post_category'];
				//print_r ($my_post['post_category']);
				$my_post['tags_input'] = $this->_req_data['post_tags'];
				$my_post['post_type'] = $post_type;
				//print_r($my_post);
				// Insert the post into the database					
					
				if ($post_id > 0) {
					$post_id = wp_update_post($my_post);
					update_post_meta($post_id, 'event_id', $event_id);
					update_post_meta($post_id, 'event_identifier', $event_identifier);
					update_post_meta($post_id, 'slug', $event_slug);
					update_post_meta($post_id, 'event_start_date', $start_date);
					update_post_meta($post_id, 'event_end_date', $end_date);
					update_post_meta($post_id, 'event_location', $event_location);
					update_post_meta($post_id, 'virtual_url', $virtual_url);
					update_post_meta($post_id, 'virtual_phone', $virtual_phone);
					//
					update_post_meta($post_id, 'event_address', $address);
					update_post_meta($post_id, 'event_address2', $address2);
					update_post_meta($post_id, 'event_city', $city);
					update_post_meta($post_id, 'event_state', $state);
					update_post_meta($post_id, 'event_country', $country);
					update_post_meta($post_id, 'event_phone', $phone);
					update_post_meta($post_id, 'venue_title', $venue_title);
					update_post_meta($post_id, 'venue_url', $venue_url);
					update_post_meta($post_id, 'venue_phone', $venue_phone);
					update_post_meta($post_id, 'venue_image', $venue_image);
					update_post_meta($post_id, 'event_externalURL', $externalURL);
					update_post_meta($post_id, 'event_reg_limit', $reg_limit);
					update_post_meta($post_id, 'event_start_time', time_to_24hr($start_time));
					update_post_meta($post_id, 'event_end_time', time_to_24hr($end_time));
					update_post_meta($post_id, 'event_registration_start', $registration_start);
					update_post_meta($post_id, 'event_registration_end', $registration_end);
					update_post_meta($post_id, 'event_registration_startT', $registration_startT);
					update_post_meta($post_id, 'event_registration_endT', $registration_endT);
					update_post_meta( $post_id, 'timezone_string', $timezone_string );
				} else {
					$post_id = wp_insert_post($my_post);
					add_post_meta($post_id, 'event_id', $event_id);
					add_post_meta($post_id, 'event_identifier', $event_identifier);
					add_post_meta($post_id, 'event_start_date', $start_date);
					add_post_meta($post_id, 'event_end_date', $end_date);
					add_post_meta($post_id, 'event_location', $event_location);
					add_post_meta($post_id, 'virtual_url', $virtual_url);
					add_post_meta($post_id, 'virtual_phone', $virtual_phone);
					//
					add_post_meta($post_id, 'event_address', $address);
					add_post_meta($post_id, 'event_address2', $address2);
					add_post_meta($post_id, 'event_city', $city);
					add_post_meta($post_id, 'event_state', $state);
					add_post_meta($post_id, 'event_country', $country);
					add_post_meta($post_id, 'event_phone', $phone);
					add_post_meta($post_id, 'venue_title', $venue_title);
					add_post_meta($post_id, 'venue_url', $venue_url);
					add_post_meta($post_id, 'venue_phone', $venue_phone);
					add_post_meta($post_id, 'venue_image', $venue_image);
					add_post_meta($post_id, 'event_externalURL', $externalURL);
					add_post_meta($post_id, 'event_reg_limit', $reg_limit);
					add_post_meta($post_id, 'event_start_time', time_to_24hr($start_time));
					add_post_meta($post_id, 'event_end_time', time_to_24hr($end_time));
					add_post_meta($post_id, 'event_registration_start', $registration_start);
					add_post_meta($post_id, 'event_registration_end', $registration_end);
					add_post_meta($post_id, 'event_registration_startT', $registration_startT);
					add_post_meta($post_id, 'event_registration_endT', $registration_endT);
					//add_post_meta( $post_id, 'timezone_string', $timezone_string );
				}

				// Store the POST ID so it can be displayed on the edit page
				$sql = array('post_id' => $post_id, 'post_type' => $post_type);
				$sql_data = array('%d', '%s');
				$update_id = array('id' => $event_id);
				
				if ( FALSE === $wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d')) )
					$error = true;
				
			} else {
			
				// check for post id in form input first before just hitting the db
				if ( isset( $this->_req_data['post_id'] ) && ! empty( $this->_req_data['post_id'] )) {
					$post_id = absint( $this->_req_data['post_id'] );
				} else {
					$sql = "SELECT * FROM " . EVENTS_DETAIL_TABLE;
					$sql .= " WHERE id = %d";
					if ( $wpdb->get_results( $wpdb->prepare( $sql, $event_id ))) {
						$post_id = $wpdb->last_result[0]->post_id;
					}					
				}

				if ($wpdb->num_rows > 0 && !empty($this->_req_data['delete_post']) && $this->_req_data['delete_post'] == 'true') {
					$sql = array('post_id' => '', 'post_type' => '');
					$sql_data = array('%d', '%s');
					$update_id = array('id' => $event_id);
					$wpdb->update(EVENTS_DETAIL_TABLE, $sql, $update_id, $sql_data, array('%d'));
					wp_delete_post($post_id, 'true');
				}
				
			}
		}

		if (empty($error)) {	
			
			// overwrite default success messages
			EE_Error::overwrite_success();
			//$edit_event_link = add_query_arg(array('action' => 'edit_event', 'event_id' => $last_event_id ), EVENTS_ADMIN_URL);
			
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

		/*
		 * Added for seating chart addon
		 */
		if (isset($seating_chart_result) && $seating_chart_result === false) {
			?>
			<p><?php _e('Failed to associate new seating chart with this event. (Seats from current seating chart might have been used by some attendees)', 'event_espresso'); ?></p>
			<?php
		}

		//Empty the event cache
		$this->_espresso_reset_cache($event_id);
		
		return $event_id;
	}






	/**
	 * _trash_or_restore_event
	 * depending on argument, will handle trashing or restoring event
	 *
	 * @access protected
	 * @param  bool $trash TRUE = trash, FALSE = restore
	 * @return void
	 * @todo: Currently the events table doesn't allow for trash/restore.  When we move to new events model we'll allow for it.
	 */
	protected function _trash_or_restore_event($trash) {}





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

		$this->_template_args['reg_status_array'] = $this->_get_reg_status_array();
		$this->_template_args['default_reg_status'] = isset( $org_options['default_reg_status'] ) ? sanitize_text_field( $org_options['default_reg_status'] ) : 'RPN';

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
		$data['use_attendee_pre_approval'] = isset( $this->_req_data['use_attendee_pre_approval'] ) ? absint( $this->_req_data['use_attendee_pre_approval'] ) : FALSE;

		$data = apply_filters('filter_hook_espresso_default_event_settings_save', $data);	
		
		$what = 'Default Event Settings';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'default_event_settings' ) );
				
	}




	/**
	 * 		get list of payment statuses
	*		@access private
	*		@return array
	*/
	private function _get_reg_status_array() {

		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "registration"';
		$results = $wpdb->get_results( $SQL );

		$reg_status = array();
		foreach ( $results as $status ) {
			$reg_status[] = array( 'id' => $status->STS_ID, 'text' => ucwords( strtolower( str_replace( '_', ' ', $status->STS_code ))));
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
			'action' => 'event',
			'event_id' => $this->_req_data['EVT_ID'],
			);
		$this->_req_data = array_merge( $this->_req_data, $new_request_args);

		
		if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance();
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
			'type' => 'excel',
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

		//first check if we've got an incoming import
		if (isset($this->_req_data['import'])) {
			if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php')) {
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
				$EE_Import = EE_Import::instance();
				$EE_Import->import();
			}
		}

		include( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/csv_uploader.php' );
		$import_what = 'Event Details';
		$import_intro = 'If you have a previously exported list of Event Details in a Comma Separated Value (CSV) file format, you can upload the file here: ';
		$page = 'events';
		$content = espresso_csv_uploader($import_what, $import_intro, $page);

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

	
		$sql .= " LEFT JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";

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
			$sql2 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
			$sql2 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$sql2 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			$sql2 .= " WHERE e.event_status != 'D'";
			$sql2 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime( date('Y-m-d') . $start ) . "' AND '" . strtotime( date('Y-m-d') . $end ) . "' ";
			$sql2 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
			$sql2 .= ") UNION (";
		}
		$sql2 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql2 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
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
			$sql3 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
			$sql3 .= " JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id ";
			$sql3 .= " JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = r.venue_id ";
			$sql3 .= " WHERE event_status != 'D'";
			$sql3 .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($this_year_r . '-' . $this_month_r . '-01' . $start) . "' AND '" . strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end ) . "' ";

			$sql3 .= $group != '' ? " AND l.locale_id IN (" . $group . ") " : '';
			$sql3 .= ") UNION (";
		}
		$sql3 .= "SELECT e.id FROM ". EVENTS_DETAIL_TABLE." e ";
		$sql3 .= " JOIN " . ESP_DATETIME . " dtt ON dtt.EVT_ID = e.id ";
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