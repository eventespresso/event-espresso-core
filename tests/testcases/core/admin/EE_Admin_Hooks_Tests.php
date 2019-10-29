<?php
/**
 * Contains test class for /core/admin/EE_Admin_Hooks.core.php
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Admin_Hooks class.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group admin
 */
class EE_Admin_Hooks_Tests extends EE_UnitTestCase {

	private $_eeAdminMock;
	private $_eeAdminHookMock;
	private $_testRoute;


	/**
	 * used to set the admin page mock
	 */
	public function setUp() {
		parent::setUp();
		$this->loadAdminMocks();
		$this->_eeAdminMock = new Admin_Mock_Valid_Admin_Page(false);
        $this->_eeAdminMock->initializePage();
		$this->_testRoute = admin_url('admin.php?page=mock_valid_admin_page');

		//go to mock_valid_admin_page route for test
		$this->go_to($this->_testRoute);
		$this->defineAdminConstants();
		$this->_eeAdminHookMock = new mock_valid_admin_page_Admin_Mock_Valid_Hooks( $this->_eeAdminMock );
	}


	/**
	 * This tests a valid admin hook construct.
	 *
	 * Not only will this catch anything wrong with constructing a
	 * Admin_Hook but we're also testing that public properties
	 * and methods perform as expected.
	 *
	 * @since 4.3.0
	 */
	public function test_valid_constructor() {
		//test things setup after construct
		$this->assertTrue( $this->_eeAdminHookMock->verify_adminpage_obj() instanceof Admin_Mock_Valid_Admin_Page );
		$this->assertFalse( $this->_eeAdminHookMock->verify_extend() );
	}

	/**
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test_enqueue_scripts_styles() {
		$this->_eeAdminHookMock->enqueue_scripts_styles();
		$this->assertTrue( wp_style_is( 'test-css', 'registered' ) );
		$this->assertTrue( wp_style_is( 'test-css' ) );
		$this->assertFalse( wp_style_is( 'event-editor-css', 'registered' ) );
		$this->assertTrue( wp_script_is( 'test-js', 'registered' ) );
		$this->assertTrue( wp_script_is( 'test-js' ) );

		//test exception if no registers index in _scripts_styles property.
		$scripts_styles_cache = $this->_eeAdminHookMock->get_property( '_scripts_styles' );

		//let's set a scripts styles array with no registers.
		$new_scripts_styles['something'] = 'fail';
		$this->_eeAdminHookMock->set_property( '_scripts_styles', $new_scripts_styles );
		$this->setExpectedException('EE_Error');
		$this->_eeAdminHookMock->enqueue_scripts_styles();


		//test for exception with missing params
		$this->_eeAdminHookMock->set_property( '_scripts_styles', $scripts_styles_cache );
		$new_scripts_styles = $scripts_styles_cache;
		unset( $new_scripts_styles['registers']['test-css']['url'] );
		$this->_eeAdminHookMock->set_property( '_scripts_styles', $new_scripts_styles );
		$this->setExpectedException('EE_Error');
		$this->_eeAdminHookMock->enqueue_scripts_styles();

		//restore correct scripts styles
		$this->_eeAdminHookMock->set_property( '_scripts_styles', $scripts_styles_cache );
	}


	/**
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test__set_defaults() {
		$this->assertEquals( 'default', $this->_eeAdminHookMock->verify_current_route() );
		$this->assertEquals( $this->_eeAdminHookMock->caller, 'mock_valid_admin_page_Admin_Mock_Valid_Hooks' );
		$this->assertFalse( $this->_eeAdminHookMock->verify_extend() );
	}


	/**
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test__set_page_object() {
		$this->assertTrue( $this->_eeAdminHookMock->verify_page_object() instanceof Admin_Mock_Valid_Admin_Page );

		//test exception if _name is empty
		$cached_name = $this->_eeAdminHookMock->get_property( '_name' );
		$this->_eeAdminHookMock->set_property( '_name', NULL );
		$this->setExpectedException( 'EE_Error' );
		$this->_eeAdminHookMock->call_method( '_set_page_object' );

		//test exception if  class does not exist
		$this->_eeAdminHookMock->set_property( '_name', 'fail' );
		$this->setExpectedException( 'EE_Error' );
		$this->_eeAdminHookMock->call_method( '_set_page_object' );

		//restore _name
		$this->_eeAdminHookMock->set_property( '_name', $cached_name );
	}


	/**
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test__init_hooks() {
		$this->assertEquals( has_filter( 'admin_init', array( $this->_eeAdminHookMock, 'init_callback_test' ) ), 10 );

		//test exception if method doesn't exist
		$cached_init_func = $this->_eeAdminHookMock->get_property( '_init_func' );
		$this->_eeAdminHookMock->set_property( '_init_func', array( 'fail' => 'fail' ) );
		$this->setExpectedException( 'EE_Error' );
		$this->_eeAdminHookMock->call_method( '_init_hooks' );

		//restore
		$this->_eeAdminHookMock->set_property( '_init_func', $cached_init_func );
	}




	/**
	 * This tests the addition of metaboxes which actually gets
	 * kicked off by the public add_metaboxes method.
	 *
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test__add_metabox() {
		//test exception if the callback for the metabox doesn't exist
		$cached_metabox = $this->_eeAdminHookMock->get_property( '_metaboxes' );
		$new_metabox = $cached_metabox;
		$new_metabox[0]['func'] = 'invalid';
		$this->_eeAdminHookMock->set_property( '_metaboxes', $new_metabox );
		$this->setExpectedException( 'EE_Error' );
		$this->_eeAdminHookMock->add_metaboxes();
		//restore
		$this->_eeAdminHookMock->set_property( '_metaboxes', $cached_metabox );
	}



	/**
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test__load_custom_methods() {
		$this->assertTrue( $this->_eeAdminHookMock->route_callback );
		$this->assertEquals( has_action('AHEE__Admin_Mock_Valid_Admin_Page___redirect_after_action__before_redirect_modification_default', array( $this->_eeAdminHookMock, '_redirect_action_early_default' ) ), 10 );
		$this->assertEquals( has_action('AHEE_redirect_Admin_Mock_Valid_Admin_Pagedefault', array( $this->_eeAdminHookMock, '_redirect_action_default' ) ), 10 );
		$this->assertEquals( has_filter( 'FHEE_redirect_Admin_Mock_Valid_Admin_Pagedefault', array( $this->_eeAdminHookMock, '_redirect_filter_default' ) ), 10 );
	}



	/**
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test__load_routed_hooks() {
		$this->assertEquals( has_action('admin_footer', array( $this->_eeAdminHookMock, 'default_admin_footer' ) ), 10 );
		$this->assertEquals( has_filter( 'FHEE_list_table_views_mock_valid_admin_page_default', array( $this->_eeAdminHookMock, 'default_FHEE_list_table_views_mock_valid_admin_page_default' ) ), 10 );
		$this->assertEquals( has_filter( 'FHEE_list_table_views_mock_valid_admin_page', array( $this->_eeAdminHookMock, 'default_FHEE_list_table_views_mock_valid_admin_page' ) ), 10 );
		$this->assertEquals( has_filter( 'FHEE_list_table_views', array( $this->_eeAdminHookMock, 'default_FHEE_list_table_views' ) ), 10 );
		$this->assertEquals( has_action( 'AHEE__EE_Admin_Page___display_admin_page__modify_metaboxes', array( $this->_eeAdminHookMock, 'default_AHEE__EE_Admin_Page___display_admin_page__modify_metaboxes') ), 10 );
	}



	/**
	 * @since 4.3.0
	 * @depends test_valid_constructor
	 */
	public function test__ajax_hooks() {
		$this->assertEquals( has_action( 'wp_ajax_ajax_test', array( $this->_eeAdminHookMock, 'ajax_test_callback' ) ), 10 );
	}



	/**
	 * This tests the loading of an EE_Admin_Page_Hooks class that is setup incorrectly.  (it'll just return really early).
	 *
	 * @since 4.3.0
	 */
	public function test_invalid_constructor() {
		$this->go_to( admin_url() );
		//go to mock_valid_admin_page route for test
		$this->_eeAdminHookMock = new dummy_not_exist_Hooks( $this->_eeAdminMock );

		//should have exited early so there should be no page object set.
		$this->assertEmpty( $this->_eeAdminHookMock->verify_page_object() );
	}


}

//class EE_Admin_Hook
