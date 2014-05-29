<?php
/**
 * Contains test class for /core/admin/EE_Admin.core.php
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for the EE_Admin class.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_Admin_Tests extends EE_UnitTestCase {

	/**
	 * test whether EE_Admin is loaded correctly
	 *
	 * @since 4.3.0
	 */
	function test_loading_admin() {
		EE_Registry::instance()->load_core('Admin');
		$this->assertTrue( class_exists('EE_Admin') );

		$admin_instance = EE_Admin::instance();

		//tests filters have been added that are expected here.  Remember the has_{filter/action} returns the priority set by the caller.
		$this->assertEquals( has_filter('plugin_action_links', array($admin_instance, 'filter_plugin_actions') ), 10 );
		$this->assertEquals( has_action('AHEE__EE_System__core_loaded_and_ready', array($admin_instance, 'get_request') ), 10 );
		$this->assertEquals( has_action('AHEE__EE_System__initialize_last', array($admin_instance, 'init') ), 10 );
		$this->assertEquals( has_action('AHEE__EE_Admin_Page__route_admin_request', array($admin_instance, 'route_admin_request') ), 100 );
		$this->assertEquals( has_action('wp_loaded', array($admin_instance, 'wp_loaded'), 100 ), 100 );
		$this->assertEquals( has_action('admin_init', array($admin_instance, 'admin_init') ), 100 );
		$this->assertEquals( has_action('admin_enqueue_scripts', array($admin_instance, 'enqueue_admin_scripts') ), 20 );
		$this->assertEquals( has_action('admin_notices', array($admin_instance, 'display_admin_notices') ), 10 );
		$this->assertEquals( has_filter('admin_footer_text', array($admin_instance, 'espresso_admin_footer') ), 10 );

		//messages init is loaded in EE_System, however we want to make sure its available to admin
		//make sure that Messages Init loaded
		$this->assertTrue( class_exists( 'EE_Messages_Init' ) );
	}

	/**
	 * Tests constants that should be defined after EE_Admin::__construct()
	 *
	 * @since 4.3.0
	 *
	 * @depends test_loading_admin
	 */
	function test_define_all_constants() {
		$this->assertTrue( defined('EE_ADMIN_URL') );
		$this->assertTrue( defined('EE_ADMIN_PAGES_URL') );
		$this->assertTrue( defined('EE_ADMIN_TEMPLATE') );
		$this->assertTrue( defined('WP_ADMIN_PATH' ) );
		$this->assertTrue( defined('WP_AJAX_URL') );
		$this->assertTrue( defined('JQPLOT_URL') );
	}



	/**
	 * Tests that the filter_plugin_actions callback for plugin_action_links works as expected.
	 *
	 * @since 4.3.0
	 *
	 * @depends test_loading_admin
	 */
	function test_filter_plugin_actions() {
		//make sure maintenance class is loaded and set to 0
		$this->setMaintenanceMode();
		$main_file = EE_PLUGIN_BASENAME;
		$original_link = array('link');
		$expected = array('<a href="admin.php?page=espresso_general_settings">' . __( 'Settings', 'event_espresso' ) . '</a>', '<a href="admin.php?page=espresso_events">' . __( 'Events', 'event_espresso' ) . '</a>', 'link');

		//first test if plugin does NOT equal main file.
		$filtered = EE_Admin::instance()->filter_plugin_actions( $original_link, 'fail' );
		$this->assertEquals( $original_link, $filtered );

		//test if plugin DOES equal main file and maintenance mode level left at 0.
		$filtered = EE_Admin::instance()->filter_plugin_actions( $original_link, $main_file );
		$this->assertEquals( $expected, $filtered );

		//test if plugin DOES equal main file and maintenance mode level is 1.
		$this->setMaintenanceMode(1);
		$filtered = EE_Admin::instance()->filter_plugin_actions( $original_link, $main_file );
		$this->assertEquals( $expected, $filtered );

		//test if plugin DOES equal main file and maintenance mode level is 2.
		$this->setMaintenanceMode(2);
		$expected = array('<a href="admin.php?page=espresso_maintenance_settings" title="Event Espresso is in maintenance mode.  Click this link to learn why.">' . __('Maintenance Mode Active', 'event_espresso' ) . '</a>', 'link');
		$filtered = EE_Admin::instance()->filter_plugin_actions($original_link, $main_file);
		$this->assertEquals( $expected, $filtered );

		//set maintenance mode back to normal.
		$this->setMaintenanceMode();
	}




	/**
	 * ensure that Request Handler and CPT_Strategy classes are loaded by the get_request method
	 * as expected.
	 *
	 * @since 4.3.0
	 *
	 * @depends test_loading_admin
	 */
	function test_get_request() {
		EE_Admin::instance()->get_request();
		$this->assertTrue( class_exists('EE_Request_Handler') );
		$this->assertTrue( class_exists('EE_CPT_Strategy') );
	}





	/**
	 * This tests the init callback in EE_Admin.
	 *
	 * @since 4.3.0
	 *
	 * @depends test_loading_admin
	 */
	function test_init() {
		$admin = EE_Admin::instance();

		//test when maintainence mode is set at level 2
		$this->setMaintenanceMode(2);
		$admin->init();
		$this->assertEquals( has_filter('FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( $admin, 'hide_admin_pages_except_maintenance_mode' ) ), 100 );
		$this->assertFalse( has_action('wp_ajax_dismiss_ee_nag_notice', array( $admin, 'dismiss_ee_nag_notice_callback' ) ) );
		$this->assertFalse( has_action('save_post', array( $admin, 'parse_post_content_on_save' ) ) );
		$this->assertFalse( has_filter('content_save_pre', array( $admin, 'its_eSpresso' ) ) );
		$this->assertFalse( has_action('admin_notices', array( $admin, 'get_persistent_admin_notices' ) ) );
		$this->assertFalse( has_action('dashboard_glance_items', array( $admin, 'dashboard_glance_items' ) ) );
		$this->assertFalse( has_filter( 'get_edit_post_link', array( $admin, 'modify_edit_post_link') ) );
		//should happen with both conditions
		$this->assertEquals( has_action('admin_head', array( $admin, 'enable_hidden_ee_nav_menu_metaboxes' ) ), 10 );
		$this->assertEquals( has_action('admin_head', array( $admin, 'register_custom_nav_menu_boxes' ) ), 10 );
		$this->assertEquals( has_filter('nav_menu_meta_box_object', array( $admin, 'remove_pages_from_nav_menu' ) ), 10 );

		//test when maintenance mode is set to something other than 2
		$this->setMaintenanceMode();
		//reset filters for test
		$this->clearAllFilters( array('FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs') );

		$admin->init();

		$this->assertFalse( has_filter('FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( $admin, 'hide_admin_pages_except_maintenance_mode' ) ) );
		$this->assertEquals( has_action('wp_ajax_dismiss_ee_nag_notice', array( $admin, 'dismiss_ee_nag_notice_callback' ) ), 10 );
		$this->assertEquals( has_action('save_post', array( $admin, 'parse_post_content_on_save' ) ), 100 );
		$this->assertEquals( has_filter('content_save_pre', array( $admin, 'its_eSpresso' ) ), 10 );
		$this->assertEquals( has_action('admin_notices', array( $admin, 'get_persistent_admin_notices' ) ), 9 );
		$this->assertEquals( has_action('dashboard_glance_items', array( $admin, 'dashboard_glance_items' ) ), 10 );
		//should happen with both conditions
		$this->assertEquals( has_action('admin_head', array( $admin, 'enable_hidden_ee_nav_menu_metaboxes' ) ), 10 );
		$this->assertEquals( has_action('admin_head', array( $admin, 'register_custom_nav_menu_boxes' ) ), 10 );
		$this->assertEquals( has_filter('nav_menu_meta_box_object', array( $admin, 'remove_pages_from_nav_menu' ) ), 10 );
		$this->assertEquals( has_filter( 'get_edit_post_link', array( $admin, 'modify_edit_post_link') ), 10 );

		//default should have Admin Page Loader loaded up.
		$this->assertTrue( class_exists( 'EE_Admin_Page_Loader' ) );
	}




	/**
	 * Test callback for removing pages from nav menu
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	function test_remove_pages_from_nav_menu() {
		//test non page post type object
		$posttypeStub = new stdClass();
		$posttypeStub->name = 'non_page';
		$expected = 'non_page';
		$result = EE_Admin::instance()->remove_pages_from_nav_menu( $posttypeStub );
		$this->assertEquals( $expected, $result->name );

		//test when posttype DOES equal page
		$posttypeStub->name = 'page';
		$this->setCoreConfig();
		$expected = EE_Registry::instance()->CFG->core->get_critical_pages_array();
		$result = EE_Admin::instance()->remove_pages_from_nav_menu( $posttypeStub );
		$test_response = !empty( $result->_default_query['post__not_in'] ) ? $result->_default_query['post__not_in'] : NULL;
		$this->assertEquals( $expected, $test_response );
	}


	/**
	 * test enable_hidden_ee_nav_menu_metaboxes()
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	function test_enable_hidden_ee_nav_menu_metaboxes() {

		//first we'll add dummy metabox to simulate our metaboxes.
		add_meta_box( 'add-espresso_events', __('Event Espresso Pages', 'event_espresso'), '__return_true', 'nav-menus', 'side', 'core' );

		//need to set the current user
		$current_user = get_current_user_id();
		wp_set_current_user( $this->factory->user->create( array( 'role' => 'administrator' ) ) );

		//set the current page to the be the nav-menus.php page
		global $pagenow;
		$pagenow = 'nav-menus.php';

		//run test
		//should be a registered metabox with the add-espresso_events id.
		global $wp_meta_boxes;
		$this->assertArrayHasKey( 'add-espresso_events', $wp_meta_boxes['nav-menus']['side']['core'], 'There should be a registered metabox with the key add-espresso_events and there isn\'t' );

		//now let's verify that the method being tested works as expected
		EE_Admin::instance()->enable_hidden_ee_nav_menu_metaboxes();
		$hidden_metaboxes = get_user_option( get_current_user_id(), 'metaboxhidden_nav-menus' );
		$this->assertEmpty( $hidden_metaboxes );
	}

	//@todo public methods to write tests for

	//function test_ee_cpt_archive_pages()
	//function test_enqueue_admin_scripts()
	//function test_get_persistent_admin_notices()
	//function test_dismiss_ee_nag_notice_callback()
	//function test_dashboard_glance_items()
	//function test_parse_post_content_on_save()


	/**
	 * Test its_eSpresso method that converts incorrect spelling of Espresso in shortcodes with the correct spelling.
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	function test_its_eSpresso() {
		//test works as expected with string to correct.
		$expected = '[ESPRESSO_CONTENT]';
		$test = '[EXPRESSO_CONTENT]';
		$result = EE_Admin::instance()->its_eSpresso( $test );
		$this->assertEquals( $result, $expected );

		//test works as expected with string that should NOT be corrected.
		$expected = 'some_string';
		$result = EE_Admin::instance()->its_eSpresso('some_string');
		$this->assertEquals( $result, $expected );
	}




	/**
	 * Test the powered by Event Espresso footer.
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	function test_espresso_admin_footer() {
		$actual = EE_Admin::instance()->espresso_admin_footer();
		//assert contains powered by text.
		$this->assertContains('Event Registration and Ticketing Powered by', $actual);

		//assert contains eventespresso.com link
		$this->assertContains('http://eventespresso.com/', $actual);
	}



	/**
	 * Test the filter callback for get_edit_post_link
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	function test_modify_edit_post_link() {
		//add contact post
		$attendee = EE_Attendee::new_instance( array( 'ATT_full_name' => 'Test Dude' ) );
		$attendee->save();
		$id = $attendee->ID();

		//dummy link for testing
		$orig_link = 'http://testdummylink.com';
		EE_Registry::instance()->load_helper('URL');
		$expected_link = EEH_URL::add_query_args_and_nonce( array( 'action' => 'edit_attendee', 'post' => $id ), admin_url('admin.php?page=espresso_registrations' ) );

		//first test that if the id given doesn't match our post type that the original link is returned.
		$notmodified = EE_Admin::instance()->modify_edit_post_link( $orig_link, 5555, '' );
		$this->assertEquals( $orig_link, $notmodified );

		//next test that if the id given matches our post type that the expected link is generated
		$ismodified = EE_Admin::instance()->modify_edit_post_link( $orig_link, $id, '' );

		$this->assertEquals( $expected_link, $ismodified );
	}

}
