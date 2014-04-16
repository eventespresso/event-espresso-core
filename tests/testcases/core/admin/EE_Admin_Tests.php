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
		EE_Registry::load_core('Admin');
		$this->assertTrue( class_exists('EE_Admin') );
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
}
