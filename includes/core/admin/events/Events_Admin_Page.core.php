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

	public function __construct($wp_page_slug) {
		parent::__construct($wp_page_slug);
	}




	protected function _init_page_props() {
		$this->page_slug = 'events';
	}




	protected function _ajax_hooks() {
		//todo: all hooks for events ajax goes in here.
	}





	protected function _define_page_props() {
		$this->_admin_base_url = EVENTS_ADMIN_URL;
		$this->_admin_page_title = __('Events', 'event_espresso');
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
			'delete_events' => '_delete_events',
			'insert_event' => array(
				'func' => '_insert_or_update_event',
				'args' => array('new_event' => TRUE)
				 ),
			'update_event' => array(
				'func' => '_insert_or_update_event',
				'args' => array('new_event' => FALSE )
				),
			'trash_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array('trash' => TRUE )
				),
			'restore_events' => array(
				'func' => '_trash_or_restore_events',
				'args' => array('trash' => FALSE )
				),
			'view_report' => '_view_report',
			'export_events' => '_events_export',
			'export_payments' => '_payment_export',
			'import_events' => '_import_events',
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
				'global_metaboxes' => true
				)
			);
	}



	protected function _add_screen_options() {
		//todo
	}


	protected function _add_screen_options_default() {
		$this->_add_screen_options_overview();
	}


	protected function _add_screen_options_overview() {
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



	//nothing needed for events with these methods.
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}




	protected function _set_list_table_views() {
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
	protected function _event_details($view) {}





	/**
	 * _delete_event
	 * deletes a given event
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _delete_event() {}





	/**
	 * _insert_or_update_event
	 * depending on argument, will handling inserting or updating event
	 *
	 * @access protected
	 * @param  bool $new_event true = insert, false = update
	 * @return void
	 */
	protected function _insert_or_update_event($new_event) {}




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
	 * _view_report
	 * Shows the report page for events
	 * @return string html for the report page
	 */
	protected function _view_report() {
		echo 'in here';
	}






	/**
	 * _events_export
	 * Will export all (or just the given event) to a Excel compatible file.
	 * 
	 * @access protected
	 * @return file 
	 */
	protected function _events_export() {

		//todo: I don't like doing this but we'll do until we modify EE_Export Class.
		$_REQUEST = array(
			'export' => 'report',
			'action' => 'event',
			'event_id' => $_REQUEST['EVT_ID'],
			);
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

		//todo: I don't like doing this but we'll do until we modify EE_Export Class.
		$_REQUEST = array(
			'export' => 'report',
			'action' => 'payment',
			'type' => 'excel',
			'event_id' => $_REQUEST['EVT_ID'],
			);
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

		include( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/csv_uploader.php' );
		$import_what = 'Event Details';
		$import_intro = 'If you have a previously exported list of Event Details in a Comma Separated Value (CSV) file format, you can upload the file here: ';
		$page = 'events';
		$content = espresso_csv_uploader($import_what, $import_intro, $page);

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
		$orderby = isset($_REQUEST['orderby']) ? " ORDER BY " . $_REQUEST['orderby'] : " ORDER BY e.event_name";
		$order = isset($_REQUEST['order']) ? " " . $_REQUEST['order'] : " DESC";

		if (isset($_REQUEST['month_range'])) {
			$pieces = explode(' ', $_REQUEST['month_range'], 3);
			$month_r = !empty($pieces[0]) ? $pieces[0] : '';
			$year_r = !empty($pieces[1]) ? $pieces[1] : '';
		}
		
		$sql = '';
		$sql = $count ? "SELECT COUNT(e.id) " : "SELECT e.id as event_id, e.event_name, e.slug, e.event_identifier, e.reg_limit, e.is_active, e.recurrence_id, e.event_meta, e.event_status, dtt.*";

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
		


		if ( isset($_REQUEST['category_id']) && $_REQUEST['category_id'] != '') {
			$sql .= " LEFT JOIN " . EVENTS_CATEGORY_REL_TABLE . " cr ON cr.event_id = e.id ";
			$sql .= " LEFT JOIN " . EVENTS_CATEGORY_TABLE . " c ON c.id = cr.cat_id ";
		}

		$sql .= ' WHERE ';

		if ( !$count ) {
			$sql .= "dtt.DTT_is_primary = '1' AND ";
		}

		$sql .= ( isset($_REQUEST['event_status']) && ($_REQUEST['event_status'] != '') ) ? "e.event_status = '" . $_REQUEST['event_status'] . "' " : "e.event_status != 'D' ";
		$sql .= isset($_REQUEST['category_id']) && $_REQUEST['category_id'] != '' ? " AND c.id = '" . $_REQUEST['category_id'] . "' " : '';

		if ( isset($_REQUEST['month_range']) && $_REQUEST['month_range'] != '' ) {
			$sql .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($year_r . '-' . $month_r . '-01') . "' AND '" . strtotime($year_r . '-' . $month_r . '-31') . "' ";
		} elseif (isset($_REQUEST['today']) && $_REQUEST['today'] == 'true') {
			$sql .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime(date('Y-m-d') . ' 0:00:00') . "' AND '" . strtotime(date('Y-m-d') . ' 23:59:59') . "' ";
		} elseif (isset($_REQUEST['this_month']) && $_REQUEST['this_month'] == 'true') {
			$sql .= " AND dtt.DTT_EVT_start BETWEEN '" . strtotime($this_year_r . '-' . $this_month_r . '-01') . "' AND '" . strtotime($this_year_r . '-' . $this_month_r . '-' . $days_this_month) . "' ";
		}

		$sql .= !$count ? " GROUP BY e.id " . $orderby . $order . $limit : '';

		//todo: This needs to be prepared to protect agains injection attacks... but really the whole stinking query could probably be better layed out.
		
		if ( $count ) {
			$events = $wpdb->get_var( $sql );
		} else {
			$events = $wpdb->get_results( $sql );
		}

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

} //end class Events_Admin_Page