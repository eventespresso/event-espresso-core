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
 * @group admin
 */
class EE_Admin_Tests extends EE_UnitTestCase {

	/**
	 * test whether EE_Admin is loaded correctly
	 *
	 * @since 4.3.0
	 */
	public function test_loading_admin() {
        $admin = EE_Registry::instance()->load_core('EE_Admin');
        $this->assertInstanceOf('EE_Admin', $admin);

		//tests filters have been added that are expected here.
        $this->assertFilterSet('plugin_action_links', [$admin, 'filter_plugin_actions'], 10);
        $this->assertActionSet('AHEE__EE_System__initialize_last', [$admin, 'init'], 10);
        $this->assertActionSet('admin_init', [$admin, 'admin_init'], 100);
        $this->assertActionSet('admin_notices', [$admin, 'display_admin_notices'], 10);
        $this->assertFilterSet('admin_footer_text', [$admin, 'espresso_admin_footer'], 10);
	}

	/**
	 * Tests constants that should be defined after EE_Admin::__construct()
	 *
	 * @since 4.3.0
	 *
	 * @depends test_loading_admin
	 */
	public function test_define_all_constants() {
		$this->assertTrue( defined('EE_ADMIN_URL') );
		$this->assertTrue( defined('EE_ADMIN_PAGES_URL') );
		$this->assertTrue( defined('EE_ADMIN_TEMPLATE') );
		$this->assertTrue( defined('WP_ADMIN_PATH' ) );
		$this->assertTrue( defined('WP_AJAX_URL') );
	}



	/**
	 * Tests that the filter_plugin_actions callback for plugin_action_links works as expected.
	 *
	 * @since 4.3.0
	 *
	 * @depends test_loading_admin
	 */
	public function test_filter_plugin_actions() {
		//make sure maintenance class is loaded and set to 0
		$this->setMaintenanceMode();
		$main_file = EE_PLUGIN_BASENAME;
		$original_link = array('link');
		$expected = array(
		    '<a href="admin.php?page=espresso_general_settings">' . __( 'Settings', 'event_espresso' ) . '</a>',
            '<a href="admin.php?page=espresso_events">' . __( 'Events', 'event_espresso' ) . '</a>',
            'link'
        );

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
     * This tests the init callback in EE_Admin.
     *
     * @throws EE_Error
     * @throws ReflectionException
     * @depends test_loading_admin
     * @since   4.3.0
     */
	public function test_init() {
		$admin = EE_Admin::instance();

		//test when maintenance mode is set at level 2
		$this->setMaintenanceMode(2);
		$admin->init();
		$this->assertActionNotSet('dashboard_glance_items', [$admin, 'dashboard_glance_items']);
		$this->assertFilterNotSet('get_edit_post_link', [$admin, 'modify_edit_post_link']);
		//should happen with both conditions
        $this->assertFilterSet('content_save_pre', [$admin, 'its_eSpresso'], 10);
        $this->assertActionSet('admin_head', [$admin, 'enable_hidden_ee_nav_menu_metaboxes'], 10);
        $this->assertActionSet('admin_head', [$admin, 'register_custom_nav_menu_boxes'], 10);
        $this->assertFilterSet('nav_menu_meta_box_object', [$admin, 'remove_pages_from_nav_menu'], 10);

		//test when maintenance mode is set to something other than 2
		$this->setMaintenanceMode();
		//reset filters for test
		$this->clearAllFilters( array('FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs') );

		$admin->init();

        $this->assertFilterNotSet(
            'FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs',
            [$admin, 'hide_admin_pages_except_maintenance_mode']
        );
        $this->assertFilterSet('content_save_pre', [$admin, 'its_eSpresso'], 10);
        $this->assertActionSet('dashboard_glance_items', [$admin, 'dashboard_glance_items'], 10);
        $this->assertActionSet('admin_head', [$admin, 'enable_hidden_ee_nav_menu_metaboxes'], 10);
        $this->assertActionSet('admin_head', [$admin, 'register_custom_nav_menu_boxes'], 10);
        $this->assertFilterSet('nav_menu_meta_box_object', [$admin, 'remove_pages_from_nav_menu'], 10);
        $this->assertFilterSet('get_edit_post_link', [$admin, 'modify_edit_post_link'], 10);

		//default should have Admin Page Loader loaded up.
		$this->assertTrue( class_exists( 'EE_Admin_Page_Loader' ) );
	}




	/**
	 * Test callback for removing pages from nav menu
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	public function test_remove_pages_from_nav_menu() {
		//test non page post type object
		$posttypeStub = new stdClass();
		$posttypeStub->name = 'non_page';
		$expected = 'non_page';
		$result = EE_Admin::instance()->remove_pages_from_nav_menu( $posttypeStub );
		$this->assertEquals( $expected, $result->name );

		//test when post type DOES equal page
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
	public function test_enable_hidden_ee_nav_menu_metaboxes() {

		//first we'll add dummy metabox to simulate our metaboxes.
		add_meta_box( 'add-espresso_events', __('Event Espresso Pages', 'event_espresso'), '__return_true', 'nav-menus', 'side', 'core' );

		//need to set the current user
		//$current_user = get_current_user_id();
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



	/**
	 * testing output for the dashboard upcoming widget hook callback
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	public function test_dashboard_glance_items() {
		//add some events and registrations
		$this->factory->event->create_many(10);
		$this->factory->registration->create_many(5, array( 'STS_ID' => EEM_Registration::status_id_not_approved ) );
		$this->factory->registration->create_many(3);

		//expected events dashboard items
		$xpct_events_url = EEH_URL::add_query_args_and_nonce( array( 'page' => 'espresso_events'), admin_url('admin.php') );
		$xpct_events_text = sprintf( _n( '%s Event', '%s Events', 10 ), number_format_i18n( 10 ) );
		$xpct_events_title = __('Click to view all Events', 'event_espresso');
		$xpct_event_assembled = sprintf( '<a class="ee-dashboard-link-events" href="%s" title="%s">%s</a>', $xpct_events_url, $xpct_events_title, $xpct_events_text );

		//expected registration dashboard items
		$xpct_registration_url = EEH_URL::add_query_args_and_nonce( array('page' => 'espresso_registrations' ), admin_url('admin.php') );
		$xpct_registration_text = sprintf( _n( '%s Registration', '%s Registrations', 5 ), number_format_i18n(5) );
		$xpct_registration_title = __('Click to view all registrations', 'event_espresso');
		$xpct_registration_assembled = sprintf( '<a class="ee-dashboard-link-registrations" href="%s" title="%s">%s</a>', $xpct_registration_url, $xpct_registration_title, $xpct_registration_text );

		$generated_items = EE_Admin::instance()->dashboard_glance_items( array() );
		//first assert the elements are an array.
		$this->assertInternalType('array', $generated_items);

		//assert the count for the array is two
		$this->assertCount(
		    2,
            $generated_items,
            sprintf('$generated_items should have 2 elements: ', print_r($generated_items, true))
        );

		//assert that the first item matches the xpctd event string.
		$this->assertEquals( $xpct_event_assembled, $generated_items[0] );

		//assert that the second item matches the xpctd registration string
		$this->assertEquals( $xpct_registration_assembled, $generated_items[1] );
	}

	//@todo public methods to write tests for

	//function test_dashboard_glance_items()
	//function test_parse_post_content_on_save()


	/**
	 * Test its_eSpresso method that converts incorrect spelling of Espresso in shortcodes with the correct spelling.
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	public function test_its_eSpresso() {
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
	public function test_espresso_admin_footer() {
	    // simulate being on admin page.  For the purpose of this test it doesn't matter what admin page it is.
        // we don't want modules or shortcodes loading for this test so let's unset that.
        set_current_screen('user-new');
		$actual = EE_Admin::instance()->espresso_admin_footer();
		//assert contains powered by text.
		$this->assertContains('Online event registration and ticketing powered by ', $actual);
		//assert contains eventespresso.com link
		$this->assertContains('https://eventespresso.com/', $actual);
		global $current_screen;
		$current_screen = null;
	}



	/**
	 * Test the filter callback for get_edit_post_link
	 *
	 * @since 4.3.0
	 * @depends test_loading_admin
	 */
	public function test_modify_edit_post_link() {
		//add contact post
		$attendee = EE_Attendee::new_instance( array( 'ATT_full_name' => 'Test Dude' ) );
		$attendee->save();
		$id = $attendee->ID();

		//dummy link for testing
		$orig_link = 'http://testdummylink.com';
		$expected_link = EEH_URL::add_query_args_and_nonce( array( 'action' => 'edit_attendee', 'post' => $id ), admin_url('admin.php?page=espresso_registrations' ) );

		//first test that if the id given doesn't match our post type that the original link is returned.
		$notmodified = EE_Admin::instance()->modify_edit_post_link( $orig_link, 5555, '' );
		$this->assertEquals( $orig_link, $notmodified );

		//next test that if the id given matches our post type that the expected link is generated
		$ismodified = EE_Admin::instance()->modify_edit_post_link( $orig_link, $id, '' );

		$this->assertEquals( $expected_link, $ismodified );
	}
}
