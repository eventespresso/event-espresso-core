<?php
/**
 * Contains all mock classes for the EE_Admin_System
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests/mocks
 */

/**
 * load required files. Note. we're ONLY requiring non instantiated classes
 * (i.e. abstract parents) - we don't actually want any execution happening
 * here.
 */
EE_Registry::instance()->load_core('Admin_Page');
EE_Registry::instance()->load_core('Admin_Hooks');
EE_Registry::instance()->load_core('Admin_Init');

/**
 * Mocks an invalid hooks class
 *
 * @since 4.3.0
 */
class dummy_not_exist_Hooks extends EE_Admin_Hooks {
	protected function _set_hooks_properties() {
		$this->_name = NULL;
	}
}



/**
 * Mocks a valid hooks class
 *
 * @since 4.3.0
 */
class mock_valid_admin_page_Admin_Mock_Valid_Hooks extends EE_Admin_Hooks {

	public $extended_properties = FALSE;
	public $route_callback = FALSE;
	public $redirect_action_early_callback = FALSE;
	public $redirect_action_callback = FALSE;
	public $redirect_filter_callback = FALSE;
	public $default_admin_callback = FALSE;
	public $FHEE_list_table_views_route_callback = FALSE;
	public $FHEE_list_table_views_page_callback = FALSE;
	public $FHEE_list_table_views_global_callback = FALSE;
	public $modify_metaboxes_callback = FALSE;
	public $ajax_test = FALSE;

	protected function _set_hooks_properties() {
		$this->_name = 'valid';
		$this->_init_func = array(
			'default' => 'init_callback_test'
			);
		$this->_ajax_func = array(
			'ajax_test' => 'ajax_test_callback'
			);
	}

	protected function _extend_properties() {
		$this->extended_properties = TRUE;
	}

	public function verify_page_object() {
		return $this->_page_object;
	}

	public function verify_current_route() {
		return $this->_current_route;
	}


	public function verify_extend() {
		return $this->_extend;
	}

	public function init_callback_test() {
		return true;
	}

	public function default_callback() {
		$this->route_callback = TRUE;
	}

	public function _redirect_action_early_default() {
		$this->redirect_action_early_callback = TRUE;
	}

	public function _redirect_action_default() {
		$this->redirect_action_callback = TRUE;
	}

	public function _redirect_filter_default() {
		$this->redirect_filter_callback = TRUE;
	}


	public function default_admin_footer() {
		$this->default_admin_callback = TRUE;
	}

	public function default_FHEE_list_table_views_mock_valid_admin_page_default() {
		$this->FHEE_list_table_views_route_callback = TRUE;
	}

	public function default_FHEE_list_table_views_mock_valid_admin_page() {
		$this->FHEE_list_table_views_page_callback = TRUE;
	}

	public function default_FHEE_list_table_views() {
		$this->FHEE_list_table_views_global_callback = TRUE;
	}

	public function default_AHEE__EE_Admin_Page__display_admin_page__modify_metaboxes() {
		$this->modify_metaboxes_callback = TRUE;
	}

	public function ajax_test_callback() {
		$this->ajax_test = TRUE;
	}

}
