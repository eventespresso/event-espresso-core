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

		$this->page_slug = EVENTS_PG_SLUG;
		$this->page_label = EVENTS_LABEL;
		$this->_admin_base_url = EVENTS_ADMIN_URL;
		$this->_admin_base_path = EVENTS_ADMIN;
		$this->_cpt_model_names = array(
			'create_new' => 'EEM_Event',
			'edit' => 'EEM_Event'
			);
		$this->_cpt_edit_routes = array(
			'espresso_events' => 'edit'
			);

		$this->_event_model = EE_Registry::instance()->load_model( 'Event' );

		add_action('AHEE__EE_Admin_Page_CPT__set_model_object__after_set_object', array( $this, 'verify_event_edit' ) );
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
			'editor_title' => array(
				'espresso_events' => __('Enter event title here', 'event_espresso')
				),
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
		EE_Registry::instance()->load_helper( 'Formatter' );
		//load field generator helper
		EE_Registry::instance()->load_helper( 'Form_Fields' );

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
				'list_table' => 'Events_Admin_List_Table',
				'help_tabs' => array(
					'events_overview_help_tab' => array(
						'title' => __('Events Overview', 'event_espresso'),
						'filename' => 'events_overview'
					),
					'events_overview_table_column_headings_help_tab' => array(
						'title' => __('Events Overview Table Column Headings', 'event_espresso'),
						'filename' => 'events_overview_table_column_headings'
					),
					'events_overview_filters_help_tab' => array(
						'title' => __('Events Overview Filters', 'event_espresso'),
						'filename' => 'events_overview_filters'
					),
					'events_overview_view_help_tab' => array(
						'title' => __('Events Overview Views', 'event_espresso'),
						'filename' => 'events_overview_views'
					),
					'events_overview_other_help_tab' => array(
						'title' => __('Events Overview Other', 'event_espresso'),
						'filename' => 'events_overview_other'
					)
				),
				'help_tour' => array(
					'Event_Overview_Help_Tour',
					//'New_Features_Test_Help_Tour' for testing multiple help tour
					),
				'qtips' => array(
					'EE_Event_List_Table_Tips'
					),
				'require_nonce' => FALSE
			),
			'create_new' => array(
				'nav' => array(
					'label' => __('Add Event', 'event_espresso'),
					'order' => 5,
					'persistent' => false
				),
				'metaboxes' => array('_register_event_editor_meta_boxes'),
				'help_tabs' => array(
					'event_editor_help_tab' => array(
						'title' => __('Event Editor', 'event_espresso'),
						'filename' => 'event_editor'
					),
					'event_editor_title_richtexteditor_help_tab' => array(
						'title' => __('Event Title & Rich Text Editor', 'event_espresso'),
						'filename' => 'event_editor_title_richtexteditor'
					),
					'event_editor_venue_details_help_tab' => array(
						'title' => __('Event Venue Details', 'event_espresso'),
						'filename' => 'event_editor_venue_details'
					),
					'event_editor_event_datetimes_help_tab' => array(
						'title' => __('Event Datetimes', 'event_espresso'),
						'filename' => 'event_editor_event_datetimes'
					),
					'event_editor_event_tickets_help_tab' => array(
						'title' => __('Event Tickets', 'event_espresso'),
						'filename' => 'event_editor_event_tickets'
					),
					'event_editor_event_registration_options_help_tab' => array(
						'title' => __('Event Registration Options', 'event_espresso'),
						'filename' => 'event_editor_event_registration_options'
					),
					'event_editor_tags_categories_help_tab' => array(
						'title' => __('Event Tags & Categories', 'event_espresso'),
						'filename' => 'event_editor_tags_categories'
					),
					'event_editor_questions_registrants_help_tab' => array(
						'title' => __('Questions for Registrants', 'event_espresso'),
						'filename' => 'event_editor_questions_registrants'
					),
					'event_editor_save_new_event_help_tab' => array(
						'title' => __('Save New Event', 'event_espresso'),
						'filename' => 'event_editor_save_new_event'
					),
					'event_editor_other_help_tab' => array(
						'title' => __('Event Other', 'event_espresso'),
						'filename' => 'event_editor_other'
					)
				),
				'help_tour' => array(
					'Event_Editor_Help_Tour'
					),
				'qtips' => array( 'EE_Event_Editor_Decaf_Tips' ),
				'require_nonce' => FALSE
			),
			'edit' => array(
				'nav' => array(
					'label' => __('Edit Event', 'event_espresso'),
					'order' => 5,
					'persistent' => false,
					'url' => isset($this->_req_data['post']) ? EE_Admin_Page::add_query_args_and_nonce(array('post' => $this->_req_data['post'], 'action' => 'edit'), $this->_current_page_view_url) : $this->_admin_base_url
				),
				'metaboxes' => array('_register_event_editor_meta_boxes'),
				'help_tabs' => array(
					'event_editor_help_tab' => array(
						'title' => __('Event Editor', 'event_espresso'),
						'filename' => 'event_editor'
					),
					'event_editor_title_richtexteditor_help_tab' => array(
						'title' => __('Event Title & Rich Text Editor', 'event_espresso'),
						'filename' => 'event_editor_title_richtexteditor'
					),
					'event_editor_venue_details_help_tab' => array(
						'title' => __('Event Venue Details', 'event_espresso'),
						'filename' => 'event_editor_venue_details'
					),
					'event_editor_event_datetimes_help_tab' => array(
						'title' => __('Event Datetimes', 'event_espresso'),
						'filename' => 'event_editor_event_datetimes'
					),
					'event_editor_event_tickets_help_tab' => array(
						'title' => __('Event Tickets', 'event_espresso'),
						'filename' => 'event_editor_event_tickets'
					),
					'event_editor_event_registration_options_help_tab' => array(
						'title' => __('Event Registration Options', 'event_espresso'),
						'filename' => 'event_editor_event_registration_options'
					),
					'event_editor_tags_categories_help_tab' => array(
						'title' => __('Event Tags & Categories', 'event_espresso'),
						'filename' => 'event_editor_tags_categories'
					),
					'event_editor_questions_registrants_help_tab' => array(
						'title' => __('Questions for Registrants', 'event_espresso'),
						'filename' => 'event_editor_questions_registrants'
					),
					'event_editor_save_new_event_help_tab' => array(
						'title' => __('Save New Event', 'event_espresso'),
						'filename' => 'event_editor_save_new_event'
					),
					'event_editor_other_help_tab' => array(
						'title' => __('Event Other', 'event_espresso'),
						'filename' => 'event_editor_other'
					)
				),
				'help_tour' => array(
					'Event_Edit_Help_Tour'
				),
				'qtips' => array( 'EE_Event_Editor_Decaf_Tips' ),
				'require_nonce' => FALSE
			),
			'default_event_settings' => array(
				'nav' => array(
					'label' => __('Default Settings', 'event_espresso'),
					'order' => 40
				),
				'metaboxes' => array_merge($default_espresso_boxes, array('_publish_post_box')),
				'labels' => array(
					'publishbox' => __('Update Settings', 'event_espresso')
				),
				'help_tabs' => array(
					'default_settings_help_tab' => array(
						'title' => __('Default Event Settings', 'event_espresso'),
						'filename' => 'events_default_settings'
					),
					'default_settings_status_help_tab' => array(
						'title' => __('Default Registration Status', 'event_espresso'),
						'filename' => 'events_default_settings_status'
					)
				),
				'help_tour' => array( 'Event_Default_Settings_Help_Tour'),
				'require_nonce' => FALSE
			),
			//event category stuff
			'add_category' => array(
				'nav' => array(
					'label' => __('Add Category', 'event_espresso'),
					'order' => 15,
					'persistent' => false),
				'help_tabs' => array(
					'add_category_help_tab' => array(
						'title' => __('Add New Event Category', 'event_espresso'),
						'filename' => 'events_add_category'
						)
					),
			'help_tour' => array('Event_Add_Category_Help_Tour'),
				'metaboxes' => array('_publish_post_box'),
				'require_nonce' => FALSE
				),
			'edit_category' => array(
				'nav' => array(
					'label' => __('Edit Category', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['EVT_CAT_ID']) ? add_query_arg(array('EVT_CAT_ID' => $this->_req_data['EVT_CAT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'help_tabs' => array(
					'edit_category_help_tab' => array(
						'title' => __('Edit Event Category', 'event_espresso'),
						'filename' => 'events_edit_category'
						)
					),
				'help_tour' => array('Event_Edit_Category_Help_Tour'),
					'metaboxes' => array('_publish_post_box'),
					'require_nonce' => FALSE
					),
			'category_list' => array(
				'nav' => array(
					'label' => __('Categories', 'event_espresso'),
					'order' => 20
					),
				'list_table' => 'Event_Categories_Admin_List_Table',
				'help_tabs' => array(
					'events_categories_help_tab' => array(
						'title' => __('Event Categories', 'event_espresso'),
						'filename' => 'events_categories'
					),
					'events_categories_table_column_headings_help_tab' => array(
						'title' => __('Event Categories Table Column Headings', 'event_espresso'),
						'filename' => 'events_categories_table_column_headings'
					),
					'events_categories_view_help_tab' => array(
						'title' => __('Event Categories Views', 'event_espresso'),
						'filename' => 'events_categories_views'
					),
					'events_categories_other_help_tab' => array(
						'title' => __('Event Categories Other', 'event_espresso'),
						'filename' => 'events_categories_other'
					)
				),
				'help_tour' => array(
					'Event_Categories_Help_Tour'
					),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				'require_nonce' => FALSE
				),
		);
	}


	protected function _add_screen_options() {
		//todo
	}

	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}

	protected function _add_screen_options_category_list() {
		$page_title = $this->_admin_page_title;
		$this->_admin_page_title = __('Categories', 'event_espresso');
		$this->_per_page_screen_option();
		$this->_admin_page_title = $page_title;
	}

	protected function _add_feature_pointers() {
		//todo
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
		wp_enqueue_style('espresso-ui-theme');
		wp_register_style('event-editor-css', EVENTS_ASSETS_URL . 'event-editor.css', array('ee-admin-css'), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('event-editor-css');

		//scripts
		wp_register_script('event-datetime-metabox', EVENTS_ASSETS_URL . 'event-datetime-metabox.js', array('event_editor_js', 'ee-datepicker'), EVENT_ESPRESSO_VERSION );
		wp_enqueue_script('event-datetime-metabox');

		EE_Registry::$i18n_js_strings['image_confirm'] = __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso');
		wp_localize_script('event_editor_js', 'eei18n', EE_Registry::$i18n_js_strings);
	}



	public function load_scripts_styles_add_category() {
		$this->load_scripts_styles_edit_category();
	}





	public function load_scripts_styles_edit_category() {}



	protected function _set_list_table_views_category_list() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_categories' => __('Delete Permanently', 'event_espresso')
					)
				)
		);
	}



	//nothing needed for events with these methods.
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}




	/**
	 * Call this function to verify if an event is public and has tickets for sale.  If it does, then we need to show a warning (via EE_Error::add_error());
	 *
	 * @param  EE_Event    $event 	Event object
	 * @access public
	 * @return void
	 */
	public function verify_event_edit($event = NULL) {
		// no event?
		if ( empty( $event )) {
			// set event
			$event = $this->_cpt_model_obj;
		}
		// STILL no event?
		if ( empty ( $event )) {
			return;
		}
		// first check if event is active.
		if ( $event->is_expired() || $event->is_inactive() || $event->status() == EEM_Event::cancelled || $event->status() == EEM_Event::postponed ) {
			return;
		}
		$orig_status = $event->status();
		//made it here so it IS active... next check that any of the tickets are sold.
		if ( $event->is_sold_out() || $event->is_sold_out(TRUE ) ) {
			if ( $event->status() !== $orig_status && $orig_status !== EEM_Event::sold_out  ) {
				EE_Error::add_attention( sprintf(
					__( 'Please note that the Event Status has automaticallly been changed to %s because there are no more spaces available for this event.  However, this change is not permanent until you update the event.  You <em>can</em> change the status back to something else before updating if you wish.', 'event_espresso' ),
					EEH_Template::pretty_status( EEM_Event::sold_out, FALSE, 'sentence' )
				));
			}
			return;
		}
		//now we need to determine if the event has any tickets on sale.  If not then we dont' show the error
		if ( ! $event->tickets_on_sale() ) {
			return;
		}
		//made it here so show warning
		EE_Error::add_attention( $this->_edit_event_warning() );
	}




	/**
	 * This is the text used for when an event is being edited that is public and has tickets for sale.
	 * When needed, hook this into a EE_Error::add_error() notice.
	 *
	 * @access protected
	 * @return string
	 */
	protected function _edit_event_warning() {
		return __('Please be advised that this event has been published and is open for registrations on your website. If you update any registration-related details (i.e. custom questions, messages, tickets, datetimes, etc.) while a registration is in process, the registration process could be interrupted and result in errors for the person registering and potentially incorrect registration or transaction data inside Event Espresso. We recommend editing events during a period of slow traffic, or even temporarily changing the status of an event to "Draft" until your edits are complete.', 'event_espresso');
	}




	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('View All Events', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_events' => __('Move to Trash', 'event_espresso')
				)
			),
			'draft' => array(
				'slug' => 'draft',
				'label' => __('Draft', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_events' => __('Move to Trash', 'event_espresso'),
					)
			),
			'trash' => array(
				'slug' => 'trash',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'restore_events' => __('Restore From Trash', 'event_espresso'),
					'delete_events' => __('Delete Permanently', 'event_espresso')
					)
				)
		);
	}



	protected function _event_legend_items() {
		$items = array(
			'view_details' => array(
				'class' => 'dashicons dashicons-search',
				'desc' => __('View Event', 'event_espresso')
			),
			'edit_event' => array(
				'class' => 'ee-icon ee-icon-calendar-edit',
				'desc' => __('Edit Event Details', 'event_espresso')
			),
			'view_attendees' => array(
				'class' => 'dashicons dashicons-groups',
				'desc' => __('View Registrations for Event', 'event_espresso')
			)
		);
		$items  = apply_filters( 'FHEE__Events_Admin_Page___event_legend_items__items', $items );
		$statuses = array(
			'sold_out_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::sold_out,
				'desc' => EEH_Template::pretty_status( EE_Datetime::sold_out, FALSE, 'sentence' )
			),
			'active_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::active,
				'desc' => EEH_Template::pretty_status( EE_Datetime::active, FALSE, 'sentence' )
			),
			'upcoming_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::upcoming,
				'desc' => EEH_Template::pretty_status( EE_Datetime::upcoming, FALSE, 'sentence' )
			),
			'postponed_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::postponed,
				'desc' => EEH_Template::pretty_status( EE_Datetime::postponed, FALSE, 'sentence' )
			),
			'cancelled_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::cancelled,
				'desc' => EEH_Template::pretty_status( EE_Datetime::cancelled, FALSE, 'sentence' )
			),
			'expired_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::expired,
				'desc' => EEH_Template::pretty_status( EE_Datetime::expired, FALSE, 'sentence' )
			),
			'inactive_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::inactive,
				'desc' => EEH_Template::pretty_status( EE_Datetime::inactive, FALSE, 'sentence' )
			)
		);
		$statuses = apply_filters( 'FHEE__Events_Admin_Page__event_legend_items__statuses', $statuses );
		return array_merge( $items, $statuses );
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
			$return .= '<input id="shortcode" type="hidden" value="[ESPRESSO_TICKET_SELECTOR event_id=\'' . $post->ID . '\']"">';
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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_template_args['after_list_table'] = EEH_Template::get_button_or_link( get_post_type_archive_link('espresso_events'), __("View Event Archive Page", "event_espresso"), 'button' ) .
		$this->_display_legend($this->_event_legend_items());
		$this->_admin_page_title .= $this->get_action_link_or_button('create_new', 'add', array(), 'add-new-h2');
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

		$event_values = array(
			'EVT_display_desc' => !empty( $this->_req_data['display_desc'] ) ? 1 : 0,
			'EVT_display_ticket_selector' => !empty( $this->_req_data['display_ticket_selector'] ) ? 1 : 0,
			'EVT_additional_limit' => !empty( $this->_req_data['additional_limit'] ) ? $this->_req_data['additional_limit'] : NULL,
			'EVT_default_registration_status' => !empty( $this->_req_data['EVT_default_registration_status'] ) ? $this->_req_data['EVT_default_registration_status'] : EE_Registry::instance()->CFG->registration->default_STS_ID,
			'EVT_member_only' => !empty( $this->_req_data['member_only'] ) ? 1 : 0,
			'EVT_allow_overflow' => !empty( $this->_req_data['EVT_allow_overflow'] ) ? 1 : 0,
			'EVT_timezone_string' => !empty( $this->_req_data['timezone_string'] ) ? $this->_req_data['timezone_string'] : NULL,
			'EVT_external_URL' => !empty( $this->_req_data['externalURL'] ) ? $this->_req_data['externalURL'] : NULL,
			'EVT_phone' => !empty( $this->_req_data['event_phone'] ) ? $this->_req_data['event_phone'] : NULL
			);

		//update event
		$success = $this->_event_model->update_by_ID( $event_values, $post_id );


		//get event_object for other metaboxes... though it would seem to make sense to just use $this->_event_model->get_one_by_ID( $post_id ).. i have to setup where conditions to override the filters in the model that filter out autodraft and inherit statuses so we GET the inherit id!
		$get_one_where = array( $this->_event_model->primary_key_name() => $post_id, 'status' => $post->post_status );
		$event = $this->_event_model->get_one( array($get_one_where) );


		//the following are default callbacks for event attachment updates that can be overridden by caffeinated functionality and/or addons.
		$event_update_callbacks = apply_filters( 'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks', array( array($this, '_default_venue_update' ), array( $this, '_default_tickets_update') ) );

		$att_success = TRUE;

		foreach ( $event_update_callbacks as $e_callback ) {
			$_succ = call_user_func_array( $e_callback, array( $event,  $this->_req_data ) );
			$att_success = !$att_success ? $att_success : $_succ; //if ANY of these updates fail then we want the appropriate global error message
		}

		//any errors?
		if ( $success && FALSE === $att_success ) {
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
		$venue_model = EE_Registry::instance()->load_model('Venue');
		$rows_affected = NULL;
		$venue_id = !empty( $data['venue_id'] ) ? $data['venue_id'] : NULL;

		//very important.  If we don't have a venue name then we'll get out because not necessary to create empty venue
		if ( empty( $data['venue_title'] ) )
			return;

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
		$success = TRUE;
		foreach ( $data['edit_event_datetimes'] as $row => $dtt ) {
			$dtt['DTT_EVT_end'] = isset($dtt['DTT_EVT_end']) && ! empty( $dtt['DTT_EVT_end'] ) ? $dtt['DTT_EVT_end'] : $dtt['DTT_EVT_start'];
			$datetime_values = array(
				'DTT_ID' => !empty( $dtt['DTT_ID'] ) ? $dtt['DTT_ID'] : NULL,
				'DTT_EVT_start' => $dtt['DTT_EVT_start'],
				'DTT_EVT_end' => $dtt['DTT_EVT_end'],
				'DTT_reg_limit' => empty( $dtt['DTT_reg_limit'] ) ? INF : $dtt['DTT_reg_limit'],
				'DTT_order' => $row,
				);

			//if we have an id then let's get existing object first and then set the new values.  Otherwise we instantiate a new object for save.

			if ( !empty( $dtt['DTT_ID'] ) ) {
				$DTM = EE_Registry::instance()->load_model('Datetime')->get_one_by_ID($dtt['DTT_ID'] );
				foreach ( $datetime_values as $field => $value ) {
					$DTM->set( $field, $value );
				}

				$DTM->save();
				//make sure the $dtt_id here is saved just in case after the add_relation_to() the autosave replaces it.  We need to do this so we dont' TRASH the parent DTT.
				$saved_dtts[$DTM->ID()] = $DTM;
			} else {
				$DTM = EE_Registry::instance()->load_class('Datetime', array( $datetime_values ), FALSE, FALSE );
			}

			$DTT = $evtobj->_add_relation_to( $DTM, 'Datetime' );

			//load DTT helper
			EE_Registry::instance()->load_helper('DTT_Helper');

			//before going any further make sure our dates are setup correctly so that the end date is always equal or greater than the start date.
			if( $DTT->get_raw('DTT_EVT_start') > $DTT->get_raw('DTT_EVT_end') ) {
				$DTT->set('DTT_EVT_end', $DTT->get('DTT_EVT_start') );
				$DTT = EEH_DTT_Helper::date_time_add($DTT, 'DTT_EVT_end', 'days');
				$DTT->save();
			}

			//now we got to make sure we add the new DTT_ID to the $saved_dtts array  because it is possible there was a new one created for the autosave.
			$saved_dtt = $DTT;

			$success = !$success ? $success : $DTT; //if ANY of these updates fail then we want the appropriate global error message. //todod this is actually sucky we need a better error message but this is what it is for now.
		}

		//no dtts get deleted so we don't do any of that logic here.
		//update tickets next
		$old_tickets = isset( $data['ticket_IDs'] ) ? explode(',', $data['ticket_IDs'] ) : array();
		$update_prices = false;
		foreach ( $data['edit_tickets'] as $row => $tkt ) {

			$ticket_price = isset( $data['edit_prices'][$row][1]['PRC_amount'] ) ? $data['edit_prices'][$row][1]['PRC_amount'] : 0;

			$TKT_values = array(
				'TKT_ID' => !empty( $tkt['TKT_ID'] ) ? $tkt['TKT_ID'] : NULL,
				'TTM_ID' => !empty( $tkt['TTM_ID'] ) ? $tkt['TTM_ID'] : 0,
				'TKT_name' => !empty( $tkt['TKT_name'] ) ? $tkt['TKT_name'] : '',
				'TKT_description' => !empty( $tkt['TKT_description'] ) ? $tkt['TKT_description'] : '',
				'TKT_start_date' => isset( $tkt['TKT_start_date'] ) ? $tkt['TKT_start_date'] : current_time('mysql'),
				'TKT_end_date' => isset( $tkt['TKT_end_date'] ) ? $tkt['TKT_end_date'] : current_time('mysql'),
				'TKT_qty' => empty( $tkt['TKT_qty'] ) ? INF : $tkt['TKT_qty'],
				'TKT_uses' => empty( $tkt['TKT_uses'] ) ? INF : $tkt['TKT_uses'],
				'TKT_min' => empty( $tkt['TKT_min'] ) ? 0 : $tkt['TKT_min'],
				'TKT_max' => empty( $tkt['TKT_max'] ) ? INF : $tkt['TKT_max'],
				'TKT_row' => $row,
				'TKT_order' => isset( $tkt['TKT_order'] ) ? $tkt['TKT_order'] : 0,
				'TKT_price' => $ticket_price
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
				$TKT = EE_Registry::instance()->load_model( 'Ticket')->get_one_by_ID( $tkt['TKT_ID'] );


				$ticket_sold = $TKT->count_related('Registration') > 0 ? true : false;

				//let's just check the total price for the existing ticket and determine if it matches the new total price.  if they are different then we create a new ticket (if tkts sold) if they aren't different then we go ahead and modify existing ticket.
				$create_new_TKT = $ticket_sold && $ticket_price !== $TKT->get('TKT_price') && !$TKT->get('TKT_deleted') ? TRUE : FALSE;

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

				//make sure price is set if it hasn't been already
				$TKT->set( 'TKT_price', $ticket_price );

			} else {
				//no TKT_id so a new TKT
				$TKT_values['TKT_price'] = $ticket_price;
				$TKT = EE_Registry::instance()->load_class('Ticket', array( $TKT_values ), FALSE, FALSE );
				$update_prices = TRUE;
			}

			//update ticket.
			$TKT->save();

			//before going any further make sure our dates are setup correctly so that the end date is always equal or greater than the start date.
			if( $TKT->get_raw('TKT_start_date') > $TKT->get_raw('TKT_end_date') ) {
				$TKT->set('TKT_end_date', $TKT->get('TKT_start_date') );
				EE_Registry::instance()->load_helper('DTT_Helper');
				$TKT = EEH_DTT_Helper::date_time_add($TKT, 'TKT_end_date', 'days');
				$TKT->save();
			}

			//initially let's add the ticket to the dtt
			$saved_dtt->_add_relation_to( $TKT, 'Ticket' );

			$saved_tickets[$TKT->ID()] = $TKT;

			//add prices to ticket
			$this->_add_prices_to_ticket( $data['edit_prices'][$row], $TKT, $update_prices );
		}
		//however now we need to handle permanantly deleting tickets via the ui.  Keep in mind that the ui does not allow deleting/archiving tickets that have ticket sold.  However, it does allow for deleting tickets that have no tickets sold, in which case we want to get rid of permanantely because there is no need to save in db.
		$old_tickets = isset( $old_tickets[0] ) && $old_tickets[0] == '' ? array() : $old_tickets;
		$tickets_removed = array_diff( $old_tickets, array_keys( $saved_tickets ) );

		foreach ( $tickets_removed as $id ) {
			$id = absint( $id );

			//get the ticket for this id
			$tkt_to_remove = EE_Registry::instance()->load_model('Ticket')->get_one_by_ID($id);

			//need to get all the related datetimes on this ticket and remove from every single one of them (remember this process can ONLY kick off if there are NO tkts_sold)
			$dtts = $tkt_to_remove->get_many_related('Datetime');

			foreach( $dtts as $dtt ) {
				$tkt_to_remove->_remove_relation_to($dtt, 'Datetime');
			}

			//need to do the same for prices (except these prices can also be deleted because again, tickets can only be trashed if they don't have any TKTs sold (otherwise they are just archived))
			$tkt_to_remove->delete_related_permanently('Price');


			//finally let's delete this ticket (which should not be blocked at this point b/c we've removed all our relationships)
			$tkt_to_remove->delete_permanently();
		}/**/
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
				'PRC_is_default' => 0, //make sure prices are NOT set as default from this context
				'PRC_order' => $row
				);

			if ( $new_prices || empty( $PRC_values['PRC_ID'] ) ) {
				$PRC_values['PRC_ID'] = 0;
				$PRC = EE_Registry::instance()->load_class('Price', array( $PRC_values ), FALSE, FALSE);
			} else {
				$PRC = EE_Registry::instance()->load_model( 'Price' )->get_one_by_ID( $prc['PRC_ID'] );
				//update this price with new values
				foreach ( $PRC_values as $field => $newprc ) {
					$PRC->set( $field, $newprc );
				}
				$PRC->save();
			}

			$PRC = $ticket->_add_relation_to( $PRC, 'Price' );
		}
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
		if ( $do_venue_autosaves = apply_filters( 'FHEE__Events_Admin_Page__ee_autosave_edit_do_decaf_venue_save', TRUE ) ) {
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
	 * 	_generate_publish_box_extra_content
	 * 	@access private
	 * @return void
	 */
	private function _generate_publish_box_extra_content() {

		//load formatter helper
  		EE_Registry::instance()->load_helper( 'Formatter' );

  		//args for getting related registrations
  		$approved_query_args = array( array( 'REG_deleted' => 0, 'STS_ID' => EEM_Registration::status_id_approved ) );
  		$not_approved_query_args = array( array( 'REG_deleted' => 0, 'STS_ID' => EEM_Registration::status_id_not_approved ) );
  		$pending_payment_query_args = array( array( 'REG_deleted' => 0, 'STS_ID' => EEM_Registration::status_id_pending_payment ) );


		// publish box
		$publish_box_extra_args['view_approved_reg_url'] = add_query_arg(array('action' => 'default', 'event_id' => $this->_cpt_model_obj->ID(), '_reg_status' => EEM_Registration::status_id_approved ), REG_ADMIN_URL);
		$publish_box_extra_args['view_not_approved_reg_url'] = add_query_arg(array('action' => 'default', 'event_id' => $this->_cpt_model_obj->ID(), '_reg_status' => EEM_Registration::status_id_not_approved ), REG_ADMIN_URL);
		$publish_box_extra_args['view_pending_payment_reg_url'] = add_query_arg(array('action' => 'default', 'event_id' => $this->_cpt_model_obj->ID(), '_reg_status' => EEM_Registration::status_id_pending_payment ), REG_ADMIN_URL);
		$publish_box_extra_args['approved_regs'] = $this->_cpt_model_obj->count_related('Registration', $approved_query_args);
		$publish_box_extra_args['not_approved_regs'] = $this->_cpt_model_obj->count_related('Registration', $not_approved_query_args);
		$publish_box_extra_args['pending_payment_regs'] = $this->_cpt_model_obj->count_related('Registration', $pending_payment_query_args);
		$publish_box_extra_args['misc_pub_section_class'] = apply_filters( 'FHEE_Events_Admin_Page___generate_publish_box_extra_content__misc_pub_section_class', 'misc-pub-section');
		//$publish_box_extra_args['email_attendees_url'] = add_query_arg(array('event_admin_reports' => 'event_newsletter', 'event_id' => $this->_cpt_model_obj->id), 'admin.php?page=espresso_registrations');
		$publish_box_extra_args['event_editor_overview_add'] = do_action( 'AHEE__Events_Admin_Page___generate_publish_box_extra_content__event_editor_overview_add', $this->_cpt_model_obj );
		// load template
		EEH_Template::display_template( EVENTS_TEMPLATE_PATH . 'event_publish_box_extras.template.php', $publish_box_extra_args );
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
		$this->verify_cpt_object();
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
			'ticket_js_structure' => '',
			'trash_icon' => 'ee-lock-icon',
			'disabled' => ''
			);

		$event_id = is_object( $this->_cpt_model_obj ) ? $this->_cpt_model_obj->ID() : NULL;

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		/**
		 * 1. Start with retrieving Datetimes
		 * 2. Fore each datetime get related tickets
		 * 3. For each ticket get related prices
		 */
		$times = EE_Registry::instance()->load_model('Datetime' )->get_all_event_dates( $event_id );
		EE_Registry::instance()->load_helper('DTT_Helper' );

		$firstdtt = array_slice($times, 0, 1);
		//do we get related tickets?
		if ( $firstdtt[0]->get('DTT_ID') !== 0 ) {
			foreach ( $times as $time ) {
				$existing_datetime_ids[] = $time->get('DTT_ID');
				$template_args['time'] = $time;
				$related_tickets = $time->get_many_related('Ticket', array( array( 'OR' => array( 'TKT_deleted' => 1, 'TKT_deleted*' => 0 ) ), 'default_where_conditions' => 'none' ) );

				if ( !empty($related_tickets) ) {
					$template_args['total_ticket_rows'] = count($related_tickets);
					$row = 0;
					foreach ( $related_tickets as $ticket ) {
						$existing_ticket_ids[] = $ticket->get('TKT_ID');
						$template_args['ticket_rows'] .= $this->_get_ticket_row($ticket, FALSE, $row );

						$row++;
					}
				} else {
					$template_args['total_ticket_rows'] = 1;
					$ticket = EE_Registry::instance()->load_model('Ticket')->create_default_object();
					$template_args['ticket_rows'] .= $this->_get_ticket_row( $ticket );
				}
			}
		} else {
			$template_args['time'] = $times[0];
			$ticket = EE_Registry::instance()->load_model('Ticket')->get_all_default_tickets();
			$template_args['ticket_rows'] .= $this->_get_ticket_row( $ticket[1] ); //note we're just sending the first default row (decaf can't manage default tickets so this should be sufficent);
		}

		$template_args['event_datetime_help_link'] = $this->_get_help_tab_link('event_editor_event_datetimes_help_tab');
		$template_args['ticket_options_help_link'] = $this->_get_help_tab_link('ticket_options_info');
		$template_args['existing_datetime_ids'] = implode(',', $existing_datetime_ids);
		$template_args['existing_ticket_ids'] = implode(',', $existing_ticket_ids);
		$template_args['ticket_js_structure'] = $this->_get_ticket_row( EE_Registry::instance()->load_model('Ticket')->create_default_object(), TRUE );
		$template = apply_filters( 'FHEE__Events_Admin_Page__ticket_metabox__template', EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_main.template.php' );
		EEH_Template::display_template($template, $template_args);
	}



	/**
	 * Setup an individual ticket form for the decaf event editor page
	 *
	 * @access private
	 * @param  EE_Ticket  $ticket   the ticket object
	 * @param  boolean    $skeleton whether we're generating a skeleton for js manipulation
	 * @return string               generated html for the ticket row.
	 */
	private function _get_ticket_row( $ticket, $skeleton = FALSE, $row = 0 ) {
		$template_args = array(
			'tkt_status_class' => ' tkt-status-' . $ticket->ticket_status(),
			'tkt_archive_class' => $ticket->ticket_status() === EE_Ticket::archived && !$skeleton ? ' tkt-archived' : '',
			'ticketrow' => $skeleton ? 'TICKETNUM' : $row,
			'TKT_ID' => $ticket->get('TKT_ID'),
			'TKT_name' => $ticket->get('TKT_name'),
			'TKT_start_date' => $skeleton ? '' : $ticket->get_date('TKT_start_date', 'Y-m-d h:i a'),
			'TKT_end_date' => $skeleton ? '' : $ticket->get_date('TKT_end_date', 'Y-m-d h:i a'),
			'TKT_is_default' => $ticket->get('TKT_is_default'),
			'TKT_qty' => $ticket->get_pretty('TKT_qty','input'),
			'edit_ticketrow_name' => $skeleton ? 'TICKETNAMEATTR' : 'edit_tickets',
			'TKT_sold' => $skeleton ? 0 : $ticket->get('TKT_sold'),
			'trash_icon' => ( $skeleton || ( !empty( $ticket ) && ! $ticket->get('TKT_deleted') ) ) && ( !empty( $ticket ) && $ticket->get('TKT_sold') === 0 ) ? 'trash-icon dashicons dashicons-post-trash clickable' : 'ee-lock-icon',
			'disabled' => $skeleton || ( !empty( $ticket ) && ! $ticket->get('TKT_deleted' ) ) ? '' : ' disabled=disabled'
			);

		$price = $ticket->ID() !== 0 ? $ticket->get_first_related('Price', array('default_where_conditions' => 'none')) : EE_Registry::instance()->load_model('Price')->create_default_object();


		$price_args = array(
			'price_currency_symbol' => EE_Registry::instance()->CFG->currency->sign,
			'PRC_amount' => $price->get('PRC_amount'),
			'PRT_ID' => $price->get('PRT_ID'),
			'PRC_ID' => $price->get('PRC_ID'),
			'PRC_is_default' => $price->get('PRC_is_default'),
			);

		//make sure we have default start and end dates if skeleton
		//handle rows that should NOT be empty
		if ( empty( $template_args['TKT_start_date'] ) ) {
			//if empty then the start date will be now.
			$template_args['TKT_start_date'] = date('Y-m-d h:i a', current_time('timestamp'));
		}

		if ( empty( $template_args['TKT_end_date'] ) ) {
			//get the earliest datetime (if present);
			$earliest_dtt = $this->_cpt_model_obj->ID() > 0 ? $this->_cpt_model_obj->get_first_related('Datetime', array('order_by'=> array('DTT_EVT_start' => 'ASC' ) ) ) : NULL;

			if ( !empty( $earliest_dtt ) )
				$template_args['TKT_end_date'] = $earliest_dtt->get_datetime('DTT_EVT_start', 'Y-m-d', 'h:i a');
			else
				$template_args['TKT_end_date'] = date('Y-m-d h:i a', mktime(0, 0, 0, date("m"), date("d")+7, date("Y") ) );
		}

		$template_args = array_merge( $template_args, $price_args );
		$template = apply_filters( 'FHEE__Events_Admin_Page__get_ticket_row__template', EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_ticket_row.template.php', $ticket);
		return EEH_Template::display_template($template, $template_args, TRUE);
	}



	public function registration_options_meta_box() {

		$yes_no_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);

		$default_reg_status_values = EEM_Registration::reg_status_array(array(EEM_Registration::status_id_cancelled, EEM_Registration::status_id_declined), TRUE);

		//$template_args['is_active_select'] = EEH_Form_Fields::select_input('is_active', $yes_no_values, $this->_cpt_model_obj->is_active());
		$template_args['_event'] = $this->_cpt_model_obj;
		$template_args['active_status'] = $this->_cpt_model_obj->pretty_active_status(FALSE);
		$template_args['additional_limit'] = $this->_cpt_model_obj->additional_limit();
		$template_args['default_registration_status'] = EEH_Form_Fields::select_input('default_reg_status', $default_reg_status_values, $this->_cpt_model_obj->default_registration_status());
		$template_args['display_description'] = EEH_Form_Fields::select_input('display_desc', $yes_no_values, $this->_cpt_model_obj->display_description());
		$template_args['display_ticket_selector'] = EEH_Form_Fields::select_input('display_ticket_selector', $yes_no_values, $this->_cpt_model_obj->display_ticket_selector(), '', '', false);
		$template_args['additional_registration_options'] = apply_filters( 'FHEE__Events_Admin_Page__registration_options_meta_box__additional_registration_options', '', $template_args, $yes_no_values, $default_reg_status_values );
		$templatepath = EVENTS_TEMPLATE_PATH . 'event_registration_options.template.php';
		EEH_Template::display_template($templatepath, $template_args);
	}



	/**
	 * decaf venue metabox
	 * @return string form for Event Venue
	 */
	public function venue_metabox() {

		//first let's see if we have a venue already
		$event_id = $this->_cpt_model_obj->ID();
		$venue = !empty( $event_id ) ? $this->_cpt_model_obj->venues() : NULL;
		$venue = empty( $venue ) ? EE_Registry::instance()->load_model('Venue')->create_default_object() : array_shift( $venue );
		$template_args['_venue'] = $venue;

		$template_args['states_dropdown'] = EEH_Form_Fields::generate_form_input(
			$QFI = new EE_Question_Form_Input(
				EE_Question::new_instance( array( 'QST_display_text' => 'State', 'QST_system' => 'state' )),
				EE_Answer::new_instance( array(  'ANS_value'=> $venue->state_ID() )),
				array(
					'input_name' =>  'state',
					'input_id' => 'phys-state',
					'input_class' => '',
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			)
		);
		$template_args['countries_dropdown'] = EEH_Form_Fields::generate_form_input(
			$QFI = new EE_Question_Form_Input(
				EE_Question::new_instance( array( 'QST_display_text' => 'Country', 'QST_system' => 'country' )),
				EE_Answer::new_instance( array(  'ANS_value'=> $venue->country_ID() )),
				array(
					'input_name' =>  'countries',
					'input_id' => 'phys-country',
					'input_class' => '',
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			)
		);

		$template_path = EVENTS_TEMPLATE_PATH . 'event_venues_metabox_content.template.php';
		EEH_Template::display_template( $template_path, $template_args );
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

		$EEME = $this->_event_model;

		$offset = ($current_page - 1) * $per_page;
		$limit = $count ? NULL : $offset . ',' . $per_page;
		$orderby = isset($this->_req_data['orderby']) ? $this->_req_data['orderby'] : 'EVT_ID';
		$order = isset($this->_req_data['order']) ? $this->_req_data['order'] : "DESC";

		$where = array(
				//todo add event categories
		);

		$status = isset( $this->_req_data['status'] ) ? $this->_req_data['status'] : NULL;
		//determine what post_status our condition will have for the query.
		switch ( $status ) {
			case NULL :
			case 'all' :
				break;

			case 'draft' :
				$where['status'] = array( 'IN', array('draft', 'auto-draft') );
				break;

			default :
				$where['status'] = $status;
		}

		//search query handling
		if ( isset( $this->_req_data['s'] ) ) {
			$search_string = '%' . $this->_req_data['s'] . '%';
			$where['OR'] = array(
				'EVT_name' => array('LIKE', $search_string),
				'EVT_desc' => array('LIKE', $search_string),
				'EVT_short_desc' => array('LIKE', $search_string)
				);
		}

		$where = apply_filters( 'FHEE__Events_Admin_Page__get_events__where', $where, $this->_req_data );
		$query_params = apply_filters( 'FHEE__Events_Admin_Page__get_events__query_params', array($where, 'limit' => $limit, 'order_by' => $orderby, 'order' => $order, 'group_by' => 'EVT_ID' ), $this->_req_data );

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
				$msg = __('An error occurred. The event could not be moved to the trash because a valid event status was not not supplied.', 'event_espresso');
				EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			}
		} else {
			$success = FALSE;
			$msg = __('An error occurred. The event could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso');
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
					$msg = sprintf(__('An error occurred. Event #%d could not be moved to the trash because a valid event ID was not not supplied.', 'event_espresso'), $EVT_ID);
					EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
					$success = FALSE;
				}
			}
		} else {
			$success = FALSE;
			$msg = __('An error occurred. The event could not be moved to the trash because a valid event status was not not supplied.', 'event_espresso');
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
			$msg = __('An error occurred. No Event ID or an invalid Event ID was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}

		$this->_cpt_model_obj = EEM_Event::instance()->get_one_by_ID( $EVT_ID );

		// clean status
		$event_status = sanitize_key($event_status);
		// grab status
		if (empty($event_status)) {
			$msg = __('An error occurred. No Event Status or an invalid Event Status was received.', 'event_espresso');
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
			$msg = sprintf(__('An error occurred. The event could not be %s.', 'event_espresso'), $action);
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
		$EVT_ID = isset( $this->_req_data['post'] ) ? absint( $this->_req_data['post'] ) : $EVT_ID;


		// loop thru events
		if ($EVT_ID) {
			$success = $this->_permanently_delete_event( $EVT_ID );
			// get list of events with no prices
			$espresso_no_ticket_prices = get_option('ee_no_ticket_prices', array());
			// remove this event from the list of events with no prices
			if (isset($espresso_no_ticket_prices[$EVT_ID])) {
				unset($espresso_no_ticket_prices[$EVT_ID]);
			}
			update_option('ee_no_ticket_prices', $espresso_no_ticket_prices);
		} else {
			$success = FALSE;
			$msg = __('An error occurred. An event could not be deleted because a valid event ID was not not supplied.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}

		if ( $redirect_after )
			$this->_redirect_after_action($success, 'Event', 'deleted', array('action' => 'default', 'status' => 'trash'));
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
		$espresso_no_ticket_prices = get_option('ee_no_ticket_prices', array());
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
				$msg = __('An error occurred. An event could not be deleted because a valid event ID was not not supplied.', 'event_espresso');
				EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			}
		}
		update_option('ee_no_ticket_prices', $espresso_no_ticket_prices);
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
			$msg = __('An error occurred. No Event ID or an invalid Event ID was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}


		$this->_cpt_model_obj = EEM_Event::instance()->get_one_by_ID($EVT_ID);

		//need to delete related tickets and prices first.
		$datetimes = $this->_cpt_model_obj->get_many_related('Datetime');
		foreach ( $datetimes as $datetime ) {
			$this->_cpt_model_obj->_remove_relation_to($datetime, 'Datetime');
			$tickets = $datetime->get_many_related('Ticket');
			foreach ( $tickets as $ticket ) {
				$ticket->_remove_relation_to($datetime, 'Datetime');
				$ticket->delete_related_permanently('Price');
				$ticket->delete_permanently();
			}
			$datetime->delete();
		}

		//what about related venues or terms?
		$venues = $this->_cpt_model_obj->get_many_related('Venue');
		foreach ( $venues as $venue ) {
			$this->_cpt_model_obj->_remove_relation_to($venue, 'Venue');
		}

		//any attached question groups?
		$question_groups = $this->_cpt_model_obj->get_many_related('Question_Group');
		if ( !empty( $question_groups ) ) {
			foreach ( $question_groups as $question_group ) {
				$this->_cpt_model_obj->_remove_relation_to($question_group, 'Question_Group');
			}
		}




		//Message Template Groups
		$this->_cpt_model_obj->_remove_relations( 'Message_Template_Group' );


		//term taxonomies
		$term_taxonomies = $this->_cpt_model_obj->term_taxonomies();

		foreach ( $term_taxonomies as $term_taxonomy ) {
			$this->_cpt_model_obj->remove_relation_to_term_taxonomy($term_taxonomy);
		}

		$success = $this->_cpt_model_obj->delete_permanently();
		// did it all go as planned ?
		if ($success) {
			$msg = sprintf(__('Event ID # %d has been deleted.', 'event_espresso'), $EVT_ID);
			EE_Error::add_success($msg);
		} else {
			$msg = sprintf(__('An error occurred. Event ID # %d could not be deleted.', 'event_espresso'), $EVT_ID);
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		do_action( 'AHEE__Events_Admin_Page___permanently_delete_event__after_event_deleted' );
		return TRUE;
	}






	/**
	 * get total number of events
	 *
	 * @access public
	 * @return int
	 */
	public function total_events() {

		$count = EEM_Event::instance()->count( array(), 'EVT_ID' );
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

		$this->_template_args['values'] = $this->_yes_no_values;

		$this->_template_args['reg_status_array'] = EEM_Registration::reg_status_array(array(EEM_Registration::status_id_cancelled, EEM_Registration::status_id_declined), TRUE);
		$this->_template_args['default_reg_status'] = isset( EE_Registry::instance()->CFG->registration->default_STS_ID ) ? sanitize_text_field( EE_Registry::instance()->CFG->registration->default_STS_ID ) : EEM_Registration::status_id_pending_payment;

		$this->_set_add_edit_form_tags('update_default_event_settings');
		$this->_set_publish_post_box_vars(NULL, FALSE, FALSE, NULL, FALSE);
		$this->_template_args['admin_page_content'] = EEH_Template::display_template(EVENTS_TEMPLATE_PATH . 'event_settings.template.php', $this->_template_args, TRUE);
		$this->display_admin_page_with_sidebar();
	}

	/**
	 * 		_update_default_event_settings
	 * 		@access protected
	 * 		@return array
	 */
	protected function _update_default_event_settings() {

		EE_Config::instance()->registration->default_STS_ID = isset($this->_req_data['default_reg_status']) ? sanitize_text_field($this->_req_data['default_reg_status']) : EEM_Registration::status_id_pending_payment;

		$what = 'Default Event Settings';
		$success = $this->_update_espresso_configuration($what, EE_Config::instance(), __FILE__, __FUNCTION__, __LINE__);
		$this->_redirect_after_action($success, $what, 'updated', array('action' => 'default_event_settings'));
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
			$this->_category->parent = $term->parent;
		}
	}




	private function _set_empty_category_object() {
		$this->_category = new stdClass();
		$this->_category->category_name = $this->_category->category_identifier = $this->_category->category_desc  = '';
		$this->_category->id = $this->_category->parent = 0;
	}


	protected function _category_list_table() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_search_btn_label = __('Categories', 'event_espresso');
		$this->_admin_page_title .= $this->get_action_link_or_button('add_category', 'add_category', array(), 'add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}


	protected function _category_details($view) {

		//load formatter helper
		EE_Registry::instance()->load_helper( 'Formatter' );
		//load field generator helper
		EE_Registry::instance()->load_helper( 'Form_Fields' );

		$route = $view == 'edit' ? 'update_category' : 'insert_category';
		$this->_set_add_edit_form_tags($route);

		$this->_set_category_object();
		$id = !empty($this->_category->id) ? $this->_category->id : '';

		$delete_action = 'delete_category';

		//custom redirect
		$redirect = EE_Admin_Page::add_query_args_and_nonce( array('action' => 'category_list'), $this->_admin_base_url );

		$this->_set_publish_post_box_vars( 'EVT_CAT_ID', $id, $delete_action, $redirect );

		//take care of contents
		$this->_template_args['admin_page_content'] = $this->_category_details_content();
		$this->display_admin_page_with_sidebar();
	}



	protected function _category_details_content() {
		$editor_args['category_desc'] = array(
			'type' => 'wp_editor',
			'value' => EEH_Formatter::admin_format_content($this->_category->category_desc),
			'class' => 'my_editor_custom',
			'wpeditor_args' => array('media_buttons' => FALSE )
		);
		$_wp_editor = $this->_generate_admin_form_fields( $editor_args, 'array' );

		$all_terms = get_terms( array('espresso_event_categories' ), array( 'hide_empty' => 0, 'exclude' => array( $this->_category->id ) ) );

		//setup category select for term parents.
		$category_select_values[] = array(
			'text' => __('No Parent', 'event_espresso'),
			'id' => 0
			);
		foreach ( $all_terms as $term ) {
			$category_select_values[] = array(
				'text' => $term->name,
				'id' => $term->term_id
				);
		}

		$category_select = EEH_Form_Fields::select_input( 'category_parent', $category_select_values, $this->_category->parent );

		$template_args = array(
			'category' => $this->_category,
			'category_select' => $category_select,
			'unique_id_info_help_link' => $this->_get_help_tab_link('unique_id_info'),
			'category_desc_editor' =>  $_wp_editor['category_desc']['field'],
			'disable' => '',
			'disabled_message' => FALSE
			);
		$template = EVENTS_TEMPLATE_PATH . 'event_category_details.template.php';
		return EEH_Template::display_template($template, $template_args, TRUE );
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
		$this->_redirect_after_action( $success, '','', $query_args, TRUE );

	}



	private function _insert_category( $update = FALSE ) {
		$cat_id = $update ? $this->_req_data['EVT_CAT_ID'] : '';
		$category_name= isset( $this->_req_data['category_name'] ) ? $this->_req_data['category_name'] : '';
		$category_desc= isset( $this->_req_data['category_desc'] ) ? $this->_req_data['category_desc'] : '';
		$category_parent = isset( $this->_req_data['category_parent'] ) ? $this->_req_data['category_parent'] : 0;

		$term_args=array(
			'name'=>$category_name,
			'description'=>$category_desc,
			'parent'=>$category_parent
		);
		//was the category_identifier input disabled?
		if(isset($this->_req_data['category_identifier'])){
			$term_args['slug'] = $this->_req_data['category_identifier'];
		}
		$insert_ids = $update ? wp_update_term( $cat_id, 'espresso_event_categories', $term_args ) :wp_insert_term( $category_name, 'espresso_event_categories', $term_args );

		if ( !is_array( $insert_ids ) ) {
			$msg = __( 'An error occurred and the category has not been saved to the database.', 'event_espresso', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		} else {
			$cat_id = $insert_ids['term_id'];
			$msg = sprintf ( __('The category %s was successfuly saved', 'event_espresso'), $category_name );
			EE_Error::add_success( $msg );
		}

		return $cat_id;
	}




	public function get_categories( $per_page = 10, $current_page = 1, $count = FALSE ) {
		global $wpdb;

		//testing term stuff
		$orderby = isset( $this->_req_data['orderby'] ) ? $this->_req_data['orderby'] : 'Term.term_id';
		$order = isset( $this->_req_data['order'] ) ? $this->_req_data['order'] : 'DESC';
		$limit = ($current_page-1)*$per_page;

		$where = array( 'taxonomy' => 'espresso_event_categories' );

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$where['OR'] = array(
				'Term.name' => array( 'LIKE', $sstr),
				'description' => array( 'LIKE', $sstr )
				);
		}

		$query_params = array(
			$where ,
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
