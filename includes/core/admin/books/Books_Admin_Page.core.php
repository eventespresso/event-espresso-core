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
		$this->_is_cpt = TRUE;
	}





	protected function _set_page_routes() {
		$this->_page_routes = array(
		
			//'default' => '_overview_list_table',
			
			'edit_book' => array(
				'func' => '_book_details',
				'args' => array('edit')
				),

			'default' => array(
				'func' => '_book_details',
				'args' => array('add')
				)
		);

	}




	protected function _set_page_config() {
		$this->_page_config = array(
		
			/*'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'Event_Categories_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				),*/

			'default' => array(
				'nav' => array(
					'label' => __('Add Book', 'event_espresso'),
					'order' => 5,
					'persistent' => false),
				),

			'edit_book' => array(
				'nav' => array(
					'label' => __('Edit Book', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['EVT_CAT_ID']) ? add_query_arg(array('EVT_CAT_ID' => $this->_req_data['EVT_CAT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					)
				),

		);
		
	}





	protected function _add_screen_options() {
		//todo
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


	public function insert_update_cpt_item( $post_id, $post ) {}
	public function trash_cpt_item( $post_id ) {}
	public function restore_cpt_item( $post_id ) {}
	public function delete_cpt_item( $post_id ) {}


}