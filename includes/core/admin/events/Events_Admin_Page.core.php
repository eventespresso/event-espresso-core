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

	public function __construct() {
		parent::__construct();
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
			'default' => array(
				'func' => '_events_overview_list_table',
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
					)
				),
			'overview'=> '_events_overview_list_table',
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
			'view_report' => array(
				'func' => '_events_report',
				'nav' => array(
					'label' => __('Report', 'event_espresso'),
					'order' => 20
					)
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
					'delete_events' => __('Delete Permanently', 'event_espresso')
					)
				),
			'today' => array(
				'slug' => 'today',
				'label' => __('Today', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_events' => __('Delete Permanently', 'event_espresso')
					)
				),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_events' => __('Delete Permanently', 'event_espresso')
					)
				)
			);
	}




	/**
	 * _events_overview_list_table
	 * This contains the logic for showing the events_overview list
	 *
	 * @access private
	 * @return string html for generated table
	 */
	private function _events_overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$this->_admin_page_title .= $this->_get_action_link_or_button('add_event', 'add', array(), 'button add-new-h2');
		

	}






	/**
	 * _event_details
	 * Depending on the given argument, this will display the event_details page (add or edit)	
	 * @access private
	 * @param  string $view add or edit
	 * @return string     html for event_details page.
	 */
	private function _event_details($view) {}





	/**
	 * _delete_event
	 * deletes a given event
	 *
	 * @access private
	 * @return void 
	 */
	private function _delete_event() {}





	/**
	 * _insert_or_update_event
	 * depending on argument, will handling inserting or updating event
	 *
	 * @access private
	 * @param  bool $new_event true = insert, false = update
	 * @return void
	 */
	private function _insert_or_update_event($new_event) {}




	/**
	 * _trash_or_restore_event
	 * depending on argument, will handle trashing or restoring event
	 *
	 * @access private
	 * @param  bool $trash TRUE = trash, FALSE = restore
	 * @return void
	 * @todo: Currently the events table doesn't allow for trash/restore.  When we move to new events model we'll allow for it.
	 */
	private function _trash_or_restore_event($trash) {}





	/**
	 * _view_report
	 * Shows the report page for events
	 * @return string html for the report page
	 */
	private function _view_report() {}




	/**
	 * _get_events()
	 * This method simply returns all the events (for the given _view and paging)
	 *
	 * @access  private
	 *
	 * @param bool $count if TRUE then we just return a count of ALL events matching the given _view.  If FALSE then we return an array of event objects that match the given _view and paging parameters.
	 * @return array an array of event objects.
	 */
	private function _get_events($count = FALSE) {

	}




	/**
	 * _get_events_count
	 * This method just returns a count of events for the given $which value (i.e. 'all', 'today', 'month')
	 * @param  string $which indicate what we're using to filter the event count.
	 * @return [type]        [description]
	 */
	private function _get_events_count($which) {

	}

} //end class Events_Admin_Page