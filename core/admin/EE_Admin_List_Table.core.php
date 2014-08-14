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
 * EE_Admin_Page_list
 *
 * Base list table class for EE_Admin_Page list tables.  The various child classes would just have to extend this class to add their own columns etc.
 *
 * A good resource for implementing WP_List_Table api is: @link http://wpengineer.com/2426/wp_list_table-a-step-by-step-guide/
 *
 * @package		EE_Admin_Page_list
 * @subpackage	includes/core/admin/EE_Admin_Page_list.core.php
 * @abstract
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

if ( ! class_exists( 'WP_List_Table' )) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

abstract class EE_Admin_List_Table extends WP_List_Table {

	/**
	 * $_data
	 * holds the data that will be processed for the table
	 * @var array of objects
	 */
	protected $_data;


	/**
	 * _all_data_count
	 * This holds the value of all the data available for the given view (for all pages).
	 * @var int
	 */
	protected $_all_data_count;



	/**
	 * _screen
	 * This is what will be referenced as the slug for the current screen
	 * @var string
	 */
	protected $_screen;




	/**
	 * _admin_page
	 * @var object  this is the EE_Admin_Page object
	 */
	protected $_admin_page;


	/**
	 * _view
	 * The current view
	 * @var string
	 */
	protected $_view;



	/**
	 * _views
	 * array of possible views for this table
	 * @var array
	 */
	protected $_views;


	/**
	 * _wp_list_args
	 * An array of key => value pairs containing information about the current table
	 * array(
	 * 		'plural' => 'plural label',
	 * 		'singular' => 'singular label',
	 * 		'ajax' => false, //whether to use ajax or not
	 * 		'screen' => null, //string used to reference what screen this is (WP_List_table converts to screen object)
	 * )
	 * @var array
	 */
	protected $_wp_list_args;

	/**
	 * _columns
	 * an array of column names
	 * array(
	 * 	'internal-name' => 'Title'
	 * )
	 * @var array
	 */
	protected $_columns;



	/**
	 * _column_headers
	 * array of column headers for the columns
	 * @var array
	 */
	protected $_column_headers;


	/**
	 * _sortable_columns
	 * An array of sortable columns
	 * array(
	 * 	'internal-name' => 'orderby' //or
	 * 	'internal-name' => array( 'orderby', true )
	 * )
	 * @var array
	 */
	protected $_sortable_columns;


	/**
	 * _ajax_sorting_callback
	 * callback method used to perform AJAX row reordering
	 * @var string
	 */
	protected $_ajax_sorting_callback = NULL;



	/**
	 * _hidden_columns
	 * An array of hidden columns (if needed)
	 * @var array  array('internal-name', 'internal-name')
	 */
	protected $_hidden_columns;





	/**
	 * _per_page
	 * holds the per_page value
	 * @var int
	 */
	protected $_per_page;




	/**
	 * _current_page
	 * holds what page number is currently being viewed
	 * @var int
	 */
	protected $_current_page;






	/**
	 * _nonce_action_ref
	 * the reference string for the nonce_action
	 *
	 * @var string
	 */
	protected $_nonce_action_ref;





	/**
	 * _req_data
	 * property to hold incoming request data (as set by the admin_page_core)
	 * @var array
	 */
	protected $_req_data;



	// yes / no array for admin form fields
	protected $_yes_no = array();

	/**
	 * Array describing buttons that should appear at the bottom of the page
	 * Keys are strings that represent the button's function (specifically a key in _labels['buttons']), and the values are another array with the following keys
	 * array(
	 * 	'route' => 'page_route',
	 * 	'extra_request' => array('evt_id' => 1 ); //extra request vars that need to be included in the button.
	 * )
	 * @var array $_bottom_buttons
	 */
	protected $_bottom_buttons = array();


	/**
	 * constructor
	 * @param EE_Admin_Page object $admin_page we use this for obtaining everything we need in the list table.
	 */
	public function __construct( EE_Admin_Page $admin_page ) {
		$this->_admin_page = $admin_page;
		$this->_req_data = $this->_admin_page->get_request_data();
		$this->_view = $this->_admin_page->get_view();
		$this->_views = $this->_admin_page->get_list_table_view_RLs();
		$this->_current_page = $this->get_pagenum();
		$this->_screen = $this->_admin_page->get_current_page() . '_' . $this->_admin_page->get_current_view();
		$this->_yes_no = array(  __('No', 'event_espresso'), __('Yes', 'event_espresso'));

		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page', 10 );

		$this->_setup_data();
		$this->_add_view_counts();

		$this->_nonce_action_ref = $this->_view;

		$this->_set_properties();

		//set parent defaults
		parent::__construct($this->_wp_list_args);

		$this->prepare_items();
	}


	/**
	 * _setup_data
	 * this method is used to setup the $_data, $_all_data_count, and _per_page properties
	 * @uses $this->_admin_page
	 * @return void
	 */
	abstract protected function _setup_data();




	/**
	 * set the properties that this class needs to be able to execute wp_list_table properly
	 * properties set:
	 * _wp_list_args = what the arguments required for the parent _wp_list_table.
	 * _columns = set the columns in an array.
	 * _sortable_columns = colums that are sortable (array).
	 * _hidden_columns = columns that are hidden (array)
	 * _default_orderby = the default orderby for sorting.
	 *
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_properties();





	/**
	 * _get_table_filters
	 * We use this to assemble and return any filters that are associated with this table that help further refine what get's shown in the table.
	 *
	 * @abstract
	 * @access protected
	 * @return html string
	 */
	abstract protected function _get_table_filters();






	/**
	 * this is a method that child class will do to add counts to the views array so when views are displayed the counts of the views is accurate.
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _add_view_counts();







	/**
	 * _get_hidden_fields
	 * returns a html string of hidden fields so if any table filters are used the current view will be respected.
	 * @return html string
	 */
	protected function _get_hidden_fields() {
		$action = isset( $this->_req_data['route'] ) ? $this->_req_data['route'] : '';
		$action = empty( $action ) && isset( $this->_req_data['action'] ) ? $this->_req_data['action'] : $action;
		//if action is STILL empty, then we set it to default
		$action = empty( $action ) ? 'default' : $action;
		$field = '<input type="hidden" name="page" value="' . $this->_req_data['page'] . '" />' . "\n";
		$field .= '<input type="hidden" name="route" value="'. $action .'" />' . "\n";/**/
		$field .= '<input type="hidden" name="perpage" value="' . $this->_per_page . '" />' . "\n";

		$bulk_actions = $this->_get_bulk_actions();
		foreach ( $bulk_actions as $bulk_action => $label ) {
			$field .= '<input type="hidden" name="' . $bulk_action . '_nonce" value="' . wp_create_nonce  ( $bulk_action . '_nonce' ) . '" />' . "\n";
		}

		return $field;
	}



	/**
	 * _set_column_info
	 * we're using this to set the column headers property.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_column_info() {
		$columns = $this->get_columns();
		$hidden = $this->get_hidden_columns();
		$_sortable = $this->get_sortable_columns();
		$_sortable = apply_filters( "FHEE_manage_{$this->screen->id}_sortable_columns", $_sortable, $this->_screen );

		$sortable = array();
		foreach ( $_sortable as $id => $data ) {
			if ( empty( $data ) )
				continue;

			//fix for offset errors with WP_List_Table default get_columninfo()
			if ( is_array($data) ) {
				$_data[0] = key($data);
				$_data[1] = isset($data[1]) ? $data[1] : false;
			} else {
				$_data[0] = $data;
			}

			$data = (array) $data;

			if ( !isset( $data[1] ) )
				$_data[1] = false;


			$sortable[$id] = $_data;
		}
		$this->_column_headers = array( $columns, $hidden, $sortable );
	}




	/**
	 * _get_bulk_actions
	 * This is a wrapper called by WP_List_Table::get_bulk_actions()
	 *
	 * @access protected
	 * @return array bulk_actions
	 */
	protected function _get_bulk_actions() {
		$actions = array();
		//the _views property should have the bulk_actions, so let's go through and extract them into a properly formatted array for the wp_list_table();
		foreach ( $this->_views as $view => $args) {
			if ( isset( $args['bulk_action']) && is_array($args['bulk_action']) && $this->_view == $view )
				$actions = array_merge($actions, $args['bulk_action']);
		}
		return $actions;
	}


	/**
	 * _filters
	 * This receives the filters array from children _get_table_filters() and assembles the string including the filter button.
	 *
	 * @access private
	 * @return string html showing filters
	 */
	private function _filters() {
		$classname = get_class($this);
		$filters = apply_filters( "FHEE__{$classname}__filters", (array) $this->_get_table_filters(), $this, $this->_screen );

		if ( empty($filters) )
			return;

		foreach ( $filters as $filter ) {
			echo $filter;
		}

		if ( !empty( $filters ) ) {

			//add filter button at end
			echo '<input type="submit" class="button-secondary" value="' . __('Filter', 'event_espresso') . '" id="post-query-submit" />';

			//add reset filters button at end
			echo '<a class="button button-secondary"  href="' . $this->_admin_page->get_current_page_view_url() . '" style="display:inline-block">' . __('Reset Filters', 'event_espresso') . '</a>';
		}
	}



	public function prepare_items() {

		$this->_set_column_info();
		//$this->_column_headers = $this->get_column_info();
		$total_items = $this->_all_data_count;
		$this->process_bulk_action();

		$this->items = $this->_data;
		$this->set_pagination_args(
			array(
				'total_items' => $total_items,
				'per_page' => $this->_per_page,
				'total_pages' => ceil($total_items / $this->_per_page )
			)
		);
	}


	/**
	 * This column is the default for when there is no defined column method for a registered column.
	 *
	 * This can be overridden by child classes, but allows for hooking in for custom columns.
	 *
	 * @param EE_Base_Class
	 * @param string $column_name The column being called.
	 *
	 * @return string html content for the column
	 */
	public function column_default( $item, $column_name ) {
		do_action( 'AHEE__EE_Admin_List_Table__column_' . $column_name . '__' . $this->screen->id, $item, $this->_screen );
	}



	public function get_columns() {
		$columns = apply_filters( 'FHEE_manage_'.$this->screen->id.'_columns', $this->_columns, $this->_screen );
		return $columns;
	}

	public function get_views() {
		return $this->_views;
	}

	public function display_views() {
		$views = $this->get_views();

		if ( empty( $views )) {
			return;
		}

		echo "<ul class='subsubsub'>\n";
		foreach ( $views as $view ) {
			$count = isset($view['count'] ) && !empty($view['count']) ? absint( $view['count'] )  : 0;
			$views[ $view['slug'] ] = "\t<li class='" . $view['class'] . "'>" . '<a href="' . $view['url'] . '">' . $view['label'] . '</a> <span class="count">(' . $count . ')</span>';
		}

		echo implode( " |</li>\n", $views ) . "</li>\n";
		echo "</ul>";
	}


	/**
	 * Generates content for a single row of the table
	 *
	 * @since 4.1
	 * @access public
	 *
	 * @param object $item The current item
	 */
	public function single_row( $item ) {
		$row_class = $this->_get_row_class( $item );
		echo '<tr' . $row_class . '>';
		$this->single_row_columns( $item );
		echo '</tr>';
	}


	/**
	 * This simply sets up the row class for the table rows.
	 * Allows for easier overriding of child methods for setting up sorting.
	 * @param  object $item the current item
	 * @return string
	 */
	protected function _get_row_class( $item ) {
		static $row_class = '';
		$row_class = ( $row_class == '' ? 'alternate' : '' );

		$new_row = $row_class;

		if ( !empty($this->_ajax_sorting_callback) )
			$new_row .= ' rowsortable';

		return ' class="' . $new_row . '"';
	}



	public function get_sortable_columns() {
		return (array) $this->_sortable_columns;
	}

	public function get_ajax_sorting_callback() {
		return $this->_ajax_sorting_callback;
	}

	public function get_hidden_columns() {
		$has_default = get_user_option('default'. $this->screen->id . 'columnshidden');
		if ( empty( $has_default ) && !empty($this->_hidden_columns ) ) {
			$user_id = get_current_user_id();
			update_option($user_id, 'default'.$this->screen->id . 'columnshidden', TRUE);
			update_option($user_id, 'manage' . $this->screen->id . 'columnshidden', $this->_hidden_columns );
		}
		$saved_columns = (array) get_user_option( 'manage' . $this->screen->id . 'columnshidden' );
		return $saved_columns;
	}

	public function extra_tablenav( $which ) {
		if ( $which == 'top' ) {
			$this->_filters();
			echo "\n";
			echo $this->_get_hidden_fields();
		}else{
			echo '<div class="list-table-bottom-buttons alignleft actions">';
			foreach($this->_bottom_buttons as $type => $action){
				$route = isset( $action['route'] ) ? $action['route'] : '';
				$extra_request = isset( $action['extra_request'] ) ? $action['extra_request'] : '';
				echo $this->_admin_page->get_action_link_or_button($route, $type, $extra_request);
			}
			do_action( 'AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons', $this, $this->_screen );
			echo '</div>';
		}
		//echo $this->_entries_per_page_dropdown;
	}

	public function get_column_actions($item) {
		return $this->_get_column_actions($item);
	}

	public function get_bulk_actions() {
		return (array) $this->_get_bulk_actions();
	}

	public function process_bulk_action() {
		//this is not used it is handled by the child EE_Admin_Page class (routes).  However, including here for reference in case there is a case where it gets used.
	}



	/**
	 * returns the EE admin page this list table is associated with
	 * @return EE_Admin_Page
	 */
	public function get_admin_page() {
		return $this->_admin_page;
	}
}
