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
 * Event_Categories_Admin_Page
 *
 * This contains the logic for setting up the Event Category related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 event category related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Event Categories model is setup)
 *
 * @package		Event_Categories_Admin_Page
 * @subpackage	includes/core/admin/Event_Categories_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Categories_Admin_Page extends EE_Admin_Page {


	public function __construct($wp_page_slug) {
		parent::__construct($wp_page_slug);
	}




	protected function _init_page_props() {
		$this->page_slug = 'event_categories';
		$this->page_label = __('Event Categories', 'event_espresso');
	}




	protected function _ajax_hooks() {
		//todo: all hooks for event_categories ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_base_url = EE_CATS_ADMIN_URL;
		$this->_admin_page_title = __('Event Categories', 'event_espresso');
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Category', 'event_espresso'),
				'edit' => __('Edit Category', 'event_espresso'),
				'delete' => __('Delete Category', 'event_espresso')
			)
		);
	}





	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_overview_list_table',
			'edit_category' => array(
				'func' => '_category_details',
				'args' => array('edit')
				),
			'add_category' => array(
				'func' => '_category_details',
				'args' => array('add')
				),
			'delete_categories' => array(
				'func' => '_delete_categories', //coming from overview page
				'noheader' => TRUE 
				),
			'delete_category' => array(
				'func' => '_delete_category', //coming from details page
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
			'import' => '_import_categories'
		);
	}




	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'Event_Categories_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box'),
				),
			'add_category' => array(
				'nav' => array(
					'label' => __('Add Category', 'event_espresso'),
					'order' => 5,
					'persistent' => false),
				'metaboxes' => array(),
				),
			'edit_category' => array(
				'nav' => array(
					'label' => __('Edit Category', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE),
				'metaboxes' => array()
				),
			'import_categories' => array(
				'nav' => array(
					'label' => __('Import', 'event_espresso'),
					'order' => 30
					),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box')
				)
		);
	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}






	//none of the below group are currently used for Event Categories
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles_add_event() {
		$this->load_scripts_styles_edit_event();
	}





	public function load_scripts_styles_edit_event() {
		//styles
		wp_enqueue_style('jquery-ui-style');

		//scripts
		wp_enqueue_script('ee_admin_js');
	}






	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espreso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_categories' => __('Delete Permanently', 'event_espresso'),
					'export_categories' => __('Export Categories', 'event_espresso'),
					)
				)
		);
	}





	protected function _overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$this->_admin_page_title .= $this->_get_action_link_or_button('add_category', 'add', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}





	protected function _category_details($view) {


	}





	protected function _delete_categories() {}
	protected function _delete_category() {}
	protected function _insert_or_update_category($new) {}





	protected function _categories_export() {

		//todo: I don't like doing this but it'll do until we modify EE_Export Class.
		$new_request_args = array(
			'export' => 'report',
			'action' => 'categories',
			'category_ids' => $_REQUEST['EVT_CAT_ID']
			);

		$_REQUEST = array_merge( $_REQUEST, $new_request_args );

		if ( file_exists( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php') ) {
			require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Export.class.php');
			$EE_Export = EE_Export::instance();
			$EE_Export->export();
		}

	}





	protected function _import_categories() {

		//first check if we've got an incoming import
		//first check if we've got an incoming import
		if (isset($_REQUEST['import'])) {
			if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php')) {
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Import.class.php');
				$EE_Import = EE_Import::instance();
				$EE_Import->import();
			}
		}

		include( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/csv_uploader.php' );
		$import_what = 'Event Categories';
		$import_intro = 'If you have a previously exported list of Categories in a Comma Separated Value (CSV) file format, you can upload the file here: ';
		$page = 'event_categories';
		$content = espresso_csv_uploader($import_what, $import_intro, $page);

		$this->_admin_page_title .= $this->_get_action_link_or_button('add_category', 'add', array(), 'button add-new-h2');
		$this->_template_args['admin_page_content'] = $content;	
		$this->display_admin_page_with_sidebar();

	}


	/***********/
	/* QUERIES */


	public function get_categories( $per_page = 10, $current_page = 1, $count = FALSE ) {
		global $wpdb;

		$offset = ($current_page-1)*$per_page; 
		$limit = apply_filters('filter_hook_espresso_category_list_limit', $count ? '' : ' LIMIT ' . $offset . ',' . $per_page, $offset, $per_page);
		$orderby = apply_filters( 'filter_hook_espresso_category_list_orderby', isset($_REQUEST['orderby']) ? " ORDER BY " . $_REQUEST['orderby'] : " ORDER BY c.category_name", $_REQUEST );
		$order = apply_filters( 'filter_hook_espresso_category_list_order', isset($_REQUEST['order']) ? " " . $_REQUEST['order'] : " DESC", $_REQUEST);

		$sql = $count ? "SELECT COUNT(c.id) FROM " . EVENTS_CATEGORY_TABLE . " c" : "SELECT * FROM " . EVENTS_CATEGORY_TABLE . " c";

		$sql = apply_filters('filter_hook_espresso_category_list_sql', $sql);
		$sql .= !$count ? " GROUP BY c.id " . $orderby . $order . $limit : '';

		$categories = $count ? $wpdb->get_var( $sql ) : $wpdb->get_results( $sql );
		return $categories;
	}


	/* end queries */
	/**************/

} //end Event_Categories_Admin_Page class