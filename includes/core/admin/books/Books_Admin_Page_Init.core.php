<?php
class Books_Admin_Page_Init extends EE_Admin_Page_CPT_Init {

	public function __construct() {
		//define some events related constants
		define( 'BOOKS_PG_SLUG', 'espresso_books' );	
		define( 'BOOKS_LABEL', __('Books', 'event_espresso'));	
		define( 'BOOKS_ADMIN', EE_CORE_ADMIN . 'books' . DS );	
		define( 'BOOKS_ADMIN_URL', admin_url( 'admin.php?page=' . BOOKS_PG_SLUG ));	
		define( 'BOOKS_TEMPLATE_PATH', BOOKS_ADMIN . 'templates' . DS );	
		define( 'BOOKS_ASSETS_URL', EE_CORE_ADMIN_URL . 'books/assets/' );	
		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Books Overview', 'event_espresso');
		$this->menu_label = BOOKS_LABEL;
		$this->menu_slug = 'espresso_books';
	}

	public function get_menu_map() {
		$map = array(
			'group' => 'main',
			'menu_order' => 10,
			'show_on_menu' => TRUE,
			'parent_slug' => 'espresso_events'
			);
		return $map;
	}

} //end class Events_Admin_Page_Init