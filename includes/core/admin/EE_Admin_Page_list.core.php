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

abstract class EE_Admin_Page_list extends WP_List_Table {

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
	protected $_column_headers


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
	 * _per_page
	 * holds the per_page value
	 * @var int
	 */
	protected $_per_page;


	/**
	 * _nonce_action_ref
	 * the reference string for the nonce_action
	 * 
	 * @var string
	 */
	protected $_nonce_action_ref;


	/**
	 * constructor
	 * @param EE_Admin_Page object $admin_page we use this for obtaining everything we need in the list table.
	 */
	public function __construct( EE_Admin_Page $admin_page ) {
		$this->_view = $admin_page->get_view();
		$this->_admin_page = $admin_page;
		$this->_setup_data();

		$this->_nonce_action_ref = $this->_view;

		$this->_set_properties();

		//set parent defaults
		parent::__construct($this->_wp_list_args);

		$this->prepare_items();
	}


	/**
	 * _setup_data
	 * this method is used to setup the $_data and $_all_data_count properties 
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
	 * _default_orderby = the default orderby for sorting.
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_properties();

	


	/**
	 * _get_column_actions
	 * this is a wrapper called by WP_List_Table::get_column_actions
	 *
	 * @abstract
	 * @access protected
	 * @param  string $item the item displayed in the row
	 * @return string       html for column actions of the given column
	 */
	abstract protected function _get_column_actions($item);




	/**
	 * _get_bulk_actions
	 * This is a wrapper called by WP_List_Table::get_bulk_actions()
	 *
	 * @abstract
	 * @access protected
	 * @return string html for bulk_actions
	 */
	abstract protected function _get_bulk_actions();






	public function prepare_items() {

		$this->_per_page = ( !empty( $_REQUEST['per_page'] ) ) ? absint( $_REQUEST['per_page'] ) : 10;
		$columns = $this->get_columns();
		$hidden = array();
		$sortable = $this->get_sortable_columns();
		$this->_column_headers = array($columns, $hidden, $sortable);
		$total_items = $this->_all_data_count;
		$current_page = $this->get_pagenum();

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

	public function get_columns() {
		return $this->_columns;
	}

	public function get_views() {
		$this->_views = $admin_page->get_list_table_view_RLs();
		return $this->_views;
	}

	public function display_views() {
		$views = $this->get_views();
		$views = apply_filters( 'views_' . $this->screen->id, $views );

		if ( empty( $views ) )
			return;

		echo "<ul class='subsubsub'>\n";
		foreach ( $views as $view ) {
			$views[ $view['slug'] ] = "\t<li class='" . $view['class'] . "'>" . $view['url'];
		}
		echo implode( " |</li>\n", $views ) . "</li>\n";
		echo "</ul>";
	}

	public function get_sortable_columns() {
		return $this->_sortable_columns;
	}

	public function extra_tablenav( $which ) {
		echo $this->_entries_per_page_dropdown;
	}

	public function get_column_actions($item) {
		return $this->_get_column_actions($item);
	}

	public function get_bulk_actions() {
		return $this->_get_bulk_actions();
	}

	public function process_bulk_action() {
		//this is not used it is handled by the child EE_Admin_Page class (routes).  However, including here for reference in case there is a case where it gets used.
	}
}