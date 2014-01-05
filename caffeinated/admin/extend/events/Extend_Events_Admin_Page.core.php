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
 * Extend_Events_Admin_Page
 *
 * This is the Events Caffeinated admin page.
 *
 *
 * @package		Extend_Events_Admin_Page
 * @subpackage	includes/core/admin/Extend_Events_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Events_Admin_Page extends Events_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'EVENTS_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'events/templates/');
		define( 'EVENTS_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'events/assets/');
		define( 'EVENTS_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'events/assets/');
	}


	protected function _extend_page_config() {

		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'events';
		$default_espresso_boxes = $this->_default_espresso_metaboxes;


		$new_page_routes = array(
			'ticket_list_table' => '_tickets_overview_list_table',
			'trash_ticket' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE,
				'args' => array( 'trash' => TRUE )
				),
			'trash_tickets' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE,
				'args' => array( 'trash' => TRUE )
				),
			'restore_ticket' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE
				),
			'restore_tickets' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE
				),
			'delete_ticket' => array(
				'func' => '_delete_ticket',
				'noheader' => TRUE
				),
			'delete_tickets' => array(
				'func' => '_delete_ticket',
				'noheader' => TRUE
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
			'export_events' => array(
				'func' => '_events_export',
				'noheader' => true
			),
			'export_categories' => array(
				'func' => '_categories_export',
				'noheader' => TRUE
				),
			'sample_export_file'=>array(
				'func'=>'_sample_export_file',
				'noheader'=>TRUE
				)
			);

		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );


		//partial route/config override
		$this->_page_config['import_events']['metaboxes'] = $this->_default_espresso_metaboxes;
		$this->_page_config['create_new']['metaboxes'][] = '_premium_event_editor_meta_boxes';
		$this->_page_config['create_new']['qtips'] = array(
					'EE_Event_Editor_Tips'
					);
		$this->_page_config['edit']['qtips'] = array( 
			'EE_Event_Editor_Tips'
			);
		$this->_page_config['edit']['metaboxes'][] = '_premium_event_editor_meta_boxes';

		//add tickets tab but only if there are more than one default ticket!
		$tkt_count = EEM_Ticket::instance()->count_deleted_and_undeleted(array( array('TKT_is_default' => 1 ) ), 'TKT_ID', TRUE );
		if ( $tkt_count > 1 ) {
			$new_page_config = array(
				'ticket_list_table' => array(
					'nav' => array(
						'label' => __('Default Tickets', 'event_espresso'),
						'order' => 60
						),
					'list_table' => 'Tickets_List_Table',
					'require_nonce' => FALSE
					)
				);
		}

		$new_page_config['import_page'] = array(
				'nav' => array(
					'label' => __('Import', 'event_espresso'),
					'order' => 30
				),
				'help_tabs' => array(
					'import_help_tab' => array(
						'title' => __('Import', 'event_espresso'),
						'filename' => 'events_import'
						)
					),
                'help_tour' => array('Event_Import_Help_Tour'),
				'metaboxes' => $default_espresso_boxes,
				'require_nonce' => FALSE
		);
		$this->_page_config = array_merge( $this->_page_config, $new_page_config );

		//add filters and actions
		//modifying _views
		add_filter('FHEE_event_datetime_metabox_add_additional_date_time_template', array( $this, 'add_additional_datetime_button' ), 10, 2 );
		add_filter('FHEE_event_datetime_metabox_clone_button_template', array( $this, 'add_datetime_clone_button' ), 10, 2 );
		add_filter('FHEE_event_datetime_metabox_timezones_template', array( $this, 'datetime_timezones_template'), 10, 2 );


		//filters for event list table
		add_filter('FHEE__Events_Admin_List_Table__filters', array( $this, 'list_table_filters'), 10, 2);
		add_filter('FHEE_list_table_events_actions_column_action_links', array( $this, 'extra_list_table_actions'), 10, 2 );

	}



	protected function _add_screen_options_ticket_list_table() {
		$this->_per_page_screen_option();
	}




	public function _set_list_table_views_ticket_list_table() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_tickets' => __('Move to Trash', 'event_espresso')
					)
				),
			'trashed' => array(
				'slug' => 'trashed',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'restore_tickets' => __('Restore from Trash' , 'event_espresso'),
					'delete_tickets' => __('Delete Permanently', 'event_espresso')
					)
				)
			);
	}



	public function load_scripts_styles_edit() {
		/**
		 * load accounting js.
		 */
		add_filter('FHEE_load_accounting_js', '__return_true');

		//styles
		wp_enqueue_style('espresso-ui-theme');		
		wp_enqueue_script('event_editor_js');
		
		$new_strings = array(
			'image_confirm' => __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso'),
			'event_starts_on' => __('Event Starts on', 'event_espresso'),
			'event_ends_on' => __('Event Ends on', 'event_espresso'),
			'event_datetime_actions' => __('Actions', 'event_espresso'),
			'event_clone_dt_msg' => __('Clone this Event Date and Time', 'event_espresso'),
			'remove_event_dt_msg' => __('Remove this Event Time', 'event_espresso'),
			'clone_trooper_img_src' => EE_PLUGIN_DIR_URL . 'images/clone-trooper-16x16.png',
			'clone_trooper_img_alt' => __('clone', 'event_espresso'),
			'trash_img_src' => EE_PLUGIN_DIR_URL .'images/trash-16x16.png',
			'trash_img_alt' => __('trash', 'event_espresso')
		);
		EE_Registry::$i18n_js_strings = array_merge( EE_Registry::$i18n_js_strings, $new_strings);

	}






	public function add_additional_datetime_button( $template, $template_args ) {
		return EEH_Template::display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_add_additional_time.template.php', $template_args, TRUE);
	}



	public function add_datetime_clone_button( $template, $template_args ) {
		return EEH_Template::display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_metabox_clone_button.template.php', $template_args, TRUE );
	}



	public function datetime_timezones_template( $template, $template_args ) {
		return EEH_Template::display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_timezones.template.php', $template_args, TRUE );
	}




	protected function _set_list_table_views_default() {
		parent::_set_list_table_views_default();
		$export_label = __('Export Events', 'event_espresso');
		$this->_views['all']['bulk_action']['export_events'] = $export_label;
		$this->_views['draft']['bulk_action']['export_events'] = $export_label;
		$this->_views['trash']['bulk_action']['export_events'] = $export_label;

		$new_views = array(
			'today' => array(
				'slug' => 'today',
				'label' => __('Today', 'event_espresso'),
				'count' => $this->total_events_today(),
				'bulk_action' => array(
					'export_events' => __('Export Events', 'event_espresso'),
					'trash_events' => __('Move to Trash', 'event_espresso')
				)
			),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => $this->total_events_this_month(),
				'bulk_action' => array(
					'export_events' => __('Export Events', 'event_espresso'),
					'trash_events' => __('Move to Trash', 'event_espresso')
				)
			)
		);

		$this->_views = array_merge( $this->_views, $new_views);
	}




	protected function _set_list_table_views_category_list() {
		parent::_set_list_table_views_category_list();
		$this->_views['all']['bulk_action']['export_categories'] = __('Export Categories', 'event_espresso');
	}




	public function extra_list_table_actions( $actionlinks, $event ) {
		$reports_query_args = array(
				'action' => 'reports',
				'EVT_ID' => $event->ID()
			);
		$reports_link = EE_Admin_Page::add_query_args_and_nonce( $reports_query_args, REG_ADMIN_URL );
		$actionlinks[] = '<a href="' . $reports_link . '" title="' .  __('View Report', 'event_espresso') . '"><div class="dashicons dashicons-chart-bar"></div></a>' . "\n\t";
		return $actionlinks;
	}



	protected function _event_legend_items() {
		$items = parent::_event_legend_items();
		$items['reports'] = array(
				'class' => 'dashicons dashicons-chart-bar',
				'desc' => __('Event Reports', 'event_espresso')
			);
		return $items;
	}



	protected function _import_page(){
		
		$title = __('Import', 'event_espresso');
		$intro = __('If you have a previously exported Event Espresso 4 information in a Comma Separated Value (CSV) file format, you can upload the file here: ', 'event_espresso');
		$form_url = EVENTS_ADMIN_URL;
		$action = 'import_events';
		$type = 'csv';
		$this->_template_args['form'] = EE_Import::instance()->upload_form($title, $intro, $form_url, $action, $type);
		$this->_template_args['sample_file_link'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'sample_export_file'),$this->_admin_base_url);
		$content = EEH_Template::display_template(EVENTS_CAF_TEMPLATE_PATH . 'import_page.template.php',$this->_template_args,true); 
		

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



	/**
	 * _events_export
	 * Will export all (or just the given event) to a Excel compatible file.
	 * 
	 * @access protected
	 * @return file 
	 */
	protected function _events_export() {
		$event_ids = isset($this->_req_data['EVT_ID']) ? $this->_req_data['EVT_ID'] : $this->_req_data['EVT_IDs'];
		//todo: I don't like doing this but it'll do until we modify EE_Export Class.
		$new_request_args = array(
			'export' => 'report',
			'action' => 'all_event_data',
			'EVT_ID' => $event_ids ,
		);
		$this->_req_data = array_merge($this->_req_data, $new_request_args);

		if (file_exists(EE_CLASSES . 'EE_Export.class.php')) {
			require_once(EE_CLASSES . 'EE_Export.class.php');
			$EE_Export = EE_Export::instance($this->_req_data);
			$EE_Export->export();
		}
	}




	/**
	 * handle category exports()
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

		if ( file_exists( EE_CLASSES . 'EE_Export.class.php') ) {
			require_once( EE_CLASSES . 'EE_Export.class.php');
			$EE_Export = EE_Export::instance( $this->_req_data );
			$EE_Export->export();
		}

	}


	
	/**
	 * Creates a sample CSV file for importing
	 */
	protected function _sample_export_file(){
//		require_once(EE_CLASSES . 'EE_Export.class.php');
		EE_Export::instance()->export_sample();
	}



	/**
	 * _premium_event_editor_meta_boxes
	 * add all metaboxes related to the event_editor
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _premium_event_editor_meta_boxes() {

		$this->verify_cpt_object();

		add_meta_box('espresso_event_editor_event_options', __('Event Registration Options', 'event_espresso'), array( $this, 'registration_options_meta_box' ), $this->page_slug, 'side', 'core');
		//add_meta_box('espresso_event_types', __('Event Type', 'event_espresso'), array( $this, 'event_type_meta_box' ), $this->page_slug, 'side', 'default' ); //add this back in when the feature is ready.

		//todo feature in progress
		//add_meta_box('espresso_event_editor_promo_box', __('Event Promotions', 'event_espresso'), array( $this, 'promotions_meta_box' ), $this->_current_screen->id, 'side', 'core');

		//todo, this will morph into the "Person" metabox once events are converted to cpts and we have the persons cpt in place.
		/*if ( EE_Registry::instance()->CFG->admin->use_personnel_manager ) {
			add_meta_box('espresso_event_editor_personnel_box', __('Event Staff / Speakers', 'event_espresso'), array( $this, 'personnel_metabox' ), $this->page_slug, 'side', 'default');
		}/**/
	}



	/**
	 * override caf metabox
	 * @return string html contents
	 */
	public function registration_options_meta_box() {

		$yes_no_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		$default_reg_status_values = EEM_Registration::reg_status_array(array(EEM_Registration::status_id_cancelled, EEM_Registration::status_id_declined));
		$template_args['active_status'] = $this->_cpt_model_obj->pretty_active_status(FALSE);
		$template_args['_event'] = $this->_cpt_model_obj;
		$template_args['additional_limit'] = $this->_cpt_model_obj->additional_limit();
		$template_args['default_registration_status'] = EEH_Form_Fields::select_input('default_reg_status', $default_reg_status_values, $this->_cpt_model_obj->default_registration_status());
		$template_args['display_description'] = EEH_Form_Fields::select_input('display_desc', $yes_no_values, $this->_cpt_model_obj->display_description());
		$template_args['display_registration_form'] = EEH_Form_Fields::select_input('display_reg_form', $yes_no_values, $this->_cpt_model_obj->display_reg_form(), '', '', false);
		$template_args['EVT_default_registration_status'] = EEH_Form_Fields::select_input('EVT_default_registration_status', $default_reg_status_values, $this->_cpt_model_obj->default_registration_status() );
		$template_args['additional_registration_options'] = apply_filters('FHEE_additional_registration_options_event_edit_page', '', $template_args, $yes_no_values, $default_reg_status_values);
		$templatepath = EVENTS_CAF_TEMPLATE_PATH . 'event_registration_options.template.php';
		EEH_Template::display_template($templatepath, $template_args);
	}




	/**
	 * event type metabox for events
	 * @param  object $post current post object
	 * @param  array  $box  metabox args
	 * @return string       metabox contents
	 */
	public function event_type_meta_box( $post, $box ) {
		$template_args['radio_list'] = $this->wp_terms_radio($post->ID, array( 'taxonomy' => 'espresso_event_type' ) );
		$template = EVENTS_CAF_TEMPLATE_PATH . 'event_type_metabox_contents.template.php';
		EEH_Template::display_template($template, $template_args);
	}







	public function wp_terms_radio( $post_id = 0, $args = array() ) {
		$defaults = array(
			'descendants_and_self' => 0,
			'selected_cats' => false,
			'popular_cats' => false,
			'walker' => null,
			'taxonomy' => 'category',
			'checked_ontop' => true
		);
		$args = apply_filters( 'wp_terms_checklist_args', $args, $post_id );

		extract( wp_parse_args($args, $defaults), EXTR_SKIP );

		if ( empty($walker) || !is_a($walker, 'Walker') )
			$walker = new Walker_Radio_Checklist;

		$descendants_and_self = (int) $descendants_and_self;

		$args = array('taxonomy' => $taxonomy);

		$tax = get_taxonomy($taxonomy);
		$args['disabled'] = !current_user_can($tax->cap->assign_terms);

		if ( is_array( $selected_cats ) )
			$args['selected_cats'] = $selected_cats;
		elseif ( $post_id )
			$args['selected_cats'] = wp_get_object_terms($post_id, $taxonomy, array_merge($args, array('fields' => 'ids')));
		else
			$args['selected_cats'] = array();

		if ( is_array( $popular_cats ) )
			$args['popular_cats'] = $popular_cats;
		else
			$args['popular_cats'] = get_terms( $taxonomy, array( 'fields' => 'ids', 'orderby' => 'count', 'order' => 'DESC', 'number' => 10, 'hierarchical' => false ) );

		if ( $descendants_and_self ) {
			$categories = (array) get_terms($taxonomy, array( 'child_of' => $descendants_and_self, 'hierarchical' => 0, 'hide_empty' => 0 ) );
			$self = get_term( $descendants_and_self, $taxonomy );
			array_unshift( $categories, $self );
		} else {
			$categories = (array) get_terms($taxonomy, array('get' => 'all'));
		}

		if ( $checked_ontop ) {
			// Post process $categories rather than adding an exclude to the get_terms() query to keep the query the same across all posts (for any query cache)
			$checked_categories = array();
			$keys = array_keys( $categories );

			foreach( $keys as $k ) {
				if ( in_array( $categories[$k]->term_id, $args['selected_cats'] ) ) {
					$checked_categories[] = $categories[$k];
					unset( $categories[$k] );
				}
			}

			// Put checked cats on top
			$list = call_user_func_array(array(&$walker, 'walk'), array($checked_categories, 0, $args));
		}
		// Then the rest of them
		$list .= call_user_func_array(array(&$walker, 'walk'), array($categories, 0, $args));
		return $list;
	}


	/**
	 * wp_list_table_mods for caf
	 * ============================
	 */
	

	/**
	 * hook into list table filters and provide filters for caffeinated list table
	 * @param  array  $oldfilters     any existing filters present
	 * @param  array  $list_table_obj the list table object
	 * @return array                  new filters
	 */
	public function list_table_filters( $oldfilters, $list_table_obj ) {
		$filters = array();

		//first month/year filters
		$filters[] = $this->espresso_event_months_dropdown();


		$status = isset( $this->_req_data['status'] ) ? $this->_req_data['status'] : NULL;

		//active status dropdown
		if ( $status !== 'draft' )
			$filter[] = $this->active_status_dropdown( isset( $this->_req_data['active_status'] ) ? $this->_req_data['active_status'] : '' );

		//category filter
		$filters[] = $this->category_dropdown();
		
		
		return array_merge($oldfilters, $filters);
	}





	
	/**
	 * espresso_event_months_dropdown			
	 *
	 * @access public
	 * @return string                dropdown listing month/year selections for events.
	 */
	public function espresso_event_months_dropdown() {
		//what we need to do is get all PRIMARY datetimes for all events to filter on. Note we need to include any other filters that are set!
		$status = isset( $this->_req_data['status'] ) ? $this->_req_data['status'] : NULL;

		//categories?
		$category = isset( $this->_req_data['EVT_CAT'] ) && $this->_req_data['EVT_CAT'] > 0 ? $this->_req_data['EVT_CAT'] : NULL;

		//active status?
		$active_status = isset( $this->_req_data['active_status'] ) ? $this->_req_data['active_status'] : NULL;

		$cur_date = isset($this->_req_data['month_range']) ? $this->_req_data['month_range'] : '';

		return EEH_Form_Fields::generate_event_months_dropdown( $cur_date, $status, $category, $active_status );
	}




	/**
	 * returns a list of "active" statuses on the event
	 * @param  string $current_value whatever the ucrrent active status is
	 * @return string                html dropdown.
	 */
	public function  active_status_dropdown( $current_value = '' ) {
		$select_name = 'active_status';
		$values = array('none' => __('Show Active/Inactive', 'event_espresso'), 'active' => __('Active', 'event_epsresso'), 'upcoming' => __('Upcoming', 'event_espresso'), 'expired' => __('Expired', 'event_espresso'), 'inactive' => __('Inactive', 'event_espresso') );
		$id = 'id="espresso-active-status-dropdown-filter"';
		$class = 'wide';
		echo EEH_Form_Fields::select_input( $select_name, $values, $current_value, $id, $class );
	}



	/**
	 * output a dropdown of the categories for the category filter on the event admin list table
	 *
	 * @access  public
	 * @return string html
	 */
	public function category_dropdown() {
		$cur_cat = isset( $this->_req_data['EVT_CAT'] ) ? $this->_req_data['EVT_CAT'] : -1;

		return EEH_Form_Fields::generate_event_category_dropdown( $cur_cat );
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
		$this_year_r = date('Y');
		$this_month_r = date('m');
		$days_this_month = date('t');
		$start = ' 00:00:00';
		$end = ' 23:59:59';

		$where = array(
			'Datetime.DTT_EVT_start' => array( 'BETWEEN', array(strtotime($this_year_r . '-' . $this_month_r . '-01' . $start), strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end) ) )
			);

		$count = EEM_Event::instance()->count( array( $where ), 'EVT_ID', TRUE );
		return $count;
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
		global $wpdb;

		$EEME = $this->_event_model;

		$offset = ($current_page - 1) * $per_page;
		$limit = $count ? NULL : $offset . ',' . $per_page;
		$orderby = isset($this->_req_data['orderby']) ? $this->_req_data['orderby'] : 'EVT_ID';
		$order = isset($this->_req_data['order']) ? $this->_req_data['order'] : "DESC";

		if (isset($this->_req_data['month_range'])) {
			$pieces = explode(' ', $this->_req_data['month_range'], 3);
			$month_r = !empty($pieces[0]) ? date('m', strtotime($pieces[0])) : '';
			$year_r = !empty($pieces[1]) ? $pieces[1] : '';
		}

		$where = array(
				//'Datetime.DTT_is_primary' => 1,
		);

		$status = isset( $this->_req_data['status'] ) ? $this->_req_data['status'] : NULL;
		//determine what post_status our condition will have for the query.
		switch ( $status ) {
			case 'month' :
			case 'today' :
			case NULL :
			case 'all' :
				break;

			case 'draft' :
				$where['status'] = array( 'IN', array('draft', 'auto-draft') );
				break;

			default :
				$where['status'] = $status;
		}

		//categories?
		$category = isset( $this->_req_data['EVT_CAT'] ) && $this->_req_data['EVT_CAT'] > 0 ? $this->_req_data['EVT_CAT'] : NULL;

		if ( !empty ( $category ) ) {
			$where['Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
			$where['Term_Taxonomy.term_id'] = $category;
		}
		
		//date where conditions
		if (isset($this->_req_data['month_range']) && $this->_req_data['month_range'] != '') {
			$where['Datetime.DTT_EVT_start'] = array('BETWEEN', array( strtotime($year_r . '-' . $month_r . '-01 00:00:00'), strtotime($year_r . '-' . $month_r . '-31 23:59:59' ) ) );
		} else if (isset($this->_req_data['status']) && $this->_req_data['status'] == 'today') {
			$where['Datetime.DTT_EVT_start'] = array('BETWEEN', array( strtotime(date('Y-m-d') . ' 0:00:00'), strtotime(date('Y-m-d') . ' 23:59:59') ) );
		} else if ( isset($this->_req_data['status']) && $this->_req_data['status'] == 'month' ) {
			$this_year_r = date('Y');
			$this_month_r = date('m');
			$days_this_month = date('t');
			$start = ' 00:00:00';
			$end = ' 23:59:59';
			$where['Datetime.DTT_EVT_start'] = array( 'BETWEEN', array( strtotime($this_year_r . '-' . $this_month_r . '-01' . $start), strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month . $end) ) );
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

				case 'inactive' :
					return $EEME->get_inactive_events( $query_params, $count );
					break;
			}
		}

		$events = $count ? $EEME->count( array( $where ), 'EVT_ID' ) : $EEME->get_all( $query_params );

		return $events;
	}




	/** DEFAULT TICKETS STUFF **/

	public function _tickets_overview_list_table() {
		$this->_search_btn_label = __('Tickets', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}




	public function get_default_tickets( $per_page = 10, $count = FALSE, $trashed = FALSE ) {

		$orderby= empty( $this->_req_data['orderby'] ) ? 'TKT_name' : $this->_req_data['orderby'];
		$order = empty( $this->_req_data['order'] ) ? 'ASC' : $order;

		switch ( $orderby ) {
			case 'TKT_name' :
				$orderby = array( 'TKT_name' => $order );
				break;

			case 'TKT_price' :
				$orderby = array( 'TKT_price' => $order );
				break;

			case 'TKT_uses' :
				$orderby = array( 'TKT_uses' => $order );
				break;

			case 'TKT_min' :
				$orderby = array( 'TKT_min' => $order );
				break;

			case 'TKT_max' :
				$orderby = array( 'TKT_max' => $order );
				break;

			case 'TKT_qty' :
				$orderby = array( 'TKT_qty' => $order );
				break;
		}

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$_where = array(
			'TKT_is_default' => 1,
			'TKT_deleted' => $trashed
			);

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$_where['OR'] = array(
				'TKT_name' => array('LIKE',$sstr ),
				'TKT_description' => array('LIKE',$sstr )
				);
		}

		$query_params = array(
			$_where,
			'order_by'=>$orderby,
			'limit'=>$limit,
			'group_by'=>'TKT_ID'
			);

		if($count){
			return EEM_Ticket::instance()->count_deleted_and_undeleted(array($_where));
		}else{
			return EEM_Ticket::instance()->get_all_deleted_and_undeleted($query_params);
		}

	}





	protected function _trash_or_restore_ticket(  $trash = FALSE ) {
		$success = 1;

		$TKT = EEM_Ticket::instance();

		//checkboxes?
		if ( !empty( $this->_req_data['checkbox'] ) && is_array( $this->_req_data['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

			//cycle thru the boxes
			while ( list( $TKT_ID, $value ) = each( $this->_req_data['checkbox'] ) ) {
				if ( $trash ) {
					if ( ! $TKT->delete_by_ID( $TKT_ID ) )
						$success = 0;
				} else {
					if ( ! $TKT->restore_by_ID( $TKT_ID ) )
						$success = 0;
				}
			}
		} else {
			//grab single id and trash
			$TKT_ID = absint( $this->_req_data['TKT_ID'] );

			if ( $trash ) {
				if ( ! $TKT->delete_by_ID( $TKT_ID ) )
					$success = 0;
			} else {
				if ( ! $TKT->restore_by_ID( $TKT_ID ) )
					$success = 0;
			}
		}

		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$query_args = array(
			'action' => 'ticket_list_table',
			'status' => $trash ? '' : 'trashed'
			);
		$this->_redirect_after_action( $success, 'Tickets', $action_desc, $query_args ); 
	}



	

	protected function _delete_ticket() {
		$success = 1;

		$TKT = EEM_Ticket::instance();

		//checkboxes?
		if ( !empty( $this->_req_data['checkbox'] ) && is_array( $this->_req_data['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

			//cycle thru the boxes
			while ( list( $TKT_ID, $value ) = each( $this->_req_data['checkbox'] ) ) {
				//delete 
				if ( ! $this->_delete_the_ticket( $TKT_ID ) ) {
					$success = 0;
				}
			}
		} else {
			//grab single id and trash
			$TKT_ID = absint( $this->_req_data['TKT_ID'] );
			if ( ! $this->_delete_the_ticket( $TKT_ID ) ) {
					$success = 0;
				}
		}

		$action_desc = 'deleted';
		$query_args = array(
			'action' => 'ticket_list_table',
			'status' => 'trashed'
			);

		//failsafe.  If the default ticket count === 1 then we need to redirect to event overview.
		if ( EEM_Ticket::instance()->count_deleted_and_undeleted( array( array( 'TKT_is_default' => 1 ) ), 'TKT_ID', TRUE ) )
			$query_args = array();
		$this->_redirect_after_action( $success, 'Tickets', $action_desc, $query_args ); 
	}




	protected function _delete_the_ticket( $TKT_ID ) {
		$tkt = EEM_Ticket::instance()->get_one_by_ID( $TKT_ID );
		$tkt->_remove_relations('Datetime');
		//delete all related prices first
		$tkt->delete_related_permanently('Price');
		return $tkt->delete_permanently();
	}



} //end class Events_Admin_Page

require_once ABSPATH . 'wp-admin/includes/template.php';
class Walker_Radio_Checklist extends Walker_Category_Checklist {
	
	function start_el( &$output, $category, $depth = 0, $args = array(), $id = 0 ) {
		extract($args);
		if ( empty($taxonomy) )
			$taxonomy = 'category';

		if ( $taxonomy == 'category' )
			$name = 'post_category';
		else
			$name = 'tax_input['.$taxonomy.']';

		$class = '';
		$output .= "\n<li id='{$taxonomy}-{$category->term_id}'$class>" . '<label class="selectit"><input value="' . $category->term_id . '" type="radio" name="'.$name.'[]" id="in-'.$taxonomy.'-' . $category->term_id . '"' . checked( in_array( $category->term_id, $selected_cats ), true, false ) . disabled( empty( $args['disabled'] ), false, false ) . ' /> ' . esc_html( apply_filters('the_category', $category->name )) . '</label>';
	}
}