<?php
class Books_Admin_Page extends EE_Admin_Page_CPT {


	/**
	 * _category
	 * This will hold the category object for category_details screen.
	 *
	 * @access protected
	 * @var object
	 */
	protected $_book;





	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}




	protected function _init_page_props() {
		$this->page_slug = BOOKS_PG_SLUG;
		$this->page_label = __('EE Books', 'event_espresso');
	}




	protected function _ajax_hooks() {
		//todo: all hooks for event_categories ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_base_url = BOOKS_ADMIN_URL;
		$this->_admin_page_title = __('EE Books', 'event_espresso');
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Category', 'event_espresso'),
				'edit' => __('Edit Category', 'event_espresso'),
				'delete' => __('Delete Category', 'event_espresso')
			)
		);
		$this->_is_cpt = TRUE;
	}





	protected function _set_page_routes() {
		$this->_page_routes = array(		
			'default' => '_overview_list_table',
			'add_category' => '_create_new_cpt_item'
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
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
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
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles_add_category() {
		//this is a custom post type so let's get the post type object
		$post_type_object = get_post_type_object('book');
	}





	public function load_scripts_styles_edit_category() {
	}






	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
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


	public function insert_update_cpt_item( $post_id, $post ) {}
	public function trash_cpt_item( $post_id ) {}
	public function restore_cpt_item( $post_id ) {}
	public function delete_cpt_item( $post_id ) {}



	/***********/
	/* QUERIES */


	public function get_categories( $per_page = 10, $current_page = 1, $count = FALSE ) {
		global $wpdb;

		$offset = ($current_page-1)*$per_page; 
		$limit = apply_filters('filter_hook_espresso_category_list_limit', $count ? '' : ' LIMIT ' . $offset . ',' . $per_page, $offset, $per_page);
		$orderby = apply_filters( 'filter_hook_espresso_category_list_orderby', isset($this->_req_data['orderby']) ? " ORDER BY " . $this->_req_data['orderby'] : " ORDER BY c.category_name", $this->_req_data );
		$order = apply_filters( 'filter_hook_espresso_category_list_order', isset($this->_req_data['order']) ? " " . $this->_req_data['order'] : " DESC", $this->_req_data);

		$sql = $count ? "SELECT COUNT(c.id) FROM " . EVENTS_CATEGORY_TABLE . " c" : "SELECT * FROM " . EVENTS_CATEGORY_TABLE . " c";

		$sql = apply_filters('filter_hook_espresso_category_list_sql', $sql);
		$sql .= !$count ? " GROUP BY c.id " . $orderby . $order . $limit : '';

		$categories = $count ? $wpdb->get_var( $sql ) : $wpdb->get_results( $sql );
		return $categories;
	}


	/* end queries */
	/**************/


}