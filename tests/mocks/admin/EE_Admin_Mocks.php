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
EE_Registry::instance()->load_core('Admin_Page_Init');

/**
 * Mocks an invalid hooks class
 *
 * @since 4.3.0
 */
class dummy_not_exist_Hooks extends EE_Admin_Hooks {
	protected function _set_hooks_properties() {
		$this->_name = NULL;
	}

	public function verify_page_object() {
		return $this->_page_object;
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
		$this->_name = 'admin_mock_valid';
		$this->_init_func = array(
			'default' => 'init_callback_test'
			);
		$this->_ajax_func = array(
			'ajax_test' => 'ajax_test_callback'
			);
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array('default'),
				'func' => 'test_metabox',
				'label' => esc_html__('Test Metabox', 'event_espresso'),
				'priority' => 'high',
				'context' => 'normal'
				)
			);
		$this->_scripts_styles = array(
			'registers' => array(
				'test-css' => array(
					'url' => 'test.css',
					'type' => 'css'
					),
				'test-js' => array(
					'url' => 'test.js',
					'depends' => array('jquery')
					)
				),
			'deregisters' => array(
				'event-editor-css' => array('type' => 'css' )
				),
			'enqueues' => array(
				'test-css' => array( 'default' ),
				'test-js' => array( 'default' )
				),
			'localize' => array(
				'test-js' => array(
					'TEST_ITEM' => array('data' => 'this is a test') )
				)
			);
	}

	public function test_metabox() {
		return true;
	}

	protected function _extend_properties() {
		$this->extended_properties = TRUE;
	}


	public function verify_adminpage_obj() {
		return $this->_adminpage_obj;
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

	public function default_AHEE__EE_Admin_Page___display_admin_page__modify_metaboxes() {
		$this->modify_metaboxes_callback = TRUE;
	}

	public function ajax_test_callback() {
		$this->ajax_test = TRUE;
	}


	/**
	 * Method for setting protected properties for testing
	 *
	 * @since 4.3.0
	 *
	 * @param string $property The name of the property to set
	 * @param mixed $value     The value to give the property
	 */
	public function set_property( $property = '', $value = NULL ) {
		$this->{$property} = $value;
	}



	/**
	 * Method for getting protected properties for testing
	 *
	 * @since 4.3.0
	 *
	 * @param  string $property The name of the property to get.]
	 * @return mixed
	 */
	public function get_property( $property = '' ) {
		return $this->{$property};
	}


	/**
	 * wrapper for calling protected/private methods.
	 *
	 * @since 4.3.0
	 *
	 * @param  string $method the protected method
	 *                        	       to call
	 * @return mixed
	 */
	public function call_method( $method ) {
		return $this->{$method}();
	}
}
