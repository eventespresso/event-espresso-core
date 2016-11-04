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
 * Event_Categories_Admin_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package		Event_Categories_Admin_List_Table
 * @subpackage	includes/core/admin/events/Event_Category_Admin_List_Table.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Event_Categories_Admin_List_Table extends EE_Admin_List_Table {

	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_data = $this->_admin_page->get_categories( $this->_per_page, $this->_current_page);
		$this->_all_data_count = EEM_Term_Taxonomy::instance()->count( array( array( 'taxonomy' => 'espresso_event_categories' ) ) );
	}





	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('event category', 'event_espresso' ),
			'plural' => __('event categories', 'event_espresso' ),
			'ajax' => TRUE, //for now,
			'screen' => $this->_admin_page->get_current_screen()->id
			);

		$this->_columns = array(
			'cb' => '<input type="checkbox" />',
			'id' => __('ID', 'event_espresso'),
			'name' => __('Name', 'event_espresso'),
			'shortcode' => __('Shortcode', 'event_espresso'),
			'count' => __('Events', 'event_espresso')
			);

		$this->_sortable_columns = array(
			'id' => array( 'Term.term_id' => true ),
			'name' => array( 'Term.slug' => false ),
			'count' => array( 'term_count' => false )
			);

		$this->_primary_column = 'id';

		$this->_hidden_columns = array();
	}






	//not needed
	protected function _get_table_filters() {
		return array();
	}





	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_all_data_count;
	}






	public function column_cb($item) {
		return sprintf( '<input type="checkbox" name="EVT_CAT_ID[]" value="%s" />', $item->get('term_id') );
	}





	public function column_id($item) {
		$content = $item->get('term_id');
		$content .= '  <span class="show-on-mobile-view-only">' . $item->get_first_related('Term')->get('name') . '</span>';
		return $content;
	}






	public function column_name($item) {
		$edit_query_args = array(
			'action' => 'edit_category',
			'EVT_CAT_ID' => $item->get('term_id')
		);

		$delete_query_args = array(
			'action' => 'delete_category',
			'EVT_CAT_ID' => $item->get('term_id')
		);

		$edit_link = EE_Admin_Page::add_query_args_and_nonce( $edit_query_args, EVENTS_ADMIN_URL );
		$delete_link = EE_Admin_Page::add_query_args_and_nonce( $delete_query_args, EVENTS_ADMIN_URL );

		$actions = array(
			'edit' => '<a href="' . $edit_link . '" title="' . esc_attr__('Edit Category', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>'
			);


		$actions['delete'] = '<a href="' . $delete_link . '" title="' . esc_attr__('Delete Category', 'event_espresso') . '">' . __('Delete', 'event_espresso') . '</a>';

		$content = '<strong><a class="row-title" href="' . $edit_link . '">' . $item->get_first_related('Term')->get('name') . '</a></strong>';
		$content .= $this->row_actions($actions);
		return $content;
	}




	public function column_shortcode($item) {
		$content = '[ESPRESSO_EVENTS category_slug=' . $item->get_first_related('Term')->get('slug') . ']';
		return $content;
	}




	public function column_count( $item ) {
		$e_args = array(
			'action' => 'default',
			'EVT_CAT' => $item->get_first_related('Term')->ID()
			);
		$e_link = EE_Admin_Page::add_query_args_and_nonce( $e_args, EVENTS_ADMIN_URL );
		$content = '<a href="' . $e_link . '">' . $item->get('term_count') . '</a>';
		return $content;
	}
}
