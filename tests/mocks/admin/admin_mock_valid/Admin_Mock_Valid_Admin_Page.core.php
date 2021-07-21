<?php
/**
 * Contains mock class for valid admin page
 *
 * @since 4.3.0
 */

/**
 * Mocks a Valid Admin Page
 *
 * @since 4.3.0
 */
class Admin_Mock_Valid_Admin_Page extends EE_Admin_Page {
	protected function _init_page_props() {
		$this->page_slug = 'mock_valid_admin_page';
		$this->page_label = esc_html__('Mock Valid Admin Page');
		$this->_admin_base_url = admin_url('admin.php?page=mock_valid_admin_page');
		$this->_admin_base_path = dirname( __FILE__  );
	}

	protected function _define_page_props() {
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'label' => esc_html__('Some Label')
			);
	}


	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => 'default_route_callback'
			);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			'nav' => array(
				'label' => esc_html__('Mock Valid Admin Page'),
				'order' => 10
				)
			);
	}


	public function default_route_callback() {
		return true;
	}

	protected function _ajax_hooks(){}
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
}
